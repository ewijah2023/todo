import "./styles.css";
import { format } from "date-fns";

class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;

    }

    formattedDate() {
        return format(this.dueDate, "MM/dd/yyyy");
    }
    toggleComplete() {
        this.completed = !this.completed;
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
        this.name = name,
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

webDev.addTask(task1);
webDev.addTask(task2);
console.log(webDev);
console.log(webDev.tasks);

const foundTask = webDev.findTask("Study JavaScript");
console.log(foundTask);



