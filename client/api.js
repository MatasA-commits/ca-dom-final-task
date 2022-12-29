

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
  }
}

export default API;