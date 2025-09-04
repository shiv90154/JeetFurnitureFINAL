import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Avatar,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Chip,
    Alert,
    Pagination,
    Select,
    FormControl,
    InputLabel,
    LinearProgress,
    Divider
} from '@mui/material';
import {
    ThumbUp,
    ThumbDown,
    MoreVert,
    Flag,
    Edit,
    Delete,
    Verified,
    Star as StarIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import StarRating from './StarRating';
import ReviewSubmissionForm from './ReviewSubmissionForm';
import axiosInstance from '../common components/AxiosInstance';
import { toast } from 'react-toastify';

const ReviewItem = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(1),
    transition: 'box-shadow 0.2s ease-in-out',
    '&:hover': {
        boxShadow: theme.shadows,
    },
}));

const ReviewHeader = styled(Box)({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
});

const RatingBar = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(1),
}));

const ReviewsList = ({ productId, refreshKey }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState('newest');
    const [filterBy, setFilterBy] = useState('all');
    const [reviewStats, setReviewStats] = useState({});
    const [editReviewOpen, setEditReviewOpen] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [selectedReview, setSelectedReview] = useState(null);
    const [votingLoading, setVotingLoading] = useState({});
    const [totalReviews, setTotalReviews] = useState(0);

    // const user = localStorage.getItem('userData');
    const userJson = localStorage.getItem('userData');
    const user = userJson ? JSON.parse(userJson) : null;

    // // 1:
    useEffect(() => {
        fetchReviews();
        fetchReviewStats();
    }, [productId, page, sortBy, filterBy, refreshKey]);

    // // 2:
    // useEffect(() => {
    //     // Fetch reviews including all types (approved/unapproved and verified/unverified)
    //     fetchReviews();
    // }, [productId, refreshKey]);

    // // 1:
    const fetchReviews = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: '10',
                sortBy,
                filterBy
            });

            const response = await axiosInstance.get(`/api/review/product/${productId}?${params}`);
            console.log("object", response.data)
            console.log("Fetched reviews:", response.data.reviews);
            setReviews(response.data.reviews);
            setTotalPages(response.data.pagination.totalPages);
            setTotalReviews(response.data.pagination.total);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            toast.error('Failed to load reviews');
        } finally {
            setLoading(false);
        }
    };

    // // 2:
    // const fetchReviews = async () => {
    //     try {
    //         const response = await fetch(`/api/review/product/${productId}?filterBy=all`);
    //         const data = await response.json();
    //         setReviews(data.reviews);
    //     } catch (error) {
    //         console.error("Error fetching reviews:", error);
    //     }
    // };

    const fetchReviewStats = async () => {
        try {
            const response = await axiosInstance.get(`/api/review/product/${productId}/stats`);
            setReviewStats(response.data);
        } catch (error) {
            console.error('Error fetching review stats:', error);
        }
    };

    const handleVoteReview = async (reviewId, isHelpful) => {
        if (!user) {
            toast.error('Please log in to vote on reviews');
            return;
        }

        setVotingLoading(prev => ({ ...prev, [reviewId]: true }));

        try {
            await axiosInstance.post(`/api/review/vote/${reviewId}`, {
                userId: user._id,
                isHelpful
            });
            fetchReviews(); // Refresh to show updated vote counts
            toast.success('Vote recorded successfully');
        } catch (error) {
            console.error('Error voting on review:', error);
            toast.error('Failed to record your vote');
        } finally {
            setVotingLoading(prev => ({ ...prev, [reviewId]: false }));
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (!window.confirm('Are you sure you want to delete this review?')) {
            return;
        }

        try {
            await axiosInstance.delete(`/api/review/delete/${reviewId}`, {
                data: { userId: user._id }
            });
            fetchReviews();
            fetchReviewStats();
            setMenuAnchor(null);
            toast.success('Review deleted successfully');
        } catch (error) {
            console.error('Error deleting review:', error);
            toast.error('Failed to delete review');
        }
    };

    const handleEditReview = (review) => {
        setSelectedReview(review);
        setEditReviewOpen(true);
        setMenuAnchor(null);
    };

    const handleReportReview = async (reviewId) => {
        try {
            await axiosInstance.post(`/api/review/report/${reviewId}`, {
                userId: user._id
            });
            toast.success('Review reported. Thank you for your feedback.');
            setMenuAnchor(null);
        } catch (error) {
            console.error('Error reporting review:', error);
            toast.error('Failed to report review');
        }
    };

    const renderRatingDistribution = () => {
        const { ratingDistribution, averageRating, totalReviews } = reviewStats;

        if (!ratingDistribution) return null;

        return (
            <Paper sx={{ p: 3, mb: 3, backgroundColor: '#fafafa' }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#44170D', fontWeight: 600 }}>
                    Customer Reviews
                </Typography>

                <Box display="flex" alignItems="center" gap={2} mb={3}>
                    <StarRating value={averageRating || 0} readOnly precision={0.1} />
                    <Typography variant="h6" sx={{ color: '#44170D' }}>
                        {averageRating?.toFixed(1) || '0.0'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
                    </Typography>
                </Box>

                {[5, 4, 3, 2, 1].map((rating) => (
                    <RatingBar key={rating}>
                        <Typography variant="body2" width={20}>
                            {rating}
                        </Typography>
                        <StarIcon sx={{ color: '#FFD700', fontSize: 16 }} />
                        <LinearProgress
                            variant="determinate"
                            value={totalReviews > 0 ? (ratingDistribution[rating] || 0) / totalReviews * 100 : 0}
                            sx={{
                                flex: 1,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: '#e0e0e0',
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: '#44170D',
                                },
                            }}
                        />
                        <Typography variant="body2" color="text.secondary" width={40}>
                            {ratingDistribution[rating] || 0}
                        </Typography>
                    </RatingBar>
                ))}
            </Paper>
        );
    };

    // Format date without date-fns (avoiding extra dependency)
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Box>
            {renderRatingDistribution()}

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" sx={{ color: '#44170D', fontWeight: 600 }}>
                    {/* Reviews ({reviewStats.totalReviews || 0}) */}
                    Reviews ({totalReviews})
                </Typography>

                <Box display="flex" gap={2}>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            label="Sort By"
                            sx={{
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#44170D',
                                },
                            }}
                        >
                            <MenuItem value="newest">Newest First</MenuItem>
                            <MenuItem value="oldest">Oldest First</MenuItem>
                            <MenuItem value="highest">Highest Rating</MenuItem>
                            <MenuItem value="lowest">Lowest Rating</MenuItem>
                            <MenuItem value="helpful">Most Helpful</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Filter</InputLabel>
                        <Select
                            value={filterBy}
                            onChange={(e) => setFilterBy(e.target.value)}
                            label="Filter"
                            sx={{
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#44170D',
                                },
                            }}
                        >
                            <MenuItem value="all">All Reviews</MenuItem>
                            <MenuItem value="verified">Verified Only</MenuItem>
                            <MenuItem value="5">5 Stars</MenuItem>
                            <MenuItem value="4">4 Stars</MenuItem>
                            <MenuItem value="3">3 Stars</MenuItem>
                            <MenuItem value="2">2 Stars</MenuItem>
                            <MenuItem value="1">1 Star</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            {loading && <LinearProgress sx={{ mb: 2, '& .MuiLinearProgress-bar': { backgroundColor: '#44170D' } }} />}

            {reviews.length === 0 && !loading ? (
                <Alert severity="info" sx={{ textAlign: 'center', py: 4 }}>
                    No reviews yet. Be the first to review this product!
                </Alert>
            ) : (
                // temporary:
                // reviews.map((review) => (
                //     <Paper key={review._id} sx={{ mb: 2, p: 2 }}>
                //          <Typography variant="caption">
                //             User: {typeof review.userId === 'object' ? review.userId.name : review.userId}
                //         </Typography>
                //         <Typography variant="subtitle1">
                //             Rating: {review.rating}
                //         </Typography>
                //         <Typography variant="body2">
                //             {review.title}
                //         </Typography>
                //         <Typography variant="body2">
                //             {review.comment}
                //         </Typography>

                //     </Paper>
                // ))


                reviews.map((review) => (
                    <ReviewItem key={review._id}>
                        <ReviewHeader>
                            <Box display="flex" alignItems="flex-start" gap={2}>
                                {/* <Avatar
                                    sx={{
                                        bgcolor: '#44170D',
                                        width: 48,
                                        height: 48,
                                        fontSize: '1.2rem',
                                        fontWeight: 600
                                    }}
                                >
                                    {review.userId?.name?.toUpperCase() || 'U'}
                                </Avatar> */}

                                <Avatar>
                                    {typeof review.userId === 'object'
                                        ? (review.userId?.name?.toUpperCase()[0] || 'U')
                                        : 'U'
                                    }
                                </Avatar>

                                <Box flex={1}>
                                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                                        {/* <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                            {review.userId?.name || 'Anonymous User'}
                                        </Typography> */}

                                        <Typography>
                                            {typeof review.userId === 'object'
                                                ? (review.userId?.name || 'Anonymous User')
                                                : 'Anonymous User'
                                            }
                                        </Typography>
                                        {review.isVerifiedPurchase && (
                                            <Chip
                                                icon={<Verified />}
                                                label="Verified Purchase"
                                                size="small"
                                                sx={{
                                                    backgroundColor: '#44170D',
                                                    color: 'white',
                                                    '& .MuiChip-icon': { color: 'white' }
                                                }}
                                            />
                                        )}
                                    </Box>

                                    <StarRating value={review.rating} readOnly size="small" />

                                    {review.title && (
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 1 }}>
                                            {review.title}
                                        </Typography>
                                    )}

                                    <Typography variant="body2" color="text.secondary" mt={1}>
                                        {formatDate(review.createdAt)}
                                    </Typography>
                                </Box>
                            </Box>

                            {user && (
                                <IconButton
                                    onClick={(e) => {
                                        setMenuAnchor(e.currentTarget);
                                        setSelectedReview(review);
                                    }}
                                    size="small"
                                >
                                    <MoreVert />
                                </IconButton>
                            )}
                        </ReviewHeader>

                        <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                            {review.comment}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Box display="flex" gap={1}>
                                <Button
                                    size="small"
                                    startIcon={<ThumbUp />}
                                    onClick={() => handleVoteReview(review._id, true)}
                                    variant="outlined"
                                    disabled={votingLoading[review._id]}
                                    sx={{
                                        borderColor: '#44170D',
                                        color: '#44170D',
                                        '&:hover': {
                                            borderColor: '#7A3A0F',
                                            backgroundColor: 'rgba(68, 23, 13, 0.04)',
                                        },
                                    }}
                                >
                                    Helpful ({review.helpfulVotes || 0})
                                </Button>

                                <Button
                                    size="small"
                                    startIcon={<ThumbDown />}
                                    onClick={() => handleVoteReview(review._id, false)}
                                    variant="outlined"
                                    disabled={votingLoading[review._id]}
                                    sx={{
                                        borderColor: 'grey.400',
                                        color: 'text.secondary',
                                        '&:hover': {
                                            borderColor: 'grey.600',
                                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                        },
                                    }}
                                >
                                    Not Helpful
                                </Button>
                            </Box>

                            {review.totalVotes > 0 && (
                                <Typography variant="caption" color="text.secondary">
                                    {review.helpfulVotes || 0} of {review.totalVotes} found this helpful
                                </Typography>
                            )}
                        </Box>
                    </ReviewItem>
                ))
            )}

            {totalPages > 1 && (
                <Box display="flex" justifyContent="center" mt={3}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(e, newPage) => setPage(newPage)}
                        sx={{
                            '& .MuiPaginationItem-root.Mui-selected': {
                                backgroundColor: '#44170D',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#7A3A0F',
                                },
                            },
                        }}
                    />
                </Box>
            )}

            <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={() => setMenuAnchor(null)}
            >
                {selectedReview?.userId?._id === user?._id && (
                    <MenuItem onClick={() => handleEditReview(selectedReview)}>
                        <Edit fontSize="small" sx={{ mr: 1 }} />
                        Edit Review
                    </MenuItem>
                )}

                {selectedReview?.userId?._id === user?._id && (
                    <MenuItem onClick={() => handleDeleteReview(selectedReview._id)}>
                        <Delete fontSize="small" sx={{ mr: 1 }} />
                        Delete Review
                    </MenuItem>
                )}

                {selectedReview?.userId?._id !== user?._id && (
                    <MenuItem onClick={() => handleReportReview(selectedReview?._id)}>
                        <Flag fontSize="small" sx={{ mr: 1 }} />
                        Report Review
                    </MenuItem>
                )}
            </Menu>

            <ReviewSubmissionForm
                productId={productId}
                open={editReviewOpen}
                onClose={() => {
                    setEditReviewOpen(false);
                    setSelectedReview(null);
                }}
                onReviewSubmitted={() => {
                    fetchReviews();
                    fetchReviewStats();
                }}
            // existingReview={selectedReview}
            />
        </Box>
    );
};

export default ReviewsList;
