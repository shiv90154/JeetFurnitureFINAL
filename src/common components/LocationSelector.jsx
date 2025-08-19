import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Input,
    Button,
    IconButton,
    FormControl,
    InputAdornment,
    CircularProgress,
    Divider,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function LocationSelector() {
    const [pincode, setPincode] = useState('');
    const [locationName, setLocationName] = useState('');
    const [currentPincode, setCurrentPincode] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [loading, setLoading] = useState(false);

    // Retrieve the last saved location and pincode from localStorage
    useEffect(() => {
        const storedPincode = localStorage.getItem('lastPincode');
        const storedLocation = localStorage.getItem('lastLocation');
        if (storedPincode && storedLocation) {
            setCurrentPincode(storedPincode);
            setLocationName(storedLocation);
        }
    }, []);

    const handleDivClick = () => setShowInput(true);

    const handleInputChange = (e) => setPincode(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=India&format=json`
            );
            const data = await res.json();
            if (data.length > 0) {
                const location = data[0].display_name;
                setLocationName(location);
                setCurrentPincode(pincode);
                localStorage.setItem('lastPincode', pincode);
                localStorage.setItem('lastLocation', location);
            } else {
                setLocationName("Location not found");
                setCurrentPincode(pincode);
                localStorage.setItem('lastPincode', pincode);
                localStorage.setItem('lastLocation', "Location not found");
            }
        } catch (error) {
            setLocationName("Error fetching location");
            setCurrentPincode(pincode);
            localStorage.setItem('lastPincode', pincode);
            localStorage.setItem('lastLocation', "Error fetching location");
        }
        setLoading(false);
        setShowInput(false);
        setPincode('');
    };

    return (
        <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
            {/* Display current location and pincode */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: 1,
                    backgroundColor: '#f5f5f5',
                    borderRadius: 2,
                    boxShadow: 1,
                    mb: 2,
                    transition: '0.3s ease',
                    '&:hover': {
                        backgroundColor: '#eaeaea',
                    },
                }}
                onClick={handleDivClick}
            >
                <LocationOnIcon sx={{ color: '#44170D' }} />
                <Typography sx={{ ml: 2, flex: 1, fontWeight: 500, color: '#3d1822' }}>
                    {currentPincode || 'Enter Pincode'}
                </Typography>
                <Typography sx={{ ml: 1, flex: 2, fontWeight: 500, color: '#616161' }}>
                    {locationName || 'Location not set'}
                </Typography>
                <IconButton sx={{ color: '#44170D' }}>
                    <span>▼</span>
                </IconButton>
            </Box>

            {/* Location input form */}
            {showInput && (
                <form onSubmit={handleSubmit}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#44170D' }}>
                        Choose Location
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        Enter Pincode:
                    </Typography>
                    <FormControl fullWidth>
                        <Input
                            type="text"
                            placeholder="Enter pincode"
                            value={pincode}
                            onChange={handleInputChange}
                            startAdornment={
                                <InputAdornment position="start">📍</InputAdornment>
                            }
                            sx={{
                                mb: 2,
                                backgroundColor: '#f5f5f5',
                                borderRadius: 2,
                                padding: '0 12px',
                            }}
                        />
                    </FormControl>

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            width: '100%',
                            bgcolor: '#44170D',
                            color: '#fff',
                            '&:hover': {
                                bgcolor: '#421304d5',
                            },
                        }}
                    >
                        {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Submit'}
                    </Button>
                </form>
            )}
        </Box>
    );
}
