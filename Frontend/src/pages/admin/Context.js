import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Input } from '@mui/material';
import AdminNavPanel from './adminComponent/AdminNavPanel';
import { db } from '../../firebase/firebase';
import { collection, 
  addDoc, 
 Timestamp 
}
from 'firebase/firestore';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/webpack'; 
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${getDocument.version}/pdf.worker.min.js`;

const Context = () => {
  const [formData, setFormData] = useState({
    department: '',
    courseName: '',
    context: '',
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async (e) => {
        const typedarray = new Uint8Array(e.target.result);
        try {
          const pdf = await getDocument(typedarray).promise;
          let text = '';
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const content = await page.getTextContent();
            const pageText = content.items.map((item) => item.str).join(' ');
            text += pageText + '\n';
          }
          resolve(text);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const handleSubmit = async () => {
    if (!formData.department || !formData.courseName || !formData.context || !formData.file) {
      alert('Please fill all fields and upload a PDF.');
      return;
    }

    setLoading(true);

    try {
      // extract text from PDF
      const pdfText = await extractTextFromPDF(formData.file);

      // add to firestore
      await addDoc(collection(db, 'context'), {
        dept: formData.department,
        course: formData.courseName,
        context: formData.context + pdfText,
        createdAt: Timestamp.now(),
      });

      alert('Context uploaded successfully!');
      setFormData({ depart: '', course: '', context: '', file: null });
    } catch (error) {
      console.error('Error uploading context:', error);
      alert('Failed to upload context.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AdminNavPanel />
      <Box sx={{ flex: 1, backgroundColor: 'background.default', color: 'text.primary', padding: '2rem' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '2rem' }}>
          Update Context
        </Typography>

        <Paper sx={{ padding: '2rem', borderRadius: '10px' }}>
          <TextField
            label="Department Name"
            name="department"
            value={formData.department}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '1.5rem' }}
          />
          <TextField
            label="Course Name"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '1.5rem' }}
          />
          <TextField
            label="Context"
            name="context"
            multiline
            value={formData.context}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '1.5rem' }}
          />
          <label htmlFor="pdf-upload" style={{ display: 'block', marginBottom: '1rem' }}>Upload PDF</label>
          <Input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            sx={{ marginBottom: '2rem' }}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{ backgroundColor: '#000', marginLeft: '2em', color: '#fff', '&:hover': { backgroundColor: '#333' } }}
          >
            {loading ? 'Uploading...' : 'Update Context'}
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default Context;
