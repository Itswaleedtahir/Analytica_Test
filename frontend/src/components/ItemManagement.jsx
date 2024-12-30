import React, { useEffect } from 'react';
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton, Paper, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { usePromptContext } from '../context/PromptContext'; // Import the context

const ItemManagement = () => {
  const { items, newItem, setNewItem, addItem, deleteItem, fetchItems } = usePromptContext(); // Use context to access state and functions

  useEffect(() => {
    fetchItems();
  }, [fetchItems]); // Fetch items when component is mounted

  return (
    <Container maxWidth="md" style={{ marginTop: '30px' }}>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <TextField
            label="Item Name"
            value={newItem.name}
            onChange={e => setNewItem({ ...newItem, name: e.target.value })}
            fullWidth
            style={{ marginRight: '10px' }}
          />
          <TextField
            label="Description"
            value={newItem.description}
            onChange={e => setNewItem({ ...newItem, description: e.target.value })}
            fullWidth
            style={{ marginRight: '10px' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addItem}
            style={{ height: '100%' }}
          >
            Add Item
          </Button>
        </Box>
      </Paper>

      <Paper elevation={3} style={{ padding: '20px' }}>
        <List>
          {items.map(item => (
            <ListItem
              key={item._id}
              style={{
                borderBottom: '1px solid #e0e0e0',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '8px',
                backgroundColor: '#fafafa',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#fafafa'}
            >
              <ListItemText
                primary={item.name}
                secondary={item.description}
                style={{ flexGrow: 1 }}
              />
              <IconButton
                edge="end"
                color="secondary"
                onClick={() => deleteItem(item._id)}
                style={{
                  marginLeft: '10px',
                  backgroundColor: '#f5f5f5',
                  '&:hover': { backgroundColor: '#f44336', color: '#fff' },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default ItemManagement;
