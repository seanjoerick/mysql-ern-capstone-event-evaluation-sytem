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
                    { status: 'active' },  
                    { status: 'ongoing' }  
                ]
            }
        });

        // Loop through each event to check its status and update if necessary
        for (const event of events) {
            const startDate = new Date(event.start_date); 
            const endDate = new Date(event.end_date); 

            // Check if the event is active and the current time is between start and end dates
            if (event.status === 'active' && currentTime >= startDate && currentTime < endDate) {
                await prisma.event.update({
                    where: { event_id: event.event_id }, 
                    data: { status: 'ongoing' }        
                });
                console.log(`Event ${event.event_title} is now ongoing`); 
            } 
            // Check if the event is ongoing and the current time has passed the end date
            else if (event.status === 'ongoing' && currentTime >= endDate) {
                await prisma.event.update({
                    where: { event_id: event.event_id }, 
                    data: { status: 'completed' }      
                });
                console.log(`Event ${event.event_title} is now completed`); 
            }
        }
    } catch (error) {
        // Catch and log any errors that occur during the database operations
        console.error('Error updating event statuses:', error);
    }
}, {
    timezone: singaporeTimeZone 
});
