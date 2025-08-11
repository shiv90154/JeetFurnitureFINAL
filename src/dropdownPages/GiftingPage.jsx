import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    Button,
    CardMedia,
    Paper,
    Chip,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { CardGiftcard, MonetizationOn, Star, LocalOffer, FavoriteBorder, Favorite, ArrowForward } from '@mui/icons-material';
// import ImageSlider from '../components/ImageSlider';
// import ImageSliderTwo from '../components/ImageSliderTwo';

const GiftingPage = () => {
    const [activeTab, setActiveTab] = useState('wishlisted');
    const [giftCategory, setGiftCategory] = useState('');
    const [giftPrice, setGiftPrice] = useState('');
    const [giftRelation, setGiftRelation] = useState('');
    const [showMobileForm, setShowMobileForm] = useState(false);

    const theme = useTheme();

    // Hero Section - Gift Cards and Gold Coins
    const giftOptions = [
        {
            title: 'Gift Cards',
            subtitle: 'Late In Planning?',
            description: 'Explore Tanishq Gift Cards For Your Last Minute Gifting Needs',
            buttonText: 'Buy Gift Cards',
            image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=400&fit=crop',
            bgColor: '#8B1538',
            icon: <CardGiftcard sx={{ fontSize: 40, color: 'white' }} />
        },
        {
            title: 'Gold Coins',
            subtitle: 'Or Gold Coins',
            description: 'Explore Tanishq Gold Coins For Your Last Minute Gifting Needs',
            buttonText: 'Buy Gold Coins',
            image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=500&h=400&fit=crop',
            bgColor: '#B8860B',
            icon: <MonetizationOn sx={{ fontSize: 40, color: 'white' }} />
        }
    ];

    // Gift Categories
    const giftCategories = [
        {
            title: 'For Her',
            items: [
                {
                    name: 'Diamond Earrings',
                    price: '₹ 25,000',
                    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop',
                    occasion: 'Birthday'
                },
                {
                    name: 'Gold Necklace Set',
                    price: '₹ 45,000',
                    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop',
                    occasion: 'Anniversary'
                },
                {
                    name: 'Pearl Bracelet',
                    price: '₹ 18,000',
                    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=300&h=300&fit=crop',
                    occasion: 'Wedding'
                }
            ]
        },
        {
            title: 'For Him',
            items: [
                {
                    name: 'Gold Chain',
                    price: '₹ 35,000',
                    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300&h=300&fit=crop',
                    occasion: 'Birthday'
                },
                {
                    name: 'Diamond Cufflinks',
                    price: '₹ 28,000',
                    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=300&h=300&fit=crop',
                    occasion: 'Professional'
                },
                {
                    name: 'Gold Ring',
                    price: '₹ 22,000',
                    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop',
                    occasion: 'Engagement'
                }
            ]
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

    // Top Picks Products
    const topPicksProducts = {
        wishlisted: [
            {
                name: 'Eclectic Fancy Diamond Drop Earrings',
                price: '₹ 51854',
                image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop',
                isFavorite: true
            },
            {
                name: 'Magnificent Flower Diamond Ring',
                price: '₹ 61758',
                image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop',
                isFavorite: true
            },
            {
                name: 'Twinkle Dome Diamond Jhumka Earrings',
                price: '₹ 60542',
                image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
                isFavorite: true
            },
            {
                name: 'Linear Elegance Diamond Bracelet',
                price: '₹ 71703',
                image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=300&h=300&fit=crop',
                isFavorite: true
            }
        ],
        bought: [
            {
                name: 'Classic Gold Chain Necklace',
                price: '₹ 45000',
                image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop',
                isFavorite: false
            },
            {
                name: 'Pearl Drop Earrings',
                price: '₹ 28500',
                image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop',
                isFavorite: false
            },
            {
                name: 'Diamond Tennis Bracelet',
                price: '₹ 85000',
                image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=300&h=300&fit=crop',
                isFavorite: false
            },
            {
                name: 'Gold Wedding Ring Set',
                price: '₹ 55000',
                image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop',
                isFavorite: false
            }
        ]
    };

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

    return (
        <Container maxWidth="xl" sx={{ py: 0, bgcolor: '#f9f6f2' }}>

            {/* Hero Section with Rakhi Banner */}
            <Box sx={{
                position: 'relative',
                height: { xs: '40vh', sm: '50vh', md: '70vh' },
                mb: { xs: 4, md: 6 },
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
            <Box sx={{ mb: 8, px: { xs: 2, md: 0 }, textAlign: 'center' }}>
                <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    A Bond Of Protection, A Gift Of Love
                </Typography>
                <Box sx={{ width: 60, height: 4, bgcolor: '#d4af37', mx: 'auto', mb: 4, borderRadius: 2 }} />

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, justifyContent: 'center' }}>
                    <Box sx={{ position: 'relative', flex: 1, borderRadius: 3, overflow: 'hidden', cursor: 'pointer' }}>
                        <CardMedia
                            component="img"
                            image="https://staticimg.tanishq.co.in/microsite/gifting/assets/images/giftOfLove/gifts-for-sister.jpg"
                            alt="Gifts For Sister"
                            sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 3 }}
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
                            fontSize: { xs: '1.2rem', md: '1.5rem' },
                            borderBottomLeftRadius: 12,
                            borderBottomRightRadius: 12,
                            textAlign: 'center'
                        }}>
                            Gifts For Sister
                        </Box>
                    </Box>

                    <Box sx={{ position: 'relative', flex: 1, borderRadius: 3, overflow: 'hidden', cursor: 'pointer' }}>
                        <CardMedia
                            component="img"
                            image="https://staticimg.tanishq.co.in/microsite/gifting/assets/images/giftOfLove/rakhis-for-brother.jpg"
                            alt="Rakhis For Brother"
                            sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 3 }}
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
                            fontSize: { xs: '1.2rem', md: '1.5rem' },
                            borderBottomLeftRadius: 12,
                            borderBottomRightRadius: 12,
                            textAlign: 'center'
                        }}>
                            Rakhis For Brother
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Gift By Range Section */}
            <Box sx={{ mb: 8, px: { xs: 2, md: 0 }, textAlign: 'center' }}>
                <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Gift By Range
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
                    Explore The Gifting Range That Fits Your Budget
                </Typography>
                <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Box sx={{ flex: '1 1 200px', borderRadius: 3, overflow: 'hidden', cursor: 'pointer' }}>
                        <CardMedia
                            component="img"
                            image="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop"
                            alt="Under 25K"
                            sx={{ width: '100%', height: 250, objectFit: 'cover' }}
                        />
                        <Typography sx={{ mt: 1, fontWeight: 'bold' }}>Under 25K</Typography>
                    </Box>
                    <Box sx={{ flex: '1 1 200px', borderRadius: 3, overflow: 'hidden', cursor: 'pointer' }}>
                        <CardMedia
                            component="img"
                            image="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop"
                            alt="25K - 50K"
                            sx={{ width: '100%', height: 250, objectFit: 'cover' }}
                        />
                        <Typography sx={{ mt: 1, fontWeight: 'bold' }}>25K - 50K</Typography>
                    </Box>
                    <Box sx={{ flex: '1 1 200px', borderRadius: 3, overflow: 'hidden', cursor: 'pointer' }}>
                        <CardMedia
                            component="img"
                            image="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop"
                            alt="50K - 1L"
                            sx={{ width: '100%', height: 250, objectFit: 'cover' }}
                        />
                        <Typography sx={{ mt: 1, fontWeight: 'bold' }}>50K - 1L</Typography>
                    </Box>
                    <Box sx={{ flex: '1 1 200px', borderRadius: 3, overflow: 'hidden', cursor: 'pointer' }}>
                        <CardMedia
                            component="img"
                            image="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop"
                            alt="1L & Above"
                            sx={{ width: '100%', height: 250, objectFit: 'cover' }}
                        />
                        <Typography sx={{ mt: 1, fontWeight: 'bold' }}>1L & Above</Typography>
                    </Box>
                </Box>
            </Box>

            {/* Rakhi Gifts For Your Sister Section */}
            <Box sx={{ mb: 8, px: { xs: 2, md: 0 }, textAlign: 'center' }}>
                <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 1, color: '#6B1028' }}>
                    Rakhi Gifts For Your Sister
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
                    Express Your Love This Rakhi With Stunning Tanishq Jewellery
                </Typography>
                <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Box sx={{ flex: '1 1 200px', textAlign: 'left' }}>
                        <CardMedia
                            component="img"
                            image="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop"
                            alt="Divine Om Pendant"
                            sx={{ width: '100%', borderRadius: 3, mb: 1 }}
                        />
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            Divine Om Pendant
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            ₹ 20226
                        </Typography>
                    </Box>
                    <Box sx={{ flex: '1 1 200px', textAlign: 'left' }}>
                        <CardMedia
                            component="img"
                            image="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop"
                            alt="Sacred Ganesha Diamond Pendant"
                            sx={{ width: '100%', borderRadius: 3, mb: 1 }}
                        />
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            Sacred Ganesha Diamond Pendant
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            ₹ 29546
                        </Typography>
                    </Box>
                    <Box sx={{ flex: '1 1 200px', textAlign: 'left' }}>
                        <CardMedia
                            component="img"
                            image="https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=300&h=300&fit=crop"
                            alt="Geometric Glow Diamond Stud Earrings"
                            sx={{ width: '100%', borderRadius: 3, mb: 1 }}
                        />
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            Geometric Glow Diamond Stud Earrings
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            ₹ 33617
                        </Typography>
                    </Box>
                    <Box sx={{ flex: '1 1 200px', textAlign: 'left' }}>
                        <CardMedia
                            component="img"
                            image="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop"
                            alt="Twilight Wings Diamond Stud Earrings"
                            sx={{ width: '100%', borderRadius: 3, mb: 1 }}
                        />
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            Twilight Wings Diamond Stud Earrings
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            ₹ 18970
                        </Typography>
                    </Box>
                </Box>
            </Box>


            {/* Shop by Occasion Section */}
            <Box sx={{ mb: 8 }}>
                <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 1 }}>
                    Shop by Occasion
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>
                    Explore the curated Gifting List for Every Occasion
                </Typography>

                {/* Desktop Layout */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, height: 500 }}>
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
                                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
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
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
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
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
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
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
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
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                    Anniversary
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                </Box>

                {/* Mobile Layout */}
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    {/* Wedding - Full Width */}
                    <Paper
                        sx={{
                            position: 'relative',
                            mb: 1,
                            borderRadius: 2,
                            overflow: 'hidden',
                            height: 200,
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
                                bottom: 15,
                                left: 15,
                                color: 'white',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
                            }}
                        >
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                Wedding
                            </Typography>
                        </Box>
                    </Paper>

                    {/* Birthday & Treat Yourself - Side by Side */}
                    <Grid container spacing={1} sx={{ mb: 1 }}>
                        <Grid item xs={6}>
                            <Paper
                                sx={{
                                    position: 'relative',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    height: 150,
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
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        Birthday
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper
                                sx={{
                                    position: 'relative',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    height: 150,
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
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        Treat Yourself
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* Engagement & Anniversary - Side by Side */}
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Paper
                                sx={{
                                    position: 'relative',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    height: 150,
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
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        Engagement
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper
                                sx={{
                                    position: 'relative',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    height: 150,
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
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        Anniversary
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>


            {/* Gift Curator Section */}
            <Box sx={{ mb: 8 }}>
                {/* Desktop Version */}
                <Paper sx={{ display: { xs: 'none', md: 'flex' }, borderRadius: 3, overflow: 'hidden', minHeight: 400 }}>
                    <Box sx={{ flex: 1, p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                                <Box>
                                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#8B1538' }}>
                                        Not sure what to buy?                                    </Typography>
                                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#8B1538' }}>
                                        Try our gift curator!
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="h6" sx={{ color: '#8B1538', fontWeight: 'bold' }}>
                                        TANISHQ
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                        A TATA Product
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                                <Typography variant="body1">I am looking for exquisite</Typography>
                                <FormControl size="small" sx={{ minWidth: 150 }}>
                                    <Select
                                        value={giftCategory}
                                        onChange={(e) => setGiftCategory(e.target.value)}
                                        displayEmpty
                                        sx={{ borderRadius: 2 }}
                                    >
                                        <MenuItem value="">Choose Category</MenuItem>
                                        <MenuItem value="All">All</MenuItem>
                                        <MenuItem value="Earrings">Earrings</MenuItem>
                                        <MenuItem value="Pendants">Pendants</MenuItem>
                                        <MenuItem value="Finger Rings">Finger Rings</MenuItem>
                                        <MenuItem value="Mangalsutra">Mangalsutra</MenuItem>
                                        <MenuItem value="Chains">Chains</MenuItem>
                                        <MenuItem value="Necklaces">Necklaces</MenuItem>
                                        <MenuItem value="Bangles">Bangles</MenuItem>
                                        <MenuItem value="Bracelets">Bracelets</MenuItem>
                                    </Select>
                                </FormControl>
                                <Typography variant="body1">jewellery,</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                                <Typography variant="body1">within</Typography>
                                <FormControl size="small" sx={{ minWidth: 150 }}>
                                    <Select
                                        value={giftPrice}
                                        onChange={(e) => setGiftPrice(e.target.value)}
                                        displayEmpty
                                        sx={{ borderRadius: 2 }}
                                    >
                                        <MenuItem value="">Choose Price Range</MenuItem>
                                        <MenuItem value="Any">Any</MenuItem>
                                        <MenuItem value="< 25K">&#x20B9;25,000</MenuItem>
                                        <MenuItem value="25K - 50K">&#x20B9;25,000 - &#x20B9;50,000</MenuItem>
                                        <MenuItem value="50K - 1L">&#x20B9;50,000 - &#x20B9;1,00,000</MenuItem>
                                        <MenuItem value="1L +">&#x20B9;1,00,000+</MenuItem>
                                    </Select>
                                </FormControl>
                                <Typography variant="body1">for</Typography>
                                <FormControl size="small" sx={{ minWidth: 150 }}>
                                    <Select
                                        value={giftRelation}
                                        onChange={(e) => setGiftRelation(e.target.value)}
                                        displayEmpty
                                        sx={{ borderRadius: 2 }}
                                    >
                                        <MenuItem value="">Choose Relation</MenuItem>
                                        <MenuItem value="Any">Any</MenuItem>
                                        <MenuItem value="Wife/Girlfriend">Wife/Girlfriend</MenuItem>
                                        <MenuItem value="Husband">Husband</MenuItem>
                                        <MenuItem value="Father">Father</MenuItem>
                                        <MenuItem value="Mom/Sister">Mom/Sister</MenuItem>
                                        <MenuItem value="Kids & Teens">Kids & Teens</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <Box sx={{ mt: 2 }}>
                                <Button
                                    variant="contained"
                                    onClick={handleGiftCuratorSubmit}
                                    disabled={!giftCategory || !giftPrice || !giftRelation}
                                    endIcon={<ArrowForward />}
                                    sx={{
                                        bgcolor: '#8B1538',
                                        '&:hover': { bgcolor: '#6B1028' },
                                        borderRadius: 3,
                                        px: 4,
                                        py: 1.5
                                    }}
                                >
                                    Continue
                                </Button>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <CardMedia
                            component="img"
                            height="100%"
                            image="https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Gift Box"
                            sx={{ objectFit: 'cover' }}
                        />
                    </Box>
                </Paper>

                {/* Mobile Version */}
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    {!showMobileForm ? (
                        <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
                            <CardMedia
                                component="img"
                                height="250"
                                image="https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=600"
                                alt="Gift Box"
                                sx={{ objectFit: 'cover' }}
                            />
                            <Box sx={{ p: 3, textAlign: 'center' }}>
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#8B1538' }}>
                                    Not sure what to buy?
                                </Typography>
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#8B1538', mb: 3 }}>
                                    Try our gift curator!
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={() => setShowMobileForm(true)}
                                    endIcon={<ArrowForward />}
                                    sx={{
                                        bgcolor: '#8B1538',
                                        '&:hover': { bgcolor: '#6B1028' },
                                        borderRadius: 3,
                                        px: 4,
                                        py: 1.5
                                    }}
                                >
                                    Continue
                                </Button>
                            </Box>
                        </Paper>
                    ) : (
                        <Paper sx={{ p: 3, borderRadius: 3 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <Box>
                                    <Typography variant="body1" gutterBottom>I am looking for exquisite</Typography>
                                    <FormControl fullWidth size="small">
                                        <Select
                                            value={giftCategory}
                                            onChange={(e) => setGiftCategory(e.target.value)}
                                            displayEmpty
                                            sx={{ borderRadius: 2 }}
                                        >
                                            <MenuItem value="">Choose Category</MenuItem>
                                            <MenuItem value="All">All</MenuItem>
                                            <MenuItem value="Earrings">Earrings</MenuItem>
                                            <MenuItem value="Pendants">Pendants</MenuItem>
                                            <MenuItem value="Finger Rings">Finger Rings</MenuItem>
                                            <MenuItem value="Mangalsutra">Mangalsutra</MenuItem>
                                            <MenuItem value="Chains">Chains</MenuItem>
                                            <MenuItem value="Necklaces">Necklaces</MenuItem>
                                            <MenuItem value="Bangles">Bangles</MenuItem>
                                            <MenuItem value="Bracelets">Bracelets</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Box>
                                    <Typography variant="body1" gutterBottom>within</Typography>
                                    <FormControl fullWidth size="small">
                                        <Select
                                            value={giftPrice}
                                            onChange={(e) => setGiftPrice(e.target.value)}
                                            displayEmpty
                                            sx={{ borderRadius: 2 }}
                                        >
                                            <MenuItem value="">Choose Price Range</MenuItem>
                                            <MenuItem value="Any">Any</MenuItem>
                                            <MenuItem value="under 25K">&#x20B9;25,000</MenuItem>
                                            <MenuItem value="25K - 50K">&#x20B9;25,000 - &#x20B9;50,000</MenuItem>
                                            <MenuItem value="50K - 1L">&#x20B9;50,000 - &#x20B9;1,00,000</MenuItem>
                                            <MenuItem value="1L +">&#x20B9;1,00,000+</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Box>
                                    <Typography variant="body1" gutterBottom>for</Typography>
                                    <FormControl fullWidth size="small">
                                        <Select
                                            value={giftRelation}
                                            onChange={(e) => setGiftRelation(e.target.value)}
                                            displayEmpty
                                            sx={{ borderRadius: 2 }}
                                        >
                                            <MenuItem value="">Choose Relation</MenuItem>
                                            <MenuItem value="Any">Any</MenuItem>
                                            <MenuItem value="Wife/Girlfriend">Wife/Girlfriend</MenuItem>
                                            <MenuItem value="Husband">Husband</MenuItem>
                                            <MenuItem value="Father">Father</MenuItem>
                                            <MenuItem value="Mom/Sister">Mom/Sister</MenuItem>
                                            <MenuItem value="Kids & Teens">Kids & Teens</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Button
                                    variant="contained"
                                    onClick={handleGiftCuratorSubmit}
                                    disabled={!giftCategory || !giftPrice || !giftRelation}
                                    endIcon={<ArrowForward />}
                                    sx={{
                                        bgcolor: '#8B1538',
                                        '&:hover': { bgcolor: '#6B1028' },
                                        borderRadius: 3,
                                        py: 1.5
                                    }}
                                    fullWidth
                                >
                                    Continue
                                </Button>
                            </Box>
                        </Paper>
                    )}
                </Box>
            </Box>



            {/* New Section: Late in Planning Gift Cards and Gold Coins */}
            <Box component="section" className="section-8" sx={{ mb: 8 }}>
                <Box className="container">
                    <Grid container spacing={4} sx={{ mb: 5 }}>
                        <Grid item xs={12} md={6}>
                            <Card
                                sx={{
                                    height: '100%',
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        boxShadow: 6,
                                        transform: 'translateY(-4px)',
                                        transition: 'all 0.3s ease'
                                    }
                                }}
                                component="a"
                                href="https://www.tanishq.co.in/shop/gift-card?lang=en_IN"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <CardMedia
                                    component="img"
                                    image="https://staticimg.tanishq.co.in/microsite/gifting/assets/images/crossSection/giftcard.jpg"
                                    alt="Gift Card Banner"
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', py: 2 }}>
                            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                                Late in planning?
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                Explore Tanishq Gift Cards for your last minute gifting needs
                            </Typography>
                            <Box>
                                <Button
                                    variant="contained"
                                    href="https://www.tanishq.co.in/shop/gift-card?lang=en_IN"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ textTransform: 'none', borderRadius: 2 }}
                                >
                                    Buy Gift Cards
                                    <Box
                                        component="img"
                                        src="https://staticimg.tanishq.co.in/microsite/gold-exchange/images/icons/arrow-right.png"
                                        alt="Arrow"
                                        sx={{ ml: 1, height: 20 }}
                                    />
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', py: 2, order: { xs: 2, md: 1 } }}>
                            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                                Or gold coins
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                Explore Tanishq Gift Coins for your last minute gifting needs
                            </Typography>
                            <Box>
                                <Button
                                    variant="contained"
                                    href="https://www.tanishq.co.in/shop/gold-coin?lang=en_IN"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ textTransform: 'none', borderRadius: 2 }}
                                >
                                    Buy Gold Coins
                                    <Box
                                        component="img"
                                        src="https://staticimg.tanishq.co.in/microsite/gold-exchange/images/icons/arrow-right.png"
                                        alt="Arrow"
                                        sx={{ ml: 1, height: 20 }}
                                    />
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
                            <Card
                                sx={{
                                    height: '100%',
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        boxShadow: 6,
                                        transform: 'translateY(-4px)',
                                        transition: 'all 0.3s ease'
                                    }
                                }}
                                component="a"
                                href="https://www.tanishq.co.in/shop/gold-coin?lang=en_IN"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <CardMedia
                                    component="img"
                                    image="https://staticimg.tanishq.co.in/microsite/gifting/assets/images/crossSection/goldcoins.jpg"
                                    alt="Gold Coins Banner"
                                />
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>


            {/* Enhanced Section: Complete Your Gifting Experience */}
            <Box sx={{ mb: 8, px: { xs: 2, md: 0 } }}>
                <Typography
                    variant="h3"
                    component="h2"
                    gutterBottom
                    sx={{
                        textAlign: 'center',
                        mb: 6,
                        fontWeight: 'bold',
                        color: 'primary.main',
                        fontSize: { xs: '1.8rem', md: '2.4rem' }
                    }}
                >
                    Complete Your Gifting Experience
                </Typography>

                <Grid container spacing={4} justifyContent="center">
                    {/* Store Locator Card */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                height: '100%',
                                borderRadius: 3,
                                overflow: 'hidden',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                                    transform: 'translateY(-8px)'
                                }
                            }}
                            component="a"
                            href="https://stores.tanishq.co.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                                <CardMedia
                                    component="img"
                                    height="100%"
                                    image="https://staticimg.tanishq.co.in/microsite/dailywear/assets-new/images/last-section/store-locator.jpg"
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
                                    p: 2
                                }}>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 'bold',
                                            color: 'white',
                                            textAlign: 'center'
                                        }}
                                    >
                                        Visit Our Store
                                    </Typography>
                                </Box>
                            </Box>
                            <CardContent sx={{
                                textAlign: 'center',
                                bgcolor: 'background.paper',
                                py: 3
                            }}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    sx={{
                                        borderRadius: 2,
                                        px: 3,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Find Stores
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Book Appointment Card */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                height: '100%',
                                borderRadius: 3,
                                overflow: 'hidden',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                                    transform: 'translateY(-8px)'
                                }
                            }}
                            component="a"
                            href="https://www.tanishq.co.in/book-an-appointment?lang=en_IN"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
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
                                    p: 2
                                }}>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 'bold',
                                            color: 'white',
                                            textAlign: 'center'
                                        }}
                                    >
                                        Book An Appointment
                                    </Typography>
                                </Box>
                            </Box>
                            <CardContent sx={{
                                textAlign: 'center',
                                bgcolor: 'background.paper',
                                py: 3
                            }}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    sx={{
                                        borderRadius: 2,
                                        px: 3,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Schedule Now
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Talk to Expert Card */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                height: '100%',
                                borderRadius: 3,
                                overflow: 'hidden',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                                    transform: 'translateY(-8px)'
                                }
                            }}
                            onClick={() => window.LiveChatWidget?.call('maximize')}
                        >
                            <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                                <CardMedia
                                    component="img"
                                    height="100%"
                                    image="https://staticimg.tanishq.co.in/microsite/dailywear/assets-new/images/last-section/talk-to-expert.png"
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
                                    p: 2
                                }}>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 'bold',
                                            color: 'white',
                                            textAlign: 'center'
                                        }}
                                    >
                                        Talk To An Expert
                                    </Typography>
                                </Box>
                            </Box>
                            <CardContent sx={{
                                textAlign: 'center',
                                bgcolor: 'background.paper',
                                py: 3
                            }}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    sx={{
                                        borderRadius: 2,
                                        px: 3,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Chat Now
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* 
                <ImageSlider /> */}
                {/* <ImageSliderTwo /> */}
            </Box>
        </Container>
    );
};

export default GiftingPage;
