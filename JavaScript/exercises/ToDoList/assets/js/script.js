
const FORM = document.getElementById('task-form');
const TASKLIST = document.getElementById('tasks');

FORM.onsubmit = function (e) {
  e.preventDefault();

  TASKLIST.style.borderTop = '1px solid black';

  const INPUTFIELD = document.getElementById('task-input');
  addTask(INPUTFIELD.value);
  FORM.reset();
}

function addTask(description) {
  const TASKCONTAINER = document.createElement('div');
  const NEWTASK = document.createElement('input');
  const TASKLABEL = document.createElement('label');
  const TASKDESCRIPTIONODE = document.createTextNode(description);

  NEWTASK.setAttribute('type', 'checkbox');
  NEWTASK.setAttribute('name', description);
  NEWTASK.setAttribute('id', description);

  TASKLABEL.setAttribute('for', description);
  TASKLABEL.appendChild(TASKDESCRIPTIONODE);

  TASKCONTAINER.classList.add('task-item');
  TASKCONTAINER.appendChild(NEWTASK);
  TASKCONTAINER.appendChild(TASKLABEL);

  TASKLIST.appendChild(TASKCONTAINER);
}
