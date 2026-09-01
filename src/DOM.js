export { renderProjectList, renderTaskList, selectProject, showProjectDialog }
export { initProjectDialog }
import { ProjectManager } from "./ProjectManager.js";
import { Project } from "./Project.js";
import { saveToStorage } from "./storage.js";

const sidebar = document.querySelector("#sidebar");
const mainContent = document.querySelector("#main-content");
const projectDialog = document.querySelector("#add-project-dialog");
const projectForm = document.querySelector("#add-project-form");
const newProjectBtn = document.querySelector("#new-project-btn");
const cancelProjectBtn = document.querySelector("#cancel-project-btn");

let currentProject = null;

function renderProjectList(manager, container, taskContainer) {
    container.innerHTML = "";
    const projects = manager.getAllProjects();
    for (let i = 0; i < projects.length; i++) {
        const listItem = document.createElement("li");
        listItem.textContent = projects[i].name;
        container.appendChild(listItem);
        listItem.addEventListener("click", () => {
            selectProject(projects[i], taskContainer);
        })

    }
}

function renderTaskList(project, container) {
    container.innerHTML = "";
    const tasks = project.tasks;

    for (let i = 0; i < tasks.length; i++) {
        const listItem = document.createElement("li");
        listItem.textContent = ` ${tasks[i].title} - ${tasks[i].formattedDate()};`
        container.appendChild(listItem);

    }

}

function selectProject(project, taskContainer) {
    currentProject = project;
    renderTaskList(project, taskContainer);
}

function showProjectDialog() {
    projectDialog.showModal();
 }

 function hideProjectDialog() {
    projectDialog.close();
 }


 function initProjectDialog(manager) {
        newProjectBtn.addEventListener("click", () => {
            showProjectDialog();
        });

        cancelProjectBtn.addEventListener("click", () => {
            hideProjectDialog();
        });

        
        projectForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const nameInput = document.querySelector("#project-name");
            const project = new Project(nameInput.value)
            manager.addProject(project);
            saveToStorage(manager);
            renderProjectList(manager, sidebar, mainContent);
            nameInput.value = "";
            hideProjectDialog();
        });
}



