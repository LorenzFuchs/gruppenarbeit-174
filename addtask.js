let tasks = [];


function createTask() {
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

    title.value = '';
    category.value = '';
    description.value = '';
    date.value = '';
    agency.value = '';

}