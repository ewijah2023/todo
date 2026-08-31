import "./styles.css";
import { format } from "date-fns";
import { ProjectManager } from "./ProjectManager.js";
import  { Task } from "./Task.js";
import { Project } from "./Project.js";

const projectManager = new ProjectManager();

function loadManager() {
    const saved = localStorage.getItem("projectManager");
    if (saved) {
        const data = JSON.parse(saved);
        return ProjectManager.fromJSON(data);
    }
    return new ProjectManager();

}

const localManager = loadManager();

localStorage.setItem("projects", JSON.stringify(projectManager.projects));





console.log(projectManager);



