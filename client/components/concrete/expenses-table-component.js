import API from "../../api.js";

class ExpensesTableComponent {
  htmlElement;
  tbodyHtmlElement;

  onDeleteExpense;

  constructor({ expenses, onDeleteExpense }) {
    this.htmlElement = document.createElement("table");
    this.htmlElement.className = "table table-striped table-dark expenses-table m-auto border-3";
    this.htmlElement.innerHTML = `
    <thead>
        <tr>
          <th>id</th>
          <th>Pavadinimas</th>
          <th>Suma</th>
          <th class='actions-row'>Veiksmai</th>
        </tr>
      </thead>
      <tbody></tbody>`;
    this.onDeleteExpense = onDeleteExpense;
    this.tbodyHtmlElement = this.htmlElement.querySelector('tbody');
    this.renderExpenses(expenses)

  }

  createRowHtmlElement = ({ id, title, amount }) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <th>${id}</th>
    <td>${title}</td>
    <td>${amount}</td>
    <td class="d-flex justify-content-end actions-row">
        <button class="btn btn-danger btn-sm">✕</button>
      </td>`;

    const deleteButton = tr.querySelector(".btn-danger");
    deleteButton.addEventListener("click", () => this.onDeleteExpense({id, title}));

    return tr;
  }

  renderExpenses = (expenses) => {
    this.tbodyHtmlElement.innerHTML = null;
    const rowsHtmlElements = expenses.map(this.createRowHtmlElement);
    this.tbodyHtmlElement.append(...rowsHtmlElements);
  }
}

export default ExpensesTableComponent;
