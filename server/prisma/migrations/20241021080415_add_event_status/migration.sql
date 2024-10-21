-- AlterTable
ALTER TABLE `tbl_events` MODIFY `status` ENUM('active', 'ongoing', 'completed', 'cancelled') NOT NULL DEFAULT 'active';
