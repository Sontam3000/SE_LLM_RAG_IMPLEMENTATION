// UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Chip,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import SideNavPanel from './userComponent/SideNavPanel';
import Header from './userComponent/Header';
import { db } from '../../firebase/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { useDepartmentCourse } from '../user/userComponent/DepartmentCourseContext';

const LLAMA_API_URL = "http://csai01:8000/generate";
const GEMINI_API_KEY = "AIzaSyAgqlglqIAODoxa1-QC9Qd8LQRKyW-RFT8"; 
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
const ChatGPT_KEY = process.env.REACT_APP_OPENAI_API_KEY;

// Fetch model settings from Firestore
async function fetchModelSettings() {
  const docRef = doc(db, 'payload', 'modelSettings');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return docSnap.data();
  throw new Error("No model settings found!");
}

// Fetch context for a specific department & course
async function fetchContextText(department, course) {
  const querySnapshot = await getDocs(collection(db, 'context'));

  const matched = querySnapshot.docs.find(doc => {
    const data = doc.data();
    const dbDept = (data.dept || '').trim().toLowerCase();
    const dbCourse = (data.course || '').trim().toLowerCase();
    return dbDept === department.trim().toLowerCase() && dbCourse === course.trim().toLowerCase();
  });

  return matched ? matched.data().context || '' : 'No context found for selected department and course.';
}

//Geimni Call
async function callGemini(prompt, context) {
  const payload = {
    contents: [{ parts: [{ text: `${context}\nUser Query: ${prompt}` }] }]
  };

  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) throw new Error(`Gemini API error: ${await response.text()}`);
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
}

// ChatGPT API call
async function callChatGPT(prompt) {
  const settings = await fetchModelSettings();
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ChatGPT_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: settings.temperature,
      max_tokens: settings.maxTokens,
      top_p: settings.topP,
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message);
  return data.choices[0].message.content;
}

const UserDashboard = () => {
  const { department, course, llm } = useDepartmentCourse();

  const [messages, setMessages] = useState([
    { sender: 'InfoBot', text: 'Hello! How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');
  const [contextText, setContextText] = useState('');
  const [loading, setLoading] = useState(false);
  console.log(contextText)

  useEffect(() => {
    const loadContext = async () => {
      if (!department || !course) return;
      const context = await fetchContextText(department, course);
      setContextText(context);
    };
    loadContext();
  }, [department, course]);

  const talkToLLM = async (prompt) => {
    const settings = await fetchModelSettings();
    const dept = (department || '').trim().toLowerCase();
    const crs = (course || '').trim().toLowerCase();
    const context = await fetchContextText(dept, crs);

    const fullPrompt = `${context}\nUser Query: ${prompt}`;
    console.log(fullPrompt)
    console.log(settings.frequencyPenalty)
    switch (llm) {
      case 'Gemini':
        return await callGemini(fullPrompt, context);
        //Llama Call
      case 'Llama': {
        const payload = {
          prompt: fullPrompt,
          model: settings.model,
          max_tokens: settings.maxTokens,
          temperature: settings.temperature,
          top_p: settings.topP,
          repetition_penalty: settings.frequencyPenalty,
        };
      
        const response = await fetch(LLAMA_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error(`LLama error: ${await response.text()}`);
        const data = await response.json();
        return data.response.content;
      }
      case 'ChatGPT':
        return await callChatGPT(fullPrompt);
      default:
        throw new Error("Unsupported LLM selected");
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { sender: 'User', text: input }]);
      setInput('');
      setLoading(true);
      try {
        const reply = await talkToLLM(input);
        setMessages(prev => [...prev, { sender: 'InfoBot', text: reply }]);
      } catch {
        setMessages(prev => [...prev, { sender: 'InfoBot', text: 'Error processing your request.' }]);
      }
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <SideNavPanel />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box sx={{ padding: '1.5rem', borderBottom: '1px solid #444' }}>
          <Typography variant="h5" fontWeight="bold">InfoBot Chat Interface</Typography>
        </Box>
        <Box sx={{
          flex: 1,
          overflowY: 'auto',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
        }}>
          {messages.map((msg, i) => (
            <Paper
              key={i}
              sx={{
                padding: '1rem',
                maxWidth: '60%',
                backgroundColor: msg.sender === 'InfoBot' ? '#2c2c2c' : '#1e1e1e',
                alignSelf: msg.sender === 'InfoBot' ? 'flex-start' : 'flex-end',
                marginRight: msg.sender === 'InfoBot' ? '4em' : 0,
                marginLeft: msg.sender === 'User' ? '4em' : 0,
                borderRadius: '12px',
                borderTopLeftRadius: msg.sender === 'InfoBot' ? 0 : '12px',
                borderTopRightRadius: msg.sender === 'User' ? 0 : '12px',
              }}
            >
              <Typography variant="body1">
                {msg.sender === 'InfoBot' && <Chip icon={<FaceRetouchingNaturalIcon />} label={llm} size='small' />}
                &nbsp;&nbsp;<b>{msg.sender}</b>: {msg.text}
              </Typography>
            </Paper>
          ))}

          {loading && (
            <Paper
              sx={{
                padding: '1rem',
                maxWidth: '60%',
                backgroundColor: '#2c2c2c',
                alignSelf: 'flex-start',
                marginRight: '4em',
                borderRadius: '12px',
                borderTopLeftRadius: 0,
              }}
            >
              <Typography variant="body1">
                <Chip icon={<FaceRetouchingNaturalIcon />} label={llm} size='small' />
                <b>&nbsp;&nbsp;InfoBot: Typing...</b>
              </Typography>
            </Paper>
          )}
        </Box>

        {/* Input Area */}
        <Box sx={{
          padding: '1rem',
          borderTop: '1px solid #444',
          display: 'flex',
          alignItems: 'center',
        }}>
          <TextField
            placeholder="Type your message..."
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            fullWidth
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <IconButton color="primary" onClick={handleSend} sx={{ marginLeft: '1rem' }}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default UserDashboard;
