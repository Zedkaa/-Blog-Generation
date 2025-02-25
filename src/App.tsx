import { useState } from "react";
import "./App.css";
import {
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  SelectChangeEvent,
  Paper,
  Button,
  Typography,
} from "@mui/material/";
import { generateBlog } from "./api/openai";


// const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
// console.log(API_KEY)


function App() {
  const [Title, setTitle] = useState<string>("");
  const [Topic, setTopic] = useState<string>("");
  const [Keywords, setKeywords] = useState<string>("");
  const [Style, setStyle] = useState<string>("");
  const [Length, setLength] = useState<number>(50);  
  const [Target, setTarget] = useState<string>("");


  const [blogContent, setBlogContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);


  const marks = [
    {
      value: 0,
      label: "short",
    },
    {
      value: 50,
      label: "medium",
    },
    {
      value: 100,
      label: "long",
    },
  ];

  function valuetext(value: number) {
    return `${value}`;
  }

  const handleGenerateBlog = async () => {
    setLoading(true);
    try {
      const content = await generateBlog(Title, Topic, Keywords, Style, Target, Length);
      if (content !== null) {
        setBlogContent(content);
      } else {
        setBlogContent(""); 
      }
    } catch (error) {
      console.error("Error generating blog:", error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 3, marginTop: 5, borderRadius: 2 }}>
          <TextField
            id="outlined-basic-Title"
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          />
          <TextField
            id="outlined-basic-Topic"
            label="Blog-Topic"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTopic(e.target.value)}
          />
          <TextField
            id="outlined-basic-Keywords"
            label="Keywords"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeywords(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="demo-simple-select-label-Style">Tone/Style</InputLabel>
            <Select
              labelId="demo-simple-select-label-Style"
              id="demo-simple-select-Style"
              value={Style}
              label="Tone/Style"
              onChange={(e: SelectChangeEvent) => setStyle(e.target.value)}
            >
              <MenuItem value="professional">professional</MenuItem>
              <MenuItem value="casual">casual</MenuItem>
              <MenuItem value="informative">informative</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="outlined-basic-Target"
            label="Target Audience"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTarget(e.target.value)}
          />
          <Slider
            aria-label="Length"
            value={Length} 
            getAriaValueText={valuetext}
            step={50}
            valueLabelDisplay="auto"
            marks={marks}
            onChange={(_event: Event , newValue: number | number[]) => setLength(newValue as number)}  
          />

          <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleGenerateBlog}>
            Generate Blog
          </Button>
          {/* {blogContent && (
            <Paper elevation={3} sx={{ padding: 3, marginTop: 5, borderRadius: 2 }}>
              <Typography variant="h6">Generated Blog:</Typography>
              <Typography variant="body1">{blogContent}</Typography>
            </Paper>
          )} */}

          
        {loading ? <Typography>Loading...</Typography> : blogContent && (
          <Typography variant="body1" sx={{ marginTop: 3 }}>
            {blogContent}
          </Typography>
        )}

        </Paper>
      </Container>
    </>
  );
}

export default App;
