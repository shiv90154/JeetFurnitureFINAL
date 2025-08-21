import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    Button,
    CardMedia,
    Paper,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

const GiftingPage = () => {
    const [activeTab, setActiveTab] = useState('wishlisted');
    const [giftCategory, setGiftCategory] = useState('');
    const [giftPrice, setGiftPrice] = useState('');
    const [giftRelation, setGiftRelation] = useState('');
    const [showMobileForm, setShowMobileForm] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Hero Section - Gift Cards and Gold Coins
    const giftOptions = [
        {
            title: 'Gift Cards',
            subtitle: 'Late In Planning?',
            description: 'Explore Gift Cards For Your Last Minute Gifting Needs',
            buttonText: 'Buy Gift Cards',
            image: '/collection1.png',
            bgColor: '#8B1538',
        },
        {
            title: 'Gold Coins',
            subtitle: 'Or Gold Coins',
            description: 'Explore Gold Coins For Your Last Minute Gifting Needs',
            buttonText: 'Buy Gold Coins',
            image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=500&h=400&fit=crop',
            bgColor: '#B8860B',
        }
    ];

    // Occasion-based Gifting
    const occasions = [
        {
            title: 'Birthday Gifts',
            description: 'Make their special day memorable',
            image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
            icon: '🎂'
        },
        {
            title: 'Anniversary Gifts',
            description: 'Celebrate your love story',
            image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
            icon: '💕'
        },
        {
            title: 'Wedding Gifts',
            description: 'Bless the new beginning',
            image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop',
            icon: '💍'
        },
        {
            title: 'Festival Gifts',
            description: 'Spread joy and prosperity',
            image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop',
            icon: '🪔'
        }
    ];

    // Price Range Gifts
    const priceRanges = [
        {
            range: 'Under ₹20,000',
            description: 'Thoughtful gifts that won\'t break the bank',
            items: 12,
            image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=200&fit=crop'
        },
        {
            range: '₹20,000 - ₹50,000',
            description: 'Premium pieces for special occasions',
            items: 18,
            image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=200&fit=crop'
        },
        {
            range: '₹50,000 - ₹1,00,000',
            description: 'Luxury gifts for milestone moments',
            items: 15,
            image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=200&fit=crop'
        },
        {
            range: 'Above ₹1,00,000',
            description: 'Exclusive pieces for extraordinary occasions',
            items: 8,
            image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=200&fit=crop'
        }
    ];

    // Shop by Occasion data
    const occasionImages = {
        wedding: {
            desktop: 'https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=600',
            mobile: 'https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        birthday: {
            desktop: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=600',
            mobile: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        treatYourself: {
            desktop: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=600',
            mobile: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        engagement: {
            desktop: 'https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg?auto=compress&cs=tinysrgb&w=600',
            mobile: 'https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        anniversary: {
            desktop: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=600',
            mobile: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
    };

    const handleGiftCuratorSubmit = () => {
        if (giftCategory && giftPrice && giftRelation) {
            console.log('Gift curator search:', { giftCategory, giftPrice, giftRelation });
            // Handle the search logic here
        }
    };

    // Responsive font sizes
    const responsiveTitle = {
        fontSize: isMobile ? '1.5rem' : '2rem',
        fontWeight: 'bold'
    };

    const responsiveSubtitle = {
        fontSize: isMobile ? '0.9rem' : '1.1rem'
    };

    return (
        <Container maxWidth="xl" sx={{ py: 0, bgcolor: '#f9f6f2', px: isSmallMobile ? 1 : 2 }}>

            {/* Hero Section with Rakhi Banner */}
            <Box sx={{
                position: 'relative',
                height: { xs: '30vh', sm: '40vh', md: '60vh' },
                mb: { xs: 3, md: 5 },
                borderRadius: 2,
                overflow: 'hidden'
            }}>
                <CardMedia
                    component="img"
                    image="https://staticimg.tanishq.co.in/microsite/gifting/assets/images/banner/rakhi-edit-brother-desktop.jpg"
                    alt="Rakhi Special"
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center'
                    }}
                />
            </Box>

            {/* New Gift Of Love Section */}
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography sx={{ ...responsiveTitle, mb: 1 }}>
                    A Bond Of Protection, A Gift Of Love
                </Typography>
                <Box sx={{ width: 60, height: 4, bgcolor: '#d4af37', mx: 'auto', mb: 3, borderRadius: 2 }} />

                <Box sx={{
                    display: 'flex',
                    // flexDirection: { xs: 'column', md: 'row' },
                    gap: 3,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Box sx={{
                        position: 'relative',
                        width: { xs: '100%', md: '45%' },
                        borderRadius: 2,
                        overflow: 'hidden',
                        cursor: 'pointer'
                    }}>
                        <CardMedia
                            component="img"
                            image="https://staticimg.tanishq.co.in/microsite/gifting/assets/images/giftOfLove/gifts-for-sister.jpg"
                            alt="Gifts For Sister"
                            sx={{ width: '100%', height: 250, objectFit: 'cover' }}
                        />
                        <Box sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            bgcolor: 'rgba(0, 0, 0, 0.4)',
                            color: 'white',
                            py: 2,
                            fontWeight: 'bold',
                            fontSize: isMobile ? '1rem' : '1.2rem',
                            textAlign: 'center'
                        }}>
                            Gifts For Sister
                        </Box>
                    </Box>

                    <Box sx={{
                        position: 'relative',
                        width: { xs: '100%', md: '45%' },
                        borderRadius: 2,
                        overflow: 'hidden',
                        cursor: 'pointer'
                    }}>
                        <CardMedia
                            component="img"
                            image="https://staticimg.tanishq.co.in/microsite/gifting/assets/images/giftOfLove/rakhis-for-brother.jpg"
                            alt="Rakhis For Brother"
                            sx={{ width: '100%', height: 250, objectFit: 'cover' }}
                        />
                        <Box sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            bgcolor: 'rgba(0, 0, 0, 0.4)',
                            color: 'white',
                            py: 2,
                            fontWeight: 'bold',
                            fontSize: isMobile ? '1rem' : '1.2rem',
                            textAlign: 'center'
                        }}>
                            Rakhis For Brother
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Gift By Range Section */}
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography sx={{ ...responsiveTitle, mb: 1 }}>
                    Gift By Range
                </Typography>
                <Typography sx={{ ...responsiveSubtitle, color: 'text.secondary', mb: 3 }}>
                    Explore The Gifting Range That Fits Your Budget
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    justifyContent: 'center'
                }}>
                    {priceRanges.map((range, index) => (
                        <Box key={index} sx={{
                            width: { xs: '45%', sm: '22%' },
                            borderRadius: 2,
                            overflow: 'hidden',
                            cursor: 'pointer'
                        }}>
                            <CardMedia
                                component="img"
                                image={range.image}
                                alt={range.range}
                                sx={{ width: '100%', height: 150, objectFit: 'cover' }}
                            />
                            <Typography sx={{ mt: 1, fontWeight: 'bold', fontSize: isSmallMobile ? '0.8rem' : '0.9rem' }}>
                                {range.range}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Rakhi Gifts For Your Sister Section */}
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography sx={{ ...responsiveTitle, mb: 1, color: '#6B1028' }}>
                    Rakhi Gifts For Your Sister
                </Typography>
                <Typography sx={{ ...responsiveSubtitle, color: 'text.secondary', mb: 3 }}>
                    Express Your Love This Rakhi With Stunning Jewellery
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    justifyContent: 'center'
                }}>
                    {[1, 2, 3, 4].map((item, index) => (
                        <Box key={index} sx={{
                            width: { xs: '45%', sm: '22%' },
                            textAlign: 'left'
                        }}>
                            <CardMedia
                                component="img"
                                image={`https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop&${index}`}
                                alt="Jewelry item"
                                sx={{ width: '100%', borderRadius: 2, mb: 1, height: 150, objectFit: 'cover' }}
                            />
                            <Typography sx={{ fontWeight: 'bold', fontSize: isSmallMobile ? '0.8rem' : '0.9rem' }}>
                                {index === 0 && 'Divine Om Pendant'}
                                {index === 1 && 'Sacred Ganesha Diamond Pendant'}
                                {index === 2 && 'Geometric Glow Diamond Stud Earrings'}
                                {index === 3 && 'Twilight Wings Diamond Stud Earrings'}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary', fontSize: isSmallMobile ? '0.7rem' : '0.8rem' }}>
                                {index === 0 && '₹ 20226'}
                                {index === 1 && '₹ 29546'}
                                {index === 2 && '₹ 33617'}
                                {index === 3 && '₹ 18970'}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Shop by Occasion Section */}
            <Box sx={{ mb: 6 }}>
                <Typography sx={{ ...responsiveTitle, textAlign: 'center', mb: 1 }}>
                    Shop by Occasion
                </Typography>
                <Typography sx={{ ...responsiveSubtitle, textAlign: 'center', mb: 3 }}>
                    Explore the curated Gifting List for Every Occasion
                </Typography>

                {/* Desktop Layout */}
                {!isMobile ? (
                    <Box sx={{ display: 'flex', gap: 2, height: 400 }}>
                        {/* Left Column - Wedding */}
                        <Box sx={{ flex: 1 }}>
                            <Paper
                                sx={{
                                    position: 'relative',
                                    height: '100%',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    '&:hover': { transform: 'scale(1.02)' },
                                    transition: 'transform 0.3s'
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="100%"
                                    image={occasionImages.wedding.desktop}
                                    alt="Wedding"
                                    sx={{ objectFit: 'cover' }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 20,
                                        left: 20,
                                        color: 'white',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
                                    }}
                                >
                                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                                        Wedding
                                    </Typography>
                                </Box>
                            </Paper>
                        </Box>

                        {/* Middle Column - Birthday & Treat Yourself */}
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Paper
                                sx={{
                                    position: 'relative',
                                    flex: 1,
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    '&:hover': { transform: 'scale(1.02)' },
                                    transition: 'transform 0.3s'
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="100%"
                                    image={occasionImages.birthday.desktop}
                                    alt="Birthday"
                                    sx={{ objectFit: 'cover' }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 15,
                                        left: 15,
                                        color: 'white',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
                                    }}
                                >
                                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                        Birthday
                                    </Typography>
                                </Box>
                            </Paper>
                            <Paper
                                sx={{
                                    position: 'relative',
                                    flex: 1,
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    '&:hover': { transform: 'scale(1.02)' },
                                    transition: 'transform 0.3s'
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="100%"
                                    image={occasionImages.treatYourself.desktop}
                                    alt="Treat Yourself"
                                    sx={{ objectFit: 'cover' }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 15,
                                        left: 15,
                                        color: 'white',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
                                    }}
                                >
                                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                        Treat Yourself
                                    </Typography>
                                </Box>
                            </Paper>
                        </Box>

                        {/* Right Column - Engagement & Anniversary */}
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Paper
                                sx={{
                                    position: 'relative',
                                    flex: 1,
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    '&:hover': { transform: 'scale(1.02)' },
                                    transition: 'transform 0.3s'
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="100%"
                                    image={occasionImages.engagement.desktop}
                                    alt="Engagement"
                                    sx={{ objectFit: 'cover' }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 15,
                                        left: 15,
                                        color: 'white',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
                                    }}
                                >
                                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                        Engagement
                                    </Typography>
                                </Box>
                            </Paper>
                            <Paper
                                sx={{
                                    position: 'relative',
                                    flex: 1,
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    '&:hover': { transform: 'scale(1.02)' },
                                    transition: 'transform 0.3s'
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="100%"
                                    image={occasionImages.anniversary.desktop}
                                    alt="Anniversary"
                                    sx={{ objectFit: 'cover' }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 15,
                                        left: 15,
                                        color: 'white',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
                                    }}
                                >
                                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                        Anniversary
                                    </Typography>
                                </Box>
                            </Paper>
                        </Box>
                    </Box>
                ) : (
                    /* Mobile Layout */
                    <Box>
                        {/* Wedding - Full Width */}
                        <Paper
                            sx={{
                                position: 'relative',
                                mb: 1,
                                borderRadius: 2,
                                overflow: 'hidden',
                                height: 150,
                                cursor: 'pointer'
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="100%"
                                image={occasionImages.wedding.mobile}
                                alt="Wedding"
                                sx={{ objectFit: 'cover' }}
                            />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 10,
                                    left: 10,
                                    color: 'white',
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
                                }}
                            >
                                <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                    Wedding
                                </Typography>
                            </Box>
                        </Paper>

                        {/* Birthday & Treat Yourself - Side by Side */}
                        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                            <Paper
                                sx={{
                                    position: 'relative',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    width: '50%',
                                    height: 120,
                                    cursor: 'pointer'
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="100%"
                                    image={occasionImages.birthday.mobile}
                                    alt="Birthday"
                                    sx={{ objectFit: 'cover' }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 10,
                                        left: 10,
                                        color: 'white',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
                                    }}
                                >
                                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                                        Birthday
                                    </Typography>
                                </Box>
                            </Paper>
                            <Paper
                                sx={{
                                    position: 'relative',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    width: '50%',
                                    height: 120,
                                    cursor: 'pointer'
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="100%"
                                    image={occasionImages.treatYourself.mobile}
                                    alt="Treat Yourself"
                                    sx={{ objectFit: 'cover' }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 10,
                                        left: 10,
                                        color: 'white',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
                                    }}
                                >
                                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                                        Treat Yourself
                                    </Typography>
                                </Box>
                            </Paper>
                        </Box>

                        {/* Engagement & Anniversary - Side by Side */}
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Paper
                                sx={{
                                    position: 'relative',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    width: '50%',
                                    height: 120,
                                    cursor: 'pointer'
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="100%"
                                    image={occasionImages.engagement.mobile}
                                    alt="Engagement"
                                    sx={{ objectFit: 'cover' }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 10,
                                        left: 10,
                                        color: 'white',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
                                    }}
                                >
                                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                                        Engagement
                                    </Typography>
                                </Box>
                            </Paper>
                            <Paper
                                sx={{
                                    position: 'relative',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    width: '50%',
                                    height: 120,
                                    cursor: 'pointer'
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="100%"
                                    image={occasionImages.anniversary.mobile}
                                    alt="Anniversary"
                                    sx={{ objectFit: 'cover' }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 10,
                                        left: 10,
                                        color: 'white',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
                                    }}
                                >
                                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                                        Anniversary
                                    </Typography>
                                </Box>
                            </Paper>
                        </Box>
                    </Box>
                )}
            </Box>

            {/* Late in Planning Gift Cards and Gold Coins */}
            <Box sx={{ mb: 6 }}>
                <Box sx={{
                    display: 'flex',
                    // flexDirection: { xs: 'column', md: 'row' },
                    gap: { xs: 1, sm: 3 },
                    mb: 4,
                    alignItems: 'center'
                }}>
                    <Box sx={{
                        width: { xs: '100%', md: '50%' },
                        borderRadius: 2,
                        overflow: 'hidden'
                    }}>
                        <CardMedia
                            component="img"
                            image="/collection1.png"
                            alt="Gift Card Banner"
                            sx={{ width: '100%', height: 300, objectFit: 'cover' }}
                        />
                    </Box>
                    <Box sx={{
                        width: { xs: '100%', md: '50%' },
                        textAlign: { xs: 'center', md: 'left' }
                    }}>
                        <Typography sx={{ ...responsiveTitle, mb: 2 }}>
                            Late in planning?
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                            Explore Gift Cards for your last minute gifting needs
                        </Typography>
                        <Button
                            variant="contained"
                            // href="https://www.tanishq.co.in/shop/gift-card?lang=en_IN"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                borderRadius: 2,
                                textTransform: 'none'
                            }}
                        >
                            Buy Gift Cards
                        </Button>
                    </Box>
                </Box>

                <Box sx={{
                    display: 'flex',
                    // flexDirection: { xs: 'column-reverse', md: 'row' },
                    gap: { xs: 1, sm: 3 },
                    alignItems: 'center'
                }}>
                    <Box sx={{
                        width: { xs: '100%', md: '50%' },
                        textAlign: { xs: 'center', md: 'left' }
                    }}>
                        <Typography sx={{ ...responsiveTitle, mb: 1 }}>
                            Or gold coins
                        </Typography>
                        <Typography sx={{ mb: 3 }}>
                            Explore Gift Coins for your last minute gifting needs
                        </Typography>
                        <Button
                            variant="contained"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                borderRadius: 2,
                                textTransform: 'none'
                            }}
                        >
                            Buy Gold Coins
                        </Button>
                    </Box>
                    <Box sx={{
                        width: { xs: '100%', md: '50%' },
                        borderRadius: 2,
                        overflow: 'hidden'
                    }}>
                        <CardMedia
                            component="img"
                            image="https://staticimg.tanishq.co.in/microsite/gifting/assets/images/crossSection/goldcoins.jpg"
                            alt="Gold Coins Banner"
                            sx={{ width: '100%', height: 300, objectFit: 'cover' }}
                        />
                    </Box>
                </Box>
            </Box>

            {/* Complete Your Gifting Experience */}
            <Box sx={{ mb: 6 }}>
                <Typography
                    sx={{
                        ...responsiveTitle,
                        textAlign: 'center',
                        mb: 4,
                        color: 'primary.main'
                    }}
                >
                    Complete Your Gifting Experience
                </Typography>

                <Box sx={{
                    display: 'flex',
                    // flexDirection: { xs: 'column', md: 'row' },
                    flexWrap: 'wrap',
                    gap: 3,
                    justifyContent: 'center'
                }}>
                    {/* Store Locator Card */}
                    <Box sx={{
                        // width: { xs: '100%', md: '30%' },
                        width: { xs: '90%', sm: '30%' },
                        borderRadius: 2,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        boxShadow: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            boxShadow: 6,
                            transform: 'translateY(-4px)'
                        }
                    }}>
                        <Box sx={{ position: 'relative', overflow: 'hidden', height: 250 }}>
                            <CardMedia
                                component="img"
                                height="100%"
                                image="/collection1.png"
                                alt="Store Locator"
                                sx={{
                                    transition: 'transform 0.5s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)'
                                    }
                                }}
                            />
                            <Box sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                                p: 1
                            }}>
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        color: 'white',
                                        textAlign: 'center',
                                        fontSize: '1rem'
                                    }}
                                >
                                    Visit Our Store
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{
                            textAlign: 'center',
                            bgcolor: 'background.paper',
                            py: 2
                        }}>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                sx={{
                                    borderRadius: 2,
                                    px: 2,
                                    fontWeight: 'bold'
                                }}
                            >
                                Find Stores
                            </Button>
                        </Box>
                    </Box>

                    {/* Book Appointment Card */}
                    <Box sx={{
                        width: { xs: '90%', sm: '30%' },
                        borderRadius: 2,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        boxShadow: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            boxShadow: 6,
                            transform: 'translateY(-4px)'
                        }
                    }}>
                        <Box sx={{ position: 'relative', overflow: 'hidden', height: 150 }}>
                            <CardMedia
                                component="img"
                                height="100%"
                                image="https://staticimg.tanishq.co.in/microsite/dailywear/assets-new/images/last-section/book-an-appointment.jpg"
                                alt="Book An Appointment"
                                sx={{
                                    transition: 'transform 0.5s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)'
                                    }
                                }}
                            />
                            <Box sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                                p: 1
                            }}>
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        color: 'white',
                                        textAlign: 'center',
                                        fontSize: '1rem'
                                    }}
                                >
                                    Book An Appointment
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{
                            textAlign: 'center',
                            bgcolor: 'background.paper',
                            py: 2
                        }}>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                sx={{
                                    borderRadius: 2,
                                    px: 2,
                                    fontWeight: 'bold'
                                }}
                            >
                                Schedule Now
                            </Button>
                        </Box>
                    </Box>

                    {/* Talk to Expert Card */}
                    <Box sx={{
                        width: { xs: '90%', sm: '30%' },
                        borderRadius: 2,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        boxShadow: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            boxShadow: 6,
                            transform: 'translateY(-4px)'
                        }
                    }}>
                        <Box sx={{ position: 'relative', overflow: 'hidden', height: 150 }}>
                            <CardMedia
                                component="img"
                                height="100%"
                                image="/collection1.png"
                                alt="Talk To An Expert"
                                sx={{
                                    transition: 'transform 0.5s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)'
                                    }
                                }}
                            />
                            <Box sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                                p: 1
                            }}>
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        color: 'white',
                                        textAlign: 'center',
                                        fontSize: '1rem'
                                    }}
                                >
                                    Talk To An Expert
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{
                            textAlign: 'center',
                            bgcolor: 'background.paper',
                            py: 2
                        }}>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                sx={{
                                    borderRadius: 2,
                                    px: 2,
                                    fontWeight: 'bold'
                                }}
                            >
                                Chat Now
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default GiftingPage;