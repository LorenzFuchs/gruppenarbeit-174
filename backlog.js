let allTasks = [];
let activeTasks = [];


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
    <img onclick="editTask('${i}')" class="icons" src="img/pen.png" alt="pen">
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
    let element = document.getElementById(`id${i}`);
    element.classList.add("d-none");
    allTasks.splice(i, 1);
    backend.setItem('tasks', JSON.stringify(allTasks));
}



function feedbackSnackbar() {       // w3 Snackbar / Toast
    let toast = document.getElementById(`snackbar`);
    toast.className = "show";
    setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 2000);
}


function editTask(i) {              // save after edit
    let title = allTasks[i]['title'];
    let category = document.getElementById(`category${i}`).innerHTML;
    let description = document.getElementById(`description${i}`).innerHTML;
    let date = allTasks[i]['date'];
    let urgency = allTasks[i]['urgency'];
    let asignedto = document.getElementById(`name${i}`).innerHTML;
   

    let task = {

        'title': title,
        'category': category,
        'description': description,
        'date': date,
        'urgency': urgency,
        'asignedto': asignedto

    }
   
    allTasks.splice(i, 1, task);
    backend.setItem('tasks', JSON.stringify(allTasks));     
    AddTicket();
    
}

/*
// Get text content
var text = elem.textContent;
*/
//onclick= onblur="activeTask('${i}')" onblur="myFunction() onblur="activeTask('${i}')"