/*
  Warnings:

  - You are about to drop the column `resetToken` on the `tbl_users` table. All the data in the column will be lost.
  - You are about to drop the column `resetTokenExpiry` on the `tbl_users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tbl_users` DROP COLUMN `resetToken`,
    DROP COLUMN `resetTokenExpiry`;
