-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "usertype" INTEGER NOT NULL DEFAULT 0,
    "state" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

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
    "state" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
