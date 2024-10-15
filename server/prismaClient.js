import { PrismaClient } from '@prisma/client';

// Create a new instance of PrismaClient
const prisma = new PrismaClient();

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Promise Rejection:', error);
});

// Handle graceful shutdown
const exitHandler = async () => {
    await prisma.$disconnect();
    console.log('Prisma Client disconnected.');
    process.exit(0);
};

// Handle process termination signals
process.on('SIGINT', exitHandler);
process.on('SIGTERM', exitHandler);

export default prisma; 
