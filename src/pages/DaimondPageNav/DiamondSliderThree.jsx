// import React, { useEffect, useState } from 'react';
// import { Box, Typography } from '@mui/material';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import axiosInstance from '../../common components/AxiosInstance';
// import { publicUrl } from '../../common components/PublicUrl';

// const DiamondSliderThree = () => {
//     const [categoryName, setCategoryName] = useState([]);

//     useEffect(() => {
//         fetchData();
//     }, []);

// const fetchData = async () => {
//     try {
//         const response = await axiosInstance.get(`/user/allcategories`);
//         setCategoryName(response?.data ?? []);
//     } catch (error) {
//         console.error("Error fetching categories:", error);
//     }
// };

// const diamondCategories = categoryName.filter(
//     category => category.variety?.toLowerCase() === 'diamond'
// );

//     return (
//         <Box
//             sx={{
//                 backgroundColor: '#fff',
//                 pb: { xs: 3, md: 5 },
//                 mt: { xs: 2, md: 4 },
//                 mx: 'auto',
//                 width: { xs: '99%', md: '90%' },
//                 maxWidth: 1350,
//                 borderRadius: 2,
//                 p: { xs: 1, md: 2 },
//                 boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
//             }}
//         >
//             <Swiper
//                 modules={[Navigation]}
//                 navigation={true}
//                 spaceBetween={0}
//                 slidesPerView={1}
//                 style={{ width: '100%' }}
//             >
//                 {diamondCategories.map((slide) => (
//                     <SwiperSlide key={slide._id}>
//                         <Box
//                             sx={{
//                                 display: 'flex',
//                                 flexDirection: { xs: 'column', md: 'row' },
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 minHeight: { xs: 320, md: 350 }
//                             }}
//                         >
//                             {/* Left: Text */}
//                             <Box
//                                 sx={{
//                                     flex: 1.1,
//                                     pl: { xs: 0, md: 6 },
//                                     py: 2,
//                                     textAlign: { xs: "center", md: "left" }
//                                 }}
//                             >
//                                 <Typography
//                                     variant="h3"
//                                     fontWeight={700}
//                                     sx={{
//                                         fontFamily: '"Abhaya Libre", serif',
//                                         color: "#3d2216",
//                                         mb: 1,
//                                         fontSize: { xs: 24, md: 36 }
//                                     }}
//                                 >
//                                     {slide.name}
//                                 </Typography>
//                                 <Typography
//                                     variant="body1"
//                                     fontWeight={400}
//                                     color="#6d4c41"
//                                     sx={{ fontSize: { xs: 13, md: 17 }, maxWidth: 330 }}
//                                 >
//                                     {slide.description}
//                                 </Typography>
//                             </Box>

//                             {/* Right: Image */}
//                             <Box
//                                 sx={{
//                                     flex: 1,
//                                     pr: { xs: 0, md: 8 },
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     justifyContent: { xs: "center", md: "end" }
//                                 }}
//                             >
//                                 <Box
//                                     component="img"
//                                     src={publicUrl(slide.image)}
//                                     alt={slide.name}
//                                     sx={{
//                                         width: { xs: 190, sm: 250, md: 320 },
//                                         height: { xs: 190, sm: 220, md: 230 },
//                                         objectFit: "cover",
//                                         borderRadius: 3,
//                                         boxShadow: '0 8px 28px 4px rgba(60,30,18,0.08)'
//                                     }}
//                                 />
//                             </Box>
//                         </Box>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </Box>
//     );
// };

// export default DiamondSliderThree;

// new layout without arrow func
// import React, { useEffect, useState, useRef } from 'react';
// import { Box, Typography, IconButton, Button } from '@mui/material';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { ChevronRight } from '@mui/icons-material';
// import { publicUrl } from '../../common components/PublicUrl';
// import axiosInstance from '../../common components/AxiosInstance';

// const DiamondSliderThree = () => {
//     const [categoryName, setCategoryName] = useState([]);
//     const prevRef = useRef(null);
//     const nextRef = useRef(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axiosInstance.get(`/user/allcategories`);
//                 setCategoryName(response?.data ?? []);
//             } catch (error) {
//                 console.error("Error fetching categories:", error);
//             }
//         };
//         fetchData();
//     }, []); // fetch only once on mount

//     const diamondCategories = categoryName.filter(
//         (category) => category.variety?.toLowerCase() === 'diamond'
//     );

//     return (
//         <Box
//             sx={{
//                 bgcolor: '#161b27',
//                 p: { xs: 2, md: 4 },
//                 minHeight: 400,
//                 width: '100%',
//                 maxWidth: 1400,
//                 mx: 'auto',
//                 borderRadius: 0,
//                 position: 'relative',
//             }}
//         >
//             <Swiper
//                 modules={[Navigation]}
//                 slidesPerView={1}
//                 navigation={{
//                     prevEl: prevRef.current,
//                     nextEl: nextRef.current,
//                 }}
//                 onBeforeInit={(swiper) => {
//                     swiper.params.navigation.prevEl = prevRef.current;
//                     swiper.params.navigation.nextEl = nextRef.current;
//                 }}
//                 style={{ width: '100%' }}
//             >
//                 {diamondCategories.map((cat) => (
//                     <SwiperSlide key={cat._id}>
//                         <Box
//                             sx={{
//                                 display: 'flex',
//                                 flexDirection: { xs: 'column', md: 'row' },
//                                 alignItems: 'center',
//                                 justifyContent: 'space-between',
//                                 minHeight: 350,
//                             }}
//                         >
//                             {/* Text Left */}
//                             <Box
//                                 sx={{
//                                     flex: 1,
//                                     color: '#fff',
//                                     pr: { xs: 0, md: 5 },
//                                     textAlign: { xs: 'center', md: 'left' },
//                                 }}
//                             >
//                                 <Typography
//                                     variant="h2"
//                                     fontFamily="'Playfair Display', serif"
//                                     fontWeight={700}
//                                     mb={2}
//                                     sx={{ fontSize: { xs: 30, md: 38 } }}
//                                 >
//                                     {cat.name}
//                                 </Typography>

//                                 <Typography
//                                     variant="body1"
//                                     fontFamily="'Inter', sans-serif"
//                                     sx={{
//                                         color: '#ebebeb',
//                                         fontSize: { xs: 14, md: 18 },
//                                         mb: 4,
//                                         maxWidth: 480,
//                                         mx: { xs: 'auto', md: 'unset' },
//                                     }}
//                                 >
//                                     {cat.description}
//                                 </Typography>

//                                 {/* Navigation Arrows */}
//                                 <Box
//                                     sx={{
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         gap: 3,
//                                         mb: 3,
//                                         justifyContent: { xs: 'center', md: 'flex-start' },
//                                     }}
//                                 >
//                                     <IconButton
//                                         ref={prevRef}
//                                         sx={{
//                                             width: 52,
//                                             height: 52,
//                                             bgcolor: 'transparent',
//                                             border: '2px solid #888',
//                                             color: '#fff',
//                                             mr: 1,
//                                             borderRadius: '50%',
//                                             transition: 'all 0.3s',
//                                             '&:hover': { bgcolor: '#232739', borderColor: '#fff' },
//                                         }}
//                                     >
//                                         <ArrowBackIosNewIcon />
//                                     </IconButton>

//                                     <IconButton
//                                         ref={nextRef}
//                                         sx={{
//                                             width: 52,
//                                             height: 52,
//                                             bgcolor: 'transparent',
//                                             border: '2px solid #888',
//                                             color: '#fff',
//                                             borderRadius: '50%',
//                                             transition: 'all 0.3s',
//                                             '&:hover': { bgcolor: '#232739', borderColor: '#fff' },
//                                         }}
//                                     >
//                                         <ArrowForwardIosIcon />
//                                     </IconButton>
//                                 </Box>

//                                 {/* Shop Now Button */}
//                                 <Button
//                                     variant="contained"
//                                     endIcon={<ChevronRight />}
//                                     sx={{
//                                         bgcolor: 'linear-gradient(90deg,#f3f3f3,#e0e0e0)',
//                                         color: '#232739',
//                                         fontWeight: 600,
//                                         borderRadius: 8,
//                                         boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
//                                         px: 4,
//                                         py: 1.5,
//                                         fontSize: 18,
//                                         textTransform: 'none',
//                                         mb: 1,
//                                         '&:hover': { bgcolor: '#ebebeb', color: '#000' },
//                                     }}
//                                 >
//                                     Shop Now
//                                 </Button>
//                             </Box>

//                             {/* Image Right */}
//                             <Box
//                                 sx={{
//                                     flex: 1,
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     pl: { md: 3 },
//                                 }}
//                             >
//                                 <Box
//                                     component="img"
//                                     src={publicUrl(cat.image)}
//                                     alt={cat.name}
//                                     sx={{
//                                         width: { xs: 220, sm: 300, md: 380 },
//                                         height: { xs: 220, sm: 300, md: 380 },
//                                         objectFit: 'cover',
//                                         borderRadius: '50%',
//                                         boxShadow:
//                                             '0 0 0 12px rgba(255,255,255,0.02), 0 4px 40px #141929',
//                                     }}
//                                 />
//                             </Box>
//                         </Box>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </Box>
//     );
// };

// export default DiamondSliderThree;

import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ChevronRight } from '@mui/icons-material';
import Slider from 'react-slick';
import { publicUrl } from '../../common components/PublicUrl';
import axiosInstance from '../../common components/AxiosInstance';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DiamondSliderThree = () => {
    const [categoryName, setCategoryName] = useState([]);

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
                    width: 52,
                    height: 52,
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
                    width: 52,
                    height: 52,
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
                p: { xs: 2, md: 4 },
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
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            minHeight: 350,
                            px: 2,
                            width: '100%',
                        }}
                    >
                        {/* Text Left */}
                        <Box
                            sx={{
                                width: '50%',
                                maxWidth: '50%',
                                color: '#fff',
                                pr: 5,
                                textAlign: 'left',
                            }}
                        >
                            <Typography
                                variant="h2"
                                fontFamily="'Playfair Display', serif"
                                fontWeight={700}
                                mb={2}
                                sx={{ fontSize: 38 }}
                            >
                                {cat.name}
                            </Typography>
                            <Typography
                                variant="body1"
                                fontFamily="'Inter', sans-serif"
                                sx={{
                                    color: '#ebebeb',
                                    fontSize: 18,
                                    mb: 4,
                                    maxWidth: 480,
                                }}
                            >
                                {cat.description}
                            </Typography>
                            <Button
                                variant="contained"
                                endIcon={<ChevronRight />}
                                sx={{
                                    bgcolor: 'linear-gradient(90deg,#f3f3f3,#e0e0e0)',
                                    color: '#232739',
                                    fontWeight: 600,
                                    borderRadius: 8,
                                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                                    px: 4,
                                    py: 1.5,
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
                                width: '50%',
                                maxWidth: '50%',
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
                                    width: 300,
                                    height: 300,
                                    objectFit: 'cover',
                                    borderRadius: '50%',
                                    boxShadow:
                                        '0 0 0 12px rgba(255,255,255,0.02), 0 4px 40px #141929',
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



// 2:
// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Button, styled } from '@mui/material';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import axiosInstance from '../../common components/AxiosInstance';
// import { publicUrl } from '../../common components/PublicUrl';

// const DiamondSliderThree = () => {
//     const [categoryName, setCategoryName] = useState([]);

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await axiosInstance.get(`/user/allcategories`);
//             setCategoryName(response?.data ?? []);
//         } catch (error) {
//             console.error("Error fetching categories:", error);
//         }
//     };

//     const diamondCategories = categoryName.filter(
//         category => category.variety?.toLowerCase() === 'diamond'
//     );

//     return (
//         <Box sx={{
//             backgroundColor: 'transparent',
//             pb: '2rem',
//             position: 'relative',
//             zIndex: 0,
//             mt: { xs: '2rem', md: '2.5rem' },
//             mx: 'auto',
//             width: { xs: '95%', md: '85%' }, // Increased width to show full content
//             maxWidth: '1400px', // Increased max width
//             boxShadow: '0 2px 8px rgba(255, 255, 255, 1)',
//             borderRadius: '12px',
//             p: { xs: '1rem', md: '2rem' }, // Increased padding
//             overflow: 'visible' // Changed to visible to prevent clipping
//         }}>
//             <Swiper
//                 modules={[Navigation]}
//                 navigation={{
//                     nextEl: '.diamond-swiper-next',
//                     prevEl: '.diamond-swiper-prev',
//                 }}
//                 spaceBetween={20} // Reduced space between slides
//                 slidesPerView={1}
//                 style={{
//                     width: '100%',
//                     paddingBottom: '40px', // Increased padding for mobile arrows
//                     overflow: 'visible' // Allow content to be visible
//                 }}
//             >

//                 {diamondCategories.map((slide, index) => (
//                     <SwiperSlide key={slide._id} style={{ overflow: 'visible' }}>
//                         <Box sx={{
//                             backgroundColor: 'transparent',
//                             pb: { xs: 3, md: 5 }, // Adjusted padding
//                             px: { xs: 1, md: 2 },
//                             minHeight: { xs: '450px', md: '400px' } // Set minimum height
//                         }}>
//                             <Box sx={{
//                                 display: 'flex',
//                                 flexDirection: { xs: 'column-reverse', md: 'row' },
//                                 justifyContent: 'space-between',
//                                 alignItems: 'center',
//                                 gap: { xs: 2, md: 4 }, // Increased gap
//                                 height: '100%'
//                             }}>
//                                 {/* Left Content */}
//                                 <Box sx={{
//                                     display: 'flex',
//                                     flexDirection: 'column',
//                                     width: { xs: '100%', md: '48%' }, // Slightly increased width
//                                     order: { xs: 2, md: 1 }
//                                 }}>
//                                     {/* Heading */}
//                                     <Box sx={{
//                                         order: { xs: 2, md: 1 },
//                                         my: { xs: 2, md: 3 },
//                                         textAlign: { xs: 'center', md: 'left' }
//                                     }}>
//                                         <Typography
//                                             variant="h1"
//                                             sx={{
//                                                 color: '#333',
//                                                 fontFamily: '"Abhaya Libre", serif',
//                                                 fontWeight: 600,
//                                                 fontSize: { xs: '22px', md: '28px' }, // Smaller font sizes
//                                                 lineHeight: 1.3,
//                                                 mb: 1.5
//                                             }}
//                                         >
//                                             {slide.name}
//                                         </Typography>
//                                         <Typography
//                                             variant="body1"
//                                             sx={{
//                                                 color: '#666',
//                                                 fontWeight: 400,
//                                                 fontSize: { xs: '12px', md: '13px' }, // Smaller font sizes
//                                                 fontFamily: '"Inter", sans-serif',
//                                                 mx: { xs: 0, md: 0 },
//                                                 lineHeight: 1.5
//                                             }}
//                                         >
//                                             {slide.description}
//                                         </Typography>
//                                     </Box>

//                                     {/* Navigation Arrows (Desktop) */}
//                                     <Box sx={{
//                                         display: { xs: 'none', md: 'flex' },
//                                         alignItems: 'center',
//                                         gap: 2,
//                                         mt: 1,
//                                         mb: 2
//                                     }}>
//                                         <Box className="diamond-swiper-prev" sx={{
//                                             cursor: 'pointer',
//                                             width: '35px',
//                                             height: '35px',
//                                             borderRadius: '50%',
//                                             border: '1px solid #D7CCC8',
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             justifyContent: 'center',
//                                             transition: 'all 0.3s ease',
//                                             '&:hover': {
//                                                 backgroundColor: '#EFEBE9'
//                                             },
//                                             '&::after': {
//                                                 content: '""',
//                                                 display: 'inline-block',
//                                                 width: '10px',
//                                                 height: '10px',
//                                                 border: '2px solid #5D4037',
//                                                 borderRight: 'none',
//                                                 borderBottom: 'none',
//                                                 transform: 'rotate(-45deg)',
//                                                 marginRight: '3px'
//                                             }
//                                         }} />
//                                         <Box className="diamond-swiper-next" sx={{
//                                             cursor: 'pointer',
//                                             width: '35px',
//                                             height: '35px',
//                                             borderRadius: '50%',
//                                             border: '1px solid #D7CCC8',
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             justifyContent: 'center',
//                                             transition: 'all 0.3s ease',
//                                             '&:hover': {
//                                                 backgroundColor: '#EFEBE9'
//                                             },
//                                             '&::after': {
//                                                 content: '""',
//                                                 display: 'inline-block',
//                                                 width: '10px',
//                                                 height: '10px',
//                                                 border: '2px solid #5D4037',
//                                                 borderLeft: 'none',
//                                                 borderTop: 'none',
//                                                 transform: 'rotate(45deg)',
//                                                 marginLeft: '3px'
//                                             }
//                                         }} />
//                                     </Box>
//                                 </Box>

//                                 {/* Right Image */}
//                                 <Box
//                                     sx={{
//                                         cursor: 'pointer',
//                                         width: { xs: '100%', md: '48%' }, // Slightly increased width
//                                         order: { xs: 1, md: 2 },
//                                         mb: { xs: 2, md: 0 },
//                                         textAlign: 'center',
//                                         display: 'flex',
//                                         justifyContent: 'center',
//                                         alignItems: 'center'
//                                     }}
//                                 >
//                                     <Box
//                                         component="img"
//                                          src={publicUrl(slide.image)}
//                                         sx={{
//                                             width: '100%',
//                                             maxWidth: '350px', // Reduced max width
//                                             height: '250px', // Fixed smaller height
//                                             borderRadius: '8px',
//                                             boxShadow: '0 6px 20px rgba(93, 64, 55, 0.08)',
//                                             display: { xs: 'none', md: 'inline-block' },
//                                             objectFit: 'cover',
//                                             transition: 'transform 0.3s ease',
//                                             '&:hover': {
//                                                 transform: 'scale(1.02)'
//                                             }
//                                         }}
//                                         alt={slide.title}
//                                     />
//                                     <Box
//                                         component="img"
//                                          src={publicUrl(slide.image)}
//                                         sx={{
//                                             width: '100%',
//                                             maxWidth: '280px', // Reduced max width
//                                             height: '180px', // Fixed smaller height
//                                             borderRadius: '8px',
//                                             boxShadow: '0 4px 12px rgba(93, 64, 55, 0.08)',
//                                             display: { xs: 'inline-block', md: 'none' },
//                                             objectFit: 'cover',
//                                             transition: 'transform 0.3s ease',
//                                             '&:hover': {
//                                                 transform: 'scale(1.02)'
//                                             }
//                                         }}
//                                         alt={slide.title}
//                                     />
//                                 </Box>
//                             </Box>
//                         </Box>
//                     </SwiperSlide>
//                 ))}

//                 {/* Mobile Navigation Arrows */}
//                 <Box sx={{
//                     position: 'absolute',
//                     bottom: { xs: 10, md: 20 },
//                     left: 0,
//                     right: 0,
//                     display: { xs: 'flex', md: 'none' },
//                     justifyContent: 'center',
//                     gap: 3,
//                     zIndex: 10
//                 }}>
//                     <Box className="diamond-swiper-prev" sx={{
//                         cursor: 'pointer',
//                         width: '35px',
//                         height: '35px',
//                         borderRadius: '50%',
//                         border: '1px solid #D7CCC8',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         backgroundColor: 'rgba(255,255,255,0.95)',
//                         transition: 'all 0.3s ease',
//                         '&:hover': {
//                             backgroundColor: '#EFEBE9'
//                         },
//                         '&::after': {
//                             content: '""',
//                             display: 'inline-block',
//                             width: '10px',
//                             height: '10px',
//                             border: '2px solid #5D4037',
//                             borderRight: 'none',
//                             borderBottom: 'none',
//                             transform: 'rotate(-45deg)',
//                             marginRight: '3px'
//                         }
//                     }} />
//                     <Box className="diamond-swiper-next" sx={{
//                         cursor: 'pointer',
//                         width: '35px',
//                         height: '35px',
//                         borderRadius: '50%',
//                         border: '1px solid #D7CCC8',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         backgroundColor: 'rgba(255,255,255,0.95)',
//                         transition: 'all 0.3s ease',
//                         '&:hover': {
//                             backgroundColor: '#EFEBE9'
//                         },
//                         '&::after': {
//                             content: '""',
//                             display: 'inline-block',
//                             width: '10px',
//                             height: '10px',
//                             border: '2px solid #5D4037',
//                             borderLeft: 'none',
//                             borderTop: 'none',
//                             transform: 'rotate(45deg)',
//                             marginLeft: '3px'
//                         }
//                     }} />
//                 </Box>
//             </Swiper>
//         </Box>
//     );
// };

// export default DiamondSliderThree;

// 3:

// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Button, styled } from '@mui/material';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import axiosInstance from '../../common components/AxiosInstance';

// const DiamondSliderThree = () => {
//     const [categoryName, setCategoryName] = useState([]);

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await axiosInstance.get(`/user/allcategories`);
//             setCategoryName(response?.data ?? []);
//         } catch (error) {
//             console.error("Error fetching categories:", error);
//         }
//     };

//     const slides = [
//         {
//             title: "Soulmate Diamond Pair",
//             description: "The perfect symbol of love and union. A billion-year-old natural diamond, divided and masterfully crafted into two rings, distinct yet eternally connected, just like soulmates, proving that true connections, once formed, last a lifetime and beyond.",
//             mainImageDesktop: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/sdp-desktop.jpg",
//             mainImageMobile: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/sdp-mobile.jpg",
//             products: [
//                 {
//                     desktopImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/sdppd-1.jpg",
//                     mobileImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/sdppm-1.jpg",
//                 },
//                 {
//                     desktopImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/sdppd-2.jpg",
//                     mobileImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/sdppm-2.jpg",
//                 },
//                 {
//                     desktopImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/sdppd-3.jpg",
//                     mobileImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/sdppm-3.jpg",
//                 }
//             ]
//         },
//         {
//             title: "Elan",
//             description: "Elan is a jewellery collection for the modern woman who celebrates her arrival in life with style and confidence. Our designs feature sculpted diamond pieces adorned with intricate gold jali work and pave settings, embodying a fusion of tradition and contemporary elegance.",
//             mainImageDesktop: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/elan-desktop.jpg",
//             mainImageMobile: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/elan-mobile.jpg",
//             products: [
//                 {
//                     desktopImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/elanpd-01.jpg",
//                     mobileImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/elanpm-01.jpg",
//                 },
//                 {
//                     desktopImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/elanpd-02.jpg",
//                     mobileImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/elanpm-02.jpg",
//                 },
//                 {
//                     desktopImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/elanpd-03.jpg",
//                     mobileImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/elanpm-03.jpg",
//                 }
//             ]
//         },
//         {
//             title: "Unbound",
//             description: "Tanishq's unbound collection is a tribute to your story and individuality. Each jewelry piece boasts exquisite 3D motifs crafted with timeless natural diamonds and 18kt gold. These pieces draw inspiration from the concept of fluidity and organic movement, symbolizing your unique facets.",
//             mainImageDesktop: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/unbound-desktop.jpg",
//             mainImageMobile: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/unbound-mweb.jpg",
//             products: [
//                 {
//                     desktopImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/unbound-dp1.jpg",
//                     mobileImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/unbound-mp1.jpg",
//                 },
//                 {
//                     desktopImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/unbound-dp2.jpg",
//                     mobileImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/unbound-mp2.jpg",
//                 },
//                 {
//                     desktopImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/unbound-dp3.jpg",
//                     mobileImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/unbound-mp3.jpg",
//                 }
//             ]
//         },
//         {
//             title: "Enchanted Trails",
//             description: "Tanishq's 'Enchanted Trails' collection is a celebration of exceptional artistry and refined taste , with each exquisite piece reflecting the serene dance of boats on tranquil waters, echoing the timeless poetry of nature.",
//             mainImageDesktop: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/et-d1.jpg",
//             mainImageMobile: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/et-m1.jpg",
//             products: [
//                 {
//                     desktopImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/eprod-d1.png",
//                     mobileImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/eprod-m1.png",
//                 },
//                 {
//                     desktopImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/eprod-d2.png",
//                     mobileImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/eprod-m2.png",
//                 },
//                 {
//                     desktopImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/eprod-d3.png",
//                     mobileImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/eprod-m3.png",
//                 }
//             ]
//         },
//         {
//             title: "Spotlight Edit",
//             description: "Inspired by nature's subtle nuances, each piece in our Spotlight Edit collection intertwines white and rose gold with shimmering diamonds, creating an elegant allure. Delicate designs bestow the woman with her own radiant spotlight.",
//             mainImageDesktop: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/spotlight-d.png",
//             mainImageMobile: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/spotlight-m.png",
//             products: [
//                 {
//                     desktopImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/prod1-d.png",
//                     mobileImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/prod1-m.png",
//                 },
//                 {
//                     desktopImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/prod2-d.png",
//                     mobileImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/prod2-m.png",
//                 },
//                 {
//                     desktopImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/prod3-d.png",
//                     mobileImage: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/prod3-m.png",
//                 }
//             ]
//         },
//         {
//             title: "Tales of Mystique",
//             description: "Within the delicate embrace of time-worn elegance, the Tales of Mystique Collection weaves a spellbinding tapestry. Each luminescent ornament holds secrets whispered across centuries.",
//             mainImageDesktop: "https://staticimg.tanishq.co.in/microsites-test/diamond/assets-three/images/Rhythms/tom.jpg",
//             mainImageMobile: "https://staticimg.tanishq.co.in/microsite/diamond/images/diamondSpecial/tom-m.jpg",
//             products: [
//                 {
//                     desktopImage: "https://staticimg.tanishq.co.in/microsites-test/diamond/assets-three/images/Rhythms/tom-prod-1.jpg",
//                     mobileImage: "https://staticimg.tanishq.co.in/microsites-test/diamond/assets-three/images/Rhythms/tom-prod-1.jpg",
//                 },
//                 {
//                     desktopImage: "https://staticimg.tanishq.co.in/microsites-test/diamond/assets-three/images/Rhythms/tom-prod-2.jpg",
//                     mobileImage: "https://staticimg.tanishq.co.in/microsites-test/diamond/assets-three/images/Rhythms/tom-prod-2.jpg",
//                 },
//                 {
//                     desktopImage: "https://staticimg.tanishq.co.in/microsites-test/diamond/assets-three/images/Rhythms/tom-prod-3.jpg",
//                     mobileImage: "https://staticimg.tanishq.co.in/microsites-test/diamond/assets-three/images/Rhythms/tom-prod-3.jpg",
//                 }
//             ]
//         }
//     ];

//     const GradientButton = styled(Button)(({ theme }) => ({
//         // Remove the gradient background and white color
//         background: 'transparent',  // Changed from gradient to transparent
//         color: '#5D4037',
//         fontWeight: 600,
//         borderRadius: '50px',
//         padding: '4px 16px',
//         textTransform: 'none',
//         border: '1px solid #D7CCC8', // Added border to maintain visibility
//         '&:hover': {
//             transform: 'translateY(-2px)',
//             boxShadow: '0 4px 8px rgba(93, 64, 55, 0.2)',
//             background: 'transparent', // Also changed hover background
//         },
//         transition: 'all 0.15s ease',
//         display: 'flex',
//         alignItems: 'center',
//     }));
//     const ArrowIcon = () => (
//         <svg width="9" height="11" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M1.5 1.5L4.5 4.5L1.5 7.5" stroke="#5D4037" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
//         </svg>
//     );

//     return (
//         <Box sx={{
//             backgroundColor: 'transparent',
//             pb: '2rem',
//             position: 'relative',
//             zIndex: 0,
//             mt: { xs: '2rem', md: '2.5rem' },
//             mx: 'auto',
//             width: { xs: '95%', md: '85%' }, // Increased width to show full content
//             maxWidth: '1400px', // Increased max width
//             boxShadow: '0 2px 8px rgba(255, 255, 255, 1)',
//             borderRadius: '12px',
//             p: { xs: '1rem', md: '2rem' }, // Increased padding
//             overflow: 'visible' // Changed to visible to prevent clipping
//         }}>
//             <Swiper
//                 modules={[Navigation]}
//                 navigation={{
//                     nextEl: '.diamond-swiper-next',
//                     prevEl: '.diamond-swiper-prev',
//                 }}
//                 spaceBetween={20} // Reduced space between slides
//                 slidesPerView={1}
//                 style={{
//                     width: '100%',
//                     paddingBottom: '40px', // Increased padding for mobile arrows
//                     overflow: 'visible' // Allow content to be visible
//                 }}
//             >

//                 {slides.map((slide, index) => (
//                     <SwiperSlide key={index} style={{ overflow: 'visible' }}>
//                         <Box sx={{
//                             backgroundColor: 'transparent',
//                             pb: { xs: 3, md: 5 }, // Adjusted padding
//                             px: { xs: 1, md: 2 },
//                             minHeight: { xs: '450px', md: '400px' } // Set minimum height
//                         }}>
//                             <Box sx={{
//                                 display: 'flex',
//                                 flexDirection: { xs: 'column-reverse', md: 'row' },
//                                 justifyContent: 'space-between',
//                                 alignItems: 'center',
//                                 gap: { xs: 2, md: 4 }, // Increased gap
//                                 height: '100%'
//                             }}>
//                                 {/* Left Content */}
//                                 <Box sx={{
//                                     display: 'flex',
//                                     flexDirection: 'column',
//                                     width: { xs: '100%', md: '48%' }, // Slightly increased width
//                                     order: { xs: 2, md: 1 }
//                                 }}>
//                                     {/* Heading */}
//                                     <Box sx={{
//                                         order: { xs: 2, md: 1 },
//                                         my: { xs: 2, md: 3 },
//                                         textAlign: { xs: 'center', md: 'left' }
//                                     }}>
//                                         <Typography
//                                             variant="h1"
//                                             sx={{
//                                                 color: '#333',
//                                                 fontFamily: '"Abhaya Libre", serif',
//                                                 fontWeight: 600,
//                                                 fontSize: { xs: '22px', md: '28px' }, // Smaller font sizes
//                                                 lineHeight: 1.3,
//                                                 mb: 1.5
//                                             }}
//                                         >
//                                             {slide.title}
//                                         </Typography>
//                                         <Typography
//                                             variant="body1"
//                                             sx={{
//                                                 color: '#666',
//                                                 fontWeight: 400,
//                                                 fontSize: { xs: '12px', md: '13px' }, // Smaller font sizes
//                                                 fontFamily: '"Inter", sans-serif',
//                                                 mx: { xs: 0, md: 0 },
//                                                 lineHeight: 1.5
//                                             }}
//                                         >
//                                             {slide.description}
//                                         </Typography>
//                                     </Box>

//                                     {/* Navigation Arrows (Desktop) */}
//                                     <Box sx={{
//                                         display: { xs: 'none', md: 'flex' },
//                                         alignItems: 'center',
//                                         gap: 2,
//                                         mt: 1,
//                                         mb: 2
//                                     }}>
//                                         <Box className="diamond-swiper-prev" sx={{
//                                             cursor: 'pointer',
//                                             width: '35px',
//                                             height: '35px',
//                                             borderRadius: '50%',
//                                             border: '1px solid #D7CCC8',
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             justifyContent: 'center',
//                                             transition: 'all 0.3s ease',
//                                             '&:hover': {
//                                                 backgroundColor: '#EFEBE9'
//                                             },
//                                             '&::after': {
//                                                 content: '""',
//                                                 display: 'inline-block',
//                                                 width: '10px',
//                                                 height: '10px',
//                                                 border: '2px solid #5D4037',
//                                                 borderRight: 'none',
//                                                 borderBottom: 'none',
//                                                 transform: 'rotate(-45deg)',
//                                                 marginRight: '3px'
//                                             }
//                                         }} />
//                                         <Box className="diamond-swiper-next" sx={{
//                                             cursor: 'pointer',
//                                             width: '35px',
//                                             height: '35px',
//                                             borderRadius: '50%',
//                                             border: '1px solid #D7CCC8',
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             justifyContent: 'center',
//                                             transition: 'all 0.3s ease',
//                                             '&:hover': {
//                                                 backgroundColor: '#EFEBE9'
//                                             },
//                                             '&::after': {
//                                                 content: '""',
//                                                 display: 'inline-block',
//                                                 width: '10px',
//                                                 height: '10px',
//                                                 border: '2px solid #5D4037',
//                                                 borderLeft: 'none',
//                                                 borderTop: 'none',
//                                                 transform: 'rotate(45deg)',
//                                                 marginLeft: '3px'
//                                             }
//                                         }} />
//                                     </Box>

//                                     {/* Shop Now Button */}
//                                     <Box sx={{
//                                         order: { xs: 3, md: 'unset' },
//                                         display: 'flex',
//                                         justifyContent: { xs: 'center', md: 'flex-start' },
//                                         mt: { xs: 1, md: 1 }
//                                     }}>
//                                         <GradientButton
//                                             variant="contained"
//                                             sx={{
//                                                 px: { xs: 2.5, md: 2.5 },
//                                                 pl: { xs: 3.5, md: 3.5 },
//                                                 fontSize: { xs: '11px', md: '13px' }, // Smaller font
//                                                 height: '36px', // Smaller button
//                                                 minWidth: 'auto'
//                                             }}
//                                             endIcon={
//                                                 <Box sx={{
//                                                     width: '28px', // Smaller icon container
//                                                     height: '28px',
//                                                     p: '3px',
//                                                     ml: 0.5,
//                                                     backgroundColor: '#D7CCC8',
//                                                     borderRadius: '50%',
//                                                     display: 'inline-flex',
//                                                     justifyContent: 'center',
//                                                     alignItems: 'center',
//                                                     transition: 'background-color 0.3s ease',
//                                                     '&:hover': {
//                                                         backgroundColor: '#BCAAA4'
//                                                     }
//                                                 }}>
//                                                     <ArrowIcon />
//                                                 </Box>
//                                             }
//                                         >
//                                             View Collection
//                                         </GradientButton>
//                                     </Box>

//                                     {/* Product Thumbnails */}
//                                     <Box sx={{
//                                         display: 'flex',
//                                         mt: { xs: 2, md: 2 },
//                                         justifyContent: { xs: 'space-around', md: 'flex-start' },
//                                         gap: { xs: 0.5, md: 1 },
//                                         flexWrap: 'wrap'
//                                     }}>
//                                         {slide.products.map((product, idx) => (
//                                             <Box
//                                                 key={idx}
//                                                 sx={{
//                                                     cursor: 'pointer',
//                                                     width: { xs: '30%', md: '28%' },
//                                                     maxWidth: { md: '100px' }, // Smaller max width
//                                                     border: '1px solid #D7CCC8',
//                                                     borderRadius: '6px',
//                                                     overflow: 'hidden',
//                                                     transition: 'transform 0.3s ease',
//                                                     '&:hover': {
//                                                         transform: 'translateY(-2px)'
//                                                     }
//                                                 }}
//                                             >
//                                                 <Box
//                                                     component="img"
//                                                     src={product.desktopImage}
//                                                     sx={{
//                                                         width: '100%',
//                                                         height: '70px', // Fixed smaller height
//                                                         display: { xs: 'none', md: 'block' },
//                                                         objectFit: 'cover'
//                                                     }}
//                                                     alt=""
//                                                 />
//                                                 <Box
//                                                     component="img"
//                                                     src={product.mobileImage || product.desktopImage}
//                                                     sx={{
//                                                         width: '100%',
//                                                         height: '50px', // Fixed smaller height for mobile
//                                                         display: { xs: 'block', md: 'none' },
//                                                         objectFit: 'cover'
//                                                     }}
//                                                     alt=""
//                                                 />
//                                             </Box>
//                                         ))}
//                                     </Box>
//                                 </Box>

//                                 {/* Right Image */}
//                                 <Box
//                                     sx={{
//                                         cursor: 'pointer',
//                                         width: { xs: '100%', md: '48%' }, // Slightly increased width
//                                         order: { xs: 1, md: 2 },
//                                         mb: { xs: 2, md: 0 },
//                                         textAlign: 'center',
//                                         display: 'flex',
//                                         justifyContent: 'center',
//                                         alignItems: 'center'
//                                     }}
//                                 >
//                                     <Box
//                                         component="img"
//                                         src={slide.mainImageDesktop}
//                                         sx={{
//                                             width: '100%',
//                                             maxWidth: '350px', // Reduced max width
//                                             height: '250px', // Fixed smaller height
//                                             borderRadius: '8px',
//                                             boxShadow: '0 6px 20px rgba(93, 64, 55, 0.08)',
//                                             display: { xs: 'none', md: 'inline-block' },
//                                             objectFit: 'cover',
//                                             transition: 'transform 0.3s ease',
//                                             '&:hover': {
//                                                 transform: 'scale(1.02)'
//                                             }
//                                         }}
//                                         alt={slide.title}
//                                     />
//                                     <Box
//                                         component="img"
//                                         src={slide.mainImageMobile}
//                                         sx={{
//                                             width: '100%',
//                                             maxWidth: '280px', // Reduced max width
//                                             height: '180px', // Fixed smaller height
//                                             borderRadius: '8px',
//                                             boxShadow: '0 4px 12px rgba(93, 64, 55, 0.08)',
//                                             display: { xs: 'inline-block', md: 'none' },
//                                             objectFit: 'cover',
//                                             transition: 'transform 0.3s ease',
//                                             '&:hover': {
//                                                 transform: 'scale(1.02)'
//                                             }
//                                         }}
//                                         alt={slide.title}
//                                     />
//                                 </Box>
//                             </Box>
//                         </Box>
//                     </SwiperSlide>
//                 ))}

//                 {/* Mobile Navigation Arrows */}
//                 <Box sx={{
//                     position: 'absolute',
//                     bottom: { xs: 10, md: 20 },
//                     left: 0,
//                     right: 0,
//                     display: { xs: 'flex', md: 'none' },
//                     justifyContent: 'center',
//                     gap: 3,
//                     zIndex: 10
//                 }}>
//                     <Box className="diamond-swiper-prev" sx={{
//                         cursor: 'pointer',
//                         width: '35px',
//                         height: '35px',
//                         borderRadius: '50%',
//                         border: '1px solid #D7CCC8',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         backgroundColor: 'rgba(255,255,255,0.95)',
//                         transition: 'all 0.3s ease',
//                         '&:hover': {
//                             backgroundColor: '#EFEBE9'
//                         },
//                         '&::after': {
//                             content: '""',
//                             display: 'inline-block',
//                             width: '10px',
//                             height: '10px',
//                             border: '2px solid #5D4037',
//                             borderRight: 'none',
//                             borderBottom: 'none',
//                             transform: 'rotate(-45deg)',
//                             marginRight: '3px'
//                         }
//                     }} />
//                     <Box className="diamond-swiper-next" sx={{
//                         cursor: 'pointer',
//                         width: '35px',
//                         height: '35px',
//                         borderRadius: '50%',
//                         border: '1px solid #D7CCC8',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         backgroundColor: 'rgba(255,255,255,0.95)',
//                         transition: 'all 0.3s ease',
//                         '&:hover': {
//                             backgroundColor: '#EFEBE9'
//                         },
//                         '&::after': {
//                             content: '""',
//                             display: 'inline-block',
//                             width: '10px',
//                             height: '10px',
//                             border: '2px solid #5D4037',
//                             borderLeft: 'none',
//                             borderTop: 'none',
//                             transform: 'rotate(45deg)',
//                             marginLeft: '3px'
//                         }
//                     }} />
//                 </Box>
//             </Swiper>
//         </Box>
//     );
// };

// export default DiamondSliderThree;