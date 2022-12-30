class ExpensesTableComponent {
  htmlElement;
  tbodyHtmlElement;

  onDeleteExpense;
  onUpdateExpense;

  constructor({ expenses, onDeleteExpense, onUpdateExpense }) {
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
    this.onDeleteExpense = onDeleteExpense;
    this.onUpdateExpense = onUpdateExpense;
    this.tbodyHtmlElement = this.htmlElement.querySelector("tbody");
    this.renderExpenses(expenses);
  }

  enableRowEditAction = ({
    isBeingEdited,
    tr,
    editButton,
    cancelEditing,
    enableEditing,
  }) => {
    document.addEventListener("click", (event) => {
      event.stopPropagation();
      if (!tr.contains(event.target)) cancelEditing();
    });

    editButton.addEventListener("click", () => {
      if (isBeingEdited) cancelEditing();
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
    let isBeingEdited = false;
    const initialState = { title, amount };
    const deleteButton = tr.querySelector(".btn-danger");
    const updateButton = tr.querySelector(".btn-success");
    const editButton = tr.querySelector(".btn-warning");
    const titleColumn = tr.querySelector(".js-title-col");
    const amountColumn = tr.querySelector(".js-amount-col");

    const cancelEditing = () => {
      tr.classList.remove("expenses-table__row--editable");
      editButton.innerHTML =
        "<span class='material-symbols-outlined'> edit_note </span>";
      editButton.classList.replace("btn-info", "btn-warning");
      titleColumn.setAttribute("contenteditable", "false");
      amountColumn.setAttribute("contenteditable", "false");
      titleColumn.innerText = initialState.title;
      amountColumn.innerText = initialState.amount;
      isBeingEdited = false;
    };

    const enableEditing = () => {
      tr.classList.add("expenses-table__row--editable");
      editButton.innerHTML =
        '<span class="material-symbols-outlined">do_not_disturb_on</span>';
      editButton.classList.replace("btn-warning", "btn-info");
      titleColumn.setAttribute("contenteditable", "true");
      amountColumn.setAttribute("contenteditable", "true");
      isBeingEdited = true;
    };

    const rowProps = {
      id,
      initialState,
      isBeingEdited,
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
    tr.className = 'expenses-table__row';
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

    this.enableRowActions({tr, id, title, amount})

    return tr;
  };

  renderExpenses = (expenses) => {
    this.tbodyHtmlElement.innerHTML = null;
    const rowsHtmlElements = expenses.map(this.createRowHtmlElement);
    this.tbodyHtmlElement.append(...rowsHtmlElements);
  };
}

export default ExpensesTableComponent;
