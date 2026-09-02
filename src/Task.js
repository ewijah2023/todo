import { format } from "date-fns";
export  { Task };

class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = new Date(`${dueDate}T00:00:00`);
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

  static fromJSON(data) {
    const task = new Task(data.title, data.description, data.dueDate, data.priority);
    task.dueDate = new Date(data.dueDate);
    task.completed = data.completed
    return task;
  }

}