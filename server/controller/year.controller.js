import prisma from '../prismaClient.js';

export const createYearLevel = async (req, res, next) => {
    const { yearlevelType } = req.body;

    // Validate input
    if (!yearlevelType) {
        return res.status(400).json({ error: 'Year level type is required!' });
    }

    try {
        // Check if the year level type already exists
        const existingYearlevelType = await prisma.yearLevelType.findFirst({
            where: {
                year_level_type: yearlevelType,
            },
        });

        // If it exists, return an error
        if (existingYearlevelType) {
            return res.status(400).json({ error: 'Year level already exists!' });
        }

        // Create a new year level
        const newYearLevel = await prisma.yearLevelType.create({
            data: {
                year_level_type: yearlevelType,
            },
        });

        // Return success response
        res.status(201).json({
            message: 'Year level created successfully',
            yearLevel: newYearLevel,
        });
        
    } catch (error) {
        console.error('Error creating year level:', error);
        next(error);
    }
};

export const updateyearLevel = async (req, res, next) => {
    const { yearlevelType } = req.body;
    const { yearlevelId } = req.params;
    
    if (!yearlevelType) return res.status(400).json({ error: 'Year level type is required!' });
    
    try {
        // Fetch the existing year level by ID
        const existingYearLevel = await prisma.yearLevelType.findFirst({
            where: {
                year_level_id: Number(yearlevelId),
            },
        });
     
        if (!existingYearLevel) return res.status(404).json({ error: 'Year level not found!' });

        // If the new yearlevelType is the same as the existing one, return without updating
        if (existingYearLevel.year_level_type === yearlevelType) return res.status(204).json();
        

        // Check if another year level with the same type already exists
        const duplicateYearLevel = await prisma.yearLevelType.findFirst({
            where: {
                year_level_type: yearlevelType,
                NOT: { year_level_id: Number(yearlevelId) },
            },
        });

        if (duplicateYearLevel) return res.status(400).json({ error: `Year level type '${yearlevelType}' already exists!` });
        

        // Proceed with the update if changes are detected and no duplicate is found
        const updatedYearLevel = await prisma.yearLevelType.update({
            where: {
                year_level_id: Number(yearlevelId),
            },
            data: {
                year_level_type: yearlevelType,
            },
        });

        res.status(200).json({
            message: 'Year level updated successfully',
            yearLevel: updatedYearLevel,
        });

    } catch (error) {
        console.error('Error updating year level type:', error);
        next(error);
    }
};

export const getAllYearLevels = async (req, res, next) => {
    try {
        const yearLevels = await prisma.yearLevelType.findMany();
        if (yearLevels.length === 0) return res.status(404).json({ message: 'No year levels found.' });

        res.status(200).json({
            message: 'Year levels retrieved successfully',
            yearLevels,
        });
    } catch (error) {
        console.error('Error retrieving year levels:', error);
        next(error);
    }
};