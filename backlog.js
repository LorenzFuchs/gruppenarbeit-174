let allTasks =[];
let users = [];
let activeTask =[];

/*
async function loadAllTasks(){
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('tasks')) || [];

}
*/

function addUser() {
    users.push('Klaus');
    backend.setItem('users', JSON.stringify(users));
}

async function init() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('tasks')) || [];
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
*/