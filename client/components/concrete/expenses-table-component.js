class ExpensesTableComponent {
  htmlElement;
  tbodyHtmlElement;

  onDeleteExpense;
  onUpdateExpense;

  cancelationHandlers;

  constructor({ expenses, onDeleteExpense, onUpdateExpense }) {
    this.htmlElement = document.createElement("table");
    this.htmlElement.className =
      "table table-striped table-dark expenses-table m-auto border-3";
    this.htmlElement.innerHTML = `
    <thead>
        <tr>
          <th>id</th>
          <th>Pavadinimas</th>
          <th>Kaina</th>
          <th class='actions-row'>Veiksmai</th>
        </tr>
      </thead>
      <tbody></tbody>`;
    this.onDeleteExpense = onDeleteExpense;
    this.onUpdateExpense = onUpdateExpense;
    this.cancelationHandlers = [];
    this.tbodyHtmlElement = this.htmlElement.querySelector("tbody");
    this.renderExpenses(expenses);
  }

  enableRowEditAction = ({
    tr,
    editButton,
    cancelEditing,
    enableEditing,
    initialState,
  }) => {
    const cancelationHandler = (event) => {
      event.stopPropagation();
      if (!tr.contains(event.target)) cancelEditing();
    };

    this.cancelationHandlers.push(cancelationHandler);
    document.addEventListener("click", cancelationHandler);

    editButton.addEventListener("click", (event) => {
      event.stopPropagation();
      if (initialState.isBeingEdited) cancelEditing();
      else enableEditing();
    });
  };

  enableRowDeleteAction = ({ id, initialState, deleteButton }) => {
    deleteButton.addEventListener("click", () =>
      this.onDeleteExpense({ id, title: initialState.title })
    );
  };

  enableRowUpdateAction = ({
    id,
    titleColumn,
    amountColumn,
    initialState,
    updateButton,
    cancelEditing,
  }) => {
    updateButton.addEventListener("click", () => {
      const props = {
        id,
        title: titleColumn.innerText,
        amount: amountColumn.innerText,
      };

      if (
        initialState.title !== props.title ||
        initialState.amount !== props.amount
      ) {
        this.onUpdateExpense({ id, props });
      } else {
        cancelEditing();
      }
    });
  };

  enableRowActions = ({ tr, id, title, amount }) => {
    const initialState = { title, amount, isBeingEdited: false };
    const deleteButton = tr.querySelector(".btn-danger");
    const updateButton = tr.querySelector(".btn-success");
    const editButton = tr.querySelector(".btn-warning");
    const titleColumn = tr.querySelector(".js-title-col");
    const amountColumn = tr.querySelector(".js-amount-col");

    const cancelEditing = () => {
      tr.classList.remove("expenses-table__row--editable");
      editButton.innerHTML =
        "<span class='material-symbols-outlined'> edit_note </span>";
      editButton.classList.replace("btn-outline-danger", "btn-warning");
      titleColumn.setAttribute("contenteditable", "false");
      amountColumn.setAttribute("contenteditable", "false");
      titleColumn.innerText = initialState.title;
      amountColumn.innerText = initialState.amount;
      initialState.isBeingEdited = false;
    };

    const enableEditing = () => {
      tr.classList.add("expenses-table__row--editable");
      editButton.innerHTML =
        '<span class="material-symbols-outlined">do_not_disturb_on</span>';
      editButton.classList.replace("btn-warning", "btn-outline-danger");
      titleColumn.setAttribute("contenteditable", "true");
      amountColumn.setAttribute("contenteditable", "true");
      initialState.isBeingEdited = true;
    };

    const rowProps = {
      id,
      initialState,
      tr,
      titleColumn,
      amountColumn,
      deleteButton,
      updateButton,
      editButton,
      cancelEditing,
      enableEditing,
    };

    this.enableRowDeleteAction(rowProps);
    this.enableRowEditAction(rowProps);
    this.enableRowUpdateAction(rowProps);
  };

  createRowHtmlElement = ({ id, title, amount }) => {
    const tr = document.createElement("tr");
    tr.className = "expenses-table__row";
    tr.innerHTML = `
    <th>${id}</th>
    <td class='js-title-col'>${title}</td>
    <td class='js-amount-col'>${amount}</td>
    <td class="d-flex justify-content-end gap-3 actions-row">
    <button class="btn btn-success btn-sm"><span class="material-symbols-outlined">
    sync_saved_locally
    </span></button>
    <button class="btn btn-warning btn-sm"><span class="material-symbols-outlined">
    edit_note
    </span></button>
    <button class="btn btn-danger btn-sm"><span class="material-symbols-outlined">
        delete
    </span></button>
      </td>`;

    this.enableRowActions({ tr, id, title, amount });

    return tr;
  };

  renderExpenses = (expenses) => {
    this.tbodyHtmlElement.innerHTML = null;
    this.cancelationHandlers.forEach((cancelationHandler) =>
      document.removeEventListener("click", cancelationHandler)
    );
    this.cancelationHandlers = [];

    const rowsHtmlElements = expenses.map(this.createRowHtmlElement);
    this.tbodyHtmlElement.append(...rowsHtmlElements);
  };
}

export default ExpensesTableComponent;
