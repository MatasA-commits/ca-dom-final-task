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
          <th>Pavadinimas</th>
          <th>Suma</th>
          <th class='actions-row'>Veiksmai</th>
        </tr>
      </thead>
      <tbody></tbody>`;
    const tbody = this.htmlElement.querySelector("tbody");
    const rowsHtmlElements = expenses.map(this.createRowHtmlElement);
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

    const handleDeleteExpense = async () => {
      try {
        await API.deleteExpense({ id, title });
      } catch (error) {
        alert(error);
      } finally {
        const expenses = await API.getExpenses();
        const tbody = this.htmlElement.querySelector('tbody');
        const rowsHtmlElements = expenses.map(this.createRowHtmlElement);
        tbody.innerHTML = null;
        tbody.append(...rowsHtmlElements);
      }
    };

    const deleteButton = tr.querySelector(".btn-danger");
    deleteButton.addEventListener("click", handleDeleteExpense);

    return tr;
  };
}

export default ExpensesTableComponent;
