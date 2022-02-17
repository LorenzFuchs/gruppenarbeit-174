let allTasks =[];

async function loadAllTasks(){
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
*/