var list = document.getElementById('list');
var btn = document.getElementById('addBtn');
var item = document.getElementById('item');
var taskArr = [];

//create task
btn.addEventListener('click', function () {
  itemValue = item.value;
  if(itemValue != "") {
    taskArr.push({ 'taskName': itemValue, 'completeStatus' : false });
    // console.log(taskArr)
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
    if(item.completeStatus == false) {
      complete = '<td><input type="checkbox" onclick="completeTask('+index+')"></td>';
      taskValue = '<td>'+item.taskName+'</td>';
    }else {
      complete = '<td><input type="checkbox" onclick="completeTask('+index+')" checked></td>';
      taskValue = '<td style="text-decoration: line-through">'+item.taskName+'</td>';
    }
    
    html += `<tr>
                  <th>${index + 1}</th>
                  ${taskValue}
                  ${complete}
                  <td><button type="button" onclick="deleteTask(${index})" class="btn btn-danger"><i class="fa fa-trash"></i>Delete</button></td>
              </tr>`;
  });
  list.innerHTML = html;
}

//completeTask
function completeTask(index) {
  let storeTask = window.localStorage.getItem("task");
  taskArr = JSON.parse(storeTask);
  if(taskArr[index].completeStatus == false){
      taskArr[index].completeStatus = true
  }else{
    taskArr[index].completeStatus = false;
  }

  localStorage.setItem("task", JSON.stringify(taskArr));
  showtask();
}

// deleteTask
function deleteTask(index) {
  taskArr.splice(index, 1);
  localStorage.setItem("task", JSON.stringify(taskArr));
  showtask();
}

showtask();

