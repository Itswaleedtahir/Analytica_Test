import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// Create context
const PromptContext = createContext();

// Custom hook to use the context
export const usePromptContext = () => {
  return useContext(PromptContext);
};

// Create a provider component
export const PromptProvider = ({ children }) => {
  // For OpenAI Prompt
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // For Item Management
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });

  // Fetch items from the backend
  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:6001/api/v1/items/getAllItems');
      setItems(response.data.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Add new item
  const addItem = async () => {
    if (!newItem.name || !newItem.description) return; // Check for empty inputs
    await axios.post('http://localhost:6001/api/v1/items/createItem', newItem);
    setNewItem({ name: '', description: '' });
    fetchItems();
  };

  // Delete item
  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:6001/api/v1/items/deleteItem/${id}`);
    fetchItems();
  };

  return (
    <PromptContext.Provider
      value={{
        // OpenAI prompt
        prompt, setPrompt, 
        response, setResponse, 
        loading, setLoading, 
        // Item management
        items, setItems, 
        newItem, setNewItem, 
        fetchItems, addItem, deleteItem,
      }}
    >
      {children}
    </PromptContext.Provider>
  );
};
