const SERVER_ADDRESS = "http://localhost:5001";
const EXPENSES_COLLECTION_NAME = "expenses";

const formatError = (error) => {
  return error.message;
};

const API = {
  async getExpenses() {
    try {
      const response = await fetch(
        `${SERVER_ADDRESS}/${EXPENSES_COLLECTION_NAME}`
      );
      const expenses = await response.json();
      return expenses;
    } catch (error) {
      throw formatError(error);
    }
  },

  async getExpenseAmountSum() {
    try {
      const response = await fetch(
        `${SERVER_ADDRESS}/${EXPENSES_COLLECTION_NAME}`
      );
      const expenses = await response.json();
      const expenseAmountSum = expenses.reduce(
        (sum, { amount }) => sum + Number(amount),
        0
      );
      return expenseAmountSum;
    } catch (error) {
      throw formatError(error);
    }
  },

  async deleteExpense({ id, title }) {
    try {
      const response = await fetch(
        `${SERVER_ADDRESS}/${EXPENSES_COLLECTION_NAME}/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 404) {
        throw new Error(`Expense ${title} no longer exists.`);
      }
      const deletedExpense = await response.json();

      return deletedExpense;
    } catch (error) {
      throw formatError(error);
    }
  },

  async createExpense(expenseData) {
    try {
      const response = await fetch(
        `${SERVER_ADDRESS}/${EXPENSES_COLLECTION_NAME}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(expenseData),
        }
      );

      if (response.status === 404) {
        throw new Error("Failed to create new expense");
      }
    } catch (error) {
      throw formatError(error);
    }
  },

  async updateExpense({ id, props }) {
    try {
      const response = await fetch(
        `${SERVER_ADDRESS}/${EXPENSES_COLLECTION_NAME}/${id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify(props),
        }
      );
      if (response.status === 404) {
        throw new Error("failed to update expense");
      }
    } catch (error) {
      throw formatError(error);
    }
  },
};

export default API;
