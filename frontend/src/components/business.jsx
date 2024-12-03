import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Business = () => {
  const [businessName, setBusinessName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [numberOfItems, setNumberOfItems] = useState(1);
  const [items, setItems] = useState([{ name: '', price: '' }]);
  const navigate = useNavigate();

  const handleItemChange = (index, key, value) => {
    const newItems = [...items];
    newItems[index][key] = value;
    setItems(newItems);
  };

  const handleSubmit = () => {
    const receiptData = {
      businessName,
      customerName,
      items,
    };
    navigate('/home/b_download', { state: receiptData });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mb-8">
        Business Receipt Form
      </h1>
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-lg">
        <div className="mb-4">
          <label className="block font-semibold mb-2">Business Name:</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Number of Items:</label>
          <input
            type="number"
            min="1"
            value={numberOfItems}
            onChange={(e) => {
              setNumberOfItems(e.target.value);
              setItems(Array.from({ length: e.target.value }, () => ({ name: '', price: '' })));
            }}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        {items.map((item, index) => (
          <div key={index} className="mb-4">
            <label className="block font-semibold mb-2">
              Item {index + 1} Name:
            </label>
            <input
              type="text"
              value={item.name}
              onChange={(e) => handleItemChange(index, 'name', e.target.value)}
              className="border rounded w-full py-2 px-3 mb-2"
            />
            <label className="block font-semibold mb-2">Item {index + 1} Price:</label>
            <input
              type="number"
              value={item.price}
              onChange={(e) => handleItemChange(index, 'price', e.target.value)}
              className="border rounded w-full py-2 px-3"
            />
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Submit
        </button>
        

      </div>
      <button
  onClick={() => navigate('/')}
  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
>
  Back
</button>
    </div>
  );
};

export default Business;
