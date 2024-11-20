import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs'; // Use bcryptjs instead of bcrypt

// Load environment variables from the .env file
dotenv.config();

// Initialize Prisma Client
const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    // Retrieve admin credentials from environment variables
    const username = process.env.ADMIN_USERNAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!username || !email || !password) {
      console.error('Environment variables for admin user are missing.');
      return;
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10); // bcryptjs uses hashSync for synchronous hashing

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      console.log('Admin user already exists.');
      return;
    }

    // Create admin user
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: 'admin', // Use enum value for role
      },
    });

    console.log('Admin user created successfully!');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Execute the function
createAdminUser().catch((error) => {
  console.error('Error executing createAdminUser:', error);
  prisma.$disconnect();
});

//run this first
// node server/prisma/createAdminUser.js rootfolder

