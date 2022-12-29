import API from "./api.js";
import HeaderComponent from "./components/concrete/header-component.js";
import ExpensesTableComponent from "./components/concrete/expenses-table-component.js";
import ContainerComponent from "./components/wrappers/container-component.js";

const rootHtmlElement = document.querySelector("#root");
if (rootHtmlElement === null)
  throw new Error("Error: #root element is missing");
let expensesTableComponent;
let expensesFormComponent;

const onDeleteExpense = async({id, title}) => {
  try {
    await API.deleteExpense({id, title});
  } catch(error){
    alert(error);
  } finally{
    const expenses = await API.getExpenses();
    expensesTableComponent.renderExpenses(expenses);
  }
}


API.getExpenses()
  .then((expenses) => {
    const expensesTableComponent = new ExpensesTableComponent({ expenses, onDeleteExpense });
    const headerComponent = new HeaderComponent({
      text: "Išlaidų sąrašas",
      className: "text-center my-2 text-white",
    });

    const container = new ContainerComponent({
      children: [
        headerComponent.htmlElement,
        expensesTableComponent.htmlElement,
      ],
    });

    rootHtmlElement.append(container.htmlElement);
  })
  .catch((error) => {
    console.error(error);
  });
