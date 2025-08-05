import React from 'react';
import { Box, Typography, Button, IconButton, Divider, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Common Styles
const colors = {
  primary: '#7d2a25',
  light: '#fff',
  border: '#b07d7c',
  fontFamily: 'serif'
};

const buttonStyle = {
  fontWeight: 500,
  fontFamily: colors.fontFamily,
  textTransform: 'none',
  borderRadius: 20,
  fontSize: 16,
  py: 1.2,
  px: 5,
  boxShadow: 'none'
};

// Dummy cart state (replace with your state management)
const cartItems = [
  // Uncomment to fill cart and test mini-cart:
//   {
//     img: 'https://i.imgur.com/KUc2vyP.jpg',
//     name: 'Regal Diamond Encrusted Square ...',
//     qty: 1,
//     weight: '3.033 gm',
//     price: 46979,
//   }
];

function EmptyCart() {
  return (
    <Box sx={{
      width: '100%',
    //   minHeight: '65vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      pt: 8
    }}>
      {/* Bag SVG Icon */}
      <Box sx={{
        background: '#f6f1ef',
        borderRadius: '50%',
        width: 120,
        height: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 4
      }}>
        {/* Simple line bag SVG */}
        <svg width="65" height="75" viewBox="0 0 65 75" fill="none">
          <rect x="8" y="20" width="49" height="44" rx="5" stroke="#7d2a25" strokeWidth="2.1" fill="none"/>
          <path d="M18 20V14C18 7 47 7 47 14V20" stroke="#7d2a25" strokeWidth="2.1" fill="none"/>
          <circle cx="32.5" cy="44.5" r="2.5" fill="#7d2a25"/>
          <rect x="24" y="31" width="17" height="3" rx="1.5" fill="#7d2a25" opacity="0.5"/>
        </svg>
      </Box>
      <Typography variant="h5" sx={{
        fontFamily: colors.fontFamily, fontWeight: 700, color: colors.primary, mb: 3, letterSpacing: 1
      }}>
        YOUR CART IS EMPTY
      </Typography>
      <Button
        variant="outlined"
        sx={{
          ...buttonStyle,
          color: colors.primary,
          border: `2px solid ${colors.primary}`,
          background: colors.light
        }}
      >
        Continue Shopping
      </Button>
    </Box>
  );
}

function MiniCart({ items, onClose }) {
  // Cart Total Calculation
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  return (
    <Paper elevation={3} sx={{
      maxWidth: 380,
      mx: 'auto',
      mt: 5,
      p: 3,
      borderRadius: 5,
      fontFamily: colors.fontFamily,
      position: 'relative'
    }}>
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        size="small"
        sx={{ position: 'absolute', top: 10, right: 10, color: colors.primary }}
      >
        <CloseIcon />
      </IconButton>

      <Typography align="center" sx={{
        color: colors.primary,
        fontWeight: 500,
        fontFamily: colors.fontFamily,
        fontSize: 20,
        mb: 2,
        letterSpacing: '.5px'
      }}>
        Your Mini Cart <span style={{ color: '#7d2a25', fontWeight: 400 }}>({items.length} Item{items.length > 1 ? 's' : ''})</span>
      </Typography>
      {/* Cart Items */}
      {items.map((item, idx) => (
        <Box key={idx} sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 1.1,
          borderRadius: 3,
          background: '#fcf7f7',
          mb: 2,
          boxShadow: '0 .5px 2px rgba(125,42,37,0.04)'
        }}>
          <Box sx={{
            width: 56,
            height: 56,
            borderRadius: 2,
            overflow: 'hidden',
            flexShrink: 0
          }}>
            <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{
              fontFamily: colors.fontFamily,
              color: '#252525',
              fontWeight: 500,
              fontSize: 16
            }} noWrap>
              {item.name}
            </Typography>
            <Typography sx={{ fontSize: 13 }}>
              Qty: {item.qty} | {item.weight}
            </Typography>
            <Typography sx={{
              fontWeight: 600,
              fontSize: 16,
              color: colors.primary,
              mt: 0.3
            }}>
              Price <span style={{ fontWeight: 500, color: '#1a1a1a' }}>₹{item.price.toLocaleString()}</span>
            </Typography>
          </Box>
        </Box>
      ))}
      {/* Subtotal and Actions */}
      <Divider sx={{ my: 2 }} />
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3
      }}>
        <Typography sx={{ color: colors.primary, fontWeight: 500, fontSize: 16 }}>
          Sub Total
        </Typography>
        <Typography sx={{ color: colors.primary, fontWeight: 700, fontSize: 18 }}>
          ₹ {subtotal.toLocaleString()}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            ...buttonStyle,
            color: colors.primary,
            border: `2px solid ${colors.primary}`,
            background: '#fbf6f4',
            '&:hover': { background: '#f5e9e5' }
          }}
        >
          View Cart
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{
            ...buttonStyle,
            color: '#fff',
            background: colors.primary,
            '&:hover': { background: '#611f18' }
          }}
        >
          Quick Checkout
        </Button>
      </Box>
    </Paper>
  );
}

export default function CartPage() {
  // To test mini cart, fill cartItems; to test empty state, leave []
  const hasItems = cartItems.length > 0;

  // Dummy close handler (replace with your close logic)
  const handleClose = () => {};

  return (
    <Box sx={{  background: '#fff', py: 4, fontFamily: colors.fontFamily }}>
      {hasItems ? (
        <MiniCart items={cartItems} onClose={handleClose} />
      ) : (
        <EmptyCart />
      )}
    </Box>
  );
}
