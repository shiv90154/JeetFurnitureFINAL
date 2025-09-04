import { useState } from 'react';
import { Box, Rating, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconFilled': {
    color: '#FFD700',
  },
  '& .MuiRating-iconHover': {
    color: '#FFA500',
  },
  '& .MuiRating-iconEmpty': {
    color: theme.palette.grey,
  },
}));

const ratingLabels = {
  1: 'Poor',
  2: 'Fair', 
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
};

const StarRating = ({ 
  value, 
  onChange, 
  readOnly = false, 
  size = 'medium',
  showLabel = false,
  precision = 1 
}) => {
  const [hover, setHover] = useState(-1);

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <StyledRating
        name="product-rating"
        value={value}
        precision={precision}
        size={size}
        readOnly={readOnly}
        onChange={(event, newValue) => {
          onChange && onChange(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon fontSize="inherit" />}
      />
      {showLabel && !readOnly && (
        <Typography variant="body2" color="text.secondary">
          {ratingLabels[hover !== -1 ? hover : value] || ''}
        </Typography>
      )}
    </Box>
  );
};

export default StarRating;
