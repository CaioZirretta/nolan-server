-- CreateTable
CREATE TABLE "globalparameters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "globalparameters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "globalparameters_name_key" ON "globalparameters"("name");
