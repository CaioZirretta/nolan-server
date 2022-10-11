import { movieRoutes } from './MovieRoutes';

export const router = (server: any) => {
	server.use(movieRoutes)
}