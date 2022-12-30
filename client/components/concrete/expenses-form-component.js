class ExpensesFormComponent {
  htmlElement;

  constructor({ onSubmit }) {
    this.htmlElement = document.createElement("form");
    this.htmlElement.className = "form-container text-white";
    this.htmlElement.innerHTML = `
    <div class="mb-3 ">
          <label for="titleInput" class="form-label">Pavadinimas:</label>
          <input type="text" class="form-control" id="titleInput" name="title">
        </div>
        <div class="mb-3">
          <label for="sumInput" class="form-label">Suma:</label>
          <input type="number" class="form-control" id="sumInput" step=".01" name="amount">
        </div>
        <button type="submit" class="btn btn-primary w-100">Create</button>`;

    this.htmlElement.addEventListener("submit", async (event) => {
      event.preventDefault();
      
      const formData = new FormData(event.target);
      const title = formData.get("title");
      const amount = Number(formData.get("amount"));
      console.log(amount)

      onSubmit({ title, amount });
      event.target.reset();
    });
  }
}

export default ExpensesFormComponent;
