from flask import Flask, render_template, request, send_file, flash, redirect, url_for, abort
from encryption.caesar import encrypt_caesar, decrypt_caesar
import os

app = Flask(__name__)
app.secret_key = "your_secret_key"

UPLOAD_FOLDER = "uploads"
OUTPUT_FOLDER = "outputs"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

@app.route("/", methods=["GET", "POST"])
def index():
    result = None
    filename = None

    if request.method == "POST":
        action = request.form.get("action")
        shift_raw = request.form.get("shift", "3")
        method_code = request.form.get("method")

        # Validate Access Token
        try:
            shift = int(shift_raw)
            if shift <= 0:
                raise ValueError
        except ValueError:
            flash("Access Token must be a positive number.")
            return redirect(url_for('index'))

        # Validate Configuration Type
        if not method_code or not method_code.startswith("C"):
            flash("Invalid Configuration Type.")
            return redirect(url_for('index'))

        try:
            selected_config = int(method_code[1:])  # Extract number from "C#"
        except ValueError:
            flash("Invalid Configuration Type.")
            return redirect(url_for('index'))

        if selected_config != shift:
            flash("Configuration does not match Access Token.")
            return redirect(url_for('index'))

        # Read content from text or file
        input_text = request.form.get("input_text", "")
        file = request.files.get("file")

        if file and file.filename != "":
            filepath = os.path.join(UPLOAD_FOLDER, file.filename)
            file.save(filepath)
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()
            except Exception as e:
                flash(f"Failed to read uploaded file: {e}")
                return redirect(url_for('index'))
        else:
            content = input_text

        if not content.strip():
            flash("Please provide input text or upload a file.")
            return redirect(url_for('index'))

        # Always use Caesar Cipher internally
        if action == "encrypt":
            result = encrypt_caesar(content, shift)
        elif action == "decrypt":
            result = decrypt_caesar(content, shift)
        else:
            flash("Invalid operation selected.")
            return redirect(url_for('index'))

        # Obfuscated filename
        filename_value = round(shift * 69.69 - 4.20)
        safe_action = "Hi" if action == "encrypt" else "Hello"
        output_filename = f"{safe_action}X1_{filename_value}.txt"

        output_path = os.path.join(OUTPUT_FOLDER, output_filename)
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(result)
        filename = output_filename

    return render_template("index.html", result=result, filename=filename)

@app.route("/download/<filename>")
def download_file(filename):
    if ".." in filename or filename.startswith("/"):
        abort(400, description="Invalid filename.")

    path = os.path.join(OUTPUT_FOLDER, filename)
    abs_path = os.path.abspath(path)

    if os.path.exists(abs_path) and os.path.isfile(abs_path):
        return send_file(abs_path, as_attachment=True, download_name=filename, mimetype='text/plain')
    else:
        flash("File not found for download.")
        return redirect(url_for('index'))




if __name__ == "__main__":
    app.run(debug=True)
