-- CreateTable
CREATE TABLE "CeleparUser" (
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
