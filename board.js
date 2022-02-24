async function init() {
    await downloadFromServer();
    activeTasks = JSON.parse(backend.getItem('activeTasks')) || [];
    console.log(activeTasks);
    updateHTML();
    
}

let currentDraggedElement;

function updateHTML() {
    let todo = activeTasks.filter(t => t['category'] == 'toDo');

    document.getElementById('toDo').innerHTML = '';

    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        document.getElementById('toDo').innerHTML += generateTodoHTML(element);
    }

    let inprogress = activeTasks.filter(t => t['category'] == 'inProgress');

    document.getElementById('inProgress').innerHTML = '';

    for (let i = 0; i < inprogress.length; i++) {
        const element = inprogress[i];
        document.getElementById('inProgress').innerHTML += generateTodoHTML(element);
    }

    let testing = activeTasks.filter(t => t['category'] == 'testing');

    document.getElementById('testing').innerHTML = '';

    for (let i = 0; i < testing.length; i++) {
        const element = testing[i];
        document.getElementById('testing').innerHTML += generateTodoHTML(element);
    }

    let done = activeTasks.filter(t => t['category'] == 'done');

    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += generateTodoHTML(element);
    }

}

function startDragging(title) {
    var val = title;
    var index = activeTasks.findIndex(function (item, i) {
        return item.title === val
    });


    currentDraggedElement = index;
}

function generateTodoHTML(element) {
    return `
    <div>
     <div  onclick="changeTask('${element['title']}', '${element['Status']}')" draggable="true" ondragstart="startDragging('${element['title']}')" class="openTask">
      <div>${element['title']}</div>
      <div>${element['urgency']}</div>
      <div><img class="me1" src="${element['Image']}"></div>
     </div>
     <div><img onclick="deleteTask('${element['Title']}')" class="trash" src="img/trash.png"></div>
     </div>`;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    activeTasks[currentDraggedElement]['category'] = category;
    updateHTML();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

