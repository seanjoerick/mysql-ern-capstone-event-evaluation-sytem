/*
  Warnings:

  - You are about to alter the column `status` on the `tbl_events` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `tbl_events` MODIFY `status` ENUM('active', 'completed', 'cancelled') NOT NULL DEFAULT 'active';
