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

let expandedTasks = new Set();
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
        
        if (projects[i] === currentProject) {
            listItem.classList.add("selected");
        }


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
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");

        const titleText = document.createElement("span");
        titleText.textContent = `${tasks[i].title} - ${tasks[i].formattedDate()}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        const isExpanded = expandedTasks.has(tasks[i].title);
  

        listItem.addEventListener("click", () =>{
            if (expandedTasks.has(tasks[i].title)){
                expandedTasks.delete(tasks[i].title);
            } else {
                expandedTasks.add(tasks[i].title);
            }
            renderTaskList(project, container);
        });
        
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.id = `completed-${i}`;
        checkBox.checked = tasks[i].completed;

        const checkBoxLabel = document.createElement("label");
        checkBoxLabel.htmlFor = `completed-${i}`;
        checkBoxLabel.textContent = tasks[i].completed ?  " - Completed" : " - Not completed";

        const prioButton = document.createElement("button");
        prioButton.textContent = `${tasks[i].priority}`

        prioButton.addEventListener("click", (event) => {
            event.stopPropagation();
            tasks[i].changePriority();

            saveToStorage(currentManager)
            renderTaskList(project, container);
        })

        checkBox.addEventListener("click", (event) => {
                event.stopPropagation();
            });

        checkBox.addEventListener("change", (event) => {
            event.stopPropagation();
            tasks[i].toggleComplete();
            saveToStorage(currentManager);
             renderTaskList(project, container);
        })
        
        deleteBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            project.removeTask(tasks[i].title);
            saveToStorage(currentManager)
            renderTaskList(project, container);
        });

        taskCard.appendChild(titleText);
        taskCard.appendChild(prioButton);
        taskCard.appendChild(checkBoxLabel);
        taskCard.appendChild(checkBox);
        taskCard.appendChild(deleteBtn);



        if (isExpanded) {
            const detailBlock = document.createElement("div");
            detailBlock.classList.add("task-detail");
            detailBlock.textContent = `${tasks[i].description}`;
            taskCard.appendChild(detailBlock);
        }

        listItem.appendChild(taskCard);
        container.appendChild(listItem);

    }

}

function selectProject(project, taskContainer) {
    currentProject = project;
    renderTaskList(project, taskContainer);
    newTaskBtn.disabled = false;
    renderProjectList(currentManager, sidebar, taskContainer);
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




