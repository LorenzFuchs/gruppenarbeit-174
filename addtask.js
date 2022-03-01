let tasks = [];
let checkpoint = [];
let pictures = [];

async function init1() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
}




/**
 * This function is used to put data into a JSON. And to connect with backend.
 */
function createTask() {

    event.preventDefault();                             // stops auto reload of the page onsubmit
    let title = document.getElementById('title');
    let category = document.getElementById('category');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let urgency = document.getElementById('urgency');
    let profil = pictures;

    let task = {
        "title": title.value,
        "category": category.value,
        "description": description.value,
        "date": date.value,
        "urgency": urgency.value,
        "profil": pictures

    };
    if (profil == '') {
        alert('Bitte Profil auswählen');
    } else {

        tasks.push(task);
        backend.setItem('tasks', JSON.stringify(tasks));        //backend connection

        clearForm();
        feedbackSnackbar()
        checkpoint = [];
        pictures = [];
    }
}


function clearForm() {
    title.value = '';
    category.value = '';
    description.value = '';
    date.value = '';
    urgency.value = '';
    document.getElementById('images').innerHTML = '';
    pictures = [];
    checkpoint = [];

}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function showImage(name, mailadress, bild) {
    let information = {
        'Name': name,
        'Mail': mailadress,
        'picture': bild
    };

    if (checkpoint.indexOf(name) !== -1) {
        return false;
    } else {
        document.getElementById('images').innerHTML += `<div><img id="picture" class="me1" src="${bild}"></img>`;
        pictures.push(information);
    }
    checkpoint.push(name);

}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }