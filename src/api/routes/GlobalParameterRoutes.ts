import { Router } from "express";
import { RoomResource } from "../resources/RoomResource";
import { authenticationFilter } from "../infra/AuthenticationFilter";
import { GlobalParameterResource } from "../resources/GlobalParameterResource";

export const globalParameterRoutes = Router();

const baseUrl = "/parameter";

globalParameterRoutes.get(baseUrl, authenticationFilter, GlobalParameterResource.list);
