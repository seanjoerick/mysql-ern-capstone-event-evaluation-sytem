-- CreateTable
CREATE TABLE `tbl_users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `role` ENUM('admin', 'student') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `tbl_users_username_key`(`username`),
    UNIQUE INDEX `tbl_users_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_students` (
    `student_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `year_level_id` INTEGER NOT NULL,
    `strand_id` INTEGER NULL,
    `course_id` INTEGER NULL,
    `tesda_course_id` INTEGER NULL,

    PRIMARY KEY (`student_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_events` (
    `event_id` INTEGER NOT NULL AUTO_INCREMENT,
    `admin_id` INTEGER NOT NULL,
    `event_title` VARCHAR(191) NOT NULL,
    `event_description` VARCHAR(191) NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`event_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_event_criteria` (
    `criteria_id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_id` INTEGER NOT NULL,
    `criteria_name` VARCHAR(191) NOT NULL,
    `max_score` INTEGER NOT NULL,

    PRIMARY KEY (`criteria_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_evaluations` (
    `evaluation_id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_id` INTEGER NOT NULL,
    `student_id` INTEGER NOT NULL,

    PRIMARY KEY (`evaluation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_evaluation_details` (
    `evaluation_detail_id` INTEGER NOT NULL AUTO_INCREMENT,
    `evaluation_id` INTEGER NOT NULL,
    `criteria_id` INTEGER NOT NULL,
    `score` INTEGER NOT NULL,

    PRIMARY KEY (`evaluation_detail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_year_level_type` (
    `year_level_id` INTEGER NOT NULL AUTO_INCREMENT,
    `year_level_type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`year_level_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_strand` (
    `strand_id` INTEGER NOT NULL AUTO_INCREMENT,
    `strand_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`strand_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_courses` (
    `course_id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`course_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_tesda_courses` (
    `tesda_course_id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`tesda_course_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_students` ADD CONSTRAINT `tbl_students_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tbl_users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_students` ADD CONSTRAINT `tbl_students_year_level_id_fkey` FOREIGN KEY (`year_level_id`) REFERENCES `tbl_year_level_type`(`year_level_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_students` ADD CONSTRAINT `tbl_students_strand_id_fkey` FOREIGN KEY (`strand_id`) REFERENCES `tbl_strand`(`strand_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_students` ADD CONSTRAINT `tbl_students_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `tbl_courses`(`course_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_students` ADD CONSTRAINT `tbl_students_tesda_course_id_fkey` FOREIGN KEY (`tesda_course_id`) REFERENCES `tbl_tesda_courses`(`tesda_course_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_event_criteria` ADD CONSTRAINT `tbl_event_criteria_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `tbl_events`(`event_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_evaluations` ADD CONSTRAINT `tbl_evaluations_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `tbl_events`(`event_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_evaluations` ADD CONSTRAINT `tbl_evaluations_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `tbl_students`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_evaluation_details` ADD CONSTRAINT `tbl_evaluation_details_evaluation_id_fkey` FOREIGN KEY (`evaluation_id`) REFERENCES `tbl_evaluations`(`evaluation_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_evaluation_details` ADD CONSTRAINT `tbl_evaluation_details_criteria_id_fkey` FOREIGN KEY (`criteria_id`) REFERENCES `tbl_event_criteria`(`criteria_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
