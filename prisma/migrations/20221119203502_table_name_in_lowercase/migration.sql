/*
  Warnings:

  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reservation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_roomNumber_fkey";

-- DropTable
DROP TABLE "Movie";

-- DropTable
DROP TABLE "Reservation";

-- DropTable
DROP TABLE "Room";

-- DropTable
DROP TABLE "Sale";

-- DropTable
DROP TABLE "Session";

-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "sits" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "synopsis_expanded" TEXT NOT NULL,
    "banner" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "roomNumber" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "movieId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales" (
    "id" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "ticketAmount" INTEGER NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservations" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "seats" JSONB NOT NULL,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rooms_number_key" ON "rooms"("number");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_roomNumber_key" ON "sessions"("roomNumber");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_movieId_key" ON "sessions"("movieId");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_roomNumber_fkey" FOREIGN KEY ("roomNumber") REFERENCES "rooms"("number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
