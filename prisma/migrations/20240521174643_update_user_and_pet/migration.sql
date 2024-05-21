/*
  Warnings:

  - Added the required column `gender` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `helthStatus` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialNeeds` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "helthStatus" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "specialNeeds" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "needPasswordChange" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "photo" TEXT,
ADD COLUMN     "role" "UserRole" NOT NULL,
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';
