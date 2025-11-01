import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  FormControl,
  Box,
  InputLabel,
  Button,
  TextField,
  Autocomplete,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useDepartmentCourse } from './DepartmentCourseContext.js';
import Fuse from 'fuse.js';

const Header = () => {
  // eslint-disable-next-line 
  const [courseOptions, setCourseOptions] = useState([]); 
  const [filteredCourses, setFilteredCourses] = useState([]); 
  // eslint-disable-next-line 
  const [courseInput, setCourseInput] = useState('');
  const navigate = useNavigate();
// eslint-disable-next-line 
  const { department, course, setDepartment, setCourse, llm, updateLlm } = useDepartmentCourse();

  const [fuse, setFuse] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const docRef = collection(db, 'context');
      const docSnap = await getDocs(docRef);

      const courses = [];

      docSnap.forEach((doc) => {
        const data = doc.data();
        if (data.course && data.dept) {
          courses.push({ course: data.course, dept: data.dept });
        }
      });

      setCourseOptions(courses);
      setFuse(new Fuse(courses, { keys: ['course'], threshold: 0.4 }));
    };

    fetchData();
  }, []);

  const handleCourseSelect = (event, selected) => {
    if (selected) {
      setCourse(selected.course);
      setDepartment(selected.dept);
    }
  };

  const handleCourseInputChange = (event, inputValue) => {
    setCourseInput(inputValue);

    if (inputValue.trim().length > 0 && fuse) {
      const results = fuse.search(inputValue).map((r) => r.item);
      setFilteredCourses(results);
    } else {
      setFilteredCourses([]);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000', padding: '0.1em' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
            <TextField
              label="Department"
              variant="outlined"
              size="small"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              disabled
            />
          </FormControl>

          <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
            <Autocomplete
              freeSolo
              size="small"
              options={filteredCourses}
              getOptionLabel={(option) => (typeof option === 'string' ? option : option.course)}
              onInputChange={handleCourseInputChange}
              onChange={handleCourseSelect}
              filterOptions={(x) => x} // Don't filter again (Fuse already did)
              renderInput={(params) => (
                <TextField {...params} label="Course" variant="outlined" />
              )}
            />
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="llm-label">Choose LLM</InputLabel>
            <Select
              labelId="llm-label"
              id="llm-select"
              value={llm}
              onChange={(e) => updateLlm(e.target.value)}
              label="LLM"
            >
              <MenuItem value="Gemini">Gemini</MenuItem>
              <MenuItem value="Llama">Llama</MenuItem>
              <MenuItem value="ChatGPT">ChatGPT</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={() => navigate('/user/feedback')}
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              '&:hover': { backgroundColor: '#333' },
            }}
          >
            Give Feedback
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
