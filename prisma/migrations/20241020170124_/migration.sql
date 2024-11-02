/*
  Warnings:

  - You are about to drop the column `employeeId` on the `Company` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_employeeId_fkey";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "employeeId";
