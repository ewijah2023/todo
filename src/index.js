import "./styles.css";
import { format } from "date-fns";

class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = new Date(dueDate);
        this.priority = priority;
        this.completed = false;

    }

    toggleComplete() {
        this.completed = !this.completed;
    }

    formattedDate() {
    return format(this.dueDate, "MM/dd/yyyy");
}

    changePriority() {
        const taskPriority = ["High", "Medium", "Low"];
        let currentIndex = taskPriority.indexOf(this.priority);
        currentIndex = (currentIndex + 1) % taskPriority.length;
        this.priority = taskPriority[currentIndex];
        return this.priority;
        
  }

}

class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(task){
    const index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);
  }

    findTask(title) {
    return  this.tasks.find(task => {
      return task.title === title;
    })
  }

}

class ProjectManager {
    constructor() {
        this.projects = []
    }

    addProject(project) {
        this.projects.push(project)
    }

    removeProject(project){
        const index = this.projects.indexOf(project);
        this.projects.splice(index, 1);
    }

    findProject(name){
        return this.projects.find(project => {
            return project.name === name
        })
    }
}

const manager = new ProjectManager();




const task1 = new Task(
        "Finish Todo App",
        "Finish Odin Webpack Project",
        "2026-09-05",
        "High"
);

const task2 = new Task(
    "Study JavaScript",
    "Practice OOP",
    "2026-09-06",
    "Medium"
);

const webDev = new Project("Web Dev");
const guitar = new Project("Guitar");
manager.addProject(guitar);

const foundProject = manager.findProject("Guitar");
console.log(foundProject);
manager.removeProject(guitar);
console.log(manager.projects);



