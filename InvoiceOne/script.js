let items = [];

window.onload = () => {
  setDateAndNumber();
  renderHistory();
  applyTheme();

  document.getElementById("themeToggle").addEventListener("click", toggleTheme);
};



function setDateAndNumber() {
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];

   const history = JSON.parse(localStorage.getItem("invoices") || "[]");

  // Extract numbers like 001 from IDs like "#INV-20250527-001"
  const numbersToday = history
    .filter(inv => inv.date === dateStr)
    .map(inv => {
      const match = inv.id.match(/-(\d+)$/);
      return match ? parseInt(match[1], 10) : 0;
    });

  const nextNumber = (numbersToday.length ? Math.max(...numbersToday) : 0) + 1;
  const invoiceNumber = `#INV-${dateStr.replace(/-/g, '')}-${String(nextNumber).padStart(3, '0')}`;

  document.getElementById("invoiceNo").textContent = invoiceNumber;
  document.getElementById("invoiceDate").textContent = dateStr;
}


function addItem() {
  const desc = document.getElementById("itemDesc").value;
  const qty = parseFloat(document.getElementById("itemQty").value);
  const price = parseFloat(document.getElementById("itemPrice").value);
  if (!desc || isNaN(qty) || isNaN(price)) return alert("Please fill all item fields.");

  items.push({ desc, qty, price });
  document.getElementById("itemDesc").value = '';
  document.getElementById("itemQty").value = '';
  document.getElementById("itemPrice").value = '';
  renderItems();
}

function renderItems() {
  const tbody = document.getElementById("itemTableBody");
  tbody.innerHTML = '';
  let subtotal = 0;

  items.forEach((item, index) => {
    const total = item.qty * item.price;
    subtotal += total;

    const row = `<tr>
      <td>${index + 1}</td>
      <td>${item.desc}</td>
      <td>${item.qty}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>$${total.toFixed(2)}</td>
    </tr>`;
    tbody.innerHTML += row;
  });

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  updateTotals();
}

function updateTotals() {
  const subtotal = parseFloat(document.getElementById("subtotal").textContent);
  const taxRate = parseFloat(document.getElementById("taxRate").value) || 0;
  const discountRate = parseFloat(document.getElementById("discountRate").value) || 0;

  const tax = subtotal * (taxRate / 100);
  const discount = subtotal * (discountRate / 100);
  const grandTotal = subtotal + tax - discount;

  document.getElementById("tax").textContent = tax.toFixed(2);
  document.getElementById("discount").textContent = discount.toFixed(2);
  document.getElementById("grandTotal").textContent = grandTotal.toFixed(2);
}

function downloadPDF() {
  const element = document.getElementById("invoice");
  const opt = {
    margin: 0.5,
    filename: `${document.getElementById("invoiceNo").textContent}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
  };

  html2pdf().from(element).set(opt).save().then(() => {
    saveInvoiceToHistory(); // ✅ save before reset
    resetForm();            // ✅ reset form & regenerate invoice number
  });
}



function saveInvoice() {
  const id = document.getElementById("invoiceNo").textContent;
  const date = document.getElementById("invoiceDate").textContent;
  const total = document.getElementById("grandTotal").textContent;
  const history = JSON.parse(localStorage.getItem("invoices") || "[]");
  history.push({ id, date, total });
  localStorage.setItem("invoices", JSON.stringify(history));
  renderHistory();
  alert("Invoice saved!");
}

function renderHistory() {
  const list = document.getElementById("invoiceHistory");
  const history = JSON.parse(localStorage.getItem("invoices") || "[]");
  list.innerHTML = history.map(inv => `<li>${inv.id} - ${inv.date} - $${inv.total}</li>`).join('');
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

function applyTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark");
  }
}
