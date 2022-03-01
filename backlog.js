let allTasks = [];
let activeTasks = [];


async function init() {         // download files from server
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('tasks')) || [];
    activeTasks = JSON.parse(backend.getItem('activeTasks')) || [];
    console.log(allTasks);
    AddTicket();
}

function AddTicket() {          // display allTask in backlogHTML
    document.getElementById('ticket-wrapper').innerHTML = ``;
        for (let i = 0; i < allTasks.length; i++) {
        task = allTasks[i];
        
        document.getElementById('ticket-wrapper').innerHTML += `
    <div id="id${task['title']}"   class="ticket b-l-${task['category']}">
    <div class="left-container">
    <img src="${task['profil'][0]['picture']}" class="ticket-img">
    <div class="name-mail">
        <p id="name${i}" contentEditable="true">${task['profil'][0]['Name']}</p>
        <a id="mail${i}" contentEditable="true" href="#">${task['profil'][0]['Mail']}</a>
    </div>
</div>
    <div id="category${i}" contentEditable="true" class="ticket-category">${task['category']}</div>
    <div class="ticket-details">
        <p id="description${i}" contentEditable="true">${task['description']} </p>
    </div>
    <div class="column">
    <img onclick="editTask('${i}')" class="icons" src="img/pen.png" alt="pen">
    <img onclick="activeTask('${task['title']}','${task['description']}', '${task['asignedto']}', '${task['category']}', '${task['date']}', '${task['urgency']}')" class="icons" src="img/lunch.png">
    <img onclick="deleteTask('${i}')" class="icons" src="img/save.png">
    </div>
</div>`
            ;
    }
}
//allTasks[0]['profil'].length > 1


function activeTask(title, description, asignedto, category, date, urgency) {             //function to pass on JSON and remove from backlog
    let activeTask = {
        "title": title,
        "category": category,
        "description": description,
        "date": date,
        "urgency": urgency,
        "profil": asignedto,
        'status': 'toDo'
    };
    activeTasks.push(activeTask);
    console.log(activeTasks);
    backend.setItem('activeTasks', JSON.stringify(activeTasks));
    removeTask(title);
    
}

function removeTask(title) {
    feedbackSnackbar();
    let element = document.getElementById(`id${title}`);
    element.classList.add("d-none");
    let a = allTasks;
    a.splice(a.findIndex(e => e.title === title), 1);
    backend.setItem('tasks', JSON.stringify(allTasks));
}


function feedbackSnackbar() {       // w3 Snackbar / Toast - visual confirmation on action
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
    
    let profil = [
        allTasks[i]['profil'][0]['Name'],
        allTasks[i]['profil'][0]['Mail'],
        allTasks[i]['profil'][0]['picture'] 
    ];
    // ["allTasks[i]['profil'][0]['Name']", "allTasks[i]['profil'][0]['Mail']", "allTasks[i]['profil'][0]['picture']"]

    let task = {

        'title': title,
        'category': category,
        'description': description,
        'date': date,
        'urgency': urgency,
        "profil": profil

    }
   
    allTasks.splice(i, 1, task);
    backend.setItem('tasks', JSON.stringify(allTasks));     
    AddTicket();
    
}

function deleteTask(i) {
  
    allTasks.splice(i, 1, task);
    backend.setItem('tasks', JSON.stringify(allTasks));     
    AddTicket();
}
/*






var text = elem.textContent;
*/
//onclick= onblur="activeTask('${i}')" onblur="myFunction() onblur="activeTask('${i}')"