let allTasks = [];
let activeTasks = [];
let task =[];

async function init() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('tasks')) || [];
    activeTasks = JSON.parse(backend.getItem('activeTasks')) || [];
    console.log(allTasks);
    AddTicket();
}
 
function AddTicket() {
   document.getElementById('ticket-wrapper').innerHTML = ``; 
   
    for (let i = 0; i < allTasks.length; i++) {
        task = allTasks[i];
    
    document.getElementById('ticket-wrapper').innerHTML += `
    <div id="id${i}"onclick="activeTask('${i}')" class="ticket b-l-${task['category']}">
    <div class="left-container">
    <img src="${task['profil']}" class="ticket-img">
    <div class="name-mail">
        <p>Gus K. Medina</p>
        <a href="#">gusmedina@gmail.com</a>
    </div>
</div>
    <div class="ticket-category">${task['category']}</div>
    <div class="ticket-details">
        <p>${task['description']} </p>
    </div>
</div>`
;
}
}

function activeTask(i){             //function to pass on JSON and remove from backlog
    let activeTask = {
        "title": allTasks[i]['title'],
        "category": allTasks[i]['category'],
        "description": allTasks[i]['description'],
        "date": allTasks[i]['date'],
        "urgency": allTasks[i]['urgency'],
        "profil": allTasks[i]['profil'],
        "status": 'toDo'
    };
    activeTasks.push(activeTask);
    console.log(activeTasks);
    removeTask(i);
    backend.setItem('activeTasks', JSON.stringify(activeTasks));
    
}

function removeTask(i) {
    var j = "id" + i;
   var element = document.getElementById(j);
   element.classList.add("d-none");
   allTasks.splice(i, 1);
   backend.setItem('tasks', JSON.stringify(allTasks)); 
}
