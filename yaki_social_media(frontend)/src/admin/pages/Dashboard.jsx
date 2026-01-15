import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { DoughnutChart, LineChart } from '../../shared/components/Charts';

const Dashboard = () => {
  return (
    <div className="p-6">
      <Typography variant="h4" gutterBottom className="font-bold text-gray-800">
        Dashboard Overview
      </Typography>
      
      <Grid container spacing={3} className="mb-6">
        <Grid item xs={12} md={4}>
          <Card sx={{borderRadius: '15px', border: '1px solid rgba(0, 0, 0, 0.04)'}}>
            <CardContent>
              <Typography variant="h6" className="text-gray-600" sx={{fontSize: '0.875rem'}}>Total Users</Typography>
              <Typography variant="h4" className="font-bold text-gray-800" sx={{fontWeight:'bold'}}>1,234</Typography>
              <Typography variant="body2" className="text-green-500" >↑ 12% </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{borderRadius: '15px', border: '1px solid rgba(0, 0, 0, 0.04)'}}>
            <CardContent>
              <Typography variant="h6" className="text-gray-600">Active Sessions</Typography>
              <Typography variant="h4" className="font-bold text-gray-800" sx={{fontWeight:'bold'}}>56</Typography>
              <Typography variant="body2" className="text-green-500">↑ 5% </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{borderRadius: '15px', border: '1px solid rgba(0, 0, 0, 0.04)'}}>
            <CardContent>
              <Typography variant="h6" className="text-gray-600">Pending Tasks</Typography>
              <Typography variant="h4" className="font-bold text-gray-800" sx={{fontWeight:'bold'}}>12</Typography>
              <Typography variant="body2" className="text-red-500">↓ 3% </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card className="shadow-lg rounded-lg p-4">
            <Typography variant="h6" className="mb-4 text-gray-700">User Activity</Typography>
            <LineChart />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="shadow-lg rounded-lg p-4">
            <Typography variant="h6" className="mb-4 text-gray-700">User Distribution</Typography>
            <DoughnutChart />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;