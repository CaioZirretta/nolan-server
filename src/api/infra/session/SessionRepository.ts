import { BaseCrudRepository } from "../BaseCrudRepository";
import { Movie, Room, Session } from "@prisma/client";
import { prisma } from "../../../prisma";
import { NolanError } from "../../error/NolanError";
import { ErrorMessage } from "../../error/ErrorMessage";
import { CreateSessionType, UpdateSessionType } from "../../domain/session/SessionSchema";
import { RoomRepository } from "../room/RoomRepository";
import { MovieRepository } from "../movie/MovieRepository";

const roomRepository = new RoomRepository();
const movieRepository = new MovieRepository();

export class SessionRepository implements BaseCrudRepository<Session> {
    async list(): Promise<Session[]> {
        const result: Session[] = await prisma.session.findMany();

        if (result.length === 0) {
            throw new NolanError(ErrorMessage.SESSIONS_NOT_FOUND);
        }

        return result;
    }

    async searchById(id: string): Promise<Session> {
        const result: Session | null = await prisma.session.findUnique({
            where: { id },
        });

        if (!result) {
            throw new NolanError(ErrorMessage.SESSION_NOT_FOUND);
        }

        return result;
    }

    async searchByRoom(roomNumber: number): Promise<Session[]> {
        const result: Session[] = await prisma.session.findMany({ where: { roomNumber } });

        if (!result) {
            throw new NolanError(ErrorMessage.SESSION_BY_ROOM_NOT_FOUND);
        }

        return result;
    }

    async searchByRoomAndTime(roomNumber: number, time: Date): Promise<any> {
        return await prisma.session.findFirst({
            where: {
                roomNumber,
                time
            }
        });
    }

    async create({ roomNumber, sits, time, movieId }: CreateSessionType): Promise<Session> {
        const room: Room | null = await roomRepository.searchByNumber(roomNumber);

        if (!room) {
            throw new NolanError(ErrorMessage.ROOM_NOT_FOUND);
        }

        const movie: Movie = await movieRepository.searchById(movieId);

        if (!movie) {
            throw new NolanError(ErrorMessage.MOVIE_NOT_FOUND);
        }

        const session: Session | null = await this.searchByRoomAndTime(roomNumber, time)

        if(session) {
            throw new NolanError(ErrorMessage.SESSION_IN_GIVEN_TIME_ALREADY_EXISTS)
        }

        return prisma.session.create({
            data: {
                roomNumber,
                sits,
                time,
                movieId
            },
        });
    }

    async update({ id, roomNumber, sits, time, movieId }: UpdateSessionType): Promise<Session> {
        const result: Session = await prisma.session.update({
            where: { id },
            data: {
                roomNumber,
                sits,
                time,
                movieId,
                updatedAt: new Date(),
            },
        });

        if (!result) {
            throw new NolanError(ErrorMessage.SESSION_NOT_FOUND);
        }

        return result;
    }

    async delete(id: string): Promise<Session> {
        const result: Session = await prisma.session.delete({ where: { id } });

        if (!result) {
            throw new NolanError(ErrorMessage.MOVIE_NOT_FOUND);
        }

        return result;
    }
}
