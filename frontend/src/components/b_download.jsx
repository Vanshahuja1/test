import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const B_Download = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const { businessName, customerName, items } = state || {};

  // Calculate total price
  const totalPrice = items ? items.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2) : '0.00';

  // Get current date
  const currentDate = new Date().toLocaleDateString();

  const handleDownload = () => {
    const receiptContent = document.getElementById('receipt-content');

    html2canvas(receiptContent).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190; // Width in mm for A4 size page
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add image to the PDF
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight > pageHeight ? pageHeight - 20 : imgHeight);

      // Name the PDF as customerName_receipt.pdf if customerName exists, otherwise default to receipt.pdf
      const pdfName = customerName ? `${customerName}_receipt.pdf` : 'receipt.pdf';
      pdf.save(pdfName);
    });
  };

  

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mb-8">Receipt Preview</h1>
      {state ? (
        <div id="receipt-content" className="bg-white p-8 rounded shadow-lg w-full max-w-lg">
          <h2 className="text-xl font-semibold mb-2">Business: {businessName}</h2>
          <h2 className="text-xl font-semibold mb-2">Customer: {customerName}</h2>
          <h2 className="text-md mb-4">Date: {currentDate}</h2>
          <div className="mb-4">
            <h3 className="font-semibold">Items:</h3>
            <ul>
              {items.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-right font-semibold">
            <h3>Total: ${totalPrice}</h3>
          </div>
        </div>
      ) : (
        <p>No receipt data available. Please fill out the form first.</p>
      )}
      <button
        onClick={handleDownload}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Download as PDF
      </button>
      <div className="mt-4">
        

      </div>
      <button
        onClick={() => navigate('/home/business')}
        className="mt-4 text-blue-500 hover:underline"
      >
        Back to Form
      </button>
    </div>
  );
};

export default B_Download;
