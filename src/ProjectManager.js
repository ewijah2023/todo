import { Project } from "./Project.js";
export  { ProjectManager };

class ProjectManager {
    constructor() {
        this.projects = [new Project("Default")];
    }

    addProject(project) {
        this.projects.push(project)
    }

    removeProject(name){
        const index = this.projects.findIndex(project => project.name === name);
        if (index === -1) return;
        this.projects.splice(index, 1);
    }

    findProject(name){
        return this.projects.find(project => {
            return project.name === name
        })
    }

      getAllProjects() {
        return this.projects;
       }

       static fromJSON(data) {
        const projectManager = new ProjectManager();
        projectManager.projects = data.projects.map(projectData => Project.fromJSON(projectData));
        return projectManager;
    }

}