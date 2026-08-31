import { ProjectManager } from "./ProjectManager.js";

const STORAGE_KEY = "projectManager";

function saveToStorage(manager) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(manager));
}

function loadFromStorage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return new ProjectManager();
    const data = JSON.parse(saved);
    return ProjectManager.fromJSON(data);
}

export { saveToStorage, loadFromStorage };