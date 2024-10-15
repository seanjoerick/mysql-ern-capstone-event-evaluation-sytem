/*
  Warnings:

  - You are about to drop the column `year_level_id` on the `tbl_courses` table. All the data in the column will be lost.
  - You are about to drop the column `year_level_id` on the `tbl_strand` table. All the data in the column will be lost.
  - You are about to drop the column `year_level_id` on the `tbl_tesda_courses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tbl_courses` DROP COLUMN `year_level_id`;

-- AlterTable
ALTER TABLE `tbl_strand` DROP COLUMN `year_level_id`;

-- AlterTable
ALTER TABLE `tbl_tesda_courses` DROP COLUMN `year_level_id`;
