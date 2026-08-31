import "./styles.css";
import { format } from "date-fns";
import { ProjectManager } from "./ProjectManager.js";
import  { Task } from "./Task.js";
import { Project } from "./Project.js";
import { loadFromStorage, saveToStorage } from "./storage.js";
import { renderProjectList } from "./DOM.js";


const manager = loadFromStorage();
const sidebar = document.getElementById("sidebar");
let currentProject = null;
renderProjectList(manager, sidebar);




console.log(manager);



