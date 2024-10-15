import prisma from "../prismaClient.js";

//Tesda
export const createTesda = async (req, res, next) => {
    const { course_name } = req.body;

    // Validate input
    if (!course_name) return res.status(400).json({ error: 'Course name is required!' });
    
    try {
        // Check if the course already exists
        const existingCourse = await prisma.tesdaCourse.findFirst({
            where: {
                course_name,
            },
        });

        // If it exists, return an error
        if (existingCourse) return res.status(400).json({ error: 'Course already exists!' });

        // Create a new course
        const newCourse = await prisma.tesdaCourse.create({
            data: {
                course_name,
            },
        });

        // Return success response
        res.status(201).json({
            message: 'Tesda Course created successfully',
            Course: newCourse,
        });
        
    } catch (error) {
        console.error('Error creating course:', error);
        next(error);
    }
};

export const updateTesda = async (req, res, next) => {
    const { course_name } = req.body;
    const { courseId } = req.params;

    // Validate input
    if (!course_name) return res.status(400).json({ error: 'Course name is required!' });

    try {
        // Fetch the existing course by ID
        const existingTesda = await prisma.tesdaCourse.findFirst({
            where: {
                tesda_course_id: Number(courseId),
            },
        });

        if (!existingTesda) return res.status(404).json({ error: 'Course not found!' });
        

        // If the new course_name is the same as the existing one, return without updating
        if (existingTesda.course_name === course_name) return res.status(204).json(); 
        

        // Check for duplicate course name
        const duplicateTesda = await prisma.tesdaCourse.findFirst({
            where: {
                course_name: course_name,
            },
        });

        if (duplicateTesda && duplicateTesda.tesda_course_id !== existingTesda.tesda_course_id) return res.status(400).json({ error: `Course '${course_name}' already exists!` });
        

        // Proceed with the update
        const updatedTesda = await prisma.tesdaCourse.update({
            where: {
                tesda_course_id: Number(courseId),
            },
            data: {
                course_name,
            },
        });

        res.status(200).json({
            message: 'Course updated successfully',
            course: updatedTesda,
        });

    } catch (error) {
        console.error('Error updating course:', error);
        next(error);
    }
};

export const getAllTesda = async (req, res, next) => {
    try {
        const tesdaCourses = await prisma.tesdaCourse.findMany();

        // Check if any courses were found
        if (tesdaCourses.length === 0)return res.status(404).json({ message: 'No TESDA courses found.' });
        

        res.status(200).json({
            message: 'TESDA Courses retrieved successfully',
            courses: tesdaCourses, 
        });
    } catch (error) {
        console.error('Error retrieving TESDA Courses:', error);
        next(error);
    }
};


//Courses
export const createCourse = async (req, res, next) => {
    const { course_name } = req.body;

    // Validate input
    if (!course_name) return res.status(400).json({ error: 'Course name is required!' });
    
    try {
        // Check if the course already exists
        const existingCourse = await prisma.course.findFirst({
            where: {
                course_name,
            },
        });

        // If it exists, return an error
        if (existingCourse) return res.status(400).json({ error: 'Course already exists!' });

        // Create a new course
        const newCourse = await prisma.course.create({
            data: {
                course_name,
            },
        });

        // Return success response
        res.status(201).json({
            message: 'Course created successfully',
            Course: newCourse,
        });
        
    } catch (error) {
        console.error('Error creating course:', error);
        next(error);
    }
};

export const updateCourse = async (req, res, next) => {
    const { course_name } = req.body;
    const { courseId } = req.params;

    // Validate input
    if (!course_name) return res.status(400).json({ error: 'Course name is required!' });

    try {
        // Fetch the existing course by ID
        const existingCourse = await prisma.course.findFirst({
            where: {
                course_id: Number(courseId),
            },
        });

        if (!existingCourse) return res.status(404).json({ error: 'Course not found!' });
        

        // If the new course_name is the same as the existing one, return without updating
        if (existingCourse.course_name === course_name) return res.status(204).json(); 
        

        // Check for duplicate course name
        const duplicateCourse = await prisma.course.findFirst({
            where: {
                course_name: course_name,
            },
        });

        if (duplicateCourse && duplicateCourse.course_id !== existingCourse.course_id) return res.status(400).json({ error: `Course '${course_name}' already exists!` });
    
        // Proceed with the update
        const updateCourse = await prisma.course.update({
            where: {
                course_id: Number(courseId),
            },
            data: {
                course_name,
            },
        });

        res.status(200).json({
            message: 'Course updated successfully',
            course: updateCourse,
        });

    } catch (error) {
        console.error('Error updating course:', error);
        next(error);
    }
};

export const getAllCourse = async (req, res, next) => {
    try {
        const Courses = await prisma.course.findMany();

        // Check if any courses were found
        if (Courses.length === 0)return res.status(404).json({ message: 'No Courses found.' });
        

        res.status(200).json({
            message: 'Courses retrieved successfully',
            courses: Courses, 
        });
    } catch (error) {
        console.error('Error retrieving Courses:', error);
        next(error);
    }
};
