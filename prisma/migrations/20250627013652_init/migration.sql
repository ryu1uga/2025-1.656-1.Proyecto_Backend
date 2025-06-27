-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "GameImage" DROP CONSTRAINT "GameImage_gameId_fkey";

-- DropForeignKey
ALTER TABLE "GameTrailer" DROP CONSTRAINT "GameTrailer_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sell" DROP CONSTRAINT "Sell_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Sell" DROP CONSTRAINT "Sell_userId_fkey";

-- AddForeignKey
ALTER TABLE "Sell" ADD CONSTRAINT "Sell_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sell" ADD CONSTRAINT "Sell_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameImage" ADD CONSTRAINT "GameImage_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameTrailer" ADD CONSTRAINT "GameTrailer_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
