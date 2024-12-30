import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { PromptProvider } from './context/PromptContext'; // Import the PromptProvider
import ItemManagement from './components/ItemManagement';
import OpenAIPrompt from './components/OpenAIPrompt';

function App() {
  return (
    <PromptProvider> {/* Wrap the app with the provider */}
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Analytica Test
            </Typography>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/openai">OpenAI Prompt</Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<ItemManagement />} />
          <Route path="/openai" element={<OpenAIPrompt />} />
        </Routes>
      </Router>
    </PromptProvider>
  );
}

export default App;
