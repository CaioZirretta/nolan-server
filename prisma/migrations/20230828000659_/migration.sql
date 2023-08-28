/*
  Warnings:

  - A unique constraint covering the columns `[id,name]` on the table `movies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_movieId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "movies_id_name_key" ON "movies"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_key" ON "users"("user");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_movieId_movieName_fkey" FOREIGN KEY ("movieId", "movieName") REFERENCES "movies"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;
