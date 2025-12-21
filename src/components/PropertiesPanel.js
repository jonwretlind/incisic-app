import React from 'react';
import { 
  Paper, 
  Typography, 
  TextField, 
  Box 
} from '@mui/material';

const PropertiesPanel = ({ selectedElement, onElementUpdate }) => {
  if (!selectedElement) {
    return (
      <Paper sx={{ width: 300, p: 2 }}>
        <Typography>No element selected</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ width: 300, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Properties
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Render different properties based on element type */}
        {Object.entries(selectedElement).map(([key, value]) => (
          <TextField
            key={key}
            label={key}
            value={value}
            onChange={(e) => {
              onElementUpdate({
                ...selectedElement,
                [key]: e.target.value
              });
            }}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default PropertiesPanel; 