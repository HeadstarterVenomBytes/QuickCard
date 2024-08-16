import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

const PricingCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
  textAlign: 'center',
}));

const PricingPlans: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" flexWrap="wrap" p={2}>
      <PricingCard>
        <CardContent>
          <Typography variant="h5" component="div">
            Basic Plan
          </Typography>
          <Typography variant="h6" color="text.secondary">
            $10 / month
          </Typography>
          <Typography variant="body2" color="text.primary" paragraph>
            Add feature 1
          </Typography>
          <Typography variant="body2" color="text.primary" paragraph>
            Add feature 2
          </Typography>
          <Typography variant="body2" color="text.primary" paragraph>
            Add feature 3
          </Typography>
          <Button variant="contained" color="primary">
            Sign Up
          </Button>
        </CardContent>
      </PricingCard>
      <PricingCard sx={{ bgcolor: 'primary.main', color: 'white' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Pro Plan
          </Typography>
          <Typography variant="h6" color="inherit">
            $30 / month
          </Typography>
          <Typography variant="body2" color="inherit" paragraph>
            add feature A
          </Typography>
          <Typography variant="body2" color="inherit" paragraph>
            Add Feature B
          </Typography>
          <Typography variant="body2" color="inherit" paragraph>
            Add Feature C
          </Typography>
          <Button variant="contained" color="secondary">
            Sign Up
          </Button>
        </CardContent>
      </PricingCard>
    </Box>
  );
};

export default PricingPlans;
