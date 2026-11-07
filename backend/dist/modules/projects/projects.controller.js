export class ProjectsController {
    services;
    constructor(projectServices) {
        this.services = projectServices;
    }
    createProject = async () => {
        const response = await this.services.createProject();
    };
}
