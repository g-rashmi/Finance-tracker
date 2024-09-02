import { AppBar, Container, Box, TextField, Paper, Button, CircularProgress } from "@mui/material";
import axios from 'axios';
import { useState } from "react";
import { Url } from "./config";
function Chat() {
  const [ques, setQ] = useState('');
  const [Answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const ans = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setAnswer('');
  
    try {
      const res = await axios({
        method: 'post',
        url: Url,
        data: {
          "contents": [
            {
              "parts": [
                {
                  "text": ques 
                }
              ]
            }
          ]
        },
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setAnswer(res.data.candidates[0].content.parts[0].text);
    } catch (error) {
      
      setAnswer('Failed to generate an answer. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AppBar sx={{ height: '40px', textAlign: "center", justifyContent: 'center' }}>Welcome to AI-CHAT</AppBar>
      <Container sx={{ mt: '50px' }} maxWidth="sm">
        <Box>
          <Paper sx={{ mt: 4, p: 3, backgroundColor: "#e3f2fd", boxShadow: 3 }}>
            <form onSubmit={ans}>
              <TextField
                label="Write your question"
                value={ques}
                onChange={(e) => setQ(e.target.value)}
                fullWidth
                margin="normal"
                color='primary'
                required
              />
              <Button variant="contained" color='success' type='submit' sx={{ mt: 2 }}>
                Generate Answer
              </Button>
            </form>
          </Paper>
          <Paper sx={{ mt: 4, p: 3, backgroundColor: "#e3f2fd", boxShadow: 3 }}>
            {loading ? (
              <CircularProgress />
            ) : (
              Answer
            )}
          </Paper>
        </Box>
      </Container>
    </div>
  );
}

export default Chat;
