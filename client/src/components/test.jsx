// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
// import useGetstrand from '../hooks/useGetStrand';
// import useGetTesda from '../hooks/useGetTesda';
// import useGetCollege from '../hooks/useGetCollege';

// export default function Settings() {
//   const { strands, loading: loadingStrands, error: errorStrands } = useGetstrand();
//   const { tcourses, loading: loadingTCourses, error: errorTCourses } = useGetTesda();
//   const { courses, loading: loadingCourses, error: errorCourses } = useGetCollege();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [tableType, setTableType] = useState(''); // To determine which table's data we're editing

//   const openModal = (course = null, type) => {
//     setSelectedCourse(course);
//     setTableType(type);
//     setIsEditMode(!!course); // If a course is passed, we're in edit mode
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedCourse(null);
//     setTableType('');
//   };

//   const handleSave = (newData) => {
//     // Logic for saving new or updated data based on `tableType`
//     if (isEditMode) {
//       // Update existing entry
//       console.log(`Updating ${tableType} with`, newData);
//     } else {
//       // Add new entry
//       console.log(`Adding new ${tableType}`, newData);
//     }
//     closeModal(); // Close modal after save
//   };

//   if (loadingStrands || loadingTCourses || loadingCourses) {
//     return <div>Loading...</div>;
//   }

//   if (errorStrands) {
//     return <div>{errorStrands}</div>;
//   }

//   if (errorTCourses) {
//     return <div>{errorTCourses}</div>;
//   }

//   if (errorCourses) {
//     return <div>{errorCourses}</div>;
//   }

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-6 border-b-2 border-gray-500 pb-2">
//         <h2 className="text-2xl font-bold">Manage Settings</h2>
//       </div>

//       {/* Flex Container for Columns */}
//       <div className="flex space-x-8">
        
//         {/* College Table */}
//         <div className="flex-1">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-xl font-semibold">College</h3>
//             <button
//               onClick={() => openModal(null, 'college')}
//               className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 flex items-center"
//             >
//               <FontAwesomeIcon icon={faPlus} className="mr-2" /> COURSE
//             </button>
//           </div>
//           <div className="relative overflow-y-auto max-h-[550px] shadow-md sm:rounded-lg mb-6 custom-scrollbar">
//             <table className="w-full text-sm text-left text-gray-500">
//               <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-4">College ID</th>
//                   <th scope="col" className="px-6 py-4">Course Name</th>
//                   <th scope="col" className="px-6 py-4">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {courses.map((course, index) => (
//                   <tr key={`${course.course_id}-${index}`} className="odd:bg-white even:bg-gray-50 border-b">
//                     <td className="px-6 py-4 font-medium text-gray-900">{course.course_id}</td>
//                     <td className="px-6 py-4">{course.course_name}</td>
//                     <td className="px-6 py-4 flex space-x-2">
//                       <button
//                         onClick={() => openModal(course, 'college')}
//                         className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2"
//                       >
//                         <FontAwesomeIcon icon={faEdit} />
//                       </button>
//                       <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2">
//                         <FontAwesomeIcon icon={faTrash} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* TESDA Table */}
//         <div className="flex-1">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-xl font-semibold">TESDA</h3>
//             <button
//               onClick={() => openModal(null, 'tesda')}
//               className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 flex items-center"
//             >
//               <FontAwesomeIcon icon={faPlus} className="mr-2" /> TESDA
//             </button>
//           </div>
//           <div className="relative overflow-y-auto max-h-[550px] shadow-md sm:rounded-lg mb-6 custom-scrollbar">
//             <table className="w-full text-sm text-left text-gray-500">
//               <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-4">TESDA ID</th>
//                   <th scope="col" className="px-6 py-4">Course Name</th>
//                   <th scope="col" className="px-6 py-4">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tcourses.map((course, index) => (
//                   <tr key={`${course.tesda_course_id}-${index}`} className="odd:bg-white even:bg-gray-50 border-b">
//                     <td className="px-6 py-4 font-medium text-gray-900">{course.tesda_course_id}</td>
//                     <td className="px-6 py-4">{course.course_name}</td>
//                     <td className="px-6 py-4 flex space-x-2">
//                       <button
//                         onClick={() => openModal(course, 'tesda')}
//                         className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2"
//                       >
//                         <FontAwesomeIcon icon={faEdit} />
//                       </button>
//                       <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2">
//                         <FontAwesomeIcon icon={faTrash} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
        
//         {/* Strand Table */}
//         <div className="flex-1">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-xl font-semibold">Strand</h3>
//             <button
//               onClick={() => openModal(null, 'strand')}
//               className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 flex items-center"
//             >
//               <FontAwesomeIcon icon={faPlus} className="mr-2" /> STRAND
//             </button>
//           </div>
//           <div className="relative overflow-y-auto max-h-[550px] shadow-md sm:rounded-lg mb-6 custom-scrollbar">
//             <table className="w-full text-sm text-left text-gray-500">
//               <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-4">Strand ID</th>
//                   <th scope="col" className="px-6 py-4">Strand Name</th>
//                   <th scope="col" className="px-6 py-4">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {strands.map((strand, index) => (
//                   <tr key={`${strand.strand_id}-${index}`} className="odd:bg-white even:bg-gray-50 border-b">
//                     <td className="px-6 py-4 font-medium text-gray-900">{strand.strand_id}</td>
//                     <td className="px-6 py-4">{strand.strand_name}</td>
//                     <td className="px-6 py-4 flex space-x-2">
//                       <button
//                         onClick={() => openModal(strand, 'strand')}
//                         className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2"
//                       >
//                         <FontAwesomeIcon icon={faEdit} />
//                       </button>
//                       <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2">
//                         <FontAwesomeIcon icon={faTrash} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Modal Component */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <h3 className="text-lg font-semibold">{isEditMode ? 'Edit' : 'Add'} {tableType}</h3>
//             {/* Form Inputs for Course/Strand */}
//             <form onSubmit={(e) => {
//               e.preventDefault();
//               const newData = {
//                 // Assuming input fields for course/strand, replace with actual fields
//                 id: e.target.id.value,
//                 name: e.target.name.value,
//               };
//               handleSave(newData);
//             }}>
//               <div className="mb-4">
//                 <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
//                 <input
//                   type="text"
//                   name="id"
//                   defaultValue={selectedCourse ? selectedCourse.course_id || selectedCourse.strand_id : ''}
//                   className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   defaultValue={selectedCourse ? selectedCourse.course_name || selectedCourse.strand_name : ''}
//                   className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                   required
//                 />
//               </div>
//               <div className="flex justify-end">
//                 <button type="button" onClick={closeModal} className="text-gray-500 hover:bg-gray-100 px-4 py-2 rounded-md mr-2">Cancel</button>
//                 <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md">{isEditMode ? 'Update' : 'Create'}</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


{/* <li>
<Link 
  to="/settings"
  className={`text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all ${isActive('/settings') ? 'text-blue-600' : ''}`}
>
  <FontAwesomeIcon icon={faCog} className="mr-2" />
  <span>Settings</span>
</Link>
</li> */}\



<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
<div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <div style="text-align: center;">
        <img src="https://trimexcolleges.edu.ph/public/images/logo/trimex.png" alt="Trimex College Logo" style="max-width: 150px; margin-bottom: 20px;">
    </div>
    <h2 style="color: #333; text-align: center;">Event Reminder</h2>
    <p style="color: #555;">Hello students,</p>
    <p style="color: #555;">This is a reminder for the upcoming event:</p>
    <h3 style="color: #007bff;">${eventTitle}</h3>
    <p style="color: #555;">
        <img src="https://img.icons8.com/ios-filled/50/000000/planner.png" alt="Calendar Icon" style="width: 20px; vertical-align: middle; margin-right: 5px;">
        <strong>Date:</strong> ${formattedStartDate}
    </p>
    <p style="color: #555;">We look forward to your participation!</p>
    <p style="color: #555;">Thank you!<br><strong>Event Organizer</strong></p>
    <hr style="border-top: 1px solid #eee;">
    <footer style="color: #aaa; text-align: center;">
        <p>If you have any questions, feel free to reply to this email.</p>
    </footer>
</div>
</div>