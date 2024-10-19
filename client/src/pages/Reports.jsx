import React from 'react';

export default function Reports() {
  // Sample data for the table
  const sampleData = [
    { id: 1, name: 'Event 1', date: '2024-10-01', status: 'Completed' },
    { id: 2, name: 'Event 2', date: '2024-10-05', status: 'Pending' },
    { id: 3, name: 'Event 3', date: '2024-10-10', status: 'Completed' },
    { id: 4, name: 'Event 4', date: '2024-10-15', status: 'Pending' },
    { id: 5, name: 'Event 5', date: '2024-10-20', status: 'Ongoing' },
    { id: 6, name: 'Event 6', date: '2024-10-25', status: 'Scheduled' },
    { id: 7, name: 'Event 7', date: '2024-10-30', status: 'Scheduled' },
    { id: 8, name: 'Event 8', date: '2024-11-01', status: 'Scheduled' },
    { id: 9, name: 'Event 9', date: '2024-11-05', status: 'Scheduled' },
    { id: 10, name: 'Event 10', date: '2024-11-10', status: 'Scheduled' },
    { id: 10, name: 'Event 10', date: '2024-11-10', status: 'Scheduled' },
    { id: 10, name: 'Event 10', date: '2024-11-10', status: 'Scheduled' },
    { id: 10, name: 'Event 10', date: '2024-11-10', status: 'Scheduled' },
    { id: 10, name: 'Event 10', date: '2024-11-10', status: 'Scheduled' },
    { id: 10, name: 'Event 10', date: '2024-11-10', status: 'Scheduled' },
    
    // Add more sample data as needed
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Reports</h2>
      <div className="overflow-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Event Name</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-300 p-2">{item.id}</td>
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2">{item.date}</td>
                <td className="border border-gray-300 p-2">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
