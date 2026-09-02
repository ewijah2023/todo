import "./styles.css";
import { format } from "date-fns";
import { ProjectManager } from "./ProjectManager.js";
import  { Task } from "./Task.js";
import { Project } from "./Project.js";
import { loadFromStorage, saveToStorage } from "./storage.js";
import { renderProjectList, renderTaskList, selectProject, showProjectDialog, initProjectDialog, initTaskDialog, taskList } from "./DOM.js";


const manager = loadFromStorage();
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("main-content");


renderProjectList(manager, sidebar, taskList);

const firstProject = manager.getAllProjects()[0];

initProjectDialog(manager);
initTaskDialog(manager);



const guitar = new Project("Guitar");
manager.addProject(guitar);


console.log(manager);
console.log(manager.getAllProjects());


