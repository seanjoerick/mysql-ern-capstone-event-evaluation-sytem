import prisma from "../prismaClient.js";

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

export const getAllStrand = async (req, res, next) => {
    try {
        const Strand = await prisma.strand.findMany();

        // Check if any courses were found
        if (Strand.length === 0)return res.status(404).json({ message: 'No Strand found.' });
        

        res.status(200).json({
            message: 'Strand retrieved successfully',
            strand: Strand, 
        });
    } catch (error) {
        console.error('Error retrieving Strand:', error);
        next(error);
    }
};