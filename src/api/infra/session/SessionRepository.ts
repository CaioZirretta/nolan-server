import { BaseCrudRepository } from "../BaseCrudRepository";
import { Movie, Room, Session } from "@prisma/client";
import { prisma } from "../../../prisma";
import { NolanError } from "../../error/NolanError";
import { ErrorMessage } from "../../error/ErrorMessage";
import {
    CreateSessionType,
    NewReservationType,
    UpdateSessionMovieNameType,
    UpdateSessionType
} from "../../domain/session/SessionSchema";
import { RoomRepository } from "../room/RoomRepository";
import { MovieRepository } from "../movie/MovieRepository";
import { ErrorCode } from "../../error/ErrorCode";

const roomRepository: RoomRepository = new RoomRepository();
const movieRepository: MovieRepository = new MovieRepository();

export class SessionRepository implements BaseCrudRepository<Session> {
    async list(): Promise<Session[]> {
        const result: Session[] = await prisma.session.findMany({ orderBy: { time: 'asc' } });

        return result;
    }

    async searchById(id: string): Promise<Session> {
        const result: Session | null = await prisma.session.findUnique({ where: { id } });

        if (!result) {
            throw new NolanError(ErrorMessage.SESSION_NOT_FOUND, ErrorCode.SESSIONS_NOT_FOUND_CODE);
        }

        return result;
    }

    async searchByRoom(roomNumber: number): Promise<Session[]> {
        const result: Session[] = await prisma.session.findMany({ where: { roomNumber }, orderBy: { time: 'asc' } });

        if (!result) {
            throw new NolanError(ErrorMessage.SESSION_BY_ROOM_NOT_FOUND, ErrorCode.SESSION_BY_ROOM_NOT_FOUND_CODE);
        }

        return result;
    }

    async searchByRoomAndTime(roomNumber: number, time: Date): Promise<any> {
        return prisma.session.findFirst({ where: { roomNumber, time } });
    }

    async searchByMovieName(movieName: string): Promise<Session[]> {
        console.log(movieName);
        return prisma.session.findMany({ where: { movieName }, orderBy: { time: 'asc' } });
    }

    async create({ roomNumber, sits, time, movieId, movieName }: CreateSessionType): Promise<Session> {
        const room: Room | null = await roomRepository.searchByNumber(roomNumber);

        if (!room) {
            throw new NolanError(ErrorMessage.ROOM_NOT_FOUND, ErrorCode.ROOM_NOT_FOUND_CODE);
        }

        const movie: Movie = await movieRepository.searchById(movieId);

        if (!movie) {
            throw new NolanError(ErrorMessage.MOVIE_NOT_FOUND, ErrorCode.MOVIE_NOT_FOUND_CODE);
        }

        if (movie.name !== movieName) {
            throw new NolanError(ErrorMessage.MOVIE_WRONG_NAME, ErrorCode.MOVIE_WRONG_NAME_CODE);
        }

        const session: Session | null = await this.searchByRoomAndTime(roomNumber, time);

        if (session) {
            throw new NolanError(ErrorMessage.SESSION_IN_GIVEN_TIME_ALREADY_EXISTS, ErrorCode.SESSION_IN_GIVEN_TIME_ALREADY_EXISTS_CODE);
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

    async newReservation({ sessionId, sits }: NewReservationType): Promise<any> {
        const session = await this.searchById(sessionId);

        session.sits = [...session.sits, ...sits]

        return prisma.session.update({
            where: { id: sessionId },
            data: { sits: session.sits }
        });
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
            throw new NolanError(ErrorMessage.SESSION_NOT_FOUND, ErrorCode.SESSION_NOT_FOUND_CODE);
        }

        return result;
    }

    async updateMovieName({ movieId, movieName }: UpdateSessionMovieNameType): Promise<void> {
        await prisma.session.updateMany({
            where:{
                movieId
            },
            data: {
                movieName
            }
        })
    }

    async delete(id: string): Promise<Session> {
        const result: Session = await prisma.session.delete({ where: { id } });

        if (!result) {
            throw new NolanError(ErrorMessage.MOVIE_NOT_FOUND, ErrorCode.MOVIE_NOT_FOUND_CODE);
        }

        return result;
    }
}
