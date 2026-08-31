export { renderProjectList }

const sidebar = document.querySelector("#sidebar");
const mainContent = document.querySelector("#main-content");

function renderProjectList(manager, container) {
    container.innerHTML = "";
    const projects = manager.getAllProjects();
    for (let i = 0; i < projects.length; i++) {
        const listItem = document.createElement("li");
        listItem.textContent = projects[i].name;
        container.appendChild(listItem);

    }

}