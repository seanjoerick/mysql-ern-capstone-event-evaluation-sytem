import React from 'react';

const SkeletonRow = () => {
  return (
    <tr className="odd:bg-white even:bg-gray-500 border-b animate-pulse">
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-500 rounded w-1/3"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-500 rounded w-1/2"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-500 rounded w-1/4"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-500 rounded w-1/4"></div>
      </td>
      <td className="px-6 py-4"></td>
    </tr>
  );
};

export default SkeletonRow;
