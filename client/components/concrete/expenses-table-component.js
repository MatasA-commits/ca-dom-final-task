import API from "../../api.js";

class ExpensesTableComponent {
  htmlElement;

  constructor({ expenses }) {
    this.htmlElement = document.createElement("table");
    this.htmlElement.className =
      "table table-striped table-dark expenses-table m-auto border-3";
    this.htmlElement.innerHTML = `
    <thead>
        <tr>
          <th>id</th>
          <th>Title</th>
          <th>Amount</th>
          <th class='actions-row'>Actions</th>
        </tr>
      </thead>
      <tbody></tbody>`;
    const tbody = this.htmlElement.querySelector("tbody");
    const rowsHtmlElements = expenses.map(this.createRowHtmlElement);
    console.log(rowsHtmlElements);
    tbody.append(...rowsHtmlElements);
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
    return tr;
  };
}

export default ExpensesTableComponent;
