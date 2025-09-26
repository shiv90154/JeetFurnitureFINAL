import { useEffect, useState } from 'react';
import { Box, Button, Typography, Divider } from '@mui/material';
import { RateReview, Star } from '@mui/icons-material';
import ReviewsList from './ReviewsList';
import ReviewSubmissionForm from './ReviewSubmissionForm';
import { toast } from 'react-toastify';
import axiosInstance from '../common components/AxiosInstance';

const ProductReviewsSection = ({ product, onRefreshProduct }) => {
    const [reviewFormOpen, setReviewFormOpen] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const productId = product?._id;

    const userJson = localStorage.getItem('userData');
    const user = userJson ? JSON.parse(userJson) : null;

    const handleWriteReview = () => {
        if (!user) {
            toast.error('Please log in to write a review');
            return;
        }
        setReviewFormOpen(true);
    };

    const toggleReviews = () => {
        setShowReviews(!showReviews);
    };

    const [totalReviews, setTotalReviews] = useState(0);

    const fetchTotalReviews = async () => {
        if (!productId) {
            console.error('Product ID is undefined or invalid');
            return;
        }

        try {
            const response = await axiosInstance.get(`/api/review/product/${productId}`);
            // Assuming pagination.total exists in the response
            setTotalReviews(response.data.pagination.total);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            toast.error('Failed to fetch reviews');
        }
    };


    // Fetch reviews whenever the component mounts or productId changes
    useEffect(() => {
        fetchTotalReviews();
    }, [productId]);

    return (
        <Box sx={{ mt: 4 }}>
            {/* Rating Summary Bar */}
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                py={4}
                px={1}
                sx={{
                    backgroundColor: '#fafafa',
                    borderRadius: 2,
                    mb: 2,
                }}
            >
                <>
                    {/* Total Reviews */}
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#44170D',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            fontWeight: 600,
                            fontSize: {
                                xs: '14px',
                                md: '20px',
                            },
                            textTransform: 'capitalize'
                        }}
                        onClick={toggleReviews}
                    >
                        ({totalReviews || 0} {totalReviews === 1 ? 'review' : 'reviews'})
                    </Typography>
                </>

                <Box display="flex" gap={{ xs: 1, sm: 2 }}>

                    {true && (
                        <Button
                            variant="outlined"
                            onClick={toggleReviews}
                            sx={{
                                borderColor: '#44170D',
                                color: '#44170D',
                                fontSize: { xs: 9, sm: 14 },
                                padding: { xs: "4px 8px", md: "6px 12px" },
                                '&:hover': {
                                    borderColor: '#7A3A0F',
                                    backgroundColor: 'rgba(68, 23, 13, 0.04)',
                                },
                            }}
                        >
                            {showReviews ? 'Hide Reviews' : 'See Reviews'}
                        </Button>
                    )}

                    <Button
                        variant="contained"
                        startIcon={<RateReview />}
                        onClick={handleWriteReview}
                        sx={{
                            backgroundColor: '#44170D',
                            fontSize: { xs: 9, sm: 14 },
                            padding: { xs: "4px 8px", md: "6px 12px" },
                            '&:hover': {
                                backgroundColor: '#7A3A0F'
                            }
                        }}
                    >
                        Write Review
                    </Button>
                </Box>
            </Box>

            {/* Reviews Section */}
            {
                showReviews && (
                    <>
                        <Divider sx={{ mb: 3 }} />
                        <ReviewsList productId={product._id} refreshKey={refreshKey} />
                    </>
                )
            }

            <ReviewSubmissionForm
                productId={product._id}
                open={reviewFormOpen}
                onClose={() => setReviewFormOpen(false)}
                onReviewSubmitted={() => {
                    onRefreshProduct?.();
                    fetchData()
                    setRefreshKey(k => k + 1);
                }}
            />

        </Box >
    );
};

export default ProductReviewsSection;



