import { Router } from "express";
import { authMiddleware } from "../../middleware/authenticate.js";
import { ProjectsController } from "./projects.controller";
import { ProjectsServices } from "./projects.services";
const router = Router();
const services = new ProjectsServices();
const controller = new ProjectsController(services);
// Create Project
router.post("/", authMiddleware, controller.createProject);
export default router;
