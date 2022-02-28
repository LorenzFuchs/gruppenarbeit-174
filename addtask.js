let tasks = [];

async function init1() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
}


let profiles = [{
    "name": "Gus K. Medina",
    "category": "Marketing",
    "e-mail": "gusmedina@gmail.com"
}, {
    "name": "Angie P. Davi",
    "category": "Design",
    "e-mail": "angiedavis@gmail.com"
}, {
    "name": "Anthony S. Sullivan",
    "category": "Customer Service",
    "e-mail": "anthonysullivan@gmail.com"
}, {
    "name": "Jeffrey F. Doyle",
    "category": "Data",
    "e-mail": "jeffreydoyle@gmail.com"
}];



/**
 * This function is used to put data into a JSON. And to connect with backend.
 */
function createTask() {

    event.preventDefault();                             // stops auto reload of the page onsubmit
    let title = document.getElementById('title');
    let category = document.getElementById('category');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let urgency = document.getElementById('urgency');
    let asignedto = document.getElementById('asignedto');

    let task = {
        "title": title.value,
        "category": category.value,
        "description": description.value,
        "date": date.value,
        "urgency": urgency.value,
        "asignedto": asignedto.value
    };

    tasks.push(task);
    console.log(tasks);
    backend.setItem('tasks', JSON.stringify(tasks));        //backend connection

    clearForm();
}


function clearForm() {
    title.value = '';
    category.value = '';
    description.value = '';
    date.value = '';
    urgency.value = '';
    asignedto.value = '';
}