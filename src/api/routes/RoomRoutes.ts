import { Router } from "express";

export const roomRoutes = Router();

const baseUrl = "/room";

roomRoutes.get(baseUrl);