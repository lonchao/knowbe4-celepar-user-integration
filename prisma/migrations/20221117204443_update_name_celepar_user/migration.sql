/*
  Warnings:

  - You are about to drop the `CeleparUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CeleparUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "celepar_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountLid" TEXT NOT NULL,
    "accountDn" TEXT NOT NULL,
    "accountCn" TEXT NOT NULL,
    "accountMail" TEXT NOT NULL,
    "accountCpf" TEXT NOT NULL,
    "accountRG" TEXT NOT NULL,
    "accountRgUF" TEXT NOT NULL,
    "accountPhoto" TEXT NOT NULL
);
