import React from 'react';
import { 
  Paper, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText 
} from '@mui/material';

const tools = [
  { id: 'wall', name: 'Wall' },
  { id: 'water', name: 'Water' },
  { id: 'enemy', name: 'Enemy' },
  { id: 'powerUp', name: 'Power-Up' },
  { id: 'exit', name: 'Exit Gate' }
];

const ToolPanel = ({ selectedTool, onToolSelect }) => {
  return (
    <Paper sx={{ width: 240, overflow: 'auto' }}>
      <List>
        {tools.map((tool) => (
          <ListItem key={tool.id} disablePadding>
            <ListItemButton
              selected={selectedTool === tool.id}
              onClick={() => onToolSelect(tool.id)}
            >
              <ListItemText primary={tool.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ToolPanel; 