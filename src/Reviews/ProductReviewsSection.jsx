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

    // Fetch total reviews count

    // // 1:
    // const fetchTotalReviews = async () => {
    //     try {
    //         const response = await axiosInstance.get(`/api/review/product/${productId}`);
    //         // The total reviews will be in the pagination object
    //         setTotalReviews(response.data.pagination.total);
    //     } catch (error) {
    //         console.error("Error fetching reviews:", error);
    //     }
    // };

    // // 2:
    const fetchTotalReviews = async () => {
        // Ensure productId is valid
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
                p={2}
                sx={{
                    backgroundColor: '#fafafa',
                    borderRadius: 2,
                    mb: 2,
                }}
            >
                {/* older code */}
                {/* <Box display="flex" alignItems="center" gap={2}>
                    {product.averageRating && product.averageRating > 0 ? (
                        <>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Star sx={{ color: '#FFD700', fontSize: 28 }} />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {product.averageRating?.toFixed(1)}
                                </Typography>
                            </Box>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#44170D',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    fontWeight: 500,
                                }}
                                onClick={toggleReviews}
                            >
                                ({product.totalReviews || 0} {product.totalReviews === 1 ? 'review' : 'reviews'})
                            </Typography>
                        </>
                    ) : (
                        <Typography variant="body1" color="text.secondary">
                            No reviews yet
                        </Typography>
                    )}
                </Box> */}

                {/* new code */}
                <>
                    {/* option 1: */}
                    {/* <Box display="flex" alignItems="center" gap={1}>
                        <Star sx={{ color: '#FFD700', fontSize: 28 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {(product.averageRating ?? 0).toFixed(1)}
                        </Typography>
                    </Box>
                    <Typography
                        variant="body1"
                        sx={{ color: '#44170D', cursor: 'pointer', textDecoration: 'underline', fontWeight: 500 }}
                        onClick={toggleReviews}
                    >
                        ({product.totalReviews || 0} {(product.totalReviews || 0) === 1 ? 'review' : 'reviews'})
                    </Typography> */}

                    {/* option 2: */}
                    {/* <Box display="flex" alignItems="center" gap={1}>
                        <Star sx={{ color: '#FFD700', fontSize: 28 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {(product.averageRating ?? 0).toFixed(1)}
                        </Typography>
                    </Box> */}

                    {/* option 3: */}
                    {/* Rating Summary */}
                    {/* <Box display="flex" alignItems="center" gap={1}>
                        <Star sx={{ color: '#FFD700', fontSize: 28 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {(product.averageRating ?? 0).toFixed(1)}
                        </Typography>
                    </Box> */}

                    {/* Total Reviews */}
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#44170D',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            fontWeight: 600,
                            fontSize: 20,
                            textTransform: 'capitalize'
                        }}
                        onClick={toggleReviews}
                    >
                        ({totalReviews || 0} {totalReviews === 1 ? 'review' : 'reviews'})
                    </Typography>
                </>

                <Box display="flex" gap={2}>
                    {/* {product.totalReviews > 0 && (
                        <Button
                            variant="outlined"
                            onClick={toggleReviews}
                            sx={{
                                borderColor: '#44170D',
                                color: '#44170D',
                                '&:hover': {
                                    borderColor: '#7A3A0F',
                                    backgroundColor: 'rgba(68, 23, 13, 0.04)',
                                },
                            }}
                        >
                            {showReviews ? 'Hide Reviews' : 'See Reviews'}
                        </Button>
                    )} */}

                    {/* 2: */}
                    {true && (
                        <Button
                            variant="outlined"
                            onClick={toggleReviews}
                            sx={{
                                borderColor: '#44170D',
                                color: '#44170D',
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



