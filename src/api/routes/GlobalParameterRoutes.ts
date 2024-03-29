import { Router } from "express";
import { RoomResource } from "../resources/RoomResource";
import { authenticationFilterLevel0 } from "../infra/AuthenticationFilter";
import { GlobalParameterResource } from "../resources/GlobalParameterResource";

export const globalParameterRoutes = Router();

const baseUrl = "/parameter";

globalParameterRoutes.get(baseUrl, authenticationFilterLevel0, GlobalParameterResource.list);
