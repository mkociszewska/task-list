angular
    .module('app', []);


angular
    .module('app')
    .controller('TaskListController', TaskListController);


function TaskListController() {

    const vm = this;

    Object.assign(vm, {
        addTask : addTask,
        clearDone: clearDone,
        people : ['Maria', 'Ian', 'Anna', 'Me'], // Setup array with some people
        tasks : [
            {'title':'Learn HTML', person: 'Me', 'done': true },
            {'title':'Master CSS', person: 'Maria', 'done' : true },
            {'title':'Learn JavaScript', person: 'Ian', 'done' : true },
            {'title':'Read about Angular2', person: 'Anna', 'done' : false } // Default array with tasks assigned to people
        ]
    });

    // Add new tasks
    function addTask() {
        vm.tasks.push({
            'title': vm.newTask, person: 'You', 'done': false
        });
        vm.newTask = '';
    }

    // Clear completed tasks
    function clearDone() {
        vm.tasks = vm.tasks.filter(function(task){
            return !task.done
        })
    }
}
