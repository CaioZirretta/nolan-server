import { RoomRepository } from "../RoomRepository";

export class RoomRepositoryImpl implements RoomRepository {
    create(movie: Room): Promise<any> {
        return Promise.resolve(undefined);
    }

    delete(id: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    list(): Promise<Room[]> {
        return Promise.resolve([]);
    }

    searchById(id: string): Promise<Room> {
        return Promise.resolve(undefined);
    }

    update(movie: Room): Promise<any> {
        return Promise.resolve(undefined);
    }

}