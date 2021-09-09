var list = document.getElementById('list');
var btn = document.getElementById('addBtn');
var item = document.getElementById('item');
var taskArr = [];

//create task
btn.addEventListener('click', function () {
  itemValue = item.value;
  if(itemValue != "") {
    taskArr.push({ 'task_name': itemValue });
    console.log(taskArr)
    window.localStorage.setItem("task", JSON.stringify(taskArr));
    item.value = '';
  }
  showtask();
})

// showtask
function showtask() {
  let storeTask = window.localStorage.getItem("task");
  if (storeTask == null) {
    taskArr = [];
  }
  else {
    taskArr = JSON.parse(storeTask);
  }
  let html = '';
  taskArr.forEach((item, index) => {
    taskValue = `<td>${item.task_name}</td>`;
    html += `<tr>
                  <th>${index + 1}</th>
                  ${taskValue}
                  <td><button type="button" onclick="deleteTask(${index})" class="btn btn-danger"><i class="fa fa-trash"></i>Delete</button></td>
              </tr>`;
  });
  list.innerHTML = html;
}

// deleteTask
function deleteTask(index) {
  taskArr.splice(index, 1);
  localStorage.setItem("task", JSON.stringify(taskArr));
  showtask();
}

showtask();

