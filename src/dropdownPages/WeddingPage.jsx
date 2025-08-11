import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Box,
    Grid,
    Button,
    IconButton,
    Fade,
    Grow,
    Zoom,
    useScrollTrigger,
    styled,
    TextField,
    InputAdornment,
} from "@mui/material";
import {
    ArrowBackIos,
    ArrowForwardIos,
    FavoriteBorder,
    Favorite,
    Search,
    Diamond,
    Spa,
    Celebration,
    LocalOffer,
    Star,
} from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import reel1Video from "/video/homeVideo.mp4"
import reel2Video from "/video/homeVideo.mp4"
import instaPhotosImage from "/experImg2.png"
import rivaahHeroImage from "/experImg5.png"
import WedSlider from "../common components/WedSlider";

// Custom animations
const shimmer = keyframes`
  0% { background-position: -468px 0 }
  100% { background-position: 468px 0 }
`;

const pulse = keyframes`
  0% { transform: scale(1) }
  50% { transform: scale(1.05) }
  100% { transform: scale(1) }
`;

const float = keyframes`
  0% { transform: translateY(0px) }
  50% { transform: translateY(-10px) }
  100% { transform: translateY(0px) }
`;

const sparkle = keyframes`
  0% { opacity: 0; transform: scale(0) rotate(0deg) }
  50% { opacity: 1; transform: scale(1) rotate(180deg) }
  100% { opacity: 0; transform: scale(0) rotate(360deg) }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

// Styled components
const GlowButton = styled(Button)(() => ({
    position: "relative",
    overflow: "hidden",
    "&:before": {
        content: '""',
        position: "absolute",
        top: "-50%",
        left: "-50%",
        right: "-50%",
        bottom: "-50%",
        background:
            "linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)",
        transform: "rotate(45deg)",
        animation: `${shimmer} 3s infinite linear`,
        opacity: 0,
        transition: "opacity 0.3s",
    },
    "&:hover:before": {
        opacity: 1,
    },
}));

const WeddingPage = () => {
    const [wishlist, setWishlist] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredKeyword, setHoveredKeyword] = useState(null);
    const [hoveredPosition, setHoveredPosition] = useState({ x: 0, y: 0 });

    // Scroll trigger for animations
    const trigger = useScrollTrigger({
        threshold: 100,
        disableHysteresis: true,
    });

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const toggleWishlist = (id) => {
        setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // Data arrays
    const communityBrides = [
        "Bihari Bride", "Tamil Bride", "Telugu Bride", "Kannadiga Bride",
        "Gujarati Bride", "Marathi Bride", "Bengali Bride", "Punjabi Bride",
        "UP Bride", "Marwari Bride", "Odia Bride", "Muslim Bride"
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

    const trendingImages = {
        Accessories: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
        "Long Necklace": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
        Bangles: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
        "Necklace Sets": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        "Diamond Jewellery": "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    };

    return (
        <Box
            sx={{
                backgroundColor: "#fff",
                overflowX: "hidden",
                position: "relative",
                "&:before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "100vh",
                    background:
                        "linear-gradient(to bottom, rgba(139,21,56,0.05) 0%, rgba(212,175,55,0.03) 100%)",
                    zIndex: 0,
                },
            }}
        >
            {/* Enhanced Hero Banner */}
            <Box
                sx={{
                    width: "100%",
                    mb: { xs: 4, md: 8 },
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, rgba(139,21,56,0.1), rgba(212,175,55,0.1))',
                        zIndex: 1,
                        pointerEvents: 'none'
                    }
                }}
            >
                <Box sx={{
                    position: 'relative',
                    '&:hover img': {
                        transform: 'scale(1.02)',
                        filter: 'brightness(1.05)'
                    }
                }}>
                    <img
                        src={rivaahHeroImage}
                        alt="Rivaah Wedding Jewellers"
                        style={{
                            width: "100%",
                            height: "auto",
                            maxWidth: "100%",
                            display: "block",
                            transition: 'all 0.8s ease',
                            borderRadius: { xs: '0 0 12px 12px', md: '0 0 20px 20px' },
                            boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                        }}
                    />

                    {/* Floating sparkle elements */}
                    {[...Array(6)].map((_, i) => (
                        <Box
                            key={i}
                            sx={{
                                position: 'absolute',
                                top: `${20 + i * 15}%`,
                                left: `${10 + i * 12}%`,
                                width: '8px',
                                height: '8px',
                                background: '#d4af37',
                                borderRadius: '50%',
                                animation: `${sparkle} ${3 + i * 0.5}s infinite ${i * 0.3}s`,
                                zIndex: 2
                            }}
                        />
                    ))}
                </Box>
            </Box>



            {/* Community Brides Section */}
            <Container maxWidth="lg" sx={{ py: 8, position: "relative", zIndex: 1 }}>
                <Zoom in={trigger} timeout={500}>
                    <Typography
                        variant="h4"
                        component="h2"
                        sx={{
                            textAlign: "center",
                            mb: 4,
                            fontWeight: 400,
                            color: "#8B1538",
                            position: "relative",
                            fontFamily: '"Playfair Display", serif',
                            "&:after": {
                                content: '""',
                                display: "block",
                                width: "80px",
                                height: "2px",
                                backgroundColor: "#d4af37",
                                margin: "16px auto 0",
                                transition: "all 0.3s ease",
                            },
                            "&:hover:after": {
                                width: "120px",
                                backgroundColor: "#8B1538",
                            },
                        }}
                    >
                        For a sparkling new beginning
                    </Typography>
                </Zoom>

                {/* Search Input Field */}
                <Fade in={trigger} timeout={1200}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mb: 4,
                            px: 2,
                        }}
                    >
                        <TextField
                            placeholder="Find my community"
                            variant="outlined"
                            sx={{
                                width: { xs: "100%", sm: "400px", md: "500px" },
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor: "#fff",
                                    borderRadius: "25px",
                                    height: "50px",
                                    fontSize: "16px",
                                    fontFamily: '"Playfair Display", serif',
                                    color: "#666",
                                    border: "2px solid #8B1538",
                                    "& fieldset": {
                                        border: "none",
                                    },
                                    "&:hover": {
                                        boxShadow: "0 4px 12px rgba(139,21,56,0.15)",
                                    },
                                    "&.Mui-focused": {
                                        boxShadow: "0 4px 16px rgba(139,21,56,0.2)",
                                        border: "2px solid #8B1538",
                                    },
                                },
                                "& .MuiInputBase-input": {
                                    padding: "12px 16px",
                                    fontSize: "16px",
                                    fontFamily: '"Playfair Display", serif',
                                    color: "#666",
                                    "&::placeholder": {
                                        color: "#999",
                                        opacity: 1,
                                        fontStyle: "italic",
                                    },
                                },
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            sx={{
                                                backgroundColor: "#8B1538",
                                                color: "#fff",
                                                width: "40px",
                                                height: "40px",
                                                mr: 0.5,
                                                "&:hover": {
                                                    backgroundColor: "#6B1028",
                                                    transform: "scale(1.05)",
                                                },
                                            }}
                                        >
                                            <Search />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Fade>

                <Grow in={trigger} timeout={800}>
                    <Typography
                        variant="h5"
                        component="h3"
                        sx={{
                            textAlign: "center",
                            mb: 6,
                            fontWeight: 500,
                            color: "#000",
                            fontFamily: '"Playfair Display", serif',
                            letterSpacing: "0.05em",
                        }}
                    >
                        Find my community
                    </Typography>
                </Grow>

                <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3, mb: 6 }}>
                    {communityBrides.map((bride, index) => (
                        <Grow in={trigger} timeout={300 + index * 100} key={index}>
                            <Box
                                sx={{
                                    px: 3, py: 1.2, border: "2px solid #8B1538", borderRadius: 999,
                                    color: "#8B1538", fontWeight: 600, fontFamily: "Playfair Display, serif",
                                    fontSize: "1.1rem", background: "linear-gradient(135deg, #fff 0%, #fafafa 100%)",
                                    boxShadow: "0 4px 12px rgba(139,21,56,0.08)", cursor: "pointer",
                                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)", position: "relative",
                                    overflow: "hidden",
                                    "&:before": {
                                        content: '""', position: "absolute", top: 0, left: 0,
                                        width: "100%", height: "100%",
                                        background: "linear-gradient(45deg, rgba(212,175,55,0.2), rgba(139,21,56,0.1))",
                                        transform: "translateX(-100%)", transition: "transform 0.6s ease",
                                    },
                                    "&:hover": {
                                        background: "linear-gradient(135deg, #f8e8ef 0%, #fff5f8 100%)",
                                        borderColor: "#d4af37", boxShadow: "0 8px 24px rgba(139,21,56,0.15)",
                                        transform: "translateY(-3px) scale(1.02)",
                                        "&:before": { transform: "translateX(100%)" }
                                    },
                                }}
                            >
                                {bride}
                            </Box>
                        </Grow>
                    ))}
                </Box>
            </Container>

            {/* Handpicked for the Bride Section */}
            <Box
                sx={{
                    py: 8,
                    backgroundColor: "#faf5f0",
                    backgroundImage:
                        "radial-gradient(circle at 10% 20%, rgba(212,175,55,0.1) 0%, rgba(139,21,56,0.1) 90%)",
                    position: "relative",
                    zIndex: 1,
                    overflow: "hidden",
                    "&:before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "1px",
                        background:
                            "linear-gradient(90deg, transparent, rgba(139,21,56,0.2), transparent)",
                    },
                    "&:after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "1px",
                        background:
                            "linear-gradient(90deg, transparent, rgba(139,21,56,0.2), transparent)",
                    },
                }}
            >
                <Container maxWidth="lg">
                    <Fade in={trigger} timeout={1000}>
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{
                                textAlign: "center",
                                mb: 6,
                                fontWeight: 500,
                                color: "#8B1538",
                                position: "relative",
                                display: "inline-block",
                                left: "50%",
                                transform: "translateX(-50%)",
                                fontFamily: '"Playfair Display", serif',
                                "&:after": {
                                    content: '""',
                                    position: "absolute",
                                    bottom: -12,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    width: "80%",
                                    height: "3px",
                                    background:
                                        "linear-gradient(90deg, #8B1538 0%, #d4af37 100%)",
                                    borderRadius: 3,
                                },
                            }}
                        >
                            Handpicked for the Bride
                        </Typography>
                    </Fade>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "nowrap",
                            gap: { xs: 1, sm: 2, md: 3 },
                            px: { xs: 1, sm: 2 },
                            overflowX: { xs: "auto", md: "visible" },
                            "&::-webkit-scrollbar": {
                                display: "none",
                            },
                            scrollbarWidth: "none",
                        }}
                    >
                        {brideCategories.map((category, index) => (
                            <Grow in={trigger} timeout={index * 200} key={index}>
                                <Box
                                    sx={{
                                        borderRadius: 3,
                                        overflow: "hidden",
                                        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                                        background:
                                            "linear-gradient(180deg, #fff 70%, #f8f0f5 100%)",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                            boxShadow: "0 6px 24px rgba(139,21,56,0.12)",
                                        },
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        pb: 1.5,
                                        width: { xs: 130, sm: 150, md: 170, lg: 180 },
                                        height: { xs: 180, sm: 200, md: 220 },
                                        minWidth: { xs: 130, sm: 150, md: 170, lg: 180 },
                                        position: "relative",
                                        cursor: "pointer",
                                        border: "1px solid rgba(139,21,56,0.08)",
                                        flexShrink: 0,
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={category.image}
                                        alt={category.name}
                                        sx={{
                                            width: "100%",
                                            height: { xs: 110, sm: 130, md: 150 },
                                            objectFit: "cover",
                                            borderTopLeftRadius: 12,
                                            borderTopRightRadius: 12,
                                            transition: "transform 0.3s ease",
                                            "&:hover": {
                                                transform: "scale(1.03)",
                                            },
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 6,
                                            right: 6,
                                            zIndex: 2,
                                            opacity: 0.9,
                                            "&:hover": {
                                                opacity: 1,
                                                transform: "scale(1.05)",
                                            },
                                        }}
                                    >
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleWishlist(index);
                                            }}
                                            sx={{
                                                backgroundColor: "rgba(255,255,255,0.95)",
                                                width: 24,
                                                height: 24,
                                                "&:hover": {
                                                    backgroundColor: "rgba(255,255,255,1)",
                                                },
                                            }}
                                        >
                                            {wishlist[index] ? (
                                                <Favorite sx={{ color: "#8B1538", fontSize: "14px" }} />
                                            ) : (
                                                <FavoriteBorder
                                                    sx={{ color: "#8B1538", fontSize: "14px" }}
                                                />
                                            )}
                                        </IconButton>
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mt: 1,
                                            fontWeight: 600,
                                            color: "#8B1538",
                                            fontFamily: "Playfair Display, serif",
                                            textAlign: "center",
                                            fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" },
                                            px: 0.5,
                                            lineHeight: 1.1,
                                        }}
                                    >
                                        {category.name}
                                    </Typography>
                                </Box>
                            </Grow>
                        ))}
                    </Box>

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            textAlign: "center",
                            mt: 2,
                            fontWeight: 500,
                            color: "#8B1538",
                            fontFamily: '"Playfair Display", serif',
                            letterSpacing: 1,
                        }}
                    >
                        Introducing Bride's Dream list
                    </Typography>
                </Container>
            </Box>

            {/* What other brides are looking for */}
            <Container maxWidth="lg" sx={{ py: 8, position: "relative", zIndex: 1 }}>
                {/* Decorative icon above the title */}
                <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                    <Diamond
                        sx={{
                            fontSize: "2.5rem",
                            color: "#8B1538",
                            animation: `${float} 4s ease-in-out infinite`,
                        }}
                    />
                </Box>
                <Fade in={trigger} timeout={800}>
                    <Typography
                        variant="h4"
                        component="h2"
                        sx={{
                            textAlign: "center",
                            mb: 6,
                            fontWeight: 500,
                            color: "#8B1538",
                            fontFamily: "Playfair Display, serif",
                            fontSize: { xs: "1.8rem", md: "2.2rem" },
                            letterSpacing: 1,
                            position: "relative",
                        }}
                    >
                        What other brides are looking for
                    </Typography>
                </Fade>

                {/* Enhanced Keyword marquees with continuous scrolling */}
                <Box
                    sx={{
                        background: "linear-gradient(135deg, #f8e8ef 0%, #fff 30%, #f0f8ff 70%, #f8e8ef 100%)",
                        backgroundSize: "400% 400%",
                        animation: `${gradientShift} 8s ease infinite`,
                        borderRadius: 4,
                        py: 6,
                        px: 0,
                        mb: 4,
                        overflow: "hidden",
                        position: "relative",
                        boxShadow: "0 8px 32px rgba(139,21,56,0.12)",
                        border: "1px solid rgba(212,175,55,0.2)",
                        "&:before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: "linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 15%, rgba(255,255,255,0) 85%, rgba(255,255,255,0.95) 100%)",
                            zIndex: 2,
                            pointerEvents: "none",
                        },
                        "&:after": {
                            content: '""',
                            position: "absolute",
                            top: "10%",
                            left: "5%",
                            width: "90%",
                            height: "80%",
                            background: "radial-gradient(ellipse at center, rgba(212,175,55,0.05) 0%, transparent 70%)",
                            borderRadius: "50%",
                            zIndex: 1,
                            pointerEvents: "none"
                        }
                    }}
                >
                    {Array.from({ length: 6 }).map((_, rowIdx) => {
                        // Create repeated items for seamless scrolling
                        const repeatedItems = Array(4).fill(trendingItems).flat();

                        return (
                            <Box
                                key={`marquee-row-${rowIdx}`}
                                sx={{
                                    whiteSpace: "nowrap",
                                    display: "flex",
                                    alignItems: "center",
                                    animation: `${rowIdx % 2 === 0 ? "marquee-left" : "marquee-right"
                                        } ${20 + rowIdx * 2}s linear infinite`,
                                    mb: rowIdx === 5 ? 0 : 1,
                                    "@keyframes marquee-left": {
                                        "0%": { transform: "translateX(0%)" },
                                        "100%": { transform: "translateX(-50%)" },
                                    },
                                    "@keyframes marquee-right": {
                                        "0%": { transform: "translateX(-50%)" },
                                        "100%": { transform: "translateX(0%)" },
                                    },
                                }}
                            >
                                {repeatedItems.map((item, colIdx) => (
                                    <Typography
                                        key={`marquee-${rowIdx}-${colIdx}`}
                                        variant="h6"
                                        sx={{
                                            fontFamily:
                                                colIdx % 3 === 0
                                                    ? "Dancing Script, cursive"
                                                    : colIdx % 3 === 1
                                                        ? "Playfair Display, serif"
                                                        : "Georgia, serif",
                                            fontWeight:
                                                colIdx % 3 === 0 ? 700 : colIdx % 3 === 1 ? 500 : 600,
                                            fontSize: { xs: "1.2rem", md: "1.6rem", lg: "1.8rem" },
                                            color: rowIdx % 2 === 0 ? "#8B1538" : "#2C5530",
                                            mx: { xs: 2, md: 4 },
                                            letterSpacing: 0.8,
                                            transition: "all 0.4s ease",
                                            cursor: "pointer",
                                            display: "inline-block",
                                            position: "relative",
                                            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                                            "&:hover": {
                                                color: "#d4af37",
                                                transform: "scale(1.15) rotate(2deg)",
                                                textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                                                zIndex: 10,
                                            },
                                            "&:after": {
                                                content: '""',
                                                position: "absolute",
                                                bottom: -6,
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                width: "0%",
                                                height: "3px",
                                                backgroundColor: "#d4af37",
                                                borderRadius: "2px",
                                                transition: "width 0.4s ease",
                                                boxShadow: "0 2px 4px rgba(212,175,55,0.3)",
                                            },
                                            "&:hover:after": {
                                                width: "120%",
                                            },
                                            "&:before": {
                                                content: '""',
                                                position: "absolute",
                                                top: "50%",
                                                left: "50%",
                                                transform: "translate(-50%, -50%)",
                                                width: "0%",
                                                height: "0%",
                                                backgroundColor: "rgba(212,175,55,0.1)",
                                                borderRadius: "50%",
                                                transition: "all 0.4s ease",
                                                zIndex: -1,
                                            },
                                            "&:hover:before": {
                                                width: "150%",
                                                height: "200%",
                                            },
                                        }}
                                        onMouseEnter={(e) => {
                                            const rect = e.target.getBoundingClientRect();
                                            setHoveredKeyword(item);
                                            setHoveredPosition({
                                                x: rect.left + rect.width / 2,
                                                y: rect.top,
                                            });
                                        }}
                                        onMouseLeave={() => setHoveredKeyword(null)}
                                    >
                                        {item}
                                    </Typography>
                                ))}
                            </Box>
                        );
                    })}
                    {/* Enhanced Floating image preview */}
                    {hoveredKeyword && trendingImages[hoveredKeyword] && (
                        <Box
                            sx={{
                                position: "fixed",
                                top: hoveredPosition.y - 180,
                                left: hoveredPosition.x - 100,
                                zIndex: 2000,
                                pointerEvents: "none",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                opacity: 1,
                                animation: `${float} 4s ease-in-out infinite`,
                                transformOrigin: "center bottom",
                                filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))",
                            }}
                        >
                            <Box
                                sx={{
                                    position: "relative",
                                    transform: "rotate(-3deg)",
                                    "&:before": {
                                        content: '""',
                                        position: "absolute",
                                        top: -15,
                                        left: -15,
                                        right: -15,
                                        bottom: -15,
                                        background:
                                            "linear-gradient(135deg, rgba(212,175,55,0.2), rgba(139,21,56,0.2))",
                                        borderRadius: 20,
                                        filter: "blur(15px)",
                                        zIndex: -1,
                                    },
                                    "&:after": {
                                        content: '""',
                                        position: "absolute",
                                        top: -8,
                                        left: -8,
                                        right: -8,
                                        bottom: -8,
                                        background: "linear-gradient(45deg, #fff, #f8f8f8)",
                                        borderRadius: 16,
                                        zIndex: -1,
                                        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
                                    },
                                }}
                            >
                                <img
                                    src={trendingImages[hoveredKeyword]}
                                    alt={hoveredKeyword}
                                    style={{
                                        width: 200,
                                        height: 140,
                                        objectFit: "cover",
                                        borderRadius: 12,
                                        border: "3px solid #fff",
                                        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                                        transition: "transform 0.3s ease",
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: -8,
                                        right: -8,
                                        width: 24,
                                        height: 24,
                                        backgroundColor: "#d4af37",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: "0 4px 12px rgba(212,175,55,0.4)",
                                        "&:before": {
                                            content: '"✨"',
                                            fontSize: "12px",
                                        },
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: -25,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    background: "linear-gradient(135deg, #8B1538, #6B1028)",
                                    color: "#fff",
                                    px: 3,
                                    py: 1,
                                    borderRadius: 20,
                                    fontSize: "0.9rem",
                                    fontWeight: 600,
                                    whiteSpace: "nowrap",
                                    fontFamily: '"Playfair Display", serif',
                                    boxShadow: "0 4px 16px rgba(139,21,56,0.3)",
                                    border: "2px solid rgba(255,255,255,0.2)",
                                    "&:before": {
                                        content: '""',
                                        position: "absolute",
                                        top: -6,
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        width: 0,
                                        height: 0,
                                        borderLeft: "6px solid transparent",
                                        borderRight: "6px solid transparent",
                                        borderBottom: "6px solid #8B1538",
                                    },
                                }}
                            >
                                {hoveredKeyword}
                            </Box>
                        </Box>
                    )}
                </Box>
            </Container>

            {/* Wedding Occasions */}
            <Box
                sx={{
                    py: 8,
                    backgroundColor: "#faf5f0",
                    backgroundImage:
                        "linear-gradient(135deg, rgba(139,21,56,0.05) 0%, rgba(212,175,55,0.05) 100%)",
                    position: "relative",
                    zIndex: 1,
                    overflow: "hidden",
                }}
            >
                <Container maxWidth="lg">
                    <Fade in={trigger} timeout={800}>
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{
                                textAlign: "center",
                                mb: 6,
                                fontWeight: 500,
                                color: "#8B1538",
                                fontFamily: '"Playfair Display", serif',
                                position: "relative",
                                "&:after": {
                                    content: '"✧"',
                                    position: "absolute",
                                    top: -24,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    color: "#d4af37",
                                    fontSize: "1.8rem",
                                },
                            }}
                        >
                            Be a star in every wedding occasion
                        </Typography>
                    </Fade>

                    <WedSlider />
                </Container>
            </Box>

            {/* Services Section */}
            <Box
                sx={{
                    py: 8,
                    backgroundColor: "#faf5f0",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            gap: { xs: 3, md: 4 },
                            alignItems: "center",
                        }}
                    >
                        {/* Enhanced Golden Harvest Card */}
                        <Box
                            sx={{
                                width: { xs: "200px", md: "250px" },
                                height: "250px",
                                background: "linear-gradient(135deg, #fdf2f8 0%, #fff5f8 50%, #fdf2f8 100%)",
                                borderRadius: "24px",
                                position: "relative",
                                boxShadow: "0 8px 32px rgba(139,21,56,0.08)",
                                cursor: "pointer",
                                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                border: "1px solid rgba(212,175,55,0.1)",
                                overflow: "hidden",
                                "&:before": {
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: "linear-gradient(135deg, rgba(212,175,55,0.05) 0%, rgba(139,21,56,0.05) 100%)",
                                    opacity: 0,
                                    transition: "opacity 0.3s ease"
                                },
                                "&:hover": {
                                    transform: "translateY(-8px) scale(1.02)",
                                    boxShadow: "0 16px 48px rgba(139,21,56,0.15)",
                                    borderColor: "rgba(212,175,55,0.3)",
                                    "&:before": {
                                        opacity: 1
                                    }
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    position: "absolute",
                                    left: "21px",
                                    top: "20px",
                                    color: "#5C5C5C",
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    fontFamily: "Nunito, sans-serif",
                                }}
                            >
                                Golden Harvest
                            </Typography>
                            <img
                                src="https://staticimg.tanishq.co.in/microsite/rivaah-homepage/assets/images/exchangeCard/4.png"
                                alt="Golden Harvest"
                                style={{
                                    position: "absolute",
                                    maxWidth: "120px",
                                    right: "20px",
                                    top: "25%",
                                }}
                            />
                            <Button
                                href="https://www.tanishqgoldenharvest.co.in/"
                                target="_blank"
                                sx={{
                                    position: "absolute",
                                    left: "20px",
                                    bottom: "20px",
                                    background:
                                        "linear-gradient(90.18deg, rgba(131, 39, 41, 0.6) 0.17%, rgba(99, 21, 23, 0.6) 99.86%)",
                                    color: "#fff",
                                    borderRadius: "25px",
                                    px: 2,
                                    py: 1,
                                    fontSize: "14px",
                                    fontWeight: 400,
                                    textTransform: "none",
                                    fontFamily: "Fraunces, serif",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    "&:hover": {
                                        background: "#832729",
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 4px 16px rgba(131, 39, 41, 0.3)",
                                    },
                                }}
                            >
                                Read More
                                <Box
                                    sx={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: "#A76767",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow:
                                            "inset 16px 16px 15.9px 4px rgba(99, 21, 23, 0.31), inset -1px -1px 4px 0px #A76767",
                                    }}
                                >
                                    <img
                                        src="https://staticimg.tanishq.co.in/microsite/dailywear/assets-new/images/arrow/Arrow right.png"
                                        alt="Arrow"
                                        style={{ width: "20px", height: "20px" }}
                                    />
                                </Box>
                            </Button>
                        </Box>

                        {/* Book An Appointment Card */}
                        <Box
                            sx={{
                                width: { xs: "200px", md: "250px" },
                                height: "250px",
                                backgroundColor: "#fdf2f8",
                                borderRadius: "20px",
                                position: "relative",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    position: "absolute",
                                    left: "21px",
                                    top: "20px",
                                    color: "#5C5C5C",
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    fontFamily: "Nunito, sans-serif",
                                }}
                            >
                                Book An Appointment
                            </Typography>
                            <img
                                src="https://staticimg.tanishq.co.in/microsite/rivaah-homepage/assets/images/exchangeCard/1.png"
                                alt="Book Appointment"
                                style={{
                                    position: "absolute",
                                    maxWidth: "120px",
                                    right: "20px",
                                    top: "30%",
                                }}
                            />
                            <Button
                                href="https://www.tanishq.co.in/book-an-appointment?lang=en_IN"
                                target="_blank"
                                sx={{
                                    position: "absolute",
                                    left: "20px",
                                    bottom: "20px",
                                    background:
                                        "linear-gradient(90.18deg, rgba(131, 39, 41, 0.6) 0.17%, rgba(99, 21, 23, 0.6) 99.86%)",
                                    color: "#fff",
                                    borderRadius: "25px",
                                    px: 2,
                                    py: 1,
                                    fontSize: "14px",
                                    fontWeight: 400,
                                    textTransform: "none",
                                    fontFamily: "Fraunces, serif",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    "&:hover": {
                                        background: "#832729",
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 4px 16px rgba(131, 39, 41, 0.3)",
                                    },
                                }}
                            >
                                Schedule Now
                                <Box
                                    sx={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: "#A76767",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow:
                                            "inset 16px 16px 15.9px 4px rgba(99, 21, 23, 0.31), inset -1px -1px 4px 0px #A76767",
                                    }}
                                >
                                    <img
                                        src="https://staticimg.tanishq.co.in/microsite/dailywear/assets-new/images/arrow/Arrow right.png"
                                        alt="Arrow"
                                        style={{ width: "20px", height: "20px" }}
                                    />
                                </Box>
                            </Button>
                        </Box>

                        {/* Talk to Jewellery Expert Card */}
                        <Box
                            sx={{
                                width: { xs: "200px", md: "250px" },
                                height: "250px",
                                backgroundColor: "#fdf2f8",
                                borderRadius: "20px",
                                position: "relative",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    position: "absolute",
                                    left: "21px",
                                    top: "20px",
                                    color: "#5C5C5C",
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    fontFamily: "Nunito, sans-serif",
                                }}
                            >
                                Talk to Jewellery Expert
                            </Typography>
                            <img
                                src="https://staticimg.tanishq.co.in/microsite/rivaah-homepage/assets/images/exchangeCard/2.png"
                                alt="Jewellery Expert"
                                style={{
                                    position: "absolute",
                                    maxWidth: "120px",
                                    right: "20px",
                                    top: "30%",
                                }}
                            />
                            <Button
                                onClick={() => {
                                    // Simulate live chat widget call
                                    console.log("Opening live chat...");
                                }}
                                sx={{
                                    position: "absolute",
                                    left: "20px",
                                    bottom: "20px",
                                    background:
                                        "linear-gradient(90.18deg, rgba(131, 39, 41, 0.6) 0.17%, rgba(99, 21, 23, 0.6) 99.86%)",
                                    color: "#fff",
                                    borderRadius: "25px",
                                    px: 2,
                                    py: 1,
                                    fontSize: "14px",
                                    fontWeight: 400,
                                    textTransform: "none",
                                    fontFamily: "Fraunces, serif",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    "&:hover": {
                                        background: "#832729",
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 4px 16px rgba(131, 39, 41, 0.3)",
                                    },
                                }}
                            >
                                Connect Now
                                <Box
                                    sx={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: "#A76767",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow:
                                            "inset 16px 16px 15.9px 4px rgba(99, 21, 23, 0.31), inset -1px -1px 4px 0px #A76767",
                                    }}
                                >
                                    <img
                                        src="https://staticimg.tanishq.co.in/microsite/dailywear/assets-new/images/arrow/Arrow right.png"
                                        alt="Arrow"
                                        style={{ width: "20px", height: "20px" }}
                                    />
                                </Box>
                            </Button>
                        </Box>

                        {/* Locate Store Card */}
                        <Box
                            sx={{
                                width: { xs: "200px", md: "250px" },
                                height: "250px",
                                backgroundColor: "#fdf2f8",
                                borderRadius: "20px",
                                position: "relative",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    position: "absolute",
                                    left: "21px",
                                    top: "20px",
                                    color: "#5C5C5C",
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    fontFamily: "Nunito, sans-serif",
                                }}
                            >
                                Locate the Nearest Tanishq Store
                            </Typography>
                            <img
                                src="https://staticimg.tanishq.co.in/microsite/rivaah-homepage/assets/images/exchangeCard/3.png"
                                alt="Store Locator"
                                style={{
                                    position: "absolute",
                                    maxWidth: "120px",
                                    right: "20px",
                                    top: "30%",
                                }}
                            />
                            <Button
                                href="https://stores.tanishq.co.in"
                                target="_blank"
                                sx={{
                                    position: "absolute",
                                    left: "20px",
                                    bottom: "20px",
                                    background:
                                        "linear-gradient(90.18deg, rgba(131, 39, 41, 0.6) 0.17%, rgba(99, 21, 23, 0.6) 99.86%)",
                                    color: "#fff",
                                    borderRadius: "25px",
                                    px: 2,
                                    py: 1,
                                    fontSize: "14px",
                                    fontWeight: 400,
                                    textTransform: "none",
                                    fontFamily: "Fraunces, serif",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    "&:hover": {
                                        background: "#832729",
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 4px 16px rgba(131, 39, 41, 0.3)",
                                    },
                                }}
                            >
                                Visit Store
                                <Box
                                    sx={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: "#A76767",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow:
                                            "inset 16px 16px 15.9px 4px rgba(99, 21, 23, 0.31), inset -1px -1px 4px 0px #A76767",
                                    }}
                                >
                                    <img
                                        src="https://staticimg.tanishq.co.in/microsite/dailywear/assets-new/images/arrow/Arrow right.png"
                                        alt="Arrow"
                                        style={{ width: "20px", height: "20px" }}
                                    />
                                </Box>
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Featured Articles Section */}
            <Box
                sx={{
                    py: 8,
                    backgroundColor: "#fff",
                    position: "relative",
                    zIndex: 1,
                    mx: { xs: 2, md: 0 },
                    mt: { xs: 8, md: 10 },
                    mb: { xs: 0, md: 10 },
                }}
            >
                <Container maxWidth="lg">
                    {/* Header Section */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            mb: 6,
                            ml: "5%",
                            position: "relative",
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontSize: { xs: "25px", md: "30px" },
                                    color: "#700606",
                                    fontFamily: '"Playfair Display", serif',
                                    fontWeight: 700,
                                    mb: 1,
                                }}
                            >
                                Featured Articles
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: { xs: "16px", md: "20px" },
                                    color: "#666",
                                    fontFamily: "Arial, sans-serif",
                                }}
                            >
                                Explore our ultimate wedding directory
                            </Typography>
                        </Box>

                        {/* Navigation Buttons */}
                        <Box
                            sx={{
                                display: { xs: "none", md: "flex" },
                                gap: 2,
                            }}
                        >
                            <IconButton
                                className="articles-swiper-button-prev"
                                sx={{
                                    width: 50,
                                    height: 50,
                                    backgroundColor: "#fff",
                                    border: "2px solid #8B1538",
                                    borderRadius: "50%",
                                    color: "#8B1538",
                                    boxShadow: "0 4px 12px rgba(139,21,56,0.15)",
                                    "&:hover": {
                                        backgroundColor: "#f8e8ef",
                                        borderColor: "#d4af37",
                                        transform: "scale(1.05)",
                                    },
                                }}
                            >
                                <ArrowBackIos sx={{ fontSize: "18px" }} />
                            </IconButton>
                            <IconButton
                                className="articles-swiper-button-next"
                                sx={{
                                    width: 50,
                                    height: 50,
                                    backgroundColor: "#fff",
                                    border: "2px solid #8B1538",
                                    borderRadius: "50%",
                                    color: "#8B1538",
                                    boxShadow: "0 4px 12px rgba(139,21,56,0.15)",
                                    "&:hover": {
                                        backgroundColor: "#f8e8ef",
                                        borderColor: "#d4af37",
                                        transform: "scale(1.05)",
                                    },
                                }}
                            >
                                <ArrowForwardIos sx={{ fontSize: "18px" }} />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Articles Swiper */}
                    <Box
                        sx={{
                            maxWidth: "90%",
                            mx: "auto",
                            minHeight: { xs: "auto", md: "500px" },
                            "& .swiper": {
                                overflow: "visible",
                                pb: 4,
                            },
                            "& .swiper-slide": {
                                height: "auto",
                            },
                        }}
                    >
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 3,
                                },
                            }}
                            navigation={{
                                nextEl: ".articles-swiper-button-next",
                                prevEl: ".articles-swiper-button-prev",
                            }}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                        >
                            {/* Article 1 */}
                            <SwiperSlide>
                                <Box
                                    component="a"
                                    href="https://blog.tanishq.co.in/top-diamond-picks-to-feature-in-your-bridal-trousseau/"
                                    target="_blank"
                                    sx={{
                                        textDecoration: "none",
                                        color: "inherit",
                                        display: "block",
                                        height: "100%",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            backgroundColor: "#fff",
                                            borderRadius: "16px",
                                            overflow: "hidden",
                                            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                                            transition: "all 0.3s ease",
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            "&:hover": {
                                                transform: "translateY(-8px)",
                                                boxShadow: "0 16px 48px rgba(139,21,56,0.15)",
                                            },
                                        }}
                                    >
                                        <Box sx={{ position: "relative", overflow: "hidden" }}>
                                            <img
                                                src="https://staticimg.tanishq.co.in/microsite/rivaah-homepage/assets/images/blogs/1.jpg"
                                                alt="Diamond Bridal Trousseau"
                                                style={{
                                                    width: "100%",
                                                    height: "220px",
                                                    objectFit: "cover",
                                                    transition: "transform 0.3s ease",
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    top: 16,
                                                    right: 16,
                                                    backgroundColor: "rgba(139,21,56,0.9)",
                                                    color: "#fff",
                                                    px: 2,
                                                    py: 0.5,
                                                    borderRadius: "20px",
                                                    fontSize: "12px",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Featured
                                            </Box>
                                        </Box>
                                        <Box
                                            sx={{
                                                p: 3,
                                                flex: 1,
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: '"Playfair Display", serif',
                                                    fontWeight: 600,
                                                    fontSize: "18px",
                                                    lineHeight: 1.4,
                                                    color: "#333",
                                                    mb: 2,
                                                    flex: 1,
                                                }}
                                            >
                                                Top Diamond Picks to Feature in Your Bridal Trousseau
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: "14px",
                                                    color: "#666",
                                                    lineHeight: 1.5,
                                                    mb: 3,
                                                }}
                                            >
                                                Discover the most exquisite diamond pieces perfect for
                                                your special day...
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Box
                                                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: "50%",
                                                            backgroundColor: "#8B1538",
                                                        }}
                                                    />
                                                    <Typography
                                                        sx={{
                                                            fontSize: "12px",
                                                            color: "#666",
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        March 25, 2024
                                                    </Typography>
                                                </Box>
                                                <Typography
                                                    sx={{
                                                        fontSize: "12px",
                                                        color: "#8B1538",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    7 min read
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </SwiperSlide>

                            {/* Article 2 */}
                            <SwiperSlide>
                                <Box
                                    component="a"
                                    href="https://blog.tanishq.co.in/must-have-emerald-jewellery-to-complete-your-bridal-ensemble/"
                                    target="_blank"
                                    sx={{
                                        textDecoration: "none",
                                        color: "inherit",
                                        display: "block",
                                        height: "100%",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            backgroundColor: "#fff",
                                            borderRadius: "16px",
                                            overflow: "hidden",
                                            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                                            transition: "all 0.3s ease",
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            "&:hover": {
                                                transform: "translateY(-8px)",
                                                boxShadow: "0 16px 48px rgba(139,21,56,0.15)",
                                            },
                                        }}
                                    >
                                        <Box sx={{ position: "relative", overflow: "hidden" }}>
                                            <img
                                                src="https://staticimg.tanishq.co.in/microsite/rivaah-homepage/assets/images/blogs/2.jpg"
                                                alt="Emerald Bridal Jewellery"
                                                style={{
                                                    width: "100%",
                                                    height: "220px",
                                                    objectFit: "cover",
                                                    transition: "transform 0.3s ease",
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    top: 16,
                                                    right: 16,
                                                    backgroundColor: "rgba(139,21,56,0.9)",
                                                    color: "#fff",
                                                    px: 2,
                                                    py: 0.5,
                                                    borderRadius: "20px",
                                                    fontSize: "12px",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Popular
                                            </Box>
                                        </Box>
                                        <Box
                                            sx={{
                                                p: 3,
                                                flex: 1,
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: '"Playfair Display", serif',
                                                    fontWeight: 600,
                                                    fontSize: "18px",
                                                    lineHeight: 1.4,
                                                    color: "#333",
                                                    mb: 2,
                                                    flex: 1,
                                                }}
                                            >
                                                Must-Have Emerald Jewellery to Complete Your Bridal
                                                Ensemble
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: "14px",
                                                    color: "#666",
                                                    lineHeight: 1.5,
                                                    mb: 3,
                                                }}
                                            >
                                                Explore stunning emerald pieces that add elegance to
                                                your wedding look...
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Box
                                                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: "50%",
                                                            backgroundColor: "#8B1538",
                                                        }}
                                                    />
                                                    <Typography
                                                        sx={{
                                                            fontSize: "12px",
                                                            color: "#666",
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        March 25, 2024
                                                    </Typography>
                                                </Box>
                                                <Typography
                                                    sx={{
                                                        fontSize: "12px",
                                                        color: "#8B1538",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    6 min read
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </SwiperSlide>

                            {/* Article 3 */}
                            <SwiperSlide>
                                <Box
                                    component="a"
                                    href="https://blog.tanishq.co.in/top-bridal-jewellery-to-wishlist-this-season/"
                                    target="_blank"
                                    sx={{
                                        textDecoration: "none",
                                        color: "inherit",
                                        display: "block",
                                        height: "100%",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            backgroundColor: "#fff",
                                            borderRadius: "16px",
                                            overflow: "hidden",
                                            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                                            transition: "all 0.3s ease",
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            "&:hover": {
                                                transform: "translateY(-8px)",
                                                boxShadow: "0 16px 48px rgba(139,21,56,0.15)",
                                            },
                                        }}
                                    >
                                        <Box sx={{ position: "relative", overflow: "hidden" }}>
                                            <img
                                                src="https://staticimg.tanishq.co.in/microsite/rivaah-homepage/assets/images/blogs/3.jpg"
                                                alt="Bridal Jewellery Wishlist"
                                                style={{
                                                    width: "100%",
                                                    height: "220px",
                                                    objectFit: "cover",
                                                    transition: "transform 0.3s ease",
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    top: 16,
                                                    right: 16,
                                                    backgroundColor: "rgba(139,21,56,0.9)",
                                                    color: "#fff",
                                                    px: 2,
                                                    py: 0.5,
                                                    borderRadius: "20px",
                                                    fontSize: "12px",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Trending
                                            </Box>
                                        </Box>
                                        <Box
                                            sx={{
                                                p: 3,
                                                flex: 1,
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: '"Playfair Display", serif',
                                                    fontWeight: 600,
                                                    fontSize: "18px",
                                                    lineHeight: 1.4,
                                                    color: "#333",
                                                    mb: 2,
                                                    flex: 1,
                                                }}
                                            >
                                                Top Bridal Jewellery to Wishlist This Season
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: "14px",
                                                    color: "#666",
                                                    lineHeight: 1.5,
                                                    mb: 3,
                                                }}
                                            >
                                                Curate your perfect bridal collection with these
                                                must-have pieces...
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Box
                                                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: "50%",
                                                            backgroundColor: "#8B1538",
                                                        }}
                                                    />
                                                    <Typography
                                                        sx={{
                                                            fontSize: "12px",
                                                            color: "#666",
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        March 20, 2024
                                                    </Typography>
                                                </Box>
                                                <Typography
                                                    sx={{
                                                        fontSize: "12px",
                                                        color: "#8B1538",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    8 min read
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </SwiperSlide>

                            {/* Article 4 */}
                            <SwiperSlide>
                                <Box
                                    component="a"
                                    href="https://blog.tanishq.co.in/classic-wedding-jewellery-that-makes-perfect-family-heirlooms/"
                                    target="_blank"
                                    sx={{
                                        textDecoration: "none",
                                        color: "inherit",
                                        display: "block",
                                        height: "100%",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            backgroundColor: "#fff",
                                            borderRadius: "16px",
                                            overflow: "hidden",
                                            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                                            transition: "all 0.3s ease",
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            "&:hover": {
                                                transform: "translateY(-8px)",
                                                boxShadow: "0 16px 48px rgba(139,21,56,0.15)",
                                            },
                                        }}
                                    >
                                        <Box sx={{ position: "relative", overflow: "hidden" }}>
                                            <img
                                                src="https://staticimg.tanishq.co.in/microsite/rivaah-homepage/assets/images/blogs/4.jpg"
                                                alt="Classic Wedding Jewellery"
                                                style={{
                                                    width: "100%",
                                                    height: "220px",
                                                    objectFit: "cover",
                                                    transition: "transform 0.3s ease",
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    top: 16,
                                                    right: 16,
                                                    backgroundColor: "rgba(139,21,56,0.9)",
                                                    color: "#fff",
                                                    px: 2,
                                                    py: 0.5,
                                                    borderRadius: "20px",
                                                    fontSize: "12px",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Classic
                                            </Box>
                                        </Box>
                                        <Box
                                            sx={{
                                                p: 3,
                                                flex: 1,
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: '"Playfair Display", serif',
                                                    fontWeight: 600,
                                                    fontSize: "18px",
                                                    lineHeight: 1.4,
                                                    color: "#333",
                                                    mb: 2,
                                                    flex: 1,
                                                }}
                                            >
                                                Classic Wedding Jewellery that Makes Perfect Family
                                                Heirlooms
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: "14px",
                                                    color: "#666",
                                                    lineHeight: 1.5,
                                                    mb: 3,
                                                }}
                                            >
                                                Timeless pieces that will be treasured for generations
                                                to come...
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Box
                                                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: "50%",
                                                            backgroundColor: "#8B1538",
                                                        }}
                                                    />
                                                    <Typography
                                                        sx={{
                                                            fontSize: "12px",
                                                            color: "#666",
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        March 18, 2024
                                                    </Typography>
                                                </Box>
                                                <Typography
                                                    sx={{
                                                        fontSize: "12px",
                                                        color: "#8B1538",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    5 min read
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                        </Swiper>
                    </Box>
                </Container>
            </Box>

            {/* Enhanced Featured Collections Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 3,
                    position: "relative"
                }}>
                    <Box sx={{
                        fontSize: "3rem",
                        color: "#8B1538",
                        animation: `${float} 3s ease-in-out infinite`,
                        filter: "drop-shadow(0 2px 4px rgba(139,21,56,0.2))"
                    }}>
                        ❁
                    </Box>
                    {/* Decorative elements */}
                    <Box sx={{
                        position: "absolute",
                        top: "50%",
                        left: "30%",
                        width: "4px",
                        height: "4px",
                        background: "#d4af37",
                        borderRadius: "50%",
                        animation: `${sparkle} 2s infinite 0.5s`
                    }} />
                    <Box sx={{
                        position: "absolute",
                        top: "30%",
                        right: "30%",
                        width: "6px",
                        height: "6px",
                        background: "#8B1538",
                        borderRadius: "50%",
                        animation: `${sparkle} 2.5s infinite 1s`
                    }} />
                </Box>
                <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                        textAlign: "center",
                        mb: 6,
                        fontWeight: 600,
                        color: "#8B1538",
                        fontFamily: "Playfair Display, serif",
                        fontSize: { xs: "1.8rem", md: "2.2rem" },
                        letterSpacing: 1,
                        position: "relative",
                        "&:after": {
                            content: '""',
                            position: "absolute",
                            bottom: -8,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "60px",
                            height: "2px",
                            background: "linear-gradient(90deg, #8B1538, #d4af37)",
                            borderRadius: "1px"
                        }
                    }}
                >
                    Featured Collections
                </Typography>
                <Box
                    sx={{
                        width: "100%",
                        borderRadius: 4,
                        overflow: "hidden",
                        boxShadow: "0 12px 48px rgba(139,21,56,0.12)",
                        position: "relative",
                        transition: "all 0.4s ease",
                        "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: "0 20px 64px rgba(139,21,56,0.18)"
                        },
                        "&:before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: "linear-gradient(45deg, rgba(139,21,56,0.05) 0%, rgba(212,175,55,0.05) 100%)",
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                            zIndex: 1
                        },
                        "&:hover:before": {
                            opacity: 1
                        }
                    }}
                >
                    <img
                        src="/src/img/rivaah-tt-desktop.jpg"
                        alt="Featured Collections"
                        style={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                            transition: "transform 0.4s ease"
                        }}
                    />
                </Box>
            </Container>

            {/* Simple Banner Section */}
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box
                    sx={{
                        width: "100%",
                        borderRadius: 3,
                        overflow: "hidden",
                        boxShadow: "0 8px 32px rgba(139,21,56,0.15)",
                    }}
                >
                    <img
                        src="/src/img/storeBannerDesktop.png"
                        alt="Store Banner"
                        style={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                        }}
                    />
                </Box>
            </Container>

            {/* Be a trendsetter with Rivaah Wedding Jewellery Section */}
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


        </Box>
    );
};

export default WeddingPage;
