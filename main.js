document.getElementById("expForm").addEventListener("submit", addExpense);

const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense(event) {
  event.preventDefault();

  let amount = document.getElementById("amount").value;
  let name = document.getElementById("name").value;
  let type = document.getElementById("type").value;

  if(amount > 0 && name.length > 0 && type != "expense-category"){
    const expense = {
        amount,
        name,
        type,
        id: expenses.length > 0 ? expenses[expenses.length -1].id + 1: 1,
    }
    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
  document.getElementById("expForm").reset();
  showExpenses();
}
const showExpenses = () => {
    const expenseTable = document.getElementById("expenseTable");
    expenseTable.innerHTML = "";
    for(let i=0;i<expenses.length;i++){
        expenseTable.innerHTML += `
        <tr> 
            <td>&#8377; ${expenses[i].amount} </td>
            <td> ${expenses[i].name} </td>
            <td> ${expenses[i].type} </td>
            <td> <button class="btn btn-outline-primary editButton" onclick="editExpense(${expenses[i].id})"> Edit </button>
            <button class="btn btn-outline-danger deleteButton" onclick="deleteExpense(${expenses[i].id})"> &#10007; </button> </td>
        </tr>
    `;
    }
}

const deleteExpense = (id) => {
    for(let i=0;i<expenses.length;i++){
        if(expenses[i].id === id){
            expenses.splice(i, 1);
        }
    }
    localStorage.setItem("expenses", JSON.stringify(expenses));
    showExpenses();
}