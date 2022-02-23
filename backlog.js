let allTasks = [];
let activeTasks = [];
let task =[];

async function init() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('tasks')) || [];
    console.log(allTasks);
    AddTicket();
}
 
function AddTicket() {
   document.getElementById('ticket-wrapper').innerHTML = ``; 
   
    for (let i = 0; i < allTasks.length; i++) {
        task = allTasks[i];
    
    document.getElementById('ticket-wrapper').innerHTML += `
    <div onclick="activeTask('${'i'}')" class="ticket b-l-orange">
    <div class="left-container">
    <img src="${task['profil']}" class="ticket-img">
    <div class="name-mail">
        <p>Gus K. Medina</p>
        <a href="#">gusmedina@gmail.com</a>
    </div>
</div>
    <div class="ticket-category">Marketing</div>
    <div class="ticket-details">
        <p>${task['description']} </p>
    </div>
</div>`
;
}
}

function activeTask(){
    let activeTask = {
        "title": allTasks[0]['title'],
        "category": allTasks[0]['category'],
        "description": allTasks[0]['description'],
        "date": allTasks[0]['date'],
        "agency": allTasks[0]['agency'],
        "profil": allTasks[0]['profil'],
        'category': 'toDo'
    };
    activeTasks.push(activeTask);
    console.log(activeTasks);
    backend.setItem('activeTasks', JSON.stringify(activeTasks));
}


/*
async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}

function loadAllTasks(){
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString);
}
{"tasks":"[{\"title\":\"MEINS\",\"category\":\"Testing\",\"description\":\"wr ar ar\",\"date\":\"2022-02-16\",\"agency\":\"High\"}]"}

allTasks[0]['profil']
        ${ allTasks[0]['title'] }
    allTasks[0]['category']
    allTasks[0]['description']
    allTasks[0]['date']
    allTasks[0]['agency']
*/