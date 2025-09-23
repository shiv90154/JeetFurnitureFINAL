// // // 1:
// import React, { useEffect, useRef, useState } from "react";
// import {
//     AppBar,
//     Toolbar,
//     Box,
//     InputBase,
//     IconButton,
//     Button,
//     Container,
//     styled,
//     alpha,
//     useMediaQuery,
//     useTheme,
//     Divider,
//     Drawer,
//     Typography,
//     Badge,
// } from "@mui/material";
// import {
//     Search as SearchIcon,
//     FavoriteBorder,
//     ShoppingBagOutlined,
//     PersonOutline,
//     DiamondOutlined,
//     Menu as MenuIcon,
//     Close as CloseIcon,
// } from "@mui/icons-material";
// import NavHoverDropdown from "../dropdownHover/NavHoverDropdown";
// import { useNavigate } from "react-router-dom";
// import AccountPopup from "../popUp/AccountPopup";
// import { publicUrl } from "../common components/PublicUrl";
// import axiosInstance from "../common components/AxiosInstance";
// import { useSelector } from "react-redux";
// import SearchBar from "../common components/SearchBar";

// const StyledAppBar = styled(AppBar)(() => ({
//     backgroundColor: "#44170D",
//     boxShadow: "none",
// }));
// const HeaderToolbar = styled(Toolbar)(({ theme }) => ({
//     minHeight: 64,
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(2),
//     display: "flex",
//     alignItems: "center",
//     position: "relative",
//     [theme.breakpoints.down("md")]: {
//         minHeight: 56,
//         paddingLeft: theme.spacing(1),
//         paddingRight: theme.spacing(1),
//         justifyContent: "space-between",
//     },
// }));
// const LogoContainer = styled(Box)(({ theme }) => ({
//     display: "flex",
//     alignItems: "center",
//     gap: "7px",
//     "& img": {
//         height: 39,
//         objectFit: "contain",
//         [theme.breakpoints.down("sm")]: { height: 32 },
//     },
// }));
// const IconsRow = styled(Box)(({ theme }) => ({
//     display: "flex",
//     alignItems: "center",
//     gap: theme.spacing(1),
// }));
// const TopIconButton = styled(IconButton)({
//     color: "#fff",
//     padding: "8px",
//     "&:hover": {
//         backgroundColor: "rgba(255, 255, 255, 0.1)",
//     },
// });
// const SearchBarWrap = styled(Box)(({ theme }) => ({
//     width: "100%",
//     display: "flex",
//     justifyContent: "center",
//     background: "transparent",
//     marginTop: 4,
//     marginBottom: 4,
//     [theme.breakpoints.down("md")]: {
//         marginTop: 6,
//         marginBottom: 5,
//         paddingLeft: 2,
//         paddingRight: 2,
//     },
// }));
// const SearchContainer = styled("div")(({ theme }) => ({
//     position: "relative",
//     borderRadius: "25px",
//     backgroundColor: alpha("#000", 0.15),
//     border: "1px solid rgba(255, 255, 255, 0.3)",
//     "&:hover": {
//         backgroundColor: alpha("#000", 0.25),
//     },
//     width: "100%",
//     minWidth: "600px",
//     maxWidth: "800px",
//     [theme.breakpoints.down("lg")]: {
//         minWidth: "300px",
//     },
//     [theme.breakpoints.down("md")]: {
//         minWidth: 0,
//         maxWidth: "100%",
//         borderRadius: "18px",
//     },
// }));
// const SearchIconWrapper = styled("div")(({ theme }) => ({
//     padding: theme.spacing(0, 2),
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "#fff",
// }));
// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//     color: "#fff",
//     width: "100%",
//     "& .MuiInputBase-input": {
//         padding: theme.spacing(1, 1, 1, 0),
//         paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//         paddingRight: theme.spacing(2),
//         fontSize: "14px",
//         "&::placeholder": {
//             color: "rgba(255, 255, 255, 0.7)",
//             opacity: 1,
//         },
//     },
// }));
// const NavigationBar = styled(Box)(() => ({
//     backgroundColor: "#44170D",
//     borderTop: "1px solid rgba(255, 255, 255, 0.1)",
//     padding: "8px 0",
//     position: "relative",
//     "@media (max-width: 600px)": {
//         padding: "0px",
//     },
// }));
// const NavButton = styled(Button)(() => ({
//     color: "#fff",
//     textTransform: "none",
//     fontSize: "13px",
//     fontWeight: 400,
//     padding: "6px 12px",
//     minWidth: "auto",
//     gap: "6px",
//     justifyContent: "flex-start",
//     "&:hover": {
//         backgroundColor: "rgba(255, 255, 255, 0.1)",
//         color: "#FFD700",
//     },
// }));
// const DrawerNavList = styled(Box)(({ theme }) => ({
//     flex: 1,
//     marginTop: theme.spacing(1),
//     paddingLeft: 4,
//     overflowY: "auto",
//     '&::-webkit-scrollbar': {
//         display: 'none'
//     },
//     paddingBottom: 100
// }));
// const PopupHead = styled(Box)(({ theme }) => ({
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: theme.spacing(2, 2, 1, 2.5),
//     borderBottom: "1px solid rgba(255,255,255,0.06)"
// }));
// const DrawerMenuAction = styled(Button)({
//     borderRadius: 8,
//     border: "1px solid rgba(255,255,255,0.17)",
//     background: "#fff",
//     color: "#44170D",
//     fontWeight: 700,
//     fontSize: 14,
//     marginTop: 7,
//     padding: "6px 22px",
//     textTransform: "none",
//     "&:hover": {
//         background: "#fff",
//         opacity: 0.8,
//     }
// });

// export default function Header() {
//     const theme = useTheme();
//     const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
//     const [open, setOpen] = useState(false);
//     const navigate = useNavigate();
//     const [showAccountPopup, setShowAccountPopup] = useState(false);
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const [hoveredMenu, setHoveredMenu] = useState(null);
//     const [categories, setCategories] = useState([]);
//     const cartCount = useSelector(state => state.app?.data?.length || 0);

//     const assignedRouteToPath = {
//         allJewellery: '/allJewellery',
//         diamond: '/allJewellery',
//         gold: '/allJewellery',
//         silver: '/allJewellery',
//         wedding: '/wedding',
//         gifting: '/gifting',
//         collection: '/collection',
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await axiosInstance.get(`/user/allcategories`);
//             const data = response?.data || [];
//             const mapped = data.map(cat => ({
//                 apiId: cat._id,
//                 label: cat.name,
//                 variety: cat.variety, // Keep the variety field for filtering
//                 icon: publicUrl(cat.image)
//                     ? <img src={publicUrl(cat.image)} alt={cat.name} style={{ width: 20, height: 20, borderRadius: "50%" }} />
//                     : null,
//                 assignedRoute: cat.assignedRoute
//             }));

//             setCategories(mapped);
//         } catch (error) {
//             console.error("Error fetching categories:", error);
//         }
//     };

//     // Helper function to handle navigation with proper category filtering
//     const handleCategoryNavigation = (item) => {
//         const route = assignedRouteToPath[item.assignedRoute] || `/category/${item.apiId}`;

//         // Use variety for filtering specific categories, or show all for "All Jewellery"
//         if (item.label.toLowerCase() === "all jewellery") {
//             navigate(route); // No category filter for "All Jewellery"
//         } else if (item.variety) {
//             // Use variety (gold/silver/diamond) for filtering
//             navigate(`${route}?variety=${item.variety.toLowerCase()}`);
//         } else {
//             // Fallback to name-based filtering
//             navigate(`${route}?category=${item.label.toLowerCase()}`);
//         }
//     };

//     return (
//         <StyledAppBar sx={{ position: "fixed", padding: "4px" }}>
//             {/* Top Toolbar */}
//             <HeaderToolbar disableGutters>
//                 <div style={{ display: "flex", alignItems: "center" }}>
//                     {!isMdUp && (
//                         <IconButton
//                             onClick={() => setOpen(true)}
//                             size="large"
//                             edge="start"
//                             sx={{ color: "#fff", mr: 0.5 }}
//                         >
//                             <MenuIcon />
//                         </IconButton>
//                     )}
//                     <LogoContainer sx={{ ml: !isMdUp ? 0.5 : 0, flex: "none", cursor: "pointer" }}>
//                         <img onClick={() => navigate("/")} src="/logo.svg" alt="logo" />
//                     </LogoContainer>
//                 </div>

//                 {isMdUp && (
//                     <>
//                         <SearchBar />
//                     </>
//                 )}

//                 <IconsRow>
//                     <TopIconButton size="small">
//                         <DiamondOutlined onClick={() => navigate("/diamond")} sx={{ fontSize: 20 }} />
//                     </TopIconButton>
//                     <TopIconButton size="small">
//                         <FavoriteBorder onClick={() => navigate("/wishlist")} sx={{ fontSize: 20 }} />
//                     </TopIconButton>
//                     <TopIconButton size="small" onClick={() => setShowAccountPopup(!showAccountPopup)}>
//                         <PersonOutline sx={{ fontSize: 20 }} />
//                     </TopIconButton>

//                     {showAccountPopup && (
//                         <AccountPopup onClose={() => setShowAccountPopup(false)} />
//                     )}

//                     <TopIconButton size="small" onClick={() => navigate("/cart")}>
//                         <Badge badgeContent={cartCount} color="error" overlap="circular" sx={{ "& .MuiBadge-badge": { fontWeight: 600, fontSize: 13, right: 0, top: 3 } }}>
//                             <ShoppingBagOutlined sx={{ fontSize: 20 }} />
//                         </Badge>
//                     </TopIconButton>
//                 </IconsRow>
//             </HeaderToolbar>

//             {!isMdUp && (
//                 <SearchBar />
//             )}

//             {/* Navigation Bar */}
//             <NavigationBar>
//                 <Container maxWidth="xl">
//                     {isMdUp && (
//                         <Box
//                             sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 gap: 1,
//                                 position: "relative",
//                             }}
//                             onMouseLeave={() => {
//                                 setDropdownOpen(false);
//                                 setHoveredMenu(null);
//                             }}
//                         >
//                             {categories.slice(0, 6).map(item => (
//                                 <NavButton
//                                     key={item.apiId}
//                                     startIcon={item.icon}
//                                     onClick={() => handleCategoryNavigation(item)}
//                                     onMouseEnter={() => {
//                                         setHoveredMenu(item.apiId);
//                                         setDropdownOpen(true);
//                                     }}
//                                 >
//                                     <Typography sx={{ textTransform: 'capitalize' }}>{item.label}</Typography>
//                                 </NavButton>
//                             ))}
//                             {dropdownOpen && hoveredMenu && (
//                                 <Box sx={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 1200 }}>
//                                     <NavHoverDropdown
//                                         hoveredFilter={hoveredMenu}
//                                         onClose={() => {
//                                             setDropdownOpen(false);
//                                             setHoveredMenu(null);
//                                         }}
//                                     />
//                                 </Box>
//                             )}
//                         </Box>
//                     )}
//                 </Container>
//             </NavigationBar>

//             {/* Mobile Drawer */}
//             <Drawer
//                 anchor="left"
//                 open={open}
//                 onClose={() => setOpen(false)}
//                 PaperProps={{
//                     sx: {
//                         p: 0,
//                         background: "#44170D",
//                         color: "#fff",
//                         width: "92vw",
//                         maxWidth: 410,
//                         [theme.breakpoints.down("sm")]: { maxWidth: "100vw" },
//                     },
//                 }}
//             >
//                 <PopupHead>
//                     <IconButton
//                         size="small"
//                         edge="end"
//                         onClick={() => setOpen(false)}
//                         sx={{ color: "#fff", bgcolor: "rgba(255,255,255,0.06)" }}
//                     >
//                         <CloseIcon />
//                     </IconButton>
//                 </PopupHead>
//                 <Box sx={{ display: "flex", gap: 1.5, py: 1.5, px: 2.5 }}>
//                 </Box>
//                 <Divider sx={{ bgcolor: "rgba(255,255,255,0.11)" }} />
//                 <DrawerNavList>
//                     {categories.map(item => (
//                         <NavButton
//                             key={item.apiId}
//                             startIcon={item.icon}
//                             fullWidth
//                             onClick={() => {
//                                 setOpen(false);
//                                 handleCategoryNavigation(item);
//                             }}
//                             sx={{
//                                 justifyContent: "flex-start",
//                                 fontWeight: 500,
//                                 bgcolor: "transparent",
//                                 borderRadius: 10,
//                                 px: 2.2,
//                                 mb: 0.5,
//                                 "&:hover": { bgcolor: "rgba(255,255,255,0.11)" },
//                             }}
//                         >
//                             {item.label}
//                         </NavButton>
//                     ))}
//                 </DrawerNavList>
//             </Drawer>
//         </StyledAppBar >
//     );
// }

// // 2:
import {
    Box,
    Typography,
    Grid,
    IconButton,
    Container,
    Select,
    MenuItem,
    TextField,
    Button,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import axiosInstance from '../common components/AxiosInstance';
import { Link, useLocation, useParams } from 'react-router-dom';
import { publicUrl } from '../common components/PublicUrl';

const jewelleryData = [
    {
        img: 'https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw53b65f59/plp/18-kt-jewellery.jpg',
        label: '14 Kt',
    },
    {
        img: 'https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw3bc42dcf/plp/14-kt-jewellery.jpg',
        label: '18 Kt',
    },
    {
        img: 'https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwbc8afd33/plp/22-kt-jewellery.jpg',
        label: '22 Kt',
    },
];

const assuranceData = [
    {
        img: 'https://i.imgur.com/XZiQnRx.png',
        label: 'Exchange Offers',
    },
    {
        img: 'https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dweee090e8/assurance/assurance-bis-logo.png',
        label: 'Purity Guarantee',
    },
    {
        img: 'https://i.imgur.com/3JJd6Ux.png',
        label: 'Easy Replacements',
    },
];

function JewelleryHeader() {
    return (
        <Box
            sx={{
                width: '100%',
                pt: 4,
                pb: 4,
                background: '#fff',
            }}
        >
            <Typography
                variant="h4"
                align="center"
                sx={{ fontWeight: 700, my: 4, fontFamily: 'serif' }}
            >
                All Jewellery
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {jewelleryData.map((item, idx) => (
                    <Grid
                        key={idx}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                        <Box
                            sx={{
                                width: { xs: 180, sm: 210 },
                                height: { xs: 180, sm: 210 },
                                mb: 1,
                                overflow: 'hidden',
                                borderRadius: 1,
                                backgroundColor: '#fff',
                                boxShadow: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <img
                                src={item.img}
                                alt={item.label}
                                style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }}
                            />
                        </Box>
                        <Typography
                            variant="subtitle1"
                            align="center"
                            sx={{ fontWeight: 400, mt: 0.5, letterSpacing: '0.5px' }}
                        >
                            {item.label}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../store/Action';
import { createSelector } from '@reduxjs/toolkit';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export const selectWishlist = createSelector(
    [state => Array.isArray(state.app?.wishlist) ? state.app.wishlist : []],
    wishlist => [...wishlist]
);

function JewelleryCard({ product }) {
    const dispatch = useDispatch();
    const wishlist = useSelector(selectWishlist);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');

    const isWishlisted = !!product && wishlist.some(item => String(item._id) === String(product._id));

    const imgUrl = publicUrl(product.media?.[0]?.url) || "no img found";
    const best = product.bestVariant || {};

    const handleWishlistClick = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (isWishlisted) {
            dispatch(removeFromWishlist(product._id));
            setSnackbarMsg('Removed from Wishlist');
        } else {
            dispatch(addToWishlist(product));
            setSnackbarMsg('Added to Wishlist');
        }
        setSnackbarOpen(true);
    }

    return (
        <Box sx={{ pb: 1, position: 'relative' }}>
            <Box sx={{
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
                width: { xs: 170, sm: 200 },
                height: { xs: 200 },
                mx: 'auto',
                bgcolor: 'transparent',
                boxShadow: 'none'
            }}>
                <Link to={`/singleProduct/${product._id}`} style={{ textDecoration: 'none' }}>
                    <img
                        src={imgUrl}
                        alt={product.name}
                        style={{
                            margin: 'auto', objectFit: 'cover',
                            width: '100%',
                            height: 200,
                            borderRadius: '8px'
                        }}
                    />
                </Link>
                <IconButton
                    onClick={handleWishlistClick}
                    aria-label="add to wishlist"
                    sx={{
                        position: 'absolute', top: 8, right: 12, background: '#fff',
                        zIndex: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', p: '5px', color: 'inherit'
                    }}
                    size="small"
                >
                    {isWishlisted ? (
                        <FavoriteIcon sx={{ fontSize: 20, color: 'red' }} />
                    ) : (
                        <FavoriteBorderIcon sx={{ fontSize: 20, color: '#bbb' }} />
                    )}
                </IconButton>
            </Box>

            <Link to={`/singleProduct/${product._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                <Typography variant="subtitle1" sx={{ fontSize: 18, fontWeight: 600, fontFamily: 'serif', color: '#222', textAlign: 'left', textTransform: 'capitalize' }}>
                    {product.name}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 500, fontSize: 17, color: '#222' }}>
                    ₹{best.finalPrice}
                </Typography>
            </Link>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MuiAlert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                    {snackbarMsg}
                </MuiAlert>
            </Snackbar>
        </Box>
    );
}

export function JewelleryGrid() {
    const [allProducts, setAllProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategoryName, setSubCategoryName] = useState([]);
    const [occasion, setOccasion] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [shownCount, setShownCount] = useState(12);
    const location = useLocation();

    const [filters, setFilters] = useState({
        query: '',
        priceRange: 'all',
    });
    const [sortOption, setSortOption] = useState('relevance');

    // Use query parameters from URL
    function useQuery() {
        return new URLSearchParams(location.search);
    }

    const query = useQuery();
    const varietyParam = query.get('variety'); // Changed from category to variety
    const categoryParam = query.get('category'); // Keep category for backward compatibility
    const selectedSubcategoryId = query.get('subcategory');
    const selectedOccasionId = query.get('occasion');
    const priceQuery = query.get("price") || "all";
    const genderQuery = query.get("gender") || "all";
    const occasionQuery = query.get("occasion") || "all";

    // Helper functions
    const slugify = (str) =>
        String(str || '')
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-');

    const norm = (s) =>
        (s || '')
            .toUpperCase()
            .replace(/\s+/g, '')
            .replace(/-/g, '–')
            .trim();

    const loadMoreProducts = () => {
        const newCount = shownCount + 12;
        setShownCount(newCount);
    };

    const parseQuantityArray = (q) => {
        if (!q) return [];
        let arr = q;
        if (typeof q === "string") {
            try { arr = JSON.parse(q); } catch { return []; }
        }
        return Array.isArray(arr) ? arr : [];
    };

    const pickBestVariation = (arr) => {
        if (!arr.length) return null;
        return arr.reduce((best, cur) =>
            parseFloat(cur.finalPrice) < parseFloat(best.finalPrice) ? cur : best, arr[0]);
    };

    const preprocessProducts = (productsRaw) => productsRaw.map((p) => {
        const quantityArr = parseQuantityArray(p.quantity?.[0]);
        const bestVariation = pickBestVariation(quantityArr);
        return {
            ...p,
            price: bestVariation ? parseFloat(bestVariation.finalPrice) : 0,
            gst: bestVariation ? parseFloat(bestVariation.gst) : null,
            discount: bestVariation ? parseFloat(bestVariation.discount) : 0,
            weight: bestVariation ? parseFloat(bestVariation.weight) : null,
            makingPrice: bestVariation ? parseFloat(bestVariation.makingPrice) : null,
            quantityVariants: quantityArr,
            bestVariant: bestVariation,
        };
    });

    // Price buckets for filtering
    const priceBuckets = [
        { label: 'Under ₹25K', min: 0, max: 25000 },
        { label: '₹25K – ₹50K', min: 25000, max: 50000 },
        { label: '₹50K – ₹1L', min: 50000, max: 100000 },
        { label: 'Over ₹1L', min: 100000, max: Number.MAX_SAFE_INTEGER },
    ];

    const priceBucketFromQuery = priceBuckets.find(
        b => norm(b.label) === norm(priceQuery)
    );

    // Fetch functions
    const fetchAllProducts = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/user/allproducts');
            const processedProducts = preprocessProducts(response.data);
            setAllProducts(processedProducts);
        } catch (error) {
            setError('Could not load products. Please try again.');
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('/user/allcategories');
            setCategories(response.data || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchSubCategories = async () => {
        try {
            const response = await axiosInstance.get('/user/allSubcategories');
            setSubCategoryName(response?.data);
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    };

    const fetchOccasions = async () => {
        try {
            const response = await axiosInstance.get('/user/allOccasions');
            setOccasion(response?.data ?? []);
        } catch (error) {
            console.error("Error fetching occasion:", error);
        }
    };

    // Find selected items from IDs
    const selectedSubcategory = selectedSubcategoryId
        ? subcategoryName.find(item => item._id === selectedSubcategoryId)
        : null;
    const selectedOccasion = selectedOccasionId
        ? occasion.find(item => item._id === selectedOccasionId)
        : null;

    // Enhanced filtering logic with proper variety filtering
    const filteredProducts = allProducts.filter(product => {
        // Search query filter
        const matchesQuery = !filters.query ||
            product.name.toLowerCase().includes(filters.query.toLowerCase());

        // Price range filter
        const matchesPriceRange = filters.priceRange === 'all' ||
            (product.price >= priceBuckets.find(b => b.label === filters.priceRange)?.min &&
                product.price <= priceBuckets.find(b => b.label === filters.priceRange)?.max);

        // Enhanced Category/Variety filter - This is the main fix
        let matchesCategory = true;

        if (varietyParam) {
            // Use variety parameter (gold, silver, diamond) - primary filter
            matchesCategory = product.productvariety &&
                product.productvariety.toLowerCase() === varietyParam.toLowerCase();
        } else if (categoryParam) {
            // Fallback to category parameter for backward compatibility
            const normalizedCategoryParam = categoryParam.toLowerCase().trim();

            if (normalizedCategoryParam === 'all jewellery' || normalizedCategoryParam === '') {
                matchesCategory = true; // Show all products
            } else {
                // Check both productvariety and category fields
                matchesCategory =
                    (product.productvariety && product.productvariety.toLowerCase() === normalizedCategoryParam) ||
                    (product.category && product.category.toLowerCase() === normalizedCategoryParam);
            }
        }
        // If no category/variety param, show all products

        // Subcategory filter
        const matchesSubcategory = !selectedSubcategory ||
            product.sub_category === selectedSubcategory.name;

        // Occasion filter
        const matchesOccasion = !selectedOccasion ||
            product.occasion === selectedOccasion.name;

        // Price query filter
        const matchesPriceQuery = priceQuery === "all" ||
            (priceBucketFromQuery &&
                product.price >= priceBucketFromQuery.min &&
                product.price <= priceBucketFromQuery.max);

        // Gender filter
        const matchesGender = genderQuery === "all" ||
            (product.genderVariety && product.genderVariety.toLowerCase() === genderQuery.toLowerCase());

        // Occasion query filter
        const matchesOccasionQuery = occasionQuery === "all" ||
            (product.occasion && product.occasion.toLowerCase() === occasionQuery.toLowerCase());

        return matchesQuery && matchesPriceRange && matchesCategory &&
            matchesSubcategory && matchesOccasion && matchesPriceQuery &&
            matchesGender && matchesOccasionQuery;
    });

    // Sorting logic
    const sortedProducts = filteredProducts.sort((a, b) => {
        switch (sortOption) {
            case 'price-asc': return a.price - b.price;
            case 'price-desc': return b.price - a.price;
            case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
            default: return 0;
        }
    });

    // Load data on component mount
    useEffect(() => {
        fetchAllProducts();
        fetchCategories();
        fetchSubCategories();
        fetchOccasions();
    }, []);

    // Reset shown count when filters change
    useEffect(() => {
        setShownCount(12);
    }, [varietyParam, categoryParam, selectedSubcategoryId, selectedOccasionId, filters, sortOption]);

    const productsToDisplay = sortedProducts.slice(0, shownCount);

    // Enhanced function to get current category name for display
    const getCurrentCategoryName = () => {
        // Check variety parameter first (primary)
        if (varietyParam) {
            const varietyCategory = categories.find(cat =>
                cat.variety?.toLowerCase() === varietyParam.toLowerCase()
            );
            return varietyCategory ? varietyCategory.name : varietyParam.charAt(0).toUpperCase() + varietyParam.slice(1);
        }

        // Fallback to category parameter
        if (categoryParam) {
            if (categoryParam.toLowerCase() === 'all jewellery') {
                return 'All Jewellery';
            }

            const category = categories.find(cat =>
                cat.assignedRoute?.toLowerCase() === categoryParam.toLowerCase() ||
                cat.variety?.toLowerCase() === categoryParam.toLowerCase() ||
                cat.name?.toLowerCase() === categoryParam.toLowerCase()
            );

            return category ? category.name : categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
        }

        // Default to All Jewellery
        return 'All Jewellery';
    };

    return (
        <Box>
            <Box sx={{ pt: 5, pb: 3 }}>
                {/* Category Title */}
                <Typography
                    variant="h4"
                    align="center"
                    sx={{ fontWeight: 700, mb: 4, fontFamily: 'serif' }}
                >
                    {getCurrentCategoryName()}
                </Typography>

                {/* Debug info (remove in production) */}
                {process.env.NODE_ENV === 'development' && (
                    <Box sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                        <Typography variant="caption" display="block">
                            Debug - Variety: {varietyParam || 'none'} | Category: {categoryParam || 'none'} |
                            Total Products: {allProducts.length} | Filtered: {filteredProducts.length}
                        </Typography>
                    </Box>
                )}

                {/* Filters and Sort Controls */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    mb: 3,
                    gap: 1
                }}>
                    <TextField
                        label="Search"
                        value={filters.query}
                        onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                        sx={{ width: { xs: '48%', sm: '30%' } }}
                    />
                    <Select
                        value={filters.priceRange}
                        onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                        sx={{ width: { xs: '48%', sm: '30%' } }}
                    >
                        <MenuItem value="all">All Prices</MenuItem>
                        {priceBuckets.map(bucket => (
                            <MenuItem key={bucket.label} value={bucket.label}>
                                {bucket.label}
                            </MenuItem>
                        ))}
                    </Select>

                    <Select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        sx={{ width: { xs: '48%', sm: '30%' } }}
                    >
                        <MenuItem value="relevance">Sort by: Relevance</MenuItem>
                        <MenuItem value="price-asc">Price: Low to High</MenuItem>
                        <MenuItem value="price-desc">Price: High to Low</MenuItem>
                        <MenuItem value="newest">Newest First</MenuItem>
                    </Select>
                </Box>

                {/* Results count */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Showing {productsToDisplay.length} of {sortedProducts.length} products
                    {(varietyParam || categoryParam) && ` in ${getCurrentCategoryName()}`}
                </Typography>
            </Box>

            {/* Product Grid */}
            {loading ? (
                <Typography align="center" sx={{ py: 4 }}>Loading products...</Typography>
            ) : error ? (
                <Typography align="center" color="error" sx={{ py: 4 }}>{error}</Typography>
            ) : sortedProducts.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No products found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {(varietyParam || categoryParam)
                            ? `No products available in ${getCurrentCategoryName()} category. Try browsing other categories.`
                            : "Try adjusting your filters or search terms"
                        }
                    </Typography>
                </Box>
            ) : (
                <>
                    <Grid container spacing={2} justifyContent="center">
                        {productsToDisplay.map((product) => (
                            <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
                                <JewelleryCard product={product} />
                            </Grid>
                        ))}
                    </Grid>

                    {/* Load More Button */}
                    {shownCount < sortedProducts.length && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Button
                                variant="outlined"
                                onClick={loadMoreProducts}
                                sx={{ px: 4, py: 1.5 }}
                            >
                                View More ({sortedProducts.length - shownCount} remaining)
                            </Button>
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
}

export function JewelAssurance() {
    return (
        <Box
            sx={{
                width: '100%',
                background: '#fff',
                border: "1px solid '#e8e4e2'",
                borderRadius: '28px',
                py: { xs: 4, sm: 6 },
                mx: 'auto',
                my: 5,
                boxShadow: '0 2px 8px rgba(190,165,140,0.04)',
                position: 'relative',
            }}
        >
            <Typography
                variant="h5"
                align="center"
                sx={{
                    fontFamily: 'serif',
                    fontWeight: 600,
                    color: '#3d1822',
                    mb: 0.5,
                }}
            >
                The Chauhan Sons Assurance
            </Typography>
            <Typography
                variant="subtitle1"
                align="center"
                sx={{
                    color: '#8f8f8f',
                    mb: { xs: 3, sm: 6 },
                    fontWeight: 400,
                    fontSize: 18,
                }}
            >
                Crafted by experts, cherished by you.
            </Typography>
            <Grid container spacing={1} justifyContent="center" gap={{ xs: 2, sm: 5 }}>
                {assuranceData.map((item) => (
                    <Grid
                        key={item.label}
                        item
                        xs={12}
                        sm={4}
                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: { xs: 3, sm: 0 } }}
                    >
                        <Box
                            sx={{
                                width: 90,
                                height: 80,
                                mb: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <img src={item.img} alt={item.label} style={{ maxWidth: '90%', maxHeight: '90%' }} />
                        </Box>
                        <Typography
                            variant="subtitle1"
                            align="center"
                            sx={{
                                fontFamily: 'serif',
                                color: '#3d1822',
                                fontWeight: 500,
                                mt: 0.5,
                                fontSize: 17,
                                lineHeight: 1.25,
                            }}
                        >
                            {item.label}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default function AllJewelleryPage() {
    return (
        <Box sx={{ backgroundColor: '#f9f9f9', overflow: 'hidden' }}>
            <Container maxWidth="xl">
                <JewelleryGrid />
                <JewelAssurance />
            </Container>
        </Box>
    );
}