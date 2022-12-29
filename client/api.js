

const formatError = (error) =>{
  return error.message;
}

const API = {
  async getExpenses(){
    try {
      const response = await fetch('http://localhost:5001/expenses');
      const expenses = await response.json();
      return expenses;
    }
    catch(error){
      throw formatError(error)
    }
  },

  async deleteExpense({id, title}){
    try{
     const response = await fetch(`http://localhost:5001/expenses/${id}`, {
      method: 'DELETE',
    });
    if(response.status === 404) {
      throw new Error(`Expense ${title} no longer exists.`)
    }
    const deletedExpense = await response.json();
    
    return deletedExpense;
    } catch(error){
      throw formatError(error);
    }
  }
}

export default API;