//  only initilation of the variables 
//==============================
document.getElementById('expense-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const price = e.target.price.value;
    const description = e.target.description.value;
    const category = e.target.category.value;

    const expense = {
        price,
        description,
        category
    };

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    displayExpenses(expenses);

    e.target.reset();
});
//  display the expense      or edit the expense
 //===========================
function displayExpenses(expenses) {
    const expenseList = document.getElementById('expense-list');

    expenseList.innerHTML = '';

    expenses.forEach(function (expense, index) {
        const expenseItem = document.createElement('div');
        expenseItem.classList.add('expense-item');
        expenseItem.innerHTML = `<strong>${expense.category} - ${expense.price}</strong> <br> ${expense.description} <button class="btn btn-danger btn-sm delete" data-index="${index}">Delete</button> <button class="btn btn-primary btn-sm edit" data-index="${index}">Edit</button>`;

        expenseList.appendChild(expenseItem);
    });

    const deleteButtons = document.getElementsByClassName('delete');
    const editButtons = document.getElementsByClassName('edit');

    // delete   button click event listener 
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', function () {
            const index = this.dataset.index;
            expenses.splice(index, 1);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            displayExpenses(expenses);
        });
    }
    // edit  button click event listener 

    for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener('click', function () {
            const index = this.dataset.index;
            const expense = expenses[index];

            document.getElementById('price').value = expense.price;
            document.getElementById('description').value = expense.description;
            document.getElementById('category').value = expense.category;

            document.getElementById('expense-form').addEventListener('submit', function (e) {
                e.preventDefault();

                const price = e.target.price.value;
                const description = e.target.description.value;
                const category = e.target.category.value;

                expense.price = price;
                expense.description = description;
                expense.category = category;

                expenses[index] = expense;
                localStorage.setItem('expenses', JSON.stringify(expenses));
                displayExpenses(expenses);

                e.target.reset();
            });
        });
    }
}

const storedExpenses = JSON.parse(localStorage.getItem('expenses'));

if (storedExpenses) {
    displayExpenses(storedExpenses);
}