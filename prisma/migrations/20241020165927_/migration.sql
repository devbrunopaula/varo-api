/*
  Warnings:

  - You are about to drop the column `companyId` on the `Employee` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_companyId_fkey";

-- DropIndex
DROP INDEX "Employee_companyId_key";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "employeeId" TEXT;

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "companyId";

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
