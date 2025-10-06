import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ChevronRight } from '@mui/icons-material';
import Slider from 'react-slick';
import { publicUrl } from '../../commonComponents/PublicUrl';
import axiosInstance from '../../commonComponents/AxiosInstance';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';

const DiamondSliderThree = () => {
    const [categoryName, setCategoryName] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/user/allcategories`);
                setCategoryName(response?.data ?? []);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchData();
    }, []);

    const diamondCategories = categoryName.filter(
        (category) => category.variety?.toLowerCase() === 'diamond'
    );

    // Custom arrows using IconButton and MUI icons for material style
    const PrevArrow = (props) => {
        const { onClick } = props;
        return (
            <IconButton
                onClick={onClick}
                sx={{
                    position: 'absolute',
                    top: '45%',
                    left: 10,
                    zIndex: 10,
                    width: { xs: 30, sm: 52 },
                    height: { xs: 30, sm: 52 },
                    bgcolor: 'transparent',
                    border: '2px solid #888',
                    color: '#fff',
                    borderRadius: '50%',
                    transition: 'all 0.3s',
                    '&:hover': { bgcolor: '#232739', borderColor: '#fff' },
                }}
            >
                <ArrowBackIosNewIcon />
            </IconButton>
        );
    };

    const NextArrow = (props) => {
        const { onClick } = props;
        return (
            <IconButton
                onClick={onClick}
                sx={{
                    position: 'absolute',
                    top: '45%',
                    right: 10,
                    zIndex: 10,
                    width: { xs: 30, sm: 52 },
                    height: { xs: 30, sm: 52 },
                    bgcolor: 'transparent',
                    border: '2px solid #888',
                    color: '#fff',
                    borderRadius: '50%',
                    transition: 'all 0.3s',
                    '&:hover': { bgcolor: '#232739', borderColor: '#fff' },
                }}
            >
                <ArrowForwardIosIcon />
            </IconButton>
        );
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        adaptiveHeight: true,
    };

    return (
        <Box
            sx={{
                bgcolor: '#161b27',
                p: { xs: 0, md: 4 },
                minHeight: 400,
                width: '100%',
                maxWidth: 1400,
                mx: 'auto',
                borderRadius: 0,
                position: 'relative',
            }}
        >
            <Slider {...settings}>
                {diamondCategories.map((cat) => (
                    <Box
                        key={cat._id}
                        sx={{
                            display: 'flex !important',
                            // flexDirection: 'row',
                            flexDirection: { xs: 'column-reverse', md: 'row' },
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            minHeight: 350,
                            height: "100%",
                            px: 2,
                            py: 4,
                            // width: '80% !important',
                            width: { xs: "95% !important", md: "80% !important" },
                            mx: "auto !important",
                        }}
                    >
                        {/* Text Left */}
                        <Box
                            sx={{
                                width: { xs: "100%", md: "45%" },
                                // maxWidth: '50%',
                                color: '#fff',
                                // textAlign: 'left',
                                textAlign: { xs: "center", md: "left" },
                            }}
                        >
                            <Typography
                                variant="h2"
                                fontFamily="'Playfair Display', serif"
                                fontWeight={700}
                                mb={2}
                                sx={{ fontSize:{xs: 28, md: 38}, textTransform: "capitalize" }}
                            >
                                {cat.name}
                            </Typography>
                            <Typography
                                variant="body1"
                                fontFamily="'Inter', sans-serif"
                                sx={{
                                    color: '#ebebeb',
                                    fontSize: 18,
                                    mb: 2,
                                    textTransform: "capitalize"
                                }}
                            >
                                {cat.description}
                            </Typography>
                            <Button
                                variant="contained"
                                endIcon={<ChevronRight />}
                                // onClick={() => navigate(`/allJewellery/${cat.productvariety}`)}
                                onClick={() => navigate(`/allJewellery/${cat.variety?.toLowerCase() || 'all'}`)}
                                sx={{
                                    bgcolor: 'linear-gradient(90deg,#f3f3f3,#e0e0e0)',
                                    color: '#fff',
                                    fontWeight: 600,
                                    borderRadius: 8,
                                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                                    px: 4,
                                    py: 1,
                                    fontSize: 18,
                                    textTransform: 'none',
                                    mb: 1,
                                    '&:hover': { bgcolor: '#ebebeb', color: '#000' },
                                }}
                            >
                                Shop Now
                            </Button>
                        </Box>
                        {/* Image Right */}
                        <Box
                            sx={{
                                width: { xs: "100%", md: "35%" },
                                // maxWidth: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Box
                                component="img"
                                src={publicUrl(cat.image)}
                                alt={cat.name}
                                sx={{
                                    width: { xs: 250, md: 350 },
                                    height: { xs: 250, md: 350 },
                                    objectFit: 'cover',
                                    borderRadius: '50%',
                                    border: '2px solid #FFD700',
                                    mb: { xs: 2, md: 0 },
                                }}
                            />
                        </Box>
                    </Box>
                ))}
            </Slider>

        </Box>
    );
};

export default DiamondSliderThree;