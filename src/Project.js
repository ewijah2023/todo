export { Project };
import { Task } from "./Task.js";

class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(title){
    const index = this.tasks.findIndex(task => task.title === title);
     if (index === -1) return;
    this.tasks.splice(index, 1);
  }

    findTask(title) {
    return  this.tasks.find(task => {
      return task.title === title;
    })
  }

    static fromJSON(data) {
    const project = new Project(data.name);
    project.tasks = data.tasks.map(taskData => Task.fromJSON(taskData));
    return project;
  }


}