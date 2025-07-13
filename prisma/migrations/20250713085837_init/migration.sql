-- CreateTable
CREATE TABLE "GameAttachment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "GameAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameAttachment_gameId_key" ON "GameAttachment"("gameId");

-- AddForeignKey
ALTER TABLE "GameAttachment" ADD CONSTRAINT "GameAttachment_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
