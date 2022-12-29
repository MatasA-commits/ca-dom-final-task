const response = await fetch('http://localhost:5001/expenses');
const items = await response.json();
console.log(items)