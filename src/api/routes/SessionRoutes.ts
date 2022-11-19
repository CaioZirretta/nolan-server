import { Router } from "express";

export const sessionRoutes = Router();

const baseUrl = "/session"

sessionRoutes.get(baseUrl);