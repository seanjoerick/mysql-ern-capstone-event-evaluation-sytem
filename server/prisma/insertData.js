import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Initialize Prisma Client
const prisma = new PrismaClient();

// Function to clear existing data in the database
async function clearDatabase() {
  try {
    // Clear data from each table
    await prisma.strand.deleteMany({});
    await prisma.tesdaCourse.deleteMany({});
    await prisma.course.deleteMany({});
    console.log('All data cleared from the database.');
  } catch (error) {
    console.error('Error clearing data:', error);
  }
}

// Function to insert data into the database
async function insertData() {
  try {
    // Inserting data into Strand table (Senior High School Strands)
    const strandData = [
      { strand_name: 'Science, Technology, Engineering, and Mathematics (STEM)' },
      { strand_name: 'Accountancy, Business, and Management (ABM)' },
      { strand_name: 'Humanities and Social Sciences (HUMSS)' },
      { strand_name: 'Home Economics (HE)' },
      { strand_name: 'Information and Communications Technology (ICT)' },
    ];

    await prisma.strand.createMany({
      data: strandData,
    });

    // Inserting data into TesdaCourse table (TESDA Programs)
    const tesdaCourses = [
      { course_name: 'Electronics and Information Technology (Programming NC IV)' },
      { course_name: 'Electronic Product and Assembly Servicing NC II (EPAS)' },
      { course_name: 'Business Management (Bookkeeping NC III)' },
      { course_name: 'Nursing Aide (Healthcare Services NC II)' },
      { course_name: 'Hotel and Restaurant Services' },
      { course_name: 'Bread and Pastry Production NC II' },
      { course_name: 'Food and Beverage Service NC II' },
      { course_name: 'Bartending NC II' },
      { course_name: 'Housekeeping NC II' },
      { course_name: 'Cookery NC II' },
    ];

    await prisma.tesdaCourse.createMany({
      data: tesdaCourses,
    });

    // Inserting data into Course table (CHED Programs)
    const courses = [
      { course_name: 'Bachelor of Arts in Psychology (AB PSY)' },
      { course_name: 'Bachelor of Science in Accountancy (BSA)' },
      { course_name: 'Bachelor of Science in Accounting Technology (BSAT)' },
      { course_name: 'Bachelor of Science in Business Administration (BSBA)' },
      { course_name: 'Bachelor of Science in Business Administration Major in Financial Management' },
      { course_name: 'Bachelor of Science in Business Administration Major in Human Resource Management' },
      { course_name: 'Bachelor of Science in Business Administration Major in Marketing Management' },
      { course_name: 'Bachelor of Science in Business Administration Major in Office Administration' },
      { course_name: 'Bachelor of Science in Criminology (BSCrim)' },
      { course_name: 'Bachelor of Science in Computer Engineering (BSCpE)' },
      { course_name: 'Bachelor of Science in Computer Science (BSCS)' },
      { course_name: 'Bachelor of Science in Information Technology (BSIT)' },
      { course_name: 'Bachelor of Science in Office Administration (BSOA)' },
      { course_name: 'Bachelor of Science in Real Estate Management (BSREM)' },
      { course_name: 'Bachelor of Science in Social Work (BSSW)' },
      { course_name: 'Bachelor of Science in Technical - Vocational Teacher Education (BTVTE)' },
      { course_name: 'Bachelor of Science in Technical - Vocational Teacher Education Major in Food and Services Management' },
      { course_name: 'Bachelor of Science in Technical - Vocational Teacher Education Major in Electronics Technology' },
      { course_name: 'Bachelor of Science in Tourism Management (BSTM)' },
      { course_name: 'Bachelor of Industrial Engineering' },
    ];

    await prisma.course.createMany({
      data: courses,
    });

    console.log('Data successfully inserted!');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
}

// Run the clearDatabase function first, then insertData
async function run() {
  await clearDatabase();
  await insertData();
  await prisma.$disconnect();
}

// Execute the run function
run().catch((error) => {
  console.error('Error in the run function:', error);
  prisma.$disconnect();
});

//run
// node server/prisma/insertData.js root folder