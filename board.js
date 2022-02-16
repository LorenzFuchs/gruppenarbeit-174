let Tasks = [{
    'id': 0,
    'title': 'Test0',
    'category': 'toDo'
}, {
    'id': 1,
    'title': 'Test1',
    'category': 'toDo'
}, {
    'id': 2,
    'title': 'Test2',
    'category': 'toDo'
}];

let currentDraggedElement;

function updateHTML() {
    let todo = Tasks.filter(t => t['category'] == 'toDo');

    document.getElementById('toDo').innerHTML = '';

    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        document.getElementById('toDo').innerHTML += generateTodoHTML(element);
    }

    let inprogress = Tasks.filter(t => t['category'] == 'inProgress');

    document.getElementById('inProgress').innerHTML = '';

    for (let i = 0; i < inprogress.length; i++) {
        const element = inprogress[i];
        document.getElementById('inProgress').innerHTML += generateTodoHTML(element);
    }

    let testing = Tasks.filter(t => t['category'] == 'testing');

    document.getElementById('testing').innerHTML = '';

    for (let i = 0; i < testing.length; i++) {
        const element = testing[i];
        document.getElementById('testing').innerHTML += generateTodoHTML(element);
    }

    let done = Tasks.filter(t => t['category'] == 'done');

    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += generateTodoHTML(element);
    }

}

function startDragging(id) {
    currentDraggedElement = id;
}

function generateTodoHTML(element) {
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="openTask">${element['title']}</div>`;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    Tasks[currentDraggedElement]['category'] = category;
    updateHTML();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}