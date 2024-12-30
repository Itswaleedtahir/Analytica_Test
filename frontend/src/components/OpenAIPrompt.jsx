import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import { usePromptContext } from '../context/PromptContext'; // Import the custom hook
import axios from 'axios';

const OpenAIPrompt = () => {
  const { prompt, setPrompt, response, setResponse, loading, setLoading } = usePromptContext(); // Use context

  // State to maintain the history temporarily
  const [history, setHistory] = useState([]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  };

  const sanitizeResponse = (data) => {
    return data.replace(/<[^>]*>/g, ''); // Remove HTML tags
  };

  const handleGenerate = async () => {
    if (!prompt) return;

    setLoading(true);
    try {
      const result = await axios.post(`${process.env.REACT_APP_API_URL}/prompt/generatePrompt`, { prompt });
      const sanitizedResponse = sanitizeResponse(result.data.data);
      setResponse(sanitizedResponse);
      
      // Add the prompt and response to the history
      const newHistory = [...history, { prompt, response: sanitizedResponse }];
      setHistory(newHistory);

      // Clear the prompt input
      setPrompt('');
    } catch (error) {
      setResponse('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          OpenAI Prompt Generator
        </Typography>
        <TextField
          fullWidth
          label="Enter your prompt"
          variant="outlined"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyPress}
          style={{ marginBottom: '20px' }}
        />
        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerate}
            disabled={!prompt || loading}
            style={{ marginBottom: '20px' }}
            endIcon={loading ? <CircularProgress size={24} color="inherit" /> : null}
          >
            {loading ? 'Generating...' : 'Generate'}
          </Button>
        </Box>

        {response && (
          <Box
            style={{
              backgroundColor: '#f5f5f5',
              padding: '15px',
              borderRadius: '8px',
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              fontFamily: 'monospace',
            }}
          >
            {response}
          </Box>
        )}

        {/* Display chat history */}
        {history.length > 0 && (
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Chat History
            </Typography>
            <List>
              {history.map((chat, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`Prompt: ${chat.prompt}`}
                    secondary={`Response: ${chat.response}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default OpenAIPrompt;
