import { BaseCrudRepository } from "../BaseCrudRepository";
import { Movie, Room, Session } from "@prisma/client";
import { prisma } from "../../../prisma";
import { NolanError } from "../../error/NolanError";
import { ErrorMessage } from "../../error/ErrorMessage";
import { CreateSessionType, NewReservationType, UpdateSessionType } from "../../domain/session/SessionSchema";
import { RoomRepository } from "../room/RoomRepository";
import { MovieRepository } from "../movie/MovieRepository";

const roomRepository = new RoomRepository();
const movieRepository = new MovieRepository();

export class SessionRepository implements BaseCrudRepository<Session> {
    async list(): Promise<Session[]> {
        const result: Session[] = await prisma.session.findMany({ orderBy:{ time: 'asc'} });

        return result;
    }

    async searchById(id: string): Promise<Session> {
        const result: Session | null = await prisma.session.findUnique({  where: { id } });

        if (!result) {
            throw new NolanError(ErrorMessage.SESSION_NOT_FOUND);
        }

        return result;
    }

    async searchByRoom(roomNumber: number): Promise<Session[]> {
        const result: Session[] = await prisma.session.findMany({ where: { roomNumber }, orderBy: { time: 'asc'} });

        if (!result) {
            throw new NolanError(ErrorMessage.SESSION_BY_ROOM_NOT_FOUND);
        }

        return result;
    }

    async searchByRoomAndTime(roomNumber: number, time: Date): Promise<any> {
        return prisma.session.findFirst({ where: { roomNumber, time } });
    }

    async searchByMovieName(movieName: string): Promise<Session[]> {
        console.log(movieName);
        return prisma.session.findMany({ where: { movieName }, orderBy: { time: 'asc'} });
    }

    async create({ roomNumber, sits, time, movieId, movieName }: CreateSessionType): Promise<Session> {
        const room: Room | null = await roomRepository.searchByNumber(roomNumber);

        if (!room) {
            throw new NolanError(ErrorMessage.ROOM_NOT_FOUND);
        }

        const movie: Movie = await movieRepository.searchById(movieId);

        if (!movie) {
            throw new NolanError(ErrorMessage.MOVIE_NOT_FOUND);
        }

        if (movie.name !== movieName) {
            throw new NolanError(ErrorMessage.MOVIE_WRONG_NAME);
        }

        const session: Session | null = await this.searchByRoomAndTime(roomNumber, time);

        if (session) {
            throw new NolanError(ErrorMessage.SESSION_IN_GIVEN_TIME_ALREADY_EXISTS);
        }

        return prisma.session.create({
            data: {
                roomNumber,
                sits,
                time,
                movieId,
                movieName
            },
        });
    }

    async newReservation({sessionId, sits}: NewReservationType ): Promise<any> {
        const session = await this.searchById(sessionId);

        sits.forEach(sit => session.sits.push(sit));

        return prisma.session.update({
            where: { id: sessionId },
            data:{ sits: session.sits }
        })
    }

    async update({ id, roomNumber, sits, time, movieId, movieName }: UpdateSessionType): Promise<Session> {
        const result: Session = await prisma.session.update({
            where: { id },
            data: {
                roomNumber,
                sits,
                time,
                movieId,
                movieName,
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
