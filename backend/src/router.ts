import { Router } from "express";
import { DeliveryController } from "./controllers/DeliveryController";

const routes = Router();

const deliveryController = new DeliveryController();

routes.get("/get", deliveryController.getAll);
routes.get("/get/:id", deliveryController.getById);

export default routes;
