let tasks = [];


function createTask() {

    event.preventDefault();                             // stops auto reload of the page onsubmit
    let title = document.getElementById('title');
    let category = document.getElementById('category');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let agency = document.getElementById('agency');

    
    let task = {
        "title": title.value,
        "category": category.value,
        "description": description.value,
        "date": date.value,
        "agency": agency.value
    };

    tasks.push(task);
    console.log(tasks);
    backend.setItem('tasks', JSON.stringify(tasks));        //backend connection
    clearForm();
    
    

}

function clearForm(){
    title.value = '';
    category.value = '';
    description.value = '';
    date.value = '';
    agency.value = '';
}

