export { renderProjectList, renderTaskList, selectProject }

const sidebar = document.querySelector("#sidebar");
const mainContent = document.querySelector("#main-content");
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

