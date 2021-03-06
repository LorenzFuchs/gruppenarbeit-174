async function init() {
    await downloadFromServer();
    activeTasks = JSON.parse(backend.getItem('activeTasks')) || [];
    console.log(activeTasks);
    updateHTML();

}

let currentDraggedElement;

function updateHTML() {
    let todo = activeTasks.filter(t => t['status'] == 'toDo');

    document.getElementById('toDo').innerHTML = '';

    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        document.getElementById('toDo').innerHTML += generateTodoHTML(element);
    }

    let inprogress = activeTasks.filter(t => t['status'] == 'inProgress');

    document.getElementById('inProgress').innerHTML = '';

    for (let i = 0; i < inprogress.length; i++) {
        const element = inprogress[i];
        document.getElementById('inProgress').innerHTML += generateTodoHTML(element);
    }

    let testing = activeTasks.filter(t => t['status'] == 'testing');

    document.getElementById('testing').innerHTML = '';

    for (let i = 0; i < testing.length; i++) {
        const element = testing[i];
        document.getElementById('testing').innerHTML += generateTodoHTML(element);
    }

    let done = activeTasks.filter(t => t['status'] == 'done');

    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += generateTodoHTML(element);
    }

}

function startDragging(title) {
    let val = title;
    let index = activeTasks.findIndex(function (item, i) {
        return item.title === val
    });


    currentDraggedElement = index;
}

function generateTodoHTML(element) {
    return `
    <div class="test" draggable="true" ondragstart="startDragging('${element['title']}')">
     <div onclick="changeTask('${element['title']}', '${element['status']}', '${element['date']}', '${element['description']}', '${element['category']}', '${element['profil'][0]}', '${element['profil'][1]}', '${element['profil'][2]}')" class="openTask" id="openTask${element['title']}">
      <div class="Title"><b>${element['title']}</b></div>
      <div class="Category">${element['category']}</div>
      <div class="Date">${element['date']}</div>
      <div><img class="me1" src="${element['profil'][0]}"></div>
     </div>
     <div class="deletediv"><img onclick="deleteTask('${element['title']}')" class="trash" src="img/trash.png"></div>
     </div>`;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    activeTasks[currentDraggedElement]['status'] = status;
    updateHTML();
    backend.setItem('activeTasks', JSON.stringify(activeTasks));
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

function deleteTask(title) {
    let val = title;
    let index = activeTasks.findIndex(function (item, i) {
        return item.title === val
    });
    activeTasks.splice(index, 1);
    backend.setItem('activeTasks', JSON.stringify(activeTasks));
    updateHTML();
}

function changeTask(title, status, date, description, category, picture, name, mail) {

    let checkIfIdExist = document.getElementById('changeText');
    if (checkIfIdExist) {
        IfIdExist(title, status, date, description, category, picture, name, mail);
    } else {
        IfIdNotExist(title, status, date, description, category, picture, name, mail);
    }

}

function IfIdExist(title, status, date, description, category, picture, name, mail) {

    document.getElementById('changeText').remove();
    let val = title;
    let index = activeTasks.findIndex(function (item, i) {
        return item.title === val
    });
    document.getElementById('wholestatusofTask').innerHTML += `
    <div id="changeText" class="changeText">
     <div class="inputfields">
      <input minlength="2" maxlength="20" id="Title_${title}" type="text" placeholder="Title">
      <select id="category_${category}">
          <option>Marketing</option>
          <option>Design</option>
          <option>Sales</option>
          <option>Operations</option>
          </select>
      <input type="date" name="" id="date_${date}">
      <textarea placeholder="Description" type="text" id="description_${description}"></textarea>
      <button onclick="changeInput('${title}', '${status}', 'Title_${title}', 'date_${date}', 'description_${description}', 'category_${category}', '${picture}', '${name}', '${mail}')">??ndern</button>
     </div>
    </div>`;
    document.getElementById(`Title_${title}`).value = activeTasks[index]['title'];
    document.getElementById(`category_${category}`).value = activeTasks[index]['category'];
    document.getElementById(`date_${date}`).value = activeTasks[index]['date'];
    document.getElementById(`description_${description}`).value = activeTasks[index]['description'];
}

function IfIdNotExist(title, status, date, description, category, picture, name, mail) {
    let val = title;
    let index = activeTasks.findIndex(function (item, i) {
        return item.title === val
    });
    document.getElementById('wholestatusofTask').innerHTML += `
        <div id="changeText" class="changeText">
         <div class="inputfields">
         <input minlength="2" maxlength="20" id="Title_${title}" type="text" placeholder="Title">
          <select id="category_${category}">
          <option>Marketing</option>
          <option>Design</option>
          <option>Sales</option>
          <option>Operations</option>
          </select>
          <input type="date" name="" id="date_${date}">
          <textarea placeholder="Description" type="text" id="description_${description}"></textarea>
          <button onclick="changeInput('${title}', '${status}', 'Title_${title}', 'date_${date}', 'description_${description}', 'category_${category}', '${picture}', '${name}', '${mail}')">??ndern</button>
         </div>
        </div>`;
    document.getElementById(`Title_${title}`).value = activeTasks[index]['title'];
    document.getElementById(`category_${category}`).value = activeTasks[index]['category'];
    document.getElementById(`date_${date}`).value = activeTasks[index]['date'];
    document.getElementById(`description_${description}`).value = activeTasks[index]['description'];
}

function changeInput(title, status, idOfTitle, idOfDate, idOfDescription, idOfCategory, picture, name, mail) {

    let val = title;
    let index = activeTasks.findIndex(function (item, i) {
        return item.title === val
    });
    let title1 = document.getElementById(idOfTitle).value;
    let category1 = document.getElementById(idOfCategory).value;
    let date = document.getElementById(idOfDate).value;
    let description = document.getElementById(idOfDescription).value;
    let task = {

        'title': title1,
        'date': date,
        'category': category1,
        'description': description,
        'status': status,
        'profil': [picture, name, mail],
    }
    activeTasks.splice(index, 1, task);
    backend.setItem('activeTasks', JSON.stringify(activeTasks));
    updateHTML();
    document.getElementById('changeText').remove();
}
