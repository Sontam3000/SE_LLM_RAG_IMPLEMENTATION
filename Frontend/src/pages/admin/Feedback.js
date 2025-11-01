import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AdminNavPanel from './adminComponent/AdminNavPanel';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'feedback'));
        const feedbackList = querySnapshot.docs.map(doc => {
          const data = doc.data();
          console.log(data); // Log the document data to inspect it

          // Check if createdAt exists and is a Firestore Timestamp
          const date = data.createdAt ? data.createdAt.toDate().toLocaleDateString() : 'No Date Available';

          return {
            feedback: data.feedback,
            date: date,
          };
        });

        // Updating state with fetched feedback
        setFeedbackData(feedbackList);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AdminNavPanel />
      <Box sx={{ flex: 1, backgroundColor: 'background.default', color: 'text.primary', padding: '2rem' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '2rem' }}>
          Feedback
        </Typography>

        <Paper sx={{ padding: '1rem', borderRadius: '10px' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Date</b></TableCell>
                  <TableCell><b>Feedback</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {feedbackData.length > 0 ? (
                  feedbackData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.feedback}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} align="center">No feedback available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default Feedback;
