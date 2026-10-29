
const budgetInput = document.getElementById("budgetInput");
const budgetForm = document.getElementById("budgetForm");
const transactionForm = document.getElementById("transactionForm");
const transactionList = document.getElementById("transactionList");

let budget = 0;
let income = 0;
let expenses = 0;
let transactions = [];

function updateSummary() {
  document.getElementById("budgetTotal").textContent = "₹" + budget.toFixed(2);
  document.getElementById("incomeTotal").textContent = "₹" + income.toFixed(2);
  document.getElementById("expenseTotal").textContent = "₹" + expenses.toFixed(2);
  document.getElementById("balance").textContent =
    "₹" + (budget + income - expenses).toFixed(2);
}

budgetForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const value = Number(budgetInput.value);

  if (!Number.isFinite(value) || value < 0) {
    alert("Please enter a valid budget.");
    return;
  }

  budget = value;
  updateSummary();
});

transactionForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const description = document.getElementById("description").value.trim();
  const amount = Number(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!description || !Number.isFinite(amount) || amount <= 0) {
    alert("Please enter a valid description and amount.");
    return;
  }

  const transaction = { description, amount, type };
  transactions.push(transaction);

  if (type === "income") {
    income += amount;
  } else {
    expenses += amount;
  }

  const item = document.createElement("div");
  item.className = "transaction";

  const details = document.createElement("span");
  details.textContent = description + " — ₹" + amount.toFixed(2);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete-btn";

  deleteButton.addEventListener("click", function() {
    if (type === "income") {
      income -= amount;
    } else {
      expenses -= amount;
    }

    transactions = transactions.filter(t => t !== transaction);
    item.remove();
    updateSummary();
  });

  item.append(details, deleteButton);
  transactionList.appendChild(item);

  transactionForm.reset();
  updateSummary();
});
