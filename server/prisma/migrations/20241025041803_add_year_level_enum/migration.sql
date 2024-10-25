/*
  Warnings:

  - You are about to drop the column `year_level_id` on the `tbl_students` table. All the data in the column will be lost.
  - You are about to drop the `tbl_year_level_type` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `year_level_type` to the `tbl_students` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tbl_students` DROP FOREIGN KEY `tbl_students_year_level_id_fkey`;

-- AlterTable
ALTER TABLE `tbl_students` DROP COLUMN `year_level_id`,
    ADD COLUMN `year_level_type` ENUM('COLLEGE', 'TESDA', 'SENIOR_HIGH') NOT NULL;

-- DropTable
DROP TABLE `tbl_year_level_type`;
