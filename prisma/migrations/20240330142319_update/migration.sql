/*
  Warnings:

  - You are about to drop the column `needPasswordChange` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "needPasswordChange",
DROP COLUMN "role",
DROP COLUMN "status";
