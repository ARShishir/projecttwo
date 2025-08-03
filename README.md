Secure Data World – Data Encryption & Decryption Tool A simple yet powerful Flask-based web application that allows you to encrypt and decrypt text or files using a custom access token system. Built with Python (Flask) and Caesar Cipher, it features a modern HTML, CSS & JavaScript front-end with drag-and-drop file upload support.

Features Encrypt & Decrypt text or .txt files using Caesar Cipher.

Access Token validation with dynamic configuration matching.

Drag & Drop file upload for better user experience.

Downloadable processed output as .txt files.

Flash messages for real-time feedback.

Responsive and modern UI design.

Project Structure

projecttwo/ │ ├── app.py # Main Flask application ├── encryption/ │ ├── init.py │ ├── caesar.py # Caesar cipher logic (encrypt/decrypt functions) │ ├── templates/ │ ├── index.html # Frontend (HTML, CSS, JS) │ ├── uploads/ # Uploaded files (auto-created) ├── outputs/ # Encrypted/Decrypted output files (auto-created) └── README.md # Project documentation Installation & Setup

Clone the repository
git clone -b PTFinalExam https://github.com/your-username/projecttwo.git cd projecttwo 2. Create a virtual environment (optional but recommended)

python -m venv venv source venv/bin/activate # On Windows: venv\Scripts\activate 3. Install dependencies

pip install flask (You can also create a requirements.txt using pip freeze > requirements.txt for easier installation.)

Run the application
python app.py 5. Access the web app Open your browser and go to:

http://127.0.0.1:5000 How It Works Select Encrypt or Decrypt mode.

Enter an Access Token (positive integer).

Select the correct Configuration Type (auto-generated based on Access Token).

Provide input via text or upload a .txt file.

Click Execute to process your data.

Download the processed file.

Security Notes Uses Caesar Cipher, not secure for real-world encryption.

Intended for educational purposes only.

Files are stored locally and never sent to external servers.

Future Improvements Support stronger encryption algorithms (AES, RSA, etc.).

User authentication and role-based access.

Docker and deployment support.

Database integration for logs and access control.

Author Abdur Rahaman Shishir

GitHub: https://github.com/ARShishir
