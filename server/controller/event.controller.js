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

        // Calculate count of completed events
        const completedEventCount = events.filter(event => event.status === 'completed').length;

        // Return response with events, including count even if empty
        return res.status(200).json({
            message: 'Events retrieved successfully',
            count: events.length,
            completedCount: completedEventCount,
            events: eventsWithAdmin,
        });
    } catch (error) {
        console.error('Error retrieving Events:', error);
        next(error);
    }
};

export const getEventsSummary = async (req, res, next) => {
    try {
        const now = new Date();

        // Fetch the last 3 completed events
        const completedEvents = await prisma.event.findMany({
            where: { status: 'completed' },
            orderBy: { created_at: 'desc' },
            take: 3,
        });

        // Fetch the last 3 upcoming events
        const upcomingEvents = await prisma.event.findMany({
            where: {
                start_date: { gte: now },
                status: 'active',
            },
            orderBy: { start_date: 'asc' },
            take: 3,
        });

        // Add admin usernames to completed events
        const completedEventsWithAdmin = await Promise.all(
            completedEvents.map(async (event) => {
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

        // Add admin usernames to upcoming events
        const upcomingEventsWithAdmin = await Promise.all(
            upcomingEvents.map(async (event) => {
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

        return res.status(200).json({
            message: 'Events summary retrieved successfully',
            completedEvents: completedEventsWithAdmin,
            upcomingEvents: upcomingEventsWithAdmin,
        });
    } catch (error) {
        console.error('Error retrieving events summary:', error);
        next(error);
    }
};

export const getEventOnlyWith10Criteria = async (req, res, next) => {
    try {
        // Fetch all events with the count of associated criteria
        const events = await prisma.event.findMany({
            select: {
                event_id: true,
                admin_id: true,
                event_title: true,
                event_description: true,
                start_date: true,
                end_date: true,
                status: true,
                created_at: true,
                _count: {
                    select: { criteria: true },
                },
            },
        });

        // Filter events to include only those with exactly 10 criteria
        const filteredEvents = events.filter(event => event._count.criteria === 10);

        // Create an array to hold events with admin usernames, excluding admin_id
        const eventsWithAdmin = await Promise.all(
            filteredEvents.map(async (event) => {
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

        // Return response with events, including count even if empty
        return res.status(200).json({
            message: 'Events with exactly 10 criteria retrieved successfully',
            count: eventsWithAdmin.length,
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

    // Ensure max_score is a number and equals 5
    const maxScore = parseInt(max_score);
    if (isNaN(maxScore) || maxScore !== 5) {
        return res.status(400).json({ error: 'Max score must be exactly 5!' });
    }

    try {
        // Check if the criteria already exists for the event
        const existingCriteria = await prisma.eventCriteria.findFirst({
            where: {
                event_id: parseInt(eventId),
                criteria_name: criteria_name,
            },
        });

        if (existingCriteria) {
            return res.status(400).json({ error: `${criteria_name} already exists!` });
        }

        // Count the existing criteria for the event
        const criteriaCount = await prisma.eventCriteria.count({
            where: {
                event_id: parseInt(eventId),
            },
        });

        // Ensure no more than 10 criteria exist for the event
        if (criteriaCount >= 10) {
            return res.status(400).json({ error: 'Cannot create more than 10 criteria for this event!' });
        }

        // Create new event criteria
        const newCriteria = await prisma.eventCriteria.create({
            data: {
                event_id: parseInt(eventId),
                criteria_name,
                max_score: maxScore,
            },
        });

        return res.status(201).json({
            message: `${criteria_name} created successfully`,
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

export const updateCriteria = async (req, res, next) => {
    const { criteria_name, max_score } = req.body;
    const { criteriaId } = req.params;

    // Validate input
    if (!criteria_name || max_score === undefined) {
        return res.status(400).json({ error: 'Criteria name and max score are required!' });
    }

    // Ensure max_score is a number and equals 5
    const maxScore = parseInt(max_score);
    if (isNaN(maxScore) || maxScore !== 5) {
        return res.status(400).json({ error: 'Max score must be exactly 5!' });
    }

    try {
        // Fetch the existing Criteria by ID
        const existingCriteria = await prisma.eventCriteria.findFirst({
            where: {
                criteria_id: Number(criteriaId),
            },
        });

        if (!existingCriteria) {
            return res.status(404).json({ error: `Criteria not found!` });
        }

         // If the new criteria_name and description are the same as the existing ones, return without updating
         if (existingCriteria.criteria_name === criteria_name && existingCriteria.max_score === max_score) {
            return res.status(200).json({ error: 'No changes made, criteria and max-score are the same.' });
        }

        // Check for duplicate criteria name (exclude current criteria)
        const duplicateCriteria = await prisma.eventCriteria.findFirst({
            where: {
                criteria_name: criteria_name,
                event_id: existingCriteria.event_id,
                criteria_id: { not: Number(criteriaId) },
            },
        });

        if (duplicateCriteria) {
            return res.status(400).json({ error: `'${criteria_name}' already exists!` });
        }

        // Proceed with the update
        const updatedCriteria = await prisma.eventCriteria.update({
            where: {
                criteria_id: Number(criteriaId),
            },
            data: {
                criteria_name,
                max_score: maxScore,
            },
        });

        res.status(200).json({
            message: 'Criteria updated successfully',
            criteria: updatedCriteria,
        });

    } catch (error) {
        console.error('Error updating criteria:', error);
        next(error);
    }
};

export const deleteCriteria = async (req, res, next) => {
    const { criteriaId } = req.params;
    
    // Check if criteriaId is received
    if (!criteriaId) {
        return res.status(400).json({ error: 'Criteria ID is missing!' });
    }

    try {
        // Check if the criteria exists
        const existingCriteria = await prisma.eventCriteria.findFirst({
            where: {
                criteria_id: Number(criteriaId),
            },
        });

        if (!existingCriteria) {
            return res.status(404).json({ error: 'Criteria not found!' });
        }

        // Delete the criteria
        await prisma.eventCriteria.delete({
            where: {
                criteria_id: Number(criteriaId),
            },
        });

        return res.status(200).json({
            message: `${existingCriteria.criteria_name} deleted successfully.`,
        });
    } catch (error) {
        console.error('Error deleting criteria:', error);
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
  
export const submitEvaluation = async (req, res) => {
    const { eventId, scores, feedbackText } = req.body;
    const userId = req.user.id;

    try {
        if (!eventId || !Array.isArray(scores) || !feedbackText) {
            return res.status(400).json({ message: 'Invalid input data.' });
        }

        const student = await prisma.student.findFirst({
            where: { user_id: userId },
        });

        if (!student) {
            return res.status(404).json({ message: 'Student not found for this user.' });
        }

        const studentId = student.student_id;

        const result = await prisma.$transaction(async (prisma) => {
            const evaluation = await prisma.evaluation.create({
                data: {
                    event_id: eventId,
                    student_id: studentId,
                    feedback_text: feedbackText,
                },
            });

            await prisma.evaluationDetail.createMany({
                data: scores.map(score => ({
                    evaluation_id: evaluation.evaluation_id,
                    criteria_id: score.criteriaId,
                    score: score.score,
                })),
            });

            return evaluation;
        });

        res.status(200).json({
            message: 'Evaluation submit successfully',
            evaluation: result,
        });
    } catch (error) {
        console.error('Error creating evaluation:', error);
        const statusCode = error.code === 'P2002' ? 409 : 500;
        res.status(statusCode).json({
            message: 'An error occurred while submitting the evaluation.',
            error: error.message,
        });
    }
};

export const getSubmittedEvaluations = async (req, res) => {
    const userId = req.user.id;

    try {
      // Find the student record
      const student = await prisma.student.findFirst({
        where: { user_id: userId },
        select: { student_id: true },
      });
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found for this user.' });
      }
  
      // Get submitted evaluations for the student
      const submittedEvaluations = await prisma.evaluation.findMany({
        where: { student_id: student.student_id },
        select: { event_id: true },
      });
  
      // Extract event IDs from the submitted evaluations
      const submittedEventIds = submittedEvaluations.map(evaluation => evaluation.event_id);
  
      // Respond with the submitted event IDs
      res.status(200).json({ submittedEventIds });
    } catch (error) {
      console.error('Error fetching submitted evaluations:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
};

export const getEventFeedback = async (req, res, next) => {
    const { eventId } = req.params;
    try {
      const feedback = await prisma.evaluation.findMany({
        where: { event_id: parseInt(eventId) },
        select: {
          feedback_text: true,
        },
      });
  
      // Filter to only include non-null feedback
      const filteredFeedback = feedback
        .map((evaluation) => evaluation.feedback_text)
        .filter(Boolean);
  
      res.status(200).json({
        message: 'Event feedback retrieved successfully',
        feedback: filteredFeedback,
      });
    } catch (error) {
      console.error("Error fetching event feedback:", error);
      next(error);
    }
  };

export const getEvaluationResults = async (req, res, next) => {
    const { eventId } = req.params;

    try {
        const evaluations = await prisma.evaluation.findMany({
            where: { event_id: parseInt(eventId) },
            include: {
                details: {
                    include: {
                        criteria: true,
                    },
                },
            },
        });

        const criteriaScores = {};
        let totalScore = 0;
        let totalCount = 0;
        let studentCount = 0;

        evaluations.forEach(evaluation => {
            studentCount += 1; 
            evaluation.details.forEach(detail => {
                const { criteria } = detail;
                if (!criteriaScores[criteria.criteria_name]) {
                    criteriaScores[criteria.criteria_name] = {
                        totalScore: 0,
                        count: 0,
                        individualScores: [],
                    };
                }

                criteriaScores[criteria.criteria_name].totalScore += detail.score;
                criteriaScores[criteria.criteria_name].count += 1;
                criteriaScores[criteria.criteria_name].individualScores.push(detail.score);
            });

            // Calculate total score for overall average
            totalScore += evaluation.details.reduce((sum, detail) => sum + detail.score, 0);
            totalCount += evaluation.details.length;
        });

        // Calculate averages
        const result = Object.keys(criteriaScores).map(key => ({
            criteria_name: key,
            average_score: parseFloat((criteriaScores[key].totalScore / criteriaScores[key].count).toFixed(1)),
            individual_scores: criteriaScores[key].individualScores,
        }));

        const overallAverageScore = totalCount > 0 ? parseFloat((totalScore / totalCount).toFixed(1)) : null;

        // Convert numeric score to descriptive rating, only if overallAverageScore is not null
        const ratingDescription = overallAverageScore !== null ? getRatingDescription(overallAverageScore) : null;

        // Send a successful response back to the client
        res.status(200).json({
            message: 'Event evaluation results retrieved successfully',
            criteria: result,
            overall_average_score: overallAverageScore,
            rating: ratingDescription,
            student_count: studentCount,
        });
    } catch (error) {
        console.error("Error fetching evaluation results:", error);
        next(error);
    }
};

// Helper function to convert score to rating description
const getRatingDescription = (score) => {
    if (score >= 4.5) {
        return 'Exceeded Expectations';
    } else if (score >= 3.5) {
        return 'Met Expectations';
    } else if (score >= 2.5) {
        return 'Satisfactory';
    } else if (score >= 1.5) {
        return 'Below Expectations';
    } else {
        return 'Very Poor';
    }
};

export const getTopEvents = async (req, res, next) => {
    const { year } = req.params;
    const startDate = new Date(`${year}-01-01T00:00:00Z`);
    const endDate = new Date(`${year}-12-31T23:59:59Z`);

    try {
        const events = await prisma.event.findMany({
            where: {
                start_date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            include: {
                evaluations: {
                    include: {
                        details: true,
                    },
                },
            },
        });

        const eventScores = {};

        // Calculate scores for each event
        events.forEach(event => {
            // Only process events that have evaluations
            if (event.evaluations.length > 0) {
                const totalScore = event.evaluations.reduce((total, evaluation) => {
                    return total + evaluation.details.reduce((sum, detail) => sum + detail.score, 0);
                }, 0);

                const totalCount = event.evaluations.reduce((count, evaluation) => {
                    return count + evaluation.details.length;
                }, 0);

                // Calculate average score
                const averageScore = totalCount > 0 ? totalScore / totalCount : 0;

                // Store event info and scores
                eventScores[event.event_id] = {
                    event_id: event.event_id,
                    event_title: event.event_title,
                    average_score: parseFloat(averageScore.toFixed(1)),
                    total_evaluations: totalCount,
                };
            }
        });

        // Convert the scores object into an array and sort by average score
        const sortedEvents = Object.values(eventScores)
            .sort((a, b) => b.average_score - a.average_score)
            .slice(0, 5);

        // Send a successful response back to the client
        res.status(200).json({
            message: 'Top events retrieved successfully',
            top_events: sortedEvents,
        });
    } catch (error) {
        console.error("Error fetching top events:", error);
        next(error);
    }
};
