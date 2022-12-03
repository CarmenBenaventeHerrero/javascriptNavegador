const createNewTransaction = document.querySelector("#formulario");

createNewTransaction.addEventListener("submit", (event) => {
    event.preventDefault();
  
    const inputConcept = document.querySelector("#concepto");
    const inputQuantity = document.querySelector("#cantidadConcepto");

    let input = {
        concept: inputConcept.value,
        quantity: inputQuantity.value,
      };

    if (inputConcept.value && inputQuantity.value !== ""){

      inputConcept.value = "";
      inputQuantity.value = "";

      drawTransaction(input);
    }
    else(window.alert("Rellena los campos obligatorios"))
})

function drawTransaction(input){
    const inputElement = document.createElement("article");
    inputElement.setAttribute("concept", input.concept);
    
//parte HTML
  let inputTransaction = `
  <p>${input.concept} </p>
  <p>${input.quantity} </p>
  <button onclick="deleteTransaction(this)">✖</button>
  `
    // lo rellenamos conHTML y los datos del tweet utilizando innerHTML
    inputElement.innerHTML = inputTransaction;

    // lo añadiremos a la lista por el principio (es como un unshift)
    transactionList.prepend(inputElement)
}


//obtener lista de todas las transacciones
const transactionList = document.querySelector('#historial');

//Creo que esta función no me está haciendo nada
function drawTransactionS(){
  let inputs = []
  transactionList.innerHTML = ""
  inputs.forEach((input) => {
      drawTransaction(input)  
  });  
}

drawTransactionS();

function deleteTransaction(itemToDelete){  
const removeConfirmation = window.confirm('¿Quieres borrar la transacción?')
    if(removeConfirmation){
        itemToDelete.parentElement.remove()
} 
}


function incomes(){} //utilizar un for y las values > 0 me lo colocas en ingresos
function expenses(){}
function saving(){}

/*OBJETO DE CADA TRANSACCION
{
  "concepto": quantity,
}
*/