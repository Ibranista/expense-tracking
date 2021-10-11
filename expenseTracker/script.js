// const { saveAs } = require("./filesaver");

const balance = document.querySelector("#balance");
const mPlus = document.querySelector("#money-plus");
const mMinus = document.querySelector("#money-minus");
const list = document.querySelector("#list");
const form = document.querySelector("#form");
const text = document.querySelector("#text");
const amount = document.querySelector("#amount");

var arr1 = [
  { id: "124", name: "qqq" },
  { id: "589", name: "www" },
  { id: "45", name: "eee" },
  { id: "567", name: "rrr" },
];

var arr2 = [
  { id: "124", name: "ttt" },
  { id: "45", name: "yyy" },
];

let replaced = arr1.map((obj) => arr2.find((o) => o.id === obj.id) || obj);

// const tempTransaction = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
//   { id: 2, text: "Salary", amount: 300 },
// ];
var todays_orders = [
  "Latte",
  "Americano",
  "Latte",
  "Latte",
  "Mocha",
  "Cortado",
];
// console.log(todays_orders.includes("Latte"));

let localStorageTransaction = JSON.parse(localStorage.getItem("transaction"));
let transactionNullChecker = localStorage.getItem("transaction");
let transaction;
transaction = transactionNullChecker !== null ? localStorageTransaction : [];

let itemObjects = transaction.map((items) => items);

const checkers = (enteredText) => {
  return itemObjects.some((item) => item.text.trim() == enteredText.trim());
};

if (checkers("ibrahim")) {
  console.log("value found");
  let enteredObject = itemObjects.filter(
    (item) => item.text.trim() == "ibrahim"
  );
  console.log(enteredObject, "entered");
  let newAmountValue = enteredObject.reduce(
    (acc, val) => acc + val.amount + 1,
    0
  );
  console.log(newAmountValue);
  let filteredId = enteredObject.find((id) => id.id);
  console.log(filteredId.id);
  let userObject = [
    {
      id: filteredId.id,
      text: text.value,
      amount: +newAmountValue,
    },
  ];

  let myObject = transaction.map(
    (prevObj) => userObject.find((newId) => newId.id == prevObj.id) || prevObj
  );
  transaction.push(myObject);
} else {
  console.log("value does not exist");
}
console.log(transaction);

// localStorage.setItem("transaction", JSON.stringify(transaction));
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() == "" || amount.value.trim() == "") {
    alert("Please Enter Amount and Value");
  } else {
    let objectValues = {
      id: idGenerator(),
      text: text.value,
      amount: +amount.value,
    };
    transaction.push(objectValues);
    console.log(transaction);
    looper();
    dashBoard();
    updateLocalStorage();

    text.value = "";
    amount.value = "";
  }
}

const deleteText = (id) => {
  transaction = transaction.filter((item) => item.id !== id);
  looper();
  dashBoard();
  //   console.log(transaction);
  updateLocalStorage();
};

const idGenerator = () => Math.floor(Math.random() * 10);

const dashBoard = () => {
  let arrayofAmounts = transaction.map((arrayItems) => arrayItems.amount);
  let totalBalance = arrayofAmounts.reduce((acc, val) => acc + val, 0);

  // Income and Expense
  let totalIncome = arrayofAmounts
    .filter((amounts) => amounts > 0)
    .reduce((acc, val) => acc + val, 0);

  let totalExpense = arrayofAmounts
    .filter((amounts) => amounts < 0)
    .reduce((acc, val) => acc + val, 0);

  balance.innerHTML = `$${totalBalance.toFixed(2)}`;
  mPlus.innerHTML = totalIncome;
  mMinus.innerHTML = Math.abs(totalExpense);
};

let screenRender = (transactions) => {
  let amountElement = transactions.amount;
  let sign = amountElement < 0 ? "-" : "+";
  let signClass = amountElement < 0 ? "mMinus" : "mPlus";

  let listElement = document.createElement("li");
  listElement.classList.add(signClass);

  listElement.innerHTML = `
  ${transactions.text}<span>${sign}${Math.abs(
    amountElement
  )}</span><button class="delete-btn" onclick="deleteText(${
    transactions.id
  })">x</button>
  `;

  list.appendChild(listElement);

  //   Cash <span>-$400</span><button class="delete-btn">x</button>
};

// LocalStorage Insertion
updateLocalStorage = () => {
  //   localStorage.setItem("transaction", JSON.stringify(transaction));
  localStorage.transaction = JSON.stringify(transaction);
};

const looper = () => {
  list.innerHTML = "";
  transaction.forEach(screenRender);
  dashBoard();
};

looper();

form.addEventListener("submit", addTransaction, false);

const data = [
  { name: "ibraheem", number: 8, age: 24 },
  { name: "feti", number: 9, age: 25 },
];
document.getElementById("json").innerHTML = JSON.stringify(data, undefined, 4);
const excel_type =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const excel_extension = ".xlsx";

const asExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = {
    Sheets: {
      data: worksheet,
    },
    SheetNames: ["data"],
  };
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  //   console.log(excelBuffer);
  saveAsExcel(excelBuffer, "myFile");
};

const saveAsExcel = (buffer, filename) => {
  const data = new Blob([buffer], { type: excel_type });
  saveAs(data, filename + "_export_" + new Date().getTime() + excel_extension);
};
