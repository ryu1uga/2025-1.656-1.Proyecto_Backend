-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coments" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "sells" INTEGER NOT NULL,
    "company" TEXT NOT NULL,
    "images_url" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "trailer" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "state" INTEGER NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);
