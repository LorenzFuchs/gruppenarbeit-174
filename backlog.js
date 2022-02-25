let allTasks = [];
let activeTasks = [];
let task = [];

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
        //onclick= onblur="activeTask('${i}')" onblur="myFunction() onblur="activeTask('${i}')"
        document.getElementById('ticket-wrapper').innerHTML += `
    <div id="id${i}" contentEditable="true"  class="ticket b-l-${task['category']}">
    <div class="left-container">
    <img src="${task['profil']}" class="ticket-img">
    <div contentEditable="true"class="name-mail">
        <p id="name${i}" contentEditable="true">${task['asignedto']}</p>
        <a id="mail${i}" contentEditable="true" href="#">gusmedina@gmail.com</a>
    </div>
</div>
    <div id="category${i}" contentEditable="true" class="ticket-category">${task['category']}</div>
    <div class="ticket-details">
        <p id="description${i}" contentEditable="true">${task['description']} </p>
    </div>
    <div class="column">
    <img onclick="editable('${i}')" class="icons" src="img/pen.png" alt="pen">
    <img onclick="activeTask('${i}')" class="icons" src="img/lunch.png">
    <img onclick="saveTask('${i}')" class="icons" src="img/save.png">
    </div>
</div>`
            ;
    }
}



function activeTask(i) {             //function to pass on JSON and remove from backlog
    let activeTask = {
        "title": allTasks[i]['title'],
        "category": allTasks[i]['category'],
        "description": allTasks[i]['description'],
        "date": allTasks[i]['date'],
        "urgency": allTasks[i]['urgency'],
        "profil": allTasks[i]['profil'],
        'status': 'toDo'
    };
    activeTasks.push(activeTask);
    console.log(activeTasks);
    removeTask(i);
    backend.setItem('activeTasks', JSON.stringify(activeTasks));

}

function removeTask(i) {
    feedbackSnackbar();
    var j = "id" + i;
    var element = document.getElementById(j);
    element.classList.add("d-none");
    allTasks.splice(i, 1);
    backend.setItem('tasks', JSON.stringify(allTasks));
}




function feedbackSnackbar() {       // w3 Snackbar / Toast
    var toast = document.getElementById("snackbar");
    toast.className = "show";
    setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 2000);
}


function editable(i) {
    debugger;
    var j = "description" + i;
    document.getElementById(j).focus();
} 

/*
function saveTask(i){
    allTasks[i]==
    "title": allTasks[i]['title'],
    "category": document.getcategory(i),
    "description": allTasks[i]['description'],
    "date": allTasks[i]['date'],
    "urgency": allTasks[i]['urgency'],
allTasks[i]
}

<p id="name${i}" contentEditable="true">Gus K. Medina</p>
<a id="mail${i}" contentEditable="true" href="#">gusmedina@gmail.com</a>
</div>
</div>
<div id="category${i}" contentEditable="true" class="ticket-category">${task['category']}</div>
<div class="ticket-details">
<p id="description${i}" contentEditable="true">${task['description']} </p>
</div>
<div class="column">
<img onclick="editable('${i}')" class="edit" src="img/pen.png" alt="pen">
<img onclick="activeTask('${i}')" class="edit" src="img/lunch.png">
<img onclick="saveTask('${i}')" class="edit" src="img/save.png"> */