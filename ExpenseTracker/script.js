const form = document.getElementById('expense-form');
  const expenseNameInput = document.getElementById('expense-name');
  const expenseAmountInput = document.getElementById('expense-amount');
  const expensesList = document.getElementById('expenses-list');
  const totalExpense = document.getElementById('total-expense');

  let expenses = [];

  function renderExpenses() {
    expensesList.innerHTML = '';
    let total = 0;

    expenses.forEach((expense, index) => {
      total += expense.amount;

      const li = document.createElement('li');
      li.className = 'expense-item';

      const nameDiv = document.createElement('div');
      nameDiv.className = 'expense-name';
      nameDiv.textContent = expense.name;

      const amountDiv = document.createElement('div');
      amountDiv.className = 'expense-amount';
      amountDiv.textContent = `BDT ${expense.amount.toFixed(2)}`;

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = '×';
      deleteBtn.title = 'Delete expense';
      deleteBtn.onclick = () => {
        expenses.splice(index, 1);
        renderExpenses();
      };

      li.appendChild(nameDiv);
      li.appendChild(amountDiv);
      li.appendChild(deleteBtn);

      expensesList.appendChild(li);
    });

    totalExpense.textContent = `Total: BDT ${total.toFixed(2)}`;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);

    if (name === '' || isNaN(amount) || amount <= 0) {
      alert('Please enter valid expense name and amount.');
      return;
    }

    expenses.push({ name, amount });

    expenseNameInput.value = '';
    expenseAmountInput.value = '';
    expenseNameInput.focus();

    renderExpenses();
  });

  // Initial render (empty)
  renderExpenses();