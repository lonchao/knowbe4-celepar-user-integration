/*
  Warnings:

  - You are about to drop the `celepar_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `knowbe4_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "celepar_user";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "knowbe4_user";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "celepar_users" (
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

-- CreateTable
CREATE TABLE "knowbe4_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "mobilePhoneNumber" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "employeeNumber" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "managerDisplayName" TEXT NOT NULL,
    "managerEmail" TEXT NOT NULL
);
