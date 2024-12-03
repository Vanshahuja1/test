// P_Download.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Register all necessary components
Chart.register(...registerables);

const P_Download = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  if (!state) {
    return <div>No data available</div>;
  }

  const { name, date, items } = state;

  // Calculate the total expenditure
  const totalExpenditure = items.reduce((acc, item) => acc + Number(item.price), 0);

  // Prepare data for the bar chart
  const expenditureData = items.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + Number(item.price);
    return acc;
  }, {});

  const data = {
    labels: Object.keys(expenditureData),
    datasets: [
      {
        label: 'Expenditure by Type',
        data: Object.values(expenditureData),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Function to download the receipt as a PDF
  const handleDownload = () => {
    const receiptContent = document.getElementById('printable-receipt');

    html2canvas(receiptContent).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190;
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight > pageHeight ? pageHeight - 20 : imgHeight);
      pdf.save(`${name}_receipt.pdf`);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mb-8">Expenditure Summary</h1>
      {/* Printable content starts here */}
      <div id="printable-receipt" className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Receipt</h2>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Date:</strong> {date}</p>
        <h3 className="font-semibold mt-4">Items:</h3>
        <ul>
          {items.map((item, index) => (
            <li key={index} className="mb-2">{`${item.item} (${item.type}): $${item.price}`}</li>
          ))}
        </ul>
        <h3 className="font-semibold mt-4">Total Expenditure: ${totalExpenditure.toFixed(2)}</h3>
        <div className="mt-4">
          <Bar data={data} />
        </div>
      </div>
      {/* Printable content ends here */}

      <button
        onClick={handleDownload}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Download Summary as PDF
      </button>

      <button
        onClick={() => navigate('/home/personal')}
        className="mt-4 text-blue-500 hover:underline"
      >
        Back to Personal Entry
      </button>
    </div>
  );
};

export default P_Download;
