import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  Stack,
  useTheme,
  Divider,
  Chip
} from '@mui/material';
import { 
  PieChart, 
  Pie, 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Cell, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import {
  Warning,
  Timeline,
  Analytics,
  SignalCellularAlt,
  Security,
  Equalizer,
  BugReport,
  LockClock,
  Public
} from '@mui/icons-material';

const AnalyticsPage = () => {
  const theme = useTheme();

  // Mock data
  const severityData = [
    { name: 'Critical', value: 8, color: theme.palette.error.main },
    { name: 'High', value: 12, color: theme.palette.warning.main },
    { name: 'Medium', value: 19, color: theme.palette.info.main },
    { name: 'Low', value: 8, color: theme.palette.success.main }
  ];

  const trendData = [
    { name: '00:00', alerts: 2, blocked: 1 },
    { name: '04:00', alerts: 1, blocked: 0 },
    { name: '08:00', alerts: 5, blocked: 3 },
    { name: '12:00', alerts: 8, blocked: 5 },
    { name: '16:00', alerts: 6, blocked: 4 },
    { name: '20:00', alerts: 3, blocked: 2 }
  ];

  const threatTypeData = [
    { subject: 'Malware', A: 12, fullMark: 15 },
    { subject: 'Phishing', A: 8, fullMark: 15 },
    { subject: 'DDoS', A: 5, fullMark: 15 },
    { subject: 'Brute Force', A: 9, fullMark: 15 },
    { subject: 'Exploits', A: 6, fullMark: 15 },
  ];

  const sourceData = [
    { x: 12, y: 8, z: 200, name: 'External' },
    { x: 7, y: 5, z: 120, name: 'Internal' },
    { x: 3, y: 2, z: 80, name: 'Partner' },
    { x: 9, y: 6, z: 150, name: 'Cloud' },
  ];

  const responseData = [
    { name: 'Jan', automated: 12, manual: 4 },
    { name: 'Feb', automated: 18, manual: 6 },
    { name: 'Mar', automated: 22, manual: 5 },
    { name: 'Apr', automated: 28, manual: 7 },
    { name: 'May', automated: 35, manual: 8 },
  ];

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3,
        borderRadius: 3,
        background: theme.palette.background.paper
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} mb={3}>
        <Analytics color="primary" fontSize="large" />
        <Typography variant="h5" fontWeight={600}>
          Security Analytics Dashboard
        </Typography>
        <Chip 
          icon={<Timeline />} 
          label="Real-time" 
          color="primary" 
          variant="outlined"
          sx={{ ml: 'auto', fontWeight: 500 }}
        />
      </Stack>
      
      <Grid container spacing={3}>

        {/* Stats Cards */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ 
            p: 2, 
            textAlign: 'center',
            borderLeft: `4px solid ${theme.palette.error.main}`,
            height: '100%'
          }}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
              <Warning color="error" />
              <Typography variant="h5" fontWeight={600}>8</Typography>
            </Stack>
            <Typography variant="subtitle2" color="text.secondary">
              Critical Alerts
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Paper sx={{ 
            p: 2, 
            textAlign: 'center',
            borderLeft: `4px solid ${theme.palette.warning.main}`,
            height: '100%'
          }}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
              <Security color="warning" />
              <Typography variant="h5" fontWeight={600}>42</Typography>
            </Stack>
            <Typography variant="subtitle2" color="text.secondary">
              Today's Alerts
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Paper sx={{ 
            p: 2, 
            textAlign: 'center',
            borderLeft: `4px solid ${theme.palette.info.main}`,
            height: '100%'
          }}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
              <BugReport color="info" />
              <Typography variant="h5" fontWeight={600}>128</Typography>
            </Stack>
            <Typography variant="subtitle2" color="text.secondary">
              Weekly Alerts
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Paper sx={{ 
            p: 2, 
            textAlign: 'center',
            borderLeft: `4px solid ${theme.palette.success.main}`,
            height: '100%'
          }}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
              <LockClock color="success" />
              <Typography variant="h5" fontWeight={600}>76%</Typography>
            </Stack>
            <Typography variant="subtitle2" color="text.secondary">
              Auto-Resolved
            </Typography>
          </Paper>
        </Grid>

        {/* Severity Distribution */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' , width: '400px'}}>
            <Typography variant="subtitle1" fontWeight={500} mb={2}>
              <Equalizer sx={{ verticalAlign: 'middle', mr: 1 }} />
              Alert Severity Distribution
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} alerts`, 'Count']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Alert Trends */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '100%' , width: '470px'}}>
            <Typography variant="subtitle1" fontWeight={500} mb={2}>
              <Timeline sx={{ verticalAlign: 'middle', mr: 1 }} />
              Alert Trends (Last 24h)
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                <YAxis stroke={theme.palette.text.secondary} />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="alerts" 
                  name="Total Alerts"
                  fill={theme.palette.warning.main} 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="blocked" 
                  name="Blocked"
                  fill={theme.palette.success.main} 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Threat Type Radar */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' , width: '470px' }}>
            <Typography variant="subtitle1" fontWeight={500} mb={2}>
              <SignalCellularAlt sx={{ verticalAlign: 'middle', mr: 1 }} />
              Threat Type Analysis
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={threatTypeData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" stroke={theme.palette.text.secondary} />
                <PolarRadiusAxis angle={30} domain={[0, 15]} stroke={theme.palette.text.secondary} />
                <Radar 
                  name="Alerts" 
                  dataKey="A" 
                  stroke={theme.palette.error.main} 
                  fill={theme.palette.error.light} 
                  fillOpacity={0.6} 
                />
                <Tooltip />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Source Analysis */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' , width: '470px' }}>
            <Typography variant="subtitle1" fontWeight={500} mb={2}>
              <Public sx={{ verticalAlign: 'middle', mr: 1 }} />
              Threat Source Analysis
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Severity" 
                  label={{ value: 'Severity', position: 'insideBottomRight', offset: -5 }}
                  stroke={theme.palette.text.secondary}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Frequency" 
                  label={{ value: 'Frequency', angle: -90, position: 'insideLeft' }}
                  stroke={theme.palette.text.secondary}
                />
                <ZAxis type="number" dataKey="z" range={[60, 400]} name="Impact" />
                <Tooltip 
                  formatter={(value, name, props) => {
                    if (name === 'Impact') return [props.payload.z, 'Impact'];
                    if (name === 'Severity') return [props.payload.x, 'Severity'];
                    return [props.payload.y, 'Frequency'];
                  }}
                />
                <Scatter 
                  name="Sources" 
                  data={sourceData} 
                  fill={theme.palette.info.main} 
                  shape="circle"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Response Trends */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' , width: '470px' }}>
            <Typography variant="subtitle1" fontWeight={500} mb={2}>
              <LockClock sx={{ verticalAlign: 'middle', mr: 1 }} />
              Response Trends
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                <YAxis stroke={theme.palette.text.secondary} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="automated" 
                  name="Automated" 
                  stroke={theme.palette.success.main} 
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="manual" 
                  name="Manual" 
                  stroke={theme.palette.warning.main} 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

      </Grid>
    </Paper>
  );
};

export default AnalyticsPage;