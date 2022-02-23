let allTasks = [];
let activeTask = [];


/*
async function loadAllTasks(){
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('tasks')) || [];

}
*/

function addUser() {
    var stringified = (`{["\"title\": mus,", "\"category\": what,", "\"description\": something,", "\"date\": yesterday,", "\"agency\": lol,", "\"profil\": 'img/profil/profil4.jpg'"]
}`);
    var parsedObj = JSON.parse(stringified);
    console.log(parsedObj);
    // users.push('Klaus');
    //backend.setItem('users', JSON.stringify(users));
    console.log(tasks);
}

async function init() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('tasks')) || [];
    console.log(allTasks);
    AddTicket();
}
 
function AddTicket() {
    for (let i = 0; i < allTasks.length; i++) {
        task = allTasks[i];
        console.log(task);
        debugger
    
    document.getElementById('ticket-wrapper').innerHTML = `
    <div class="ticket b-l-orange">
    <div class="left-container">
    <img src="${allTasks[i][0]['profil']}" class="ticket-img">
    <div class="name-mail">
        <p>Gus K. Medina</p>
        <a href="#">gusmedina@gmail.com</a>
    </div>
</div>
    <div class="ticket-category">Marketing</div>
    <div class="ticket-details">
        <p>${allTasks[i][0]['description']} </p>
    </div>
</div>`
;
}
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