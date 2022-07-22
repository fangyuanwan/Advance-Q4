



//My Methods
var myObj= {
    //Select TextArea Func
    textSelect: function(){
        document.getElementById('description').select();
    },

//Hide form Method
    hide: function() {
    document.getElementById("form").style.display = "none";
    document.getElementById("show").style.display = "inline-block";

},
//Show Form Method
    show:function(){

    document.getElementById("form").style.display = "block";
    document.getElementById("show").style.display = "none";
    document.getElementById('myDate').valueAsDate = new Date();
    },
    //Removing task method
    removeTask: function () {
    var id = this.getAttribute('id');
    var myTasks = returnToDo();
    myTasks.splice(id, 1);
    localStorage.setItem('myData', JSON.stringify(myTasks));
    document.getElementById('myTasks').innerHTML = '';
    showMyTasks();
    console.log('delete');

}
};
//Checks if there is already data in LocalStorage
function returnToDo(){
    var myTasks = [];
    var myTasksTemp = localStorage.getItem('myData');
    if(myTasksTemp != null){
        myTasks = JSON.parse(myTasksTemp);
    }
    return myTasks;
}
//Class that creates tasks.
function Task(){
    this.name = document.getElementById('name').value;
    this.subject = document.getElementById('subject').value;
    this.date = document.getElementById('myDate').value;
    this.describe = document.getElementById('description').value;
}
//Insert task properties into the HTML
function newTask(x,y,z,o){
    document.getElementById('myTasks').innerHTML +=
        '<div class="col l3 m4 s12 animated zoomIn"> <h4>'+z+  ':</h1>'+
        '<p>'+y+'</p>' +
        '<p>By: '+x+'</p>' +
        '<p>Due: ' +o +'</p>'+
        '<div class="btn red" >Delete</div>'+
    '</div>'
}
//Gets all the objects from the array.
function showMyTasks(){
    var myTasks = returnToDo();
    document.getElementById('myTasks').innerHTML = '';
    for(var i=0;i<myTasks.length;i++){
        newTask(
            myTasks[i].name,
            myTasks[i].describe,
            myTasks[i].subject,
            myTasks[i].date
        );
    }
    var button = document.getElementsByClassName('red');
    for (var j = 0; j < button.length; j++) {
        button[j].addEventListener('click', myObj.removeTask);
        console.log(button[j].addEventListener('click', myObj.removeTask));

    }
}
function addTask(){
	console.log(`addTask called`);
	var name=  document.getElementById("name").value;
    var subject = document.getElementById("subject").value;
    var mydate = document.getElementById("myDate").value;
    var description = document.getElementById("description").value;
    var data = {};
    data.customerID = name;
    data.taskDescription = description;
    data.taskStatus = "Pending";
    data.taskPriority = "Medium";

	// var task_url = 'http://localhost/task/api/task';
	axios.post('http://localhost/task/api/task',
    data,
      {
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://127.0.0.1:5500"
        }
      })
    .then(response => {
   	 
        const added = response.data;
        console.log(`Successfully addedd`, added);
        alert("Added successful.");
        setTimeout(function(){
			window.location.reload();;
			}, 1000);
    })
    .catch(error => console.error(error));
}
function submitInfo(){
    console.log(`data found`, data);
    var myTasks = returnToDo();
    myTasks.push(new Task);
    localStorage.setItem('myData',JSON.stringify(myTasks));
    var name=  document.getElementById("name").value;
    var subject = document.getElementById("subject").value;
    var description = document.getElementById("description").value;
    var data = {};
    data.customerID = name;
    data.taskDescription = description;
    data.taskStatus = "Pending";
    data.subject = subject;
	
	console.log(`data found`, data);
    addTask();
    showMyTasks();
    myObj.hide();
}
showMyTasks();