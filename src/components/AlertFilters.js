import React, { useState } from 'react';
import './filter.css';
import { 
  Box, 
  TextField, 
  InputAdornment, 
  MenuItem, 
  Button,
  Chip
} from '@mui/material';
import { Search, FilterAlt, Clear } from '@mui/icons-material';

const severityOptions = [
  { value: 1, label: 'Low (1-3)' },
  { value: 4, label: 'Medium (4-6)' },
  { value: 7, label: 'High (7-10)' }
];

const eventTypes = [
  'failed_login',
  'port_scan',
  'brute_force',
  'sql_injection',
  'xss_attempt'
];

const AlertFilters = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    search: '',
    severity: null,
    eventType: '',
    dateRange: null
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleApply = () => {
    onFilter(filters);
  };

  const handleClear = () => {
    const clearedFilters = {
      search: '',
      severity: null,
      eventType: '',
      dateRange: null
    };
    setFilters(clearedFilters);
    onFilter(clearedFilters);
  };

  return (
    <Box sx={{ mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <TextField
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search alerts..."
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        
        <Button
          variant="contained"
          startIcon={<FilterAlt />}
          onClick={handleApply}
        >
          Filter
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<Clear />}
          onClick={handleClear}
        >
          Clear
        </Button>
      </Box>

      <Box display="flex" gap={2} flexWrap="wrap">
        <TextField
          select
          name="severity"
          value={filters.severity || ''}
          onChange={handleChange}
          label="Severity"
          size="small"
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All Severities</MenuItem>
          {severityOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          name="eventType"
          value={filters.eventType || ''}
          onChange={handleChange}
          label="Event Type"
          size="small"
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All Event Types</MenuItem>
          {eventTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {filters.severity && (
        <Chip 
          label={`Severity: ${severityOptions.find(o => o.value === filters.severity)?.label}`} 
          onDelete={() => setFilters({...filters, severity: null})}
          sx={{ mt: 1, mr: 1 }}
        />
      )}
      {filters.eventType && (
        <Chip 
          label={`Event: ${filters.eventType}`} 
          onDelete={() => setFilters({...filters, eventType: ''})}
          sx={{ mt: 1, mr: 1 }}
        />
      )}
    </Box>
  );
};

export default AlertFilters;