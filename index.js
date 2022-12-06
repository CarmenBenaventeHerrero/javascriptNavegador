let inputs = []
const createNewTransaction = document.querySelector("#formulario"); 

createNewTransaction.addEventListener("submit", (event) => {
  
    event.preventDefault();
  
    const inputConcept = document.querySelector("#concepto");
    const inputQuantity = document.querySelector("#cantidadConcepto");

    let input = {
        concept: inputConcept.value,
        quantity: +inputQuantity.value,
        id: createId(),
      };

    if (inputConcept.value && inputQuantity.value !== ""){

      inputConcept.value = "";
      inputQuantity.value = "";

      //A la lista de inputs le voy metiendo la lista de objetos input
      inputs.push(input);
      updateLocalStorage();
      calculateIncomeExpenses()
      drawTransaction(input);
    }
    else(window.alert("Rellena los campos obligatorios"))
})


function createId() {
  return Math.floor(Math.random() * 100);
}

const transactionList = document.querySelector('#historial');

function drawTransaction(input){
  const inputElement = document.createElement("article");
  //Para localizar el id dentro del HTML. Hago esto para identificar el nodo que quiero borrar
  inputElement.setAttribute("id", input.id)
        
//parte HTML transacción
  let inputTransaction = `
    <p>${input.concept}</p><span>${input.quantity} €<button class="delete" onclick="deleteTransaction(${
      input.id})">✖</button></span>
  `;
    // lo rellenamos conHTML y los datos de la transacción utilizando innerHTML
  inputElement.innerHTML = inputTransaction;

  transactionList.appendChild(inputElement)
}


//Actualizar sección ingresos, gastos y ahorro
const savingAmount = document.querySelector('.totalAhorro');
const incomeAmount = document.querySelector('.totalIngresos');
const expenseAmount = document.querySelector('.totalGastos');

function calculateIncomeExpenses(){
  //transformar la lista de objetos es una lista sólo con cantidades para operar
  const amount = inputs.map((input) => input.quantity);  
  const incomes = amount.filter((item) => item > 0).reduce((sum, n) => (sum + n), 0);
  const expenses = amount.filter((item) => item < 0).reduce((sum, n) => (sum + n), 0);
  const savings = amount.reduce((sum, n) => (sum + n), 0);

  //cambiar el contenido de texto de un elemento de texto en el DOM
  savingAmount.innerText = `${savings}€`;
  incomeAmount.innerText = `${incomes}€`;
  expenseAmount.innerText = `${expenses}€`;
} 

//Eliminar transacciones
function deleteTransaction(id){  
  const removeConfirmation = window.confirm('¿Quieres borrar la transacción?')
    if(removeConfirmation){
      const inputElement = document.getElementById(id);
      inputElement.remove()
      inputs = inputs.filter((input) =>input.id !== id);
      calculateIncomeExpenses()
  } 
}

function updateLocalStorage() {
  localStorage.setItem("inputs", JSON.stringify(inputs));
}

//coge las transacciones del localStorage y las devuelve
function loadTransactionsFromLocalStorage(){
  const localStorageTransactions = JSON.parse(localStorage.getItem("inputs"));
  return localStorageTransactions === null ? [] : localStorageTransactions
}


function initApp(){
  //cargo las trasnsacciones del localStorage
  inputs = loadTransactionsFromLocalStorage()
  //limpio el listado de transacciones del navegador
  //transactionList.innerHTML = "";
  calculateIncomeExpenses();
  inputs.forEach((input) => {
      drawTransaction(input); 

  });  
}

initApp()


/*
/*OBJETO DE CADA TRANSACCION = [

{concept: "compra", quantity: -50, id : randomNumber}
{concept: "salario", quantity: 1000, id : randomNumber}

]
*/