import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import axiosInstance from '../../common components/AxiosInstance';

export default function VideoUpload() {
    const [video, setVideo] = useState(null);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const handleFileChange = (e) => setVideo(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!video || !title) return alert("Both title and video required");
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', desc);
        formData.append('video', video);

        try {
            await axiosInstance.post('/videos/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Video uploaded!');
            setVideo(null); setTitle(''); setDesc('');
        } catch (err) {
            alert('Error uploading video');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 480, mx: 'auto', my: 6 }}>
            <Typography variant="h6" gutterBottom>Upload Video</Typography>
            <TextField
                fullWidth label="Title" margin="normal"
                value={title} onChange={e => setTitle(e.target.value)}
                required
            />
            <TextField
                fullWidth label="Description" margin="normal"
                value={desc} onChange={e => setDesc(e.target.value)}
                multiline rows={2}
            />
            <Button
                variant="contained" component="label" fullWidth sx={{ my: 2 }}
            >
                Select Video
                <input type="file" hidden accept="video/*" onChange={handleFileChange} />
            </Button>
            {video && <Typography>Selected: {video.name}</Typography>}
            <Button type="submit" variant="contained" disabled={!video || !title}>
                Upload
            </Button>
        </Box>
    );
}
