import API from "./api.js";
import HeaderComponent from "./components/concrete/header-component.js";
import ExpensesTableComponent from "./components/concrete/expenses-table-component.js";
import ContainerComponent from "./components/wrappers/container-component.js";
import ExpensesFormComponent from "./components/concrete/expenses-form-component.js";
import FlexComponent from "./components/wrappers/flex-component.js";

const rootHtmlElement = document.querySelector("#root");
if (rootHtmlElement === null)
  throw new Error("Error: #root element is missing");
let expensesTableComponent;
let expensesFormComponent;

const onDeleteExpense = async ({ id, title }) => {
  try {
    await API.deleteExpense({ id, title });
  } catch (error) {
    alert(error);
  } finally {
    const expenses = await API.getExpenses();
    expensesTableComponent.renderExpenses(expenses);
  }
};

const onCreateExpense = async ({ title, amount }) => {
  try {
    await API.createExpense({ title, amount });
  } catch (error) {
    alert(error);
  } finally {
    const expenses = await API.getExpenses();
    expensesTableComponent.renderExpenses(expenses);
  }
};

const onUpdateExpense = async ({ id, props }) => {
  try {
    await API.updateExpense({ id, props });
  } catch (error) {
    alert(error);
  } finally {
    const expenses = await API.getExpenses();
    expensesTableComponent.renderExpenses(expenses);
  }
};

const getExpenseAmountSum = async () => {
  try {
    const getAmountSum = await API.getExpenseAmountSum();
    return getAmountSum;
  } catch (error) {
    alert(error);
  }
};

const expenseAmountSum = await getExpenseAmountSum();

API.getExpenses()
  .then((expenses) => {
    const expensesTableComponent = new ExpensesTableComponent({
      expenses,
      onDeleteExpense,
      onUpdateExpense,
    });
    const headerComponent = new HeaderComponent({
      text: "Išlaidų sąrašas",
      className: "text-center my-2 text-white",
    });

    const expenseSumComponent = new HeaderComponent({
      text: `Išlaidų suma: ${expenseAmountSum.toFixed(2)}€`,
      className: "text-center my-2 text-white",
      elementType: "h5",
    });
    console.log(expenseAmountSum);
    expensesFormComponent = new ExpensesFormComponent({
      onSubmit: onCreateExpense,
    });

    const flexComponent = new FlexComponent({
      children: [
        expensesFormComponent.htmlElement,
        expensesTableComponent.htmlElement,
      ],
    });

    const container = new ContainerComponent({
      children: [
        headerComponent.htmlElement,
        expenseSumComponent.htmlElement,
        flexComponent.htmlElement,
      ],
    });

    rootHtmlElement.append(container.htmlElement);
  })
  .catch((error) => {
    console.error(error);
  });
