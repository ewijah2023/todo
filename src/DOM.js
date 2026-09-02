export { renderProjectList, renderTaskList, selectProject, showProjectDialog, initProjectDialog, initTaskDialog, taskList, initManager }
import { ProjectManager } from "./ProjectManager.js";
import { Project } from "./Project.js";
import { saveToStorage } from "./storage.js";
import { Task } from "./Task.js";

const sidebar = document.querySelector("#sidebar");
const mainContent = document.querySelector("#main-content");
const projectDialog = document.querySelector("#add-project-dialog");
const projectForm = document.querySelector("#add-project-form");
const newProjectBtn = document.querySelector("#new-project-btn");
const cancelProjectBtn = document.querySelector("#cancel-project-btn");
const newTaskBtn = document.querySelector("#new-task-btn");
const taskList = document.querySelector("#task-list");
let currentProject = null;
let currentManager = null;

function initManager(manager) {
    currentManager = manager;
}

function renderProjectList(manager, container, taskContainer) {
    container.innerHTML = "";
    const projects = manager.getAllProjects();
    for (let i = 0; i < projects.length; i++) {
        const listItem = document.createElement("li");
        listItem.textContent = projects[i].name;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            manager.removeProject(projects[i].name);
            saveToStorage(currentManager)

            if (currentProject === projects[i]) {
                currentProject = null;
                taskContainer.innerHTML = "";
                newTaskBtn.disabled = true;
            }

            renderProjectList(manager, container, taskContainer);
        });

        listItem.appendChild(deleteBtn);
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
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        
        deleteBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            project.removeTask(tasks[i].title);
            saveToStorage(currentManager)
            renderTaskList(project, container);
        });

        listItem.appendChild(deleteBtn);
        container.appendChild(listItem);

    }

}

function selectProject(project, taskContainer) {
    currentProject = project;
    renderTaskList(project, taskContainer);
    newTaskBtn.disabled = false;
}

function showProjectDialog() {
    projectDialog.showModal();
 }

 function hideProjectDialog() {
    projectDialog.close();
 }

 function hideTaskDialog() {
    const taskDialog = document.querySelector("#add-task-dialog");
    taskDialog.close();
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
            renderProjectList(manager, sidebar, taskList);
            nameInput.value = "";
            hideProjectDialog();
        });
}

function initTaskDialog(manager) {
    const taskDialog = document.querySelector("#add-task-dialog");
    const taskForm = document.querySelector("#add-task-form");
    const cancelTaskBtn = document.querySelector("#cancel-task-btn");

    newTaskBtn.addEventListener("click" , () => {
        if (!currentProject) {
            alert("Select a project first.");
            return;
        }
        taskDialog.showModal();
    });

    cancelTaskBtn.addEventListener("click", () => {
        hideTaskDialog();
    });
    
    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const titleInput = document.querySelector("#task-title");
        const descriptionInput = document.querySelector("#task-description");
        const dueDate = document.querySelector("#task-due-date");
        const taskPriority = document.querySelector("#task-priority");
        
        const task = new Task(
            titleInput.value,
            descriptionInput.value,
            dueDate.value,
            taskPriority.value
        );
        currentProject.addTask(task);
        saveToStorage(manager);
        renderTaskList(currentProject, taskList)

        titleInput.value = "";
        descriptionInput.value = "";
        dueDate.value = "";
        hideTaskDialog();
        });

}



