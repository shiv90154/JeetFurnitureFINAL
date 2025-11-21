import React, { useEffect, useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  IconButton,
  Button,
  Container,
  styled,
  alpha,
  useMediaQuery,
  useTheme,
  Divider,
  Drawer,
  Typography,
  Badge,
  Dialog,
  DialogContent,
  TextField,
} from "@mui/material";
import {
  Search as SearchIcon,
  FavoriteBorder,
  ShoppingBagOutlined,
  PersonOutline,
  StoreOutlined,
  Menu as MenuIcon,
  Close as CloseIcon,
  LocationOn,
  History,
} from "@mui/icons-material";
import NavHoverDropdown from "../dropdownHover/NavHoverDropdown";
import { useNavigate } from "react-router-dom";
import AccountPopup from "../popUp/AccountPopup";
import { publicUrl } from "./PublicUrl";
import axiosInstance from "./AxiosInstance";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import Theme from "../../Theme";
import { toast } from "react-toastify";

// Color Constants
const COLORS = {
  primary: "#003B78",
  secondary: "#FF6A00",
  accent: "#C18A46",
  backgroundLight: "#FFFFFF",
  backgroundDark: "#1E1E1E",
  textDark: "#222222",
  textLight: "#F5F5F5"
};

// LocationSelector Component
const LocationSelector = ({ onClose, open }) => {
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState("");
  const [recentPincodes, setRecentPincodes] = useState([]);

  // Load recent pincodes from localStorage on component mount
  useEffect(() => {
    const savedPincodes = localStorage.getItem('recentPincodes');
    if (savedPincodes) {
      setRecentPincodes(JSON.parse(savedPincodes));
    }
  }, []);

  // Save pincode to recent searches
  const saveToRecentPincodes = (pincode, address) => {
    const newEntry = { pincode, address, timestamp: new Date().toISOString() };
    const updatedPincodes = [
      newEntry,
      ...recentPincodes.filter(item => item.pincode !== pincode)
    ].slice(0, 5); // Keep only last 5 entries
    
    setRecentPincodes(updatedPincodes);
    localStorage.setItem('recentPincodes', JSON.stringify(updatedPincodes));
  };

  const handleCheck = async () => {
    if (pincode.length !== 6) {
      toast.error("Please enter a valid 6-digit pincode");
      return;
    }

    setLoading(true);
    try {
      const addressResponse = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const addressData = await addressResponse.json();

      if (addressData[0].Status === "Success" && addressData[0].PostOffice) {
        const postOffice = addressData[0].PostOffice[0];
        const location = `${postOffice.District}, ${postOffice.State}`;
        setAddress(location);

        const deliveryDays = getDeliveryDays(pincode);
        const deliveryMessage = `Delivery to ${location} in ${deliveryDays} days`;
        setDeliveryInfo(deliveryMessage);
        
        // Save to recent searches
        saveToRecentPincodes(pincode, location);
        toast.success(`Delivery available to ${location}`);
      } else {
        setAddress("");
        setDeliveryInfo("Service not available for this pincode");
        toast.error("Service not available for this pincode");
      }
    } catch (error) {
      console.error("Error fetching pincode data:", error);
      setDeliveryInfo("Delivery in 5-7 business days");
      toast.info("Delivery in 5-7 business days");
    } finally {
      setLoading(false);
    }
  };

  const getDeliveryDays = (pincode) => {
    const firstDigit = parseInt(pincode[0]);
    if ([1, 2, 3].includes(firstDigit)) return "3-4";
    if ([4, 5, 6].includes(firstDigit)) return "5-7";
    return "7-10";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCheck();
  };

  const handleRecentPincodeClick = (recentPincode, recentAddress) => {
    setPincode(recentPincode);
    setAddress(recentAddress);
    
    const deliveryDays = getDeliveryDays(recentPincode);
    setDeliveryInfo(`Delivery to ${recentAddress} in ${deliveryDays} days`);
  };

  const clearRecentPincodes = () => {
    setRecentPincodes([]);
    localStorage.removeItem('recentPincodes');
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          padding: 0,
          backgroundColor: COLORS.backgroundLight,
        }
      }}
    >
      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            color: COLORS.textDark 
          }}>
            <LocationOn sx={{ color: COLORS.primary }} />
            Where to Deliver?
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              value={pincode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                setPincode(value);
                if (value.length !== 6) {
                  setAddress("");
                  setDeliveryInfo("");
                }
              }}
              placeholder="Enter 6 digit pincode"
              variant="outlined"
              size="small"
              inputProps={{ maxLength: 6 }}
              sx={{ mb: 2 }}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleCheck}
              disabled={pincode.length !== 6 || loading}
              type="submit"
              sx={{
                py: 1,
                backgroundColor: COLORS.primary,
                '&:hover': {
                  backgroundColor: '#002A5A', // Darker shade of primary
                }
              }}
            >
              {loading ? "Checking..." : "Check Delivery"}
            </Button>
          </Box>
        </form>

        {/* Recent Pincodes Section */}
        {recentPincodes.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle2" sx={{ 
                fontWeight: 600, 
                color: COLORS.textDark,
                display: 'flex', 
                alignItems: 'center', 
                gap: 0.5 
              }}>
                <History sx={{ fontSize: 16, color: COLORS.accent }} />
                Recent Searches
              </Typography>
              <Button 
                size="small" 
                onClick={clearRecentPincodes}
                sx={{ 
                  minWidth: 'auto', 
                  fontSize: '12px', 
                  color: COLORS.textDark,
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.04)'
                  }
                }}
              >
                Clear all
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {recentPincodes.map((item, index) => (
                <Box
                  key={index}
                  onClick={() => handleRecentPincodeClick(item.pincode, item.address)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 1.5,
                    backgroundColor: 'rgba(0,0,0,0.02)',
                    borderRadius: 1,
                    border: '1px solid rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.04)',
                      borderColor: COLORS.primary,
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn sx={{ fontSize: 18, color: COLORS.textDark }} />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: COLORS.textDark }}>
                        {item.pincode}
                      </Typography>
                      <Typography variant="caption" sx={{ color: COLORS.textDark }}>
                        {item.address}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="caption" sx={{ color: COLORS.secondary, fontWeight: 500 }}>
                    {getDeliveryDays(item.pincode)} days
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {deliveryInfo && (
          <Box 
            sx={{ 
              p: 2, 
              backgroundColor: 'rgba(0,0,0,0.02)', 
              borderRadius: 1,
              border: '1px solid rgba(0,0,0,0.1)'
            }}
          >
            <Typography variant="body1" sx={{ 
              fontWeight: 500, 
              color: deliveryInfo.includes('not available') ? 'error.main' : COLORS.secondary 
            }}>
              {deliveryInfo}
            </Typography>
            {address && (
              <Typography variant="body2" sx={{ color: COLORS.textDark, mt: 0.5 }}>
                {address}
              </Typography>
            )}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

// Styled Components
const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: COLORS.primary,
  boxShadow: "none",
}));

const HeaderToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 64,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  position: "relative",
  backgroundColor: COLORS.primary,
  [theme.breakpoints.down("md")]: {
    minHeight: 56,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    justifyContent: "space-between",
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "7px",
  "& img": {
    height: 39,
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: { height: 32 },
  },
}));

const IconsRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const TopIconButton = styled(IconButton)({
  color: COLORS.textLight,
  padding: "8px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

const NavigationBar = styled(Box)(() => ({
  backgroundColor: COLORS.primary,
  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  padding: "8px 0",
  position: "relative",
  "@media (max-width: 600px)": {
    padding: "0px",
  },
}));

const NavButton = styled(Button)(() => ({
  color: COLORS.textLight,
  textTransform: "none",
  fontSize: "13px",
  fontWeight: 400,
  padding: "6px 12px",
  minWidth: "auto",
  gap: "6px",
  justifyContent: "flex-start",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: COLORS.accent, // Using accent color for hover
  },
}));

const DrawerNavList = styled(Box)(({ theme }) => ({
  flex: 1,
  marginTop: theme.spacing(1),
  paddingLeft: 4,
  overflowY: "auto",
  '&::-webkit-scrollbar': {
    display: 'none'
  },
  paddingBottom: 100
}));

const PopupHead = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2, 2, 1, 2.5),
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  backgroundColor: COLORS.primary,
}));

const LocationButton = styled(Button)(({ theme }) => ({
  color: COLORS.textLight,
  textTransform: "none",
  fontSize: "12px",
  fontWeight: 400,
  padding: "4px 8px",
  minWidth: "auto",
  gap: "4px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "16px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.5)",
  },
}));

export default function Header() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [categories, setCategories] = useState([]);
  const [locationPopupOpen, setLocationPopupOpen] = useState(false);
  const cartCount = useSelector(state => state.app?.data?.length || 0);

  const assignedRouteToPath = {
    allJewellery: '/allJewellery',
    wedding: '/wedding',
    gifting: '/gifting',
    collection: '/collection',
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/user/allcategories`);
      const data = response?.data || [];
      const mapped = data.map(cat => ({
        apiId: cat._id,
        label: cat.name,
        variety: cat.variety,
        icon: publicUrl(cat.image)
          ? <img src={publicUrl(cat.image)} alt={cat.name} style={{ width: 20, height: 20, borderRadius: "50%" }} />
          : null,
        assignedRoute: cat.assignedRoute
      }));

      setCategories(mapped);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Navigation handler based on category names
  const handleCategoryNavigation = (item) => {
    try {
      const route = assignedRouteToPath[item?.assignedRoute] || '/allJewellery';

      // Special handling for "All Jewellery" - show all products without any filter
      if (item.label && item.label.toLowerCase() === "all jewellery") {
        navigate(route); // No filter parameters - shows all products
        return;
      }

      // For specific category routes (wedding, gifting, collection)
      if (item.assignedRoute && item.assignedRoute !== 'allJewellery') {
        navigate(route);
        return;
      }

      // For variety-based categories (Gold, Silver, Diamond) - filter by category name
      if (item.label && item.label.trim()) {
        navigate(`/allJewellery?category=${item?.label.toLowerCase()}`);
        return;
      }

      // Final fallback
      navigate('/allJewellery');

    } catch (error) {
      console.error("Navigation error:", error);
      navigate('/allJewellery');
    }
  };

  const handleLocationClick = () => {
    setLocationPopupOpen(true);
  };

  return (
    <StyledAppBar sx={{ position: "fixed", padding: "4px" }}>
      {/* Top Toolbar */}
      <HeaderToolbar disableGutters>
        <div style={{ display: "flex", alignItems: "center" }}>
          {!isMdUp && (
            <IconButton
              onClick={() => setOpen(true)}
              size="large"
              edge="start"
              sx={{ color: COLORS.textLight, mr: 0.5 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <LogoContainer sx={{ ml: !isMdUp ? 0.5 : 0, flex: "none", cursor: "pointer" }}>
            <img onClick={() => navigate("/")} src="/logo2.png" alt="logo" />
          </LogoContainer>

          {/* Location Button - Only show on desktop */}
          {isMdUp && (
            <LocationButton
              onClick={handleLocationClick}
              startIcon={<LocationOn sx={{ fontSize: 16 }} />}
              sx={{ ml: 2 }}
            >
              Delivery
            </LocationButton>
          )}
        </div>

        {isMdUp && (
          <>
            <SearchBar />
          </>
        )}

        <IconsRow>
          {/* Location Button - Only show on mobile */}
          {!isMdUp && (
            <TopIconButton onClick={handleLocationClick} size="small">
              <LocationOn sx={{ fontSize: 20 }} />
            </TopIconButton>
          )}
          
          <TopIconButton onClick={() => navigate("/contact")} size="small">
            <StoreOutlined sx={{ fontSize: 20 }} />
          </TopIconButton>
          <TopIconButton onClick={() => navigate("/wishlist")} size="small">
            <FavoriteBorder sx={{ fontSize: 20 }} />
          </TopIconButton>
          <TopIconButton size="small" onClick={() => setShowAccountPopup(!showAccountPopup)}>
            <PersonOutline sx={{ fontSize: 20 }} />
          </TopIconButton>

          {showAccountPopup && (
            <AccountPopup onClose={() => setShowAccountPopup(false)} />
          )}

          <TopIconButton size="small" onClick={() => navigate("/cart")}>
            <Badge badgeContent={cartCount} color="error" overlap="circular" sx={{ 
              "& .MuiBadge-badge": { 
                fontWeight: 600, 
                fontSize: 13, 
                right: 0, 
                top: 3,
                backgroundColor: COLORS.secondary,
                color: COLORS.textLight
              } 
            }}>
              <ShoppingBagOutlined sx={{ fontSize: 20 }} />
            </Badge>
          </TopIconButton>
        </IconsRow>
      </HeaderToolbar>

      {!isMdUp && (
        <SearchBar />
      )}

      {/* Navigation Bar */}
      <NavigationBar>
        <Container maxWidth="xl">
          {isMdUp && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                position: "relative",
              }}
              onMouseLeave={() => {
                setDropdownOpen(false);
                setHoveredMenu(null);
              }}
            >
              {categories.slice(0, 6).map(item => (
                <NavButton
                  key={item.apiId}
                  startIcon={item.icon}
                  onClick={() => handleCategoryNavigation(item)}
                  onMouseEnter={() => {
                    setHoveredMenu(item.apiId);
                    setDropdownOpen(true);
                  }}
                >
                  <Typography sx={{ textTransform: 'capitalize' }}>{item.label}</Typography>
                </NavButton>
              ))}
              {dropdownOpen && hoveredMenu && (
                <Box sx={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 1200 }}>
                  <NavHoverDropdown
                    hoveredFilter={hoveredMenu}
                    onClose={() => {
                      setDropdownOpen(false);
                      setHoveredMenu(null);
                    }}
                  />
                </Box>
              )}
            </Box>
          )}
        </Container>
      </NavigationBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            p: 0,
            background: COLORS.primary,
            color: COLORS.textLight,
            width: "92vw",
            maxWidth: 410,
            [theme.breakpoints.down("sm")]: { maxWidth: "100vw" },
          },
        }}
      >
        <PopupHead>
          <IconButton
            size="small"
            edge="end"
            onClick={() => setOpen(false)}
            sx={{ color: COLORS.textLight, bgcolor: "rgba(255,255,255,0.06)" }}
          >
            <CloseIcon />
          </IconButton>
        </PopupHead>
        <Box sx={{ display: "flex", gap: 1.5, py: 1.5, px: 2.5 }}>
          {/* Location option in mobile drawer */}
          <Button
            fullWidth
            startIcon={<LocationOn />}
            onClick={() => {
              setOpen(false);
              setLocationPopupOpen(true);
            }}
            sx={{
              justifyContent: "flex-start",
              color: COLORS.textLight,
              textTransform: "none",
              bgcolor: "rgba(255,255,255,0.1)",
              borderRadius: 1,
              px: 2,
            }}
          >
            Check Delivery
          </Button>
        </Box>
        <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />
        <DrawerNavList>
          {categories.map(item => (
            <NavButton
              key={item.apiId}
              startIcon={item.icon}
              fullWidth
              onClick={() => {
                setOpen(false);
                handleCategoryNavigation(item);
              }}
              sx={{
                justifyContent: "flex-start",
                fontWeight: 500,
                bgcolor: "transparent",
                borderRadius: 10,
                px: 2.2,
                mb: 0.5,
                "&:hover": { bgcolor: "rgba(255,255,255,0.11)" },
              }}
            >
              {item.label}
            </NavButton>
          ))}
        </DrawerNavList>
      </Drawer>

      {/* Location Selector Popup */}
      <LocationSelector 
        open={locationPopupOpen} 
        onClose={() => setLocationPopupOpen(false)} 
      />
    </StyledAppBar>
  );
}