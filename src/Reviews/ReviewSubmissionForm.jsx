import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarRating from './StarRating';
import axiosInstance from '../common components/AxiosInstance';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ReviewSubmissionForm = ({
  productId,
  onReviewSubmitted,
  open,
  onClose
}) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPurchaseVerified, setIsPurchaseVerified] = useState(false);
  const [existingReview, setExistingReview] = useState(null);

  const userJson = localStorage.getItem('userData');
  const user = userJson ? JSON.parse(userJson) : null;


  // useEffect(() => {
  //   if (open && user && productId) {
  //     checkPurchaseVerification();
  //     checkExistingReview();
  //   }
  // }, []);
  //   useEffect(() => {
  //     if (open && user && productId) {
  //       checkPurchaseVerification();
  //       checkExistingReview();
  //     }
  //   }, [open, user, productId]);
  useEffect(() => {
    if (open && user && productId) {
      checkPurchaseVerification();
      checkExistingReview();
    }
  }, [open, user?._id, productId]);

  const checkPurchaseVerification = async () => {
    try {
      const response = await axiosInstance.get(`/api/review/verify-purchase/${productId}?userId=${user._id}`);
      setIsPurchaseVerified(response.data.isVerified);
    } catch (error) {
      console.error('Error checking purchase verification:', error);
      setIsPurchaseVerified(false);
    }
  };

  const checkExistingReview = async () => {
    try {
      // Check if user has existing review by getting user reviews
      const response = await axiosInstance.get(`/api/review/user/${user._id}`);
      const userReviews = response.data.reviews || [];
      const existingProductReview = userReviews.find(review =>
        review.productId._id === productId || review.productId === productId
      );

      if (existingProductReview) {
        setExistingReview(existingProductReview);
        setRating(existingProductReview.rating);
        setTitle(existingProductReview.title || '');
        setComment(existingProductReview.comment || '');
      }
    } catch (error) {
      console.error('Error checking existing review:', error);
      // No existing review found or error - continue normally
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('Please log in to submit a review');
      return;
    }

    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    if (comment.trim().length < 10) {
      setError('Please write at least 10 characters in your review');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const reviewData = {
        productId,
        userId: user._id,
        rating,
        title: title.trim(),
        comment: comment.trim()
      };

      let response;
      if (existingReview) {
        // Update existing review
        response = await axiosInstance.put(`/api/review/update/${existingReview._id}`, reviewData);
      } else {
        // Create new review
        response = await axiosInstance.post('/api/review/createReview', reviewData);
      }

      setSuccess(existingReview ? 'Review updated successfully!' : 'Review submitted successfully!');
      toast.success(existingReview ? 'Review updated successfully!' : 'Review submitted successfully!');

      // Reset form after success
      setTimeout(() => {
        setRating(0);
        setTitle('');
        setComment('');
        setSuccess('');
        onReviewSubmitted && onReviewSubmitted(response.data.review);
        onClose();
      }, 1500);

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to submit review';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!existingReview) {
      setRating(0);
      setTitle('');
      setComment('');
    }
    setError('');
    setSuccess('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6" sx={{ color: '#44170D', fontWeight: 600 }}>
            {existingReview ? 'Edit Your Review' : 'Write a Review'}
          </Typography>
          {isPurchaseVerified && (
            <Chip
              icon={<VerifiedIcon />}
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
      </DialogTitle>

      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        {!isPurchaseVerified && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Only customers who have purchased this item can leave a verified review.
            You can still leave a review, but it won't be marked as verified.
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Box mb={3}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
              Overall Rating *
            </Typography>
            <StarRating
              value={rating}
              onChange={setRating}
              showLabel
              size="large"
            />
          </Box>

          <TextField
            fullWidth
            label="Review Title (Optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#44170D',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#44170D',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#44170D',
              },
            }}
            placeholder="Summarize your experience..."
            inputProps={{ maxLength: 100 }}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Your Review *"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this product..."
            helperText={`${comment.length}/1000 characters (minimum 10)`}
            inputProps={{ maxLength: 1000 }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#44170D',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#44170D',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#44170D',
              },
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={handleClose}
          disabled={loading}
          sx={{ color: '#44170D' }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || rating === 0 || comment.trim().length < 10}
          startIcon={loading && <CircularProgress size={20} />}
          sx={{
            backgroundColor: '#44170D',
            '&:hover': {
              backgroundColor: '#7A3A0F',
            },
          }}
        >
          {existingReview ? 'Update Review' : 'Submit Review'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewSubmissionForm;
