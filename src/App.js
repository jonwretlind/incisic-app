import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import ToolPanel from './components/ToolPanel';
import Canvas from './components/Canvas';
import PropertiesPanel from './components/PropertiesPanel';
import './App.css';

function App() {
  const [selectedTool, setSelectedTool] = useState('wall');
  const [selectedElement, setSelectedElement] = useState(null);
  const [levelData, setLevelData] = useState({
    level: 1,
    name: "New Level",
    ppSpacing: 15,
    terrain: [],
    maze: [],
    powerUps: [],
    enemies: [],
    exit: null
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Hippo Game Level Editor
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="xl" sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <ToolPanel 
          selectedTool={selectedTool} 
          onToolSelect={setSelectedTool} 
        />
        
        <Canvas 
          levelData={levelData}
          setLevelData={setLevelData}
          selectedTool={selectedTool}
          onElementSelect={setSelectedElement}
        />
        
        <PropertiesPanel 
          selectedElement={selectedElement}
          onElementUpdate={(updatedElement) => {
            // Update the level data with the modified element
            setLevelData(prev => ({
              ...prev,
              // Update the appropriate array based on element type
            }));
          }}
        />
      </Container>
    </Box>
  );
}

export default App;
