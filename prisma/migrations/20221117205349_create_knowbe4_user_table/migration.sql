-- CreateTable
CREATE TABLE "knowbe4_user" (
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
