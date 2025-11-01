import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebase'; 
import SideNavPanel from './userComponent/SideNavPanel';
import Header from './userComponent/Header';

const StudentFeedback = () => {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'feedback'), {
        feedback,
        createdAt: Timestamp.now(),
      });

      alert('Feedback submitted successfully!');
      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Something went wrong. Try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: 'background.default' }}>
      <SideNavPanel />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: '2rem' }}>
            Provide us Feedback Form
          </Typography>

          <TextField
            label="Your Feedback"
            placeholder="Write your thoughts here..."
            multiline
            rows={6}
            fullWidth
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            sx={{ maxWidth: '700px', marginBottom: '2rem' }}
            variant="outlined"
            disabled={isSubmitting}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              paddingX: '2rem',
              paddingY: '0.75rem',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentFeedback;
