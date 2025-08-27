// // 1:
// import React from 'react';
// import { Box, Card, CardMedia, Typography, useTheme, useMediaQuery } from '@mui/material';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, EffectCoverflow, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/navigation';

// const jewelryProducts = [
//     { id: 1, name: "Subtle Sparkle Diamond Bangle", image: "/masterSlider1.png", category: "Bangles" },
//     { id: 2, name: "Elegant Pearl Drop Earrings", image: "/masterSlider2.png", category: "Earrings" },
//     { id: 3, name: "Royal Emerald Ring", image: "/masterSlider3.png", category: "Rings" },
//     { id: 4, name: "Diamond Pendant Necklace", image: "/masterSlider4.jpg", category: "Necklaces" },
//     { id: 5, name: "Gold Chain Bracelet", image: "/masterSlider2.png", category: "Bracelets" },
//     { id: 6, name: "Sapphire Stud Earrings", image: "/masterSlider4.jpg", category: "Earrings" }
// ];


// const MasterDaimondSlider = () => {
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//     const swiperConfig = {
//         modules: [Navigation, EffectCoverflow, Autoplay],
//         effect: 'coverflow',
//         grabCursor: true,
//         centeredSlides: true,
//         slidesPerView: isMobile ? 1 : 3,
//         loop: true,
//         autoplay: { delay: 3000, disableOnInteraction: false },
//         coverflowEffect: {
//             rotate: 0,
//             stretch: 0,
//             depth: 200,
//             modifier: 2.5,
//             slideShadows: false,
//         },
//         navigation: true,
//         breakpoints: {
//             640: { slidesPerView: 3 },
//             1024: { slidesPerView: 5 },
//         },
//     };

//     return (
//         <Box
//             sx={{
//                 maxWidth: 1400,
//                 mx: 'auto',
//                 py: { xs: 7, md: 10 },
//                 px: 2,
//                 backgroundColor: '#f5f5f5',
//                 overflow: 'hidden',
//             }}
//         >
//             <Typography
//                 variant="h2"
//                 sx={{
//                     textAlign: 'center',
//                     fontFamily: 'serif',
//                     fontSize: { xs: '1.5rem', md: '2.5rem' },
//                     fontWeight: 400,
//                     color: '#333',
//                     mb: { xs: 2, md: 5 },
//                     lineHeight: 1.2,
//                 }}
//             >
//                 Elevate Every Look with Fashion-Forward Diamond Jewellery
//             </Typography>

//             <Box
//                 sx={{
//                     position: 'relative',
//                     width: '100%',
//                     // left: "-2%",
//                     overflow: 'visible',
//                     // overflow: 'hidden',
//                     backgroundColor: '#2b0a07',
//                     borderRadius: 3,
//                     py: { xs: 4, md: 7 },
//                     px: { xs: 2, md: 3 },
//                     // Swiper container overrides
//                     '& .swiper': { padding: '30px 0' },
//                     '& .swiper-slide': {
//                         transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
//                         transformOrigin: 'center center',
//                     },
//                     // Active slide styles
//                     '& .swiper-slide-active': {
//                         transform: 'scale(1.15)',
//                         zIndex: 5,
//                         '.luxury-product-card': {
//                             boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
//                             transform: 'scale(1.15)',
//                             filter: 'brightness(1.1)',
//                         },
//                     },
//                     // Adjacent slides
//                     '& .swiper-slide-prev, & .swiper-slide-next': {
//                         transform: 'scale(0.8) translateZ(-50px)',
//                         zIndex: 3,
//                         opacity: 0.6,
//                         fontSize: '0.9rem',
//                         '.luxury-product-card': {
//                             boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
//                             transform: 'scale(0.8)',
//                         },
//                         '.MuiCardMedia-root': {
//                             filter: 'blur(1px)',
//                         },
//                     },
//                     // Background slides
//                     '& .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next)': {
//                         transform: 'scale(0.6) translateZ(-100px)',
//                         zIndex: 1,
//                         opacity: 0.4,
//                         '.luxury-product-card': {
//                             boxShadow: '0 5px 15px rgba(0,0,0,0.15)',
//                             transform: 'scale(0.6)',
//                         },
//                         '.MuiCardMedia-root': {
//                             filter: 'blur(2px)',
//                         },
//                     },
//                     // Navigation Buttons (default Swiper styles overridden for minimal styling)
//                     '& .swiper-button-prev, & .swiper-button-next': {
//                         backgroundColor: 'rgba(255,255,255,0.95)',
//                         color: '#2b0a07',
//                         width: { xs: 30, md: 40 },
//                         height: { xs: 30, md: 40 },
//                         borderRadius: '50%',
//                         fontSize: '0.3rem' + ' !important',
//                         boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//                         transition: 'all 0.3s ease',
//                         '&:hover': {
//                             backgroundColor: 'rgba(255,255,255,1)',
//                             // transform: 'scale(1.1)',
//                             boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
//                         },
//                     },
//                 }}
//             >
//                 <Swiper {...swiperConfig}>
//                     {jewelryProducts.map(product => (
//                         <SwiperSlide key={product.id} style={{ display: 'flex', justifyContent: 'center' }}>
//                             <Card
//                                 className="luxury-product-card"
//                                 sx={{
//                                     width: { xs: 250, sm: 280, md: 300 },
//                                     // height: { xs: 375, sm: 400},
//                                     height: 370,
//                                     borderRadius: 3,
//                                     overflow: 'hidden',
//                                     cursor: 'pointer',
//                                     backgroundColor: 'white',
//                                     position: 'relative',
//                                     transition: 'transform 0.3s ease',
//                                     '&:hover': {
//                                         transform: 'scale(1.05)',
//                                         boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
//                                     },
//                                 }}
//                             >
//                                 <CardMedia
//                                     component="img"
//                                     height="100%"
//                                     image={product.image}
//                                     alt={product.name}
//                                     sx={{
//                                         objectFit: 'cover',
//                                         width: '100%',
//                                         transition: 'filter 0.3s ease',
//                                     }}
//                                 />
//                                 <Box
//                                     sx={{
//                                         position: 'absolute',
//                                         bottom: 0,
//                                         width: '100%',
//                                         p: 2,
//                                         bgcolor: 'rgba(255,255,255,0.95)',
//                                         backdropFilter: 'blur(5px)',
//                                     }}
//                                 >
//                                     <Typography
//                                         sx={{
//                                             color: '#333',
//                                             fontWeight: 700,
//                                             fontSize: { xs: '0.9rem', md: '1.1rem' },
//                                             lineHeight: 1.2,
//                                             textShadow: '0 2px 4px rgba(0,0,0,0.2)',
//                                         }}
//                                     >
//                                         {product.name}
//                                     </Typography>
//                                     <Typography
//                                         sx={{
//                                             color: '#666',
//                                             fontWeight: 600,
//                                             textTransform: 'uppercase',
//                                             letterSpacing: '1px',
//                                             fontSize: '0.75rem',
//                                             mt: 0.5,
//                                         }}
//                                     >
//                                         {product.category}
//                                     </Typography>
//                                 </Box>
//                             </Card>
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>
//             </Box>
//         </Box>
//     );
// };

// export default MasterDaimondSlider;


// // 2: 
import React, { useEffect, useState } from 'react';
import { Box, Card, CardMedia, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import axiosInstance from '../common components/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { publicUrl } from '../common components/PublicUrl';

const jewelryProducts = [
    { id: 1, name: "Subtle Sparkle Diamond Bangle", image: "/masterSlider1.png", category: "Bangles" },
    { id: 2, name: "Elegant Pearl Drop Earrings", image: "/masterSlider2.png", category: "Earrings" },
    { id: 3, name: "Royal Emerald Ring", image: "/masterSlider3.png", category: "Rings" },
    { id: 4, name: "Diamond Pendant Necklace", image: "/masterSlider4.jpg", category: "Necklaces" },
    { id: 5, name: "Gold Chain Bracelet", image: "/masterSlider2.png", category: "Bracelets" },
    { id: 6, name: "Sapphire Stud Earrings", image: "/masterSlider4.jpg", category: "Earrings" }
];

const MasterDaimondSlider = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`/user/allproducts`);
            setProducts(response?.data ?? []);
        } catch (error) {
            console.error("Error fetching occasion:", error);
        } finally {
            setLoading(false)
        }
    };

    const swiperConfig = {
        modules: [Navigation, EffectCoverflow, Autoplay],
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: isMobile ? 1 : 3,
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 2.5,
            slideShadows: false,
        },
        navigation: true,
        breakpoints: {
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
        },
    };

    return (
        <Box
            sx={{
                maxWidth: 1400,
                mx: 'auto',
                py: { xs: 7, md: 10 },
                px: 2,
                backgroundColor: '#f5f5f5',
                overflow: 'hidden',
            }}
        >
            <Typography
                variant="h2"
                sx={{
                    textAlign: 'center',
                    fontFamily: 'serif',
                    fontSize: { xs: '1.5rem', md: '2.5rem' },
                    fontWeight: 400,
                    color: '#333',
                    mb: { xs: 2, md: 5 },
                    lineHeight: 1.2,
                }}
            >
                Elevate Every Look with Fashion-Forward Diamond Jewellery
            </Typography>

            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    // left: "-2%",
                    overflow: 'visible',
                    // overflow: 'hidden',
                    backgroundColor: '#2b0a07',
                    borderRadius: 3,
                    py: { xs: 4, md: 7 },
                    px: { xs: 2, md: 3 },
                    // Swiper container overrides
                    '& .swiper': { padding: '30px 0' },
                    '& .swiper-slide': {
                        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        transformOrigin: 'center center',
                    },
                    // Active slide styles
                    '& .swiper-slide-active': {
                        transform: 'scale(1.15)',
                        zIndex: 5,
                        '.luxury-product-card': {
                            boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
                            transform: 'scale(1.15)',
                            filter: 'brightness(1.1)',
                        },
                    },
                    // Adjacent slides
                    '& .swiper-slide-prev, & .swiper-slide-next': {
                        transform: 'scale(0.8) translateZ(-50px)',
                        zIndex: 3,
                        opacity: 0.6,
                        fontSize: '0.9rem',
                        '.luxury-product-card': {
                            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                            transform: 'scale(0.8)',
                        },
                        '.MuiCardMedia-root': {
                            filter: 'blur(1px)',
                        },
                    },
                    // Background slides
                    '& .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next)': {
                        transform: 'scale(0.6) translateZ(-100px)',
                        zIndex: 1,
                        opacity: 0.4,
                        '.luxury-product-card': {
                            boxShadow: '0 5px 15px rgba(0,0,0,0.15)',
                            transform: 'scale(0.6)',
                        },
                        '.MuiCardMedia-root': {
                            filter: 'blur(2px)',
                        },
                    },
                    // Navigation Buttons (default Swiper styles overridden for minimal styling)
                    '& .swiper-button-prev, & .swiper-button-next': {
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        color: '#2b0a07',
                        width: { xs: 30, md: 40 },
                        height: { xs: 30, md: 40 },
                        borderRadius: '50%',
                        fontSize: '0.3rem' + ' !important',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,1)',
                            // transform: 'scale(1.1)',
                            boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                        },
                    },
                }}
            >
                <Swiper {...swiperConfig}>
                    {products.map(product => (
                        <SwiperSlide key={product._id} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Card
                                className="luxury-product-card"
                                sx={{
                                    width: { xs: 250, sm: 280, md: 300 },
                                    // height: { xs: 375, sm: 400},
                                    height: 370,
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    backgroundColor: 'white',
                                    position: 'relative',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                    },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="100%"
                                    image={publicUrl(product.media[0].url)}
                                    alt={product.name}
                                    sx={{
                                        objectFit: 'cover',
                                        width: '100%',
                                        transition: 'filter 0.3s ease',
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        width: '100%',
                                        p: 2,
                                        bgcolor: 'rgba(255,255,255,0.95)',
                                        backdropFilter: 'blur(5px)',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: '#333',
                                            fontWeight: 700,
                                            fontSize: { xs: '0.9rem', md: '1.1rem' },
                                            lineHeight: 1.2,
                                            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                        }}
                                    >
                                        {product.name}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: '#666',
                                            fontWeight: 600,
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            fontSize: '0.75rem',
                                            mt: 0.5,
                                        }}
                                    >
                                        {product.category}
                                    </Typography>
                                </Box>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Box>
    );
};

export default MasterDaimondSlider;



