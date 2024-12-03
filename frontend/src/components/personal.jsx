// Personal.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Personal = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Current date in YYYY-MM-DD format
  const [items, setItems] = useState([{ item: '', type: '', price: '' }]);

  const handleAddItem = () => {
    setItems([...items, { item: '', type: '', price: '' }]);
  };

  const handleInputChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home/p_download', { state: { name, date, items } });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mb-8">Today's Expenditure Entry</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Today's Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
          />
        </div>
        {items.map((item, index) => (
          <div key={index} className="mb-4 flex gap-4">
            <input
              type="text"
              placeholder="Item Name"
              value={item.item}
              onChange={(e) => handleInputChange(index, 'item', e.target.value)}
              required
              className="block w-full border border-gray-300 p-2 rounded"
            />
            <input
              type="text"
              placeholder="Type"
              value={item.type}
              onChange={(e) => handleInputChange(index, 'type', e.target.value)}
              required
              className="block w-full border border-gray-300 p-2 rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleInputChange(index, 'price', e.target.value)}
              required
              className="block w-full border border-gray-300 p-2 rounded"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddItem}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Add Another Item
        </button>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
        >
          Generate Receipt
        </button>
      </form>
      <button
  onClick={() => navigate('/home')}
  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
>
  Back
</button>
    </div>
  );
};

export default Personal;
