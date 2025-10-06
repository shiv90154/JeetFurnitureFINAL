// WeddingPage.jsx
import React, { useState } from "react";
import {
    Container,
    Typography,
    Box,
    Grid,
    Button,
    IconButton,
    TextField,
    InputAdornment,
    styled,
    Fade
} from "@mui/material";
import {
    Search,
    Diamond,
    Spa,
    Celebration,
    LocalOffer,
    ArrowForwardIos
} from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import WedSlider from "./WedSlider";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const reel1Video = "/video/homeVideo.mp4";
const reel2Video = "/video/homeVideo.mp4";
const instaPhotosImage = "/experImg2.png";
const rivaahHeroImage = "/experImg5.png";

const shimmer = keyframes`
  0% { background-position: -468px 0 }
  100% { background-position: 468px 0 }
`;

const GlowButton = styled(Button)({
    position: "relative",
    overflow: "hidden",
    fontWeight: 600,
    "&:before": {
        content: '""',
        position: "absolute",
        top: "-50%",
        left: "-50%",
        right: "-50%",
        bottom: "-50%",
        background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)",
        transform: "rotate(45deg)",
        animation: `${shimmer} 3s infinite linear`,
        opacity: 0,
        transition: "opacity 0.3s",
    },
    "&:hover:before": { opacity: 1 },
});

// Add community images for richer UI
const communityBrides = [
    { name: "Bihari Bride", img: "/brides/bihari.jpg" },
    { name: "Tamil Bride", img: "/brides/tamil.jpg" },
    { name: "Telugu Bride", img: "/brides/telugu.jpg" },
    { name: "Kannadiga Bride", img: "/brides/kannada.jpg" },
    { name: "Gujarati Bride", img: "/brides/gujarati.jpg" },
    { name: "Marathi Bride", img: "/brides/marathi.jpg" },
    { name: "Bengali Bride", img: "/brides/bengali.jpg" },
    { name: "Punjabi Bride", img: "/brides/punjabi.jpg" }
];

const brideCategories = [
    { name: "Necklace Set", icon: <Diamond /> },
    { name: "Long Necklace", icon: <Spa /> },
    { name: "Bangles", icon: <Celebration /> },
    { name: "Diamond", icon: <Diamond /> },
    { name: "Mangalsutra", icon: <LocalOffer /> },
    { name: "Accessories", icon: <Spa /> },
];

const trendingItems = ["Accessories", "Long Necklace", "Bangles", "Necklace Sets", "Diamond Jewellery"];

export default function WeddingPage() {
    return (
        <Box sx={{ backgroundColor: "#fff", overflowX: "hidden" }}>

            {/* HERO SECTION */}
            <Box sx={{ position: "relative", width: "100%", height: { xs: 300, md: 500 }, mb: 8 }}>
                <img
                    src={rivaahHeroImage}
                    alt="Rivaah Wedding Jewellers"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                    }}
                />
                {/* Overlay */}
                <Box sx={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg,rgba(0,0,0,0.3),rgba(0,0,0,0.6))",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    textAlign: "center"
                }}>
                    <Typography variant="h3" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600 }}>
                        For a sparkling new beginning
                    </Typography>
                    <GlowButton sx={{ mt: 3, backgroundColor: "#D4AF37", color: "#000", px: 4, borderRadius: "30px" }}>
                        Explore Collection
                    </GlowButton>
                </Box>
            </Box>

            {/* COMMUNITY BRIDES */}
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Typography variant="h4" align="center" sx={{
                    fontFamily: '"Playfair Display", serif',
                    mb: 4, color: "#8B1538", fontWeight: 600
                }}>
                    Find My Community
                </Typography>

                <Grid container spacing={3}>
                    {communityBrides.map((bride, i) => (
                        <Grid item xs={6} sm={4} md={3} key={i}>
                            <Box sx={{
                                position: "relative",
                                borderRadius: 3,
                                overflow: "hidden",
                                cursor: "pointer",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                "&:hover": { transform: "translateY(-4px)", transition: "0.3s" }
                            }}>
                                <img src={bride.img} alt={bride.name} style={{ width: "100%", height: 180, objectFit: "cover" }} />
                                <Box sx={{
                                    position: "absolute", bottom: 0, left: 0, right: 0,
                                    background: "rgba(0,0,0,0.5)",
                                    p: 1, textAlign: "center"
                                }}>
                                    <Typography sx={{ color: "#fff", fontWeight: 600 }}>{bride.name}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* HANDPICKED FOR THE BRIDE */}
            <Box sx={{ py: 6, backgroundColor: "#faf5f0" }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" align="center" sx={{ fontFamily: '"Playfair Display", serif', mb: 4, color: "#8B1538", fontWeight: 600 }}>
                        Handpicked for the Bride
                    </Typography>
                    <Grid container spacing={4}>
                        {brideCategories.map((cat, i) => (
                            <Grid item xs={6} md={4} lg={2} key={i}>
                                <Box sx={{
                                    p: 3,
                                    backgroundColor: "#fff",
                                    borderRadius: 3,
                                    textAlign: "center",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                    "&:hover": { boxShadow: "0 8px 20px rgba(0,0,0,0.15)" },
                                    transition: "0.3s"
                                }}>
                                    <Box sx={{ fontSize: 40, color: "#D4AF37" }}>{cat.icon}</Box>
                                    <Typography sx={{ fontWeight: 600, mt: 1 }}>{cat.name}</Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* WEDDING OCCASIONS SLIDER */}
            <Box sx={{
                py: 8,
                backgroundColor: "#faf5f0",
                backgroundImage: "linear-gradient(135deg, rgba(139,21,56,0.05), rgba(212,175,55,0.05))"
            }}>
                <Container maxWidth="lg">
                    <Fade timeout={800}>
                        <Typography variant="h4" align="center" sx={{
                            fontFamily: '"Playfair Display", serif',
                            mb: 6, color: "#8B1538", fontWeight: 600,
                            position: "relative",
                            "&:after": {
                                content: '"✧"',
                                position: "absolute",
                                top: -28,
                                left: "50%",
                                transform: "translateX(-50%)",
                                color: "#d4af37",
                                fontSize: "2rem"
                            }
                        }}>
                            Be a Star in Every Wedding Occasion
                        </Typography>
                    </Fade>
                    <WedSlider />
                </Container>
            </Box>
        </Box>
    );
}
