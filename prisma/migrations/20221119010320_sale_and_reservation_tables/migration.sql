-- CreateTable
CREATE TABLE "Sale" (
    "id" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "ticketAmount" INTEGER NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "seats" JSONB NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);
