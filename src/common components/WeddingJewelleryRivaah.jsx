import React from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';

const WeddingJewelleryRivaah = ({ reel1Video, reel2Video, instaPhotosImage }) => {
    return (
        <Box sx={{
            py: 8,
            backgroundColor: '#fff',
            position: 'relative',
            zIndex: 1
        }}>
            <Container maxWidth="lg">
                {/* Section Title */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h4" component="h2" sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 600,
                        color: '#8B1538',
                        fontSize: { xs: '1.6rem', md: '2rem' },
                        mb: 1,
                        lineHeight: 1.2
                    }}>
                        Be a trendsetter with Rivaah Wedding Jewellery
                    </Typography>
                    <Typography variant="h6" sx={{
                        fontFamily: '"Playfair Display", serif',
                        color: '#666',
                        fontSize: { xs: '0.9rem', md: '1rem' },
                        fontWeight: 400
                    }}>
                        Trendy Looks Styled by Rivaah
                    </Typography>
                </Box>

                {/* Main Content Grid */}
                <Grid container spacing={3} alignItems="stretch">
                    {/* Left Side - Two Videos */}
                    <Grid item xs={12} md={7}>
                        <Grid container spacing={2} sx={{ height: '100%' }}>
                            {/* Left Video */}
                            <Grid item xs={6}>
                                <Box sx={{
                                    position: 'relative',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                                    '&:hover': {
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0 12px 32px rgba(0,0,0,0.18)'
                                    },
                                    transition: 'all 0.3s ease',
                                    height: '450px'
                                }}>
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    >
                                        <source src={reel1Video} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>

                                    {/* Video Overlay */}
                                    <Box sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                                        p: 2,
                                        color: '#fff'
                                    }}>
                                        <Typography sx={{
                                            fontSize: '12px',
                                            fontWeight: 500,
                                            mb: 1,
                                            opacity: 0.9
                                        }}>
                                            Tanishq - Rivaah X Tarun Tahiliani
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            sx={{
                                                backgroundColor: 'rgba(139,21,56,0.9)',
                                                color: '#fff',
                                                fontSize: '10px',
                                                px: 1.5,
                                                py: 0.3,
                                                borderRadius: '15px',
                                                minHeight: 'auto',
                                                '&:hover': {
                                                    backgroundColor: '#8B1538'
                                                }
                                            }}
                                        >
                                            Explore Now
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>

                            {/* Right Video */}
                            <Grid item xs={6}>
                                <Box sx={{
                                    position: 'relative',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                                    '&:hover': {
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0 12px 32px rgba(0,0,0,0.18)'
                                    },
                                    transition: 'all 0.3s ease',
                                    height: '450px'
                                }}>
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    >
                                        <source src={reel2Video} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>

                                    {/* Video Overlay */}
                                    <Box sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                                        p: 2,
                                        color: '#fff'
                                    }}>
                                        <Typography sx={{
                                            fontSize: '12px',
                                            fontWeight: 500,
                                            mb: 1,
                                            opacity: 0.9
                                        }}>
                                            Tanishq - Rivaah X Tarun Tahiliani
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            sx={{
                                                backgroundColor: 'rgba(139,21,56,0.9)',
                                                color: '#fff',
                                                fontSize: '10px',
                                                px: 1.5,
                                                py: 0.3,
                                                borderRadius: '15px',
                                                minHeight: 'auto',
                                                '&:hover': {
                                                    backgroundColor: '#8B1538'
                                                }
                                            }}
                                        >
                                            Explore Now
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Right Side - Instagram Photos Grid */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{
                            position: 'relative',
                            height: '450px',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 10px 28px rgba(0,0,0,0.15)'
                            },
                            transition: 'all 0.3s ease'
                        }}>
                            <img
                                src={instaPhotosImage}
                                alt="Rivaah Instagram Photos"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '16px'
                                }}
                            />

                            {/* Instagram Profile Info Overlay */}
                            <Box sx={{
                                position: 'absolute',
                                top: 15,
                                right: 15,
                                backgroundColor: 'rgba(255,255,255,0.95)',
                                borderRadius: '8px',
                                p: 1.5,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                minWidth: '140px'
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Box sx={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: '50%',
                                        backgroundColor: '#8B1538',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mr: 1,
                                        background: 'linear-gradient(135deg, #8B1538, #6B1028)'
                                    }}>
                                        <Typography sx={{
                                            color: '#fff',
                                            fontSize: '12px',
                                            fontWeight: 700,
                                            fontFamily: '"Playfair Display", serif'
                                        }}>
                                            R
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{
                                            fontSize: '11px',
                                            fontWeight: 600,
                                            color: '#333',
                                            fontFamily: '"Playfair Display", serif'
                                        }}>
                                            Rivaahbytanishq
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '12px',
                                    color: '#666',
                                    fontWeight: 500
                                }}>
                                    <span>937 posts</span>
                                    <span>69.2K followers</span>
                                </Box>
                            </Box>

                            {/* Follow Button Overlay */}
                            <Box sx={{
                                position: 'absolute',
                                bottom: 15,
                                left: '50%',
                                transform: 'translateX(-50%)'
                            }}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    sx={{
                                        backgroundColor: '#8B1538',
                                        color: '#fff',
                                        px: 2.5,
                                        py: 0.5,
                                        fontSize: '11px',
                                        fontWeight: 600,
                                        borderRadius: '20px',
                                        boxShadow: '0 2px 8px rgba(139,21,56,0.3)',
                                        minHeight: 'auto',
                                        '&:hover': {
                                            backgroundColor: '#6B1028',
                                            transform: 'translateY(-1px)',
                                            boxShadow: '0 4px 12px rgba(139,21,56,0.4)'
                                        },
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    Follow @rivaahbytanishq
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default WeddingJewelleryRivaah;