import cron from 'node-cron';
import prisma from '../prismaClient.js';

const singaporeTimeZone = 'Asia/Singapore';

// Schedule a cron job to run every minute
cron.schedule('* * * * *', async () => {
    console.log('Checking and updating event statuses...');

    // Get the current date and time
    const currentTime = new Date();

    try {
        // Fetch all events that are either 'active' or 'ongoing'
        const events = await prisma.event.findMany({
            where: {
                OR: [
                    { status: 'active' },  // Check for active events
                    { status: 'ongoing' }  // Check for ongoing events
                ]
            }
        });

        // Loop through each event to check its status and update if necessary
        for (const event of events) {
            const startDate = new Date(event.start_date); // Convert start_date to Date object
            const endDate = new Date(event.end_date);     // Convert end_date to Date object

            // Check if the event is active and the current time is between start and end dates
            if (event.status === 'active' && currentTime >= startDate && currentTime < endDate) {
                // Update the event status to 'ongoing'
                await prisma.event.update({
                    where: { event_id: event.event_id }, // Find event by its ID
                    data: { status: 'ongoing' }           // Set status to ongoing
                });
                console.log(`Event ${event.event_title} is now ongoing`); // Log the status update
            } 
            // Check if the event is ongoing and the current time has passed the end date
            else if (event.status === 'ongoing' && currentTime >= endDate) {
                // Update the event status to 'completed'
                await prisma.event.update({
                    where: { event_id: event.event_id }, // Find event by its ID
                    data: { status: 'completed' }         // Set status to completed
                });
                console.log(`Event ${event.event_title} is now completed`); // Log the status update
            }
        }
    } catch (error) {
        // Catch and log any errors that occur during the database operations
        console.error('Error updating event statuses:', error);
    }
}, {
    timezone: singaporeTimeZone // Set the timezone for the cron job
});
