import prisma from "../prismaClient.js";
import { sendReminderEmail } from '../mailer.js'; 

export const createEvent = async (req, res, next) => {
    const { event_title, event_description, start_date, end_date } = req.body;
    const admin = req.user.id;

    // Validate input fields
    if (!event_title || !event_description || !start_date || !end_date) 
        return res.status(400).json({ error: 'Event title, description, start date, and end date are required' });

      // Check that start date is before end date
      if (new Date(start_date) >= new Date(end_date)) return res.status(400).json({ error: 'Start date must be before end date.' });

       // Check that start date is not in the past
    const currentDate = new Date();
    if (new Date(start_date) < currentDate) 
        return res.status(400).json({ error: 'Start date cannot be in the past.' });
    
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

        // Create an array to hold events with admin usernames, excluding admin_id
        const eventsWithAdmin = await Promise.all(
            events.map(async (event) => {
                // Fetch admin details based on admin_id
                const admin = await prisma.user.findUnique({
                    where: { user_id: event.admin_id },
                    select: { username: true },
                });

                // Exclude admin_id
                const { admin_id, ...eventWithoutAdminId } = event;

                return {
                    ...eventWithoutAdminId,
                    created_by: admin ? admin.username : 'Unknown',
                };
            })
        );
        
        const eventCount = events.length;

        return res.status(200).json({
            message: 'Events retrieved successfully',
            count:  eventCount,
            events: eventsWithAdmin,
        });
    } catch (error) {
        console.error('Error retrieving Events:', error);
        next(error);
    }
};

export const updateEvent = async (req, res, next) => {
    const { event_title, event_description, start_date, end_date } = req.body;
    const { eventId } = req.params;

    // Validate input
    if (!event_title) return res.status(400).json({ error: 'Event title is required!' });
    if (!event_description) return res.status(400).json({ error: 'Event description is required!' });
    if (!start_date) return res.status(400).json({ error: 'Event start date is required!' });
    if (!end_date) return res.status(400).json({ error: 'Event end date is required!' });

    try {
        // Fetch the existing event by ID
        const existingEvent = await prisma.event.findFirst({
            where: {
                event_id: Number(eventId),
            },
        });

        if (!existingEvent) return res.status(404).json({ error: 'Event not found!' });

        // If the new title and description are the same as the existing ones, return without updating
        if (
            existingEvent.event_title === event_title &&
            existingEvent.event_description === event_description &&
            existingEvent.start_date.toISOString() === new Date(start_date).toISOString() && 
            existingEvent.end_date.toISOString() === new Date(end_date).toISOString() 
        ) {
            return res.status(200).json({ error: 'No changes made to the event.' }); 
        }

        // Proceed with the update
        const updatedEvent = await prisma.event.update({
            where: {
                event_id: Number(eventId),
            },
            data: {
                event_title,
                event_description,
                start_date: new Date(start_date),
                end_date: new Date(end_date),
            },
        });

        res.status(200).json({
            message: 'Event updated successfully',
            Event: updatedEvent,
        });

    } catch (error) {
        console.error('Error updating event:', error);
        next(error);
    }
};

export const deleteEvent = async (req, res, next) => {
    const { eventId } = req.params;

    try {
        // First, retrieve the event to get the event_title
        const event = await prisma.event.findUnique({
            where: {
                event_id: Number(eventId),
            },
        });

        // If the event doesn't exist, respond with an error
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // First, delete all associated evaluations
        await prisma.evaluation.deleteMany({
            where: {
                event_id: Number(eventId),
            },
        });

        // Delete all associated criteria
        await prisma.eventCriteria.deleteMany({
            where: {
                event_id: Number(eventId),
            },
        });

        // Finally, delete the event
        await prisma.event.delete({
            where: {
                event_id: Number(eventId),
            },
        });

        res.status(200).json({ message: `Event ${event.event_title} deleted successfully` });
    } catch (error) {
        console.error('Error deleting event:', error);
        next(error);
    }
};

export const createEventCriteria = async (req, res, next) => {
    const { eventId } = req.params;
    const { criteria_name, max_score } = req.body;

    // Validate input
    if (!criteria_name || max_score === undefined) {
        return res.status(400).json({ error: 'Criteria name and max score are required!' });
    }

    // Ensure max_score is a number and equals 10
    const maxScore = parseInt(max_score);
    if (isNaN(maxScore) || maxScore !== 10) {
        return res.status(400).json({ error: 'Max score must be exactly 10!' });
    }

    try {
        const existingCriteria = await prisma.eventCriteria.findFirst({
            where: {
                event_id: parseInt(eventId),
                criteria_name: criteria_name,
            },
        });

        if (existingCriteria) {
            return res.status(400).json({ error: `Criteria ${criteria_name} already exists!` });
        }
        
        const newCriteria = await prisma.eventCriteria.create({
            data: {
                event_id: parseInt(eventId),
                criteria_name,
                max_score: maxScore,
            },
        });

        return res.status(201).json({
            message: `Event criteria ${criteria_name} created successfully`,
            criteria: {
                id: newCriteria.criteria_id,
                name: newCriteria.criteria_name,
                max_score: newCriteria.max_score,
                event_id: newCriteria.event_id,
            },
        });
    } catch (error) {
        console.error('Error creating event criteria:', error);
        next(error);
    }
};


export const getAllCriteria = async (req, res, next) => {
    try {
      const eventCriteria = await prisma.eventCriteria.findMany({
        include: {
          event: {
            select: {
              event_title: true,
            },
          },
        },
      });
  
      res.status(200).json({
        message: 'Criteria retrieved successfully',
        Criteria: eventCriteria, 
    });
    } catch (error) {
      console.error('Error retrieving event criteria:', error);
      return next(error);
    }
  };
  
  export const getEventCriteria = async (req, res, next) => {
    const { eventId } = req.params;
    try {
      const eventCriteria = await prisma.eventCriteria.findMany({
        where: { event_id: parseInt(eventId) }, 
        include: {
          event: {
            select: {
              event_title: true,
            },
          },
        },
      });
  
      // Map the criteria to include the desired fields
      const response = eventCriteria.map(criteria => ({
        criteria_id: criteria.criteria_id,
        criteria_name: criteria.criteria_name,
        max_score: criteria.max_score,
        event_title: criteria.event.event_title, 
      }));
  
      // Send a successful response back to the client
      res.status(200).json({
        message: 'Event criteria retrieved successfully',
        criteria: response, 
      });
    } catch (error) {
      console.error("Error fetching event criteria:", error);
      next(error);
    }
  };
  