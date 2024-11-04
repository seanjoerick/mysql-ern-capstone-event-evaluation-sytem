import React from 'react';
import jsPDF from 'jspdf';
import trimex from '../assets/images/trimex.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

const PDFContent = ({ event, overallAverageScore, ratingDescription, studentCount, criteriaData }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    const img = new Image();
    img.src = trimex;

    img.onload = () => {
      // Logo and Title Section (Centered at the top)
      doc.addImage(img, 'PNG', 10, 10, 30, 30);
      doc.addImage(img, 'PNG', 170, 10, 30, 30);

      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text('Trimex Colleges', 105, 45, { align: 'center' });
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(50, 50, 50);
      doc.text('Republic of the Philippines', 105, 30, { align: 'center' });
      doc.text('Binan, Laguna', 105, 60, { align: 'center' });
      doc.setTextColor(0, 0, 0);

      // Line separator
      doc.setLineWidth(0.5);
      doc.line(10, 70, 200, 70);

      // Event Title and Dates
      const startDate = new Date(event.start_date);
      const endDate = new Date(event.end_date);
      const formattedStartDate = startDate.toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
      });
      const formattedEndDate = endDate.toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
      });

      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text(event.event_title, 105, 80, { align: 'center' });
      doc.setFontSize(14);
      doc.setFont("helvetica", "normal");
      doc.text(`From: ${formattedStartDate} To: ${formattedEndDate}`, 105, 90, { align: 'center' });

      // Criteria Table (Centered below the title)
      const pageWidth = 210;
      const tableWidth = 180;
      const tableStartX = (pageWidth - tableWidth) / 2;
      const tableStartY = 100;
      const rowHeight = 10;
      const columnWidths = [120, 60];

      // Table Header
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text('Criteria Name', tableStartX + 15, tableStartY);
      doc.text('Scale', tableStartX + columnWidths[0] + 25, tableStartY);

      // Line under header
      doc.setLineWidth(0.5);
      doc.line(tableStartX, tableStartY + 2, tableStartX + tableWidth, tableStartY + 2);

      let yPosition = tableStartY + rowHeight;
      doc.setFont("helvetica", "normal");
      criteriaData.forEach((criteria) => {
        // Draw each row centered
        doc.rect(tableStartX, yPosition - 6, columnWidths[0], rowHeight, 'S');
        doc.text(criteria.criteria_name, tableStartX + 5, yPosition);
        doc.rect(tableStartX + columnWidths[0], yPosition - 6, columnWidths[1], rowHeight, 'S');
        doc.text(getSatisfactionDescription(criteria.average_score), tableStartX + columnWidths[0] + 5, yPosition);
        yPosition += rowHeight;
      });

      // Positioning for Average Rating and Total Evaluations near the bottom of the table
      const footerY = yPosition + 20; // Adjusted position below the table

      // Total Evaluations and Rating Description on the bottom-left
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Rating Description: ${ratingDescription}`, tableStartX + 5, footerY); // Rating Description
      doc.text(`Total Evaluations: ${studentCount} students`, tableStartX + 5, footerY + 10); // Total Evaluations on the next line

      // Adjusted Average Rating on the bottom-right within visible area
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(`Average Rating: ${overallAverageScore}`, tableStartX + tableWidth - 60, footerY); // Adjusted position

      // Save the PDF
      doc.save('evaluation_results.pdf');
    };
  };

  const getSatisfactionDescription = (score) => {
    if (score >= 4.5) return 'Very Satisfied';
    else if (score >= 3.5) return 'Satisfied';
    else if (score >= 2.5) return 'Neutral';
    else if (score >= 1.5) return 'Dissatisfied';
    else return 'Very Dissatisfied';
  };

  return (
    <button
      className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg p-2"
      onClick={generatePDF}
    >
       <FontAwesomeIcon icon={faFilePdf} />
    </button>
  );
};

export default PDFContent;
