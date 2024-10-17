import prisma from "../prismaClient.js";
import { sendReminderEmail } from '../mailer.js'; 

export const createEvent = async (req, res, next) => {
    const { event_title, event_description, start_date, end_date } = req.body;
    const admin = req.user.id;

    // Validate input fields
    if (!event_title || !event_description || !start_date || !end_date) 
        return res.status(400).json({ error: 'Event title, description, start date, and end date are required' });
    
    try {
        // Check for existing events with overlapping dates
        const existingEvent = await prisma.event.findFirst({
            where: {
                event_title: event_title,
                OR: [
                    {
                        start_date: {
                            lte: new Date(end_date),
                        },
                        end_date: {
                            gte: new Date(start_date),
                        },
                    },
                ],
            },
        });

        if (existingEvent) 
            return res.status(400).json({ error: 'An event with overlapping dates and the same title already exists.' });
        
        // Create a new event
        const newEvent = await prisma.event.create({
            data: {
                admin_id: admin,
                event_title,
                event_description,
                start_date: new Date(start_date),
                end_date: new Date(end_date),
            },
        });

        // Fetch student emails
        const students = await prisma.user.findMany({
            where: {
                role: 'student',
            },
            select: {
                email: true,
            },
        });

        // Send reminder emails to students with only the start date
        for (const student of students) {
            await sendReminderEmail(student.email, event_title, newEvent.start_date);
        }

        return res.status(201).json({
            message: `Event ${event_title} created successfully`,
            event: newEvent,
        });

    } catch (error) {
        console.error('Error creating event:', error);
        next(error);
    }
};

export const getAllEvent = async (req, res, next) => {
    try {
        // Fetch all events from the database
        const events = await prisma.event.findMany();

        // If no events were found, return a 404 response
        if (events.length === 0) {
            return res.status(404).json({ message: 'No Events found' });
        }

        // Create an array to hold events with admin usernames
        const eventsWithAdmin = await Promise.all(
            events.map(async (event) => {
                // Fetch admin details based on admin_id
                const admin = await prisma.user.findUnique({
                    where: { user_id: event.admin_id },
                    select: { username: true },
                });

                return {
                    ...event,
                    created_by: admin ? admin.username : 'Unknown',
                };
            })
        );

        // Return the retrieved events with admin usernames
        return res.status(200).json({
            message: 'Events retrieved successfully',
            events: eventsWithAdmin,
        });

    } catch (error) {
        // Log the error and pass it to the next middleware
        console.error('Error retrieving Events:', error);
        next(error);
    }
};
