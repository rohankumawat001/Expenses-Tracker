const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const list_item = document.querySelectorAll('#list li')
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const delete_btn = document.querySelector(".delete-btn");

var today = new Date();
var dd = today.getDate()
var mm = today.getMonth()+1 
var yyyy = today.getFullYear();





const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
);
console.log(localStorageTransactions);

let transactions = localStorage.getItem('transactions') !==null ? 
                   localStorageTransactions:[];

 
                              //?Add Transaction
function addTransaction(e){
    e.preventDefault();
    if(text.value.trim()===''||amount.value.trim()===''){
        alert('fill values');
    } else {
        const transaction = {
            id: +generateID(),
            text:text.value,
            amount:+amount.value,
            date:addDate(),
          };
       

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();

        text.value='';
        amount.value='';
    }
    console.log(transactions);
    console.log("object");

}


                              //? Generate random ID
function generateID(){
    return Math.floor(Math.random()*100000000);
}



                              //?ADD transaction to Dom List
function addTransactionDOM(transaction){
    //get sign 
    const sign = transaction.amount<0?'-':'+';
    const item = document.createElement('li');

    // Add class based on value
    const spanClass = (transaction.amount<0?'amountMinus':'amountPlus');
   
   



    item.innerHTML=`
    ${transaction.text}<span class = 'date'>${transaction.date}</span><span class = 'li-amount ${spanClass}'>${sign}${Math.abs(transaction.amount)}
    </span>  <button class = 'delete-btn' onclick = "removeTransaction(${transaction.id})">x</button>`;

    list.appendChild(item);

}


                          //?Update the balance ,income and expenses
function updateValues(){
    const amounts = transactions
                     .map(transaction => transaction.amount);

    const total = amounts
                     .reduce((acc,item) => (acc += item),0)
                     .toFixed(0);
                     

    const income = amounts
                     .filter(item => item > 0)
                     .reduce((acc,item) => (acc += item),0)
                     .toFixed(0);
    
    const expense = (amounts
                     .filter(item => item < 0 )
                     .reduce((acc,item)=>(acc += item),0)*-1)
                     .toFixed(0);

   balance.innerText=`₹${total}`;
   money_plus.innerText=`₹${income}`;
   money_minus.innerText=`₹${expense}`;

}  


                                   //? Remove transaction by Id
function removeTransaction(id){

    transactions=transactions.filter(transaction => transaction.id!==id);
    init();
    updateLocalStorage();
}                

//?Update Local Storage Transactions

function updateLocalStorage(){
    localStorage.setItem('transactions',JSON.stringify(transactions));
}

                                         //?date function

function addDate(){
    return dd + '/' + mm + '/' + yyyy;
}





                                            //?Init app
function  init(){
    list.innerHTML="";
    transactions.forEach(addTransactionDOM);
    updateValues();

}
init();
form.addEventListener('submit',addTransaction);










                                    // ?   dark mode
                                   

let darkMode = localStorage.getItem('darkMode')


const darkModeToggle = document.getElementById("dark-mode-toggle");
let slider = document.getElementsByClassName('slider');
let knob = document.getElementById('knob');

const enableDarkMode =()=>{
    document.body.classList.add("darkmode");
    knob.style.left="100%"
    knob.style.transform="translateX(-100%)"
    slider[0].style.backgroundImage="linear-gradient(30deg,#4C00FF,#9F77FF)"; 

    localStorage.setItem('darkMode','enabled');
}
const disableDarkMode =()=>{

    document.body.classList.remove("darkmode");
    knob.style.left="0%"
    knob.style.transform="translateX(0%)"
    slider[0].style.backgroundImage="linear-gradient(30deg,#817fff, #ff9100)";
    localStorage.setItem('darkMode','null');
}

if(darkMode==='enabled'){
    enableDarkMode();
}

darkModeToggle.addEventListener("click",()=>{
    darkMode=localStorage.getItem('darkMode');

    if(darkMode!=="enabled"){
        enableDarkMode();
    }else{
        disableDarkMode();
    }
});


list_item.addEventListener("touchstart", function() {
delete_btn.style.opacity="1"
delete_btn.style.left="0%"

}, true);




