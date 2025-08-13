// import React, { useEffect, useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Box,
//   InputBase,
//   IconButton,
//   Button,
//   Container,
//   styled,
//   alpha,
//   useMediaQuery,
//   useTheme,
//   Typography,
//   Divider,
//   Drawer,
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   FavoriteBorder,
//   ShoppingBagOutlined,
//   PersonOutline,
//   LocalMallOutlined,
//   DiamondOutlined,
//   Circle,
//   Favorite,
//   CardGiftcard,
//   Star,
//   MoreHoriz,
//   Menu as MenuIcon,
//   Close as CloseIcon,
// } from "@mui/icons-material";

// import NavHoverDropdown from "../dropdownHover/NavHoverDropdown";
// import { useNavigate } from "react-router-dom";
// import AccountPopup from "../popUp/AccountPopup";
// import { publicUrl } from "./PublicUrl";

// const StyledAppBar = styled(AppBar)(({ theme }) => ({
//   backgroundColor: "#44170D",
//   boxShadow: "none",
// }));

// const HeaderToolbar = styled(Toolbar)(({ theme }) => ({
//   minHeight: 64,
//   paddingLeft: theme.spacing(2),
//   paddingRight: theme.spacing(2),
//   display: "flex",
//   alignItems: "center",
//   position: "relative",
//   [theme.breakpoints.down("md")]: {
//     minHeight: 56,
//     paddingLeft: theme.spacing(1),
//     paddingRight: theme.spacing(1),
//     justifyContent: "space-between",
//   },
// }));

// const LogoContainer = styled(Box)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   gap: "7px",
//   "& img": {
//     height: 39,
//     objectFit: "contain",
//     [theme.breakpoints.down("sm")]: { height: 32 },
//   },
// }));

// const IconsRow = styled(Box)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   gap: theme.spacing(1),
// }));

// const TopIconButton = styled(IconButton)({
//   color: "#fff",
//   padding: "8px",
//   "&:hover": {
//     backgroundColor: "rgba(255, 255, 255, 0.1)",
//   },
// });

// const SearchBarWrap = styled(Box)(({ theme }) => ({
//   width: "100%",
//   display: "flex",
//   justifyContent: "center",
//   background: "transparent",
//   marginTop: 4,
//   marginBottom: 4,
//   [theme.breakpoints.down("md")]: {
//     marginTop: 6,
//     marginBottom: 5,
//     paddingLeft: 2,
//     paddingRight: 2,
//   },
// }));

// const SearchContainer = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: "25px",
//   backgroundColor: alpha("#000", 0.15),
//   border: "1px solid rgba(255, 255, 255, 0.3)",
//   "&:hover": {
//     backgroundColor: alpha("#000", 0.25),
//   },
//   width: "100%",
//   minWidth: "600px",
//   maxWidth: "800px",
//   [theme.breakpoints.down("lg")]: {
//     minWidth: "300px",
//   },
//   [theme.breakpoints.down("md")]: {
//     minWidth: 0,
//     maxWidth: "100%",
//     borderRadius: "18px",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   color: "#fff",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "#fff",
//   width: "100%",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     paddingRight: theme.spacing(2),
//     fontSize: "14px",
//     "&::placeholder": {
//       color: "rgba(255, 255, 255, 0.7)",
//       opacity: 1,
//     },
//   },
// }));

// const NavigationBar = styled(Box)(({ theme }) => ({
//   backgroundColor: "#44170D",
//   borderTop: "1px solid rgba(255, 255, 255, 0.1)",
//   padding: "8px 0",
//   position: "relative",
//   "@media (max-width: 600px)": {
//     padding: "0px",
//   },
// }));

// const NavButton = styled(Button)(({ theme }) => ({
//   color: "#fff",
//   textTransform: "none",
//   fontSize: "13px",
//   fontWeight: 400,
//   padding: "6px 12px",
//   minWidth: "auto",
//   gap: "6px",
//   justifyContent: "flex-start",
//   "&:hover": {
//     backgroundColor: "rgba(255, 255, 255, 0.1)",
//     color: "#FFD700",
//   },
// }));

// const DrawerPaper = styled(Box)(({ theme }) => ({
//   backgroundColor: "#44170D",
//   color: "#fff",
//   width: "92vw",
//   maxWidth: 410,
//   height: "100vh",
//   display: "flex",
//   flexDirection: "column",
//   position: "relative",
//   [theme.breakpoints.down("sm")]: { maxWidth: "100vw" },
// }));

// const DrawerNavList = styled(Box)(({ theme }) => ({
//   flex: 1,
//   marginTop: theme.spacing(1),
//   paddingLeft: 4,
//   overflowY: "auto",
// }));

// const PopupHead = styled(Box)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between",
//   padding: theme.spacing(2, 2, 1, 2.5),
//   borderBottom: "1px solid rgba(255,255,255,0.06)"
// }));

// const DrawerMenuAction = styled(Button)({
//   borderRadius: 8,
//   border: "1px solid rgba(255,255,255,0.17)",
//   background: "#fff",
//   color: "#44170D",
//   fontWeight: 700,
//   fontSize: 14,
//   marginTop: 7,
//   padding: "6px 22px",
//   textTransform: "none",
//   "&:hover": {
//     background: "#fff",
//     opacity: 0.8,
//   }
// });

// export default function Header() {
//   const theme = useTheme();
//   const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();
//   const [showAccountPopup, setShowAccountPopup] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [hoveredMenu, setHoveredMenu] = useState(null);

//   const [categoryName, setCategoryName] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axiosInstance.get(`/user/allcategories`);
//       setCategoryName(response?.data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };



//   // IDs of menu items with dropdown
//   const hasDropdown = ["category", "price", "gender", "occasion"];

//   // Add ids for dropdown control corresponding to categories
//   const menuItems = [
//     { id: "category", icon: <Star sx={{ fontSize: "16px" }} />, label: "All Jewellery", navigate: () => navigate("/allJewellery") },
//     { id: "price", icon: <Circle sx={{ fontSize: "16px", color: "#FFD700" }} />, label: "Gold" },
//     { id: "gender", icon: <DiamondOutlined sx={{ fontSize: "16px" }} />, label: "Diamond" },
//     { id: "occasion", icon: <Circle sx={{ fontSize: "16px", color: "#d8d7d0ff" }} />, label: "Silver" },
//     // The rest without dropdown can have null id or just omit id
//     { id: null, icon: <Circle sx={{ fontSize: "16px" }} />, label: "Earrings" },
//     { id: null, icon: <Circle sx={{ fontSize: "16px" }} />, label: "Rings" },
//     { id: null, icon: <Star sx={{ fontSize: "16px" }} />, label: "Daily Wear" },
//     { id: null, icon: <LocalMallOutlined sx={{ fontSize: "16px" }} />, label: "Collections" },
//     { id: "wedding", icon: <Favorite sx={{ fontSize: "16px" }} />, label: "Wedding", navigate: () => navigate("/wedding") },
//     { id: "gifting", icon: <CardGiftcard sx={{ fontSize: "16px" }} />, label: "Gifting", navigate: () => navigate("/gifting") },
//     { id: null, icon: <MoreHoriz sx={{ fontSize: "16px" }} />, label: "More" },
//   ];

//   return (
//     <StyledAppBar sx={{ position: "fixed", padding: "4px" }}>
//       {/* Topbar — remains unchanged */}
//       <HeaderToolbar disableGutters>
//         <div className="topbar-left" style={{ display: "flex", alignItems: "center" }}>
//           {!isMdUp && (
//             <IconButton
//               onClick={() => setOpen(true)}
//               size="large"
//               edge="start"
//               sx={{ color: "#fff", mr: 0.5 }}
//               aria-label="menu"
//             >
//               <MenuIcon />
//             </IconButton>
//           )}
//           <LogoContainer sx={{ ml: !isMdUp ? 0.5 : 0, flex: "none", cursor: "pointer" }}>
//             <img onClick={() => navigate("/")} src="/logo.svg" alt="logo" />
//           </LogoContainer>
//         </div>

//         {isMdUp && (
//           <Box sx={{ flex: 1, px: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
//             <SearchContainer>
//               <SearchIconWrapper>
//                 <SearchIcon sx={{ fontSize: "20px" }} />
//               </SearchIconWrapper>
//               <StyledInputBase
//                 placeholder="Search for Gold Jewellery, Diamond Jewellery and more..."
//                 inputProps={{ "aria-label": "search" }}
//               />
//             </SearchContainer>
//           </Box>
//         )}

//         <IconsRow>
//           <TopIconButton size="small">
//             <DiamondOutlined sx={{ fontSize: 20 }} />
//           </TopIconButton>
//           {/* <TopIconButton size="small">
//             <LocalMallOutlined sx={{ fontSize: 20 }} />
//           </TopIconButton> */}
//           <TopIconButton size="small">
//             <FavoriteBorder onClick={() => navigate("/wishlist")} sx={{ fontSize: 20 }} />
//           </TopIconButton>
//           <TopIconButton size="small">
//             <PersonOutline onMouseEnter={() => setShowAccountPopup(!showAccountPopup)} sx={{ fontSize: 20 }} />
//             {/* <PersonOutline onClick={() => setShowAccountPopup(!showAccountPopup)} sx={{ fontSize: 20 }} /> */}
//           </TopIconButton>
//           <TopIconButton size="small">
//             <ShoppingBagOutlined onClick={() => navigate("/cart")} sx={{ fontSize: 20 }} />
//           </TopIconButton>
//         </IconsRow>
//       </HeaderToolbar>

//       {showAccountPopup && (
//         <AccountPopup />)}

//       {!isMdUp && (
//         <SearchBarWrap>
//           <SearchContainer>
//             <SearchIconWrapper>
//               <SearchIcon sx={{ fontSize: "20px" }} />
//             </SearchIconWrapper>
//             <StyledInputBase
//               placeholder="Search for Gold Jewellery, Diamond Jewellery and more..."
//               inputProps={{ "aria-label": "search" }}
//             />
//           </SearchContainer>
//         </SearchBarWrap>
//       )}

//       {/* Navigation Bar with hover dropdown integration */}
//       <NavigationBar>
//         <Container maxWidth="xl" sx={{ position: "relative" }}>
//           {isMdUp ? (
//             // Wrapping navigation buttons and dropdown in container with onMouseLeave
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: { xs: "space-between", md: "center" },
//                 flexWrap: "wrap",
//                 gap: 1,
//                 position: "relative",
//               }}
//               onMouseLeave={() => {
//                 setDropdownOpen(false);
//                 setHoveredMenu(null);
//               }}
//             >

//               {categoryName.map((item) => (
//                 <NavButton
//                   key={item._id}
//                   startIcon={<img src={publicUrl(item.image)} alt={item.name} />}
//                   onClick={() => navigate(`/category/${item._id}`)}
//                 >
//                   {item.name}
//                 </NavButton>
//               ))}

//               {menuItems.map(({ id, icon, label, navigate }) => (
//                 <NavButton
//                   key={label}
//                   startIcon={icon}
//                   onClick={navigate}
//                   onMouseEnter={() => {
//                     if (id && hasDropdown.includes(id)) {
//                       setHoveredMenu(id);
//                       setDropdownOpen(true);
//                     } else {
//                       setHoveredMenu(null);
//                       setDropdownOpen(false);
//                     }
//                   }}
//                 >
//                   {label}
//                 </NavButton>
//               ))}

//               {/* Dropdown menu */}
//               {dropdownOpen && hoveredMenu && (
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     top: "100%",
//                     left: 0,
//                     right: 0,
//                     zIndex: 1200,
//                   }}
//                 >
//                   <NavHoverDropdown
//                     hoveredFilter={hoveredMenu}
//                     onClose={() => {
//                       setDropdownOpen(false);
//                       setHoveredMenu(null);
//                     }}
//                   />
//                 </Box>
//               )}
//             </Box>
//           ) : null}
//         </Container>
//       </NavigationBar>

//       {/* Drawer Code (unchanged) */}
//       <Drawer
//         anchor="left"
//         open={open}
//         onClose={() => setOpen(false)}
//         PaperProps={{
//           sx: {
//             p: 0,
//             background: "#44170D",
//             color: "#fff",
//             width: "92vw",
//             maxWidth: 410,
//             [theme.breakpoints.down("sm")]: { maxWidth: "100vw" },
//           },
//         }}
//       >
//         <PopupHead>
//           <IconButton
//             size="small"
//             edge="end"
//             onClick={() => setOpen(false)}
//             sx={{ color: "#fff", bgcolor: "rgba(255,255,255,0.06)" }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </PopupHead>
//         <Box sx={{ display: "flex", gap: 1.5, py: 1.5, px: 2.5 }}>
//           <DrawerMenuAction onClick={() => setOpen(false)}>Log In</DrawerMenuAction>
//           <DrawerMenuAction
//             onClick={() => setOpen(false)}
//             sx={{
//               fontWeight: 500,
//               border: "1px solid #FFD700",
//               color: "#FFD700",
//               background: "rgba(255,222,90,0.09)",
//             }}
//           >
//             Sign Up
//           </DrawerMenuAction>
//         </Box>
//         <Divider sx={{ bgcolor: "rgba(255,255,255,0.11)" }} />
//         <DrawerNavList>
//           {menuItems.map(({ icon, label }, i) => (
//             <NavButton
//               key={label}
//               startIcon={icon}
//               fullWidth
//               onClick={() => setOpen(false)}
//               sx={{
//                 justifyContent: "flex-start",
//                 fontWeight: i === 0 ? 700 : 500,
//                 bgcolor: i === 0 ? "rgba(255,255,255,0.045)" : "transparent",
//                 borderRadius: 10,
//                 px: 2.2,
//                 mb: 0.5,
//                 color: "#fff",
//                 "&:hover": { bgcolor: "rgba(255,255,255,0.11)" },
//               }}
//             >
//               {label}
//             </NavButton>
//           ))}
//         </DrawerNavList>
//       </Drawer>
//     </StyledAppBar>
//   );
// }


import React, { useEffect, useState } from "react";
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
  Typography,
  Divider,
  Drawer,
} from "@mui/material";
import {
  Search as SearchIcon,
  FavoriteBorder,
  ShoppingBagOutlined,
  PersonOutline,
  LocalMallOutlined,
  DiamondOutlined,
  Circle,
  Favorite,
  CardGiftcard,
  Star,
  MoreHoriz,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

import NavHoverDropdown from "../dropdownHover/NavHoverDropdown";
import { useNavigate } from "react-router-dom";
import AccountPopup from "../popUp/AccountPopup";
import { publicUrl } from "./PublicUrl";
import axiosInstance from "./AxiosInstance";

/* ======================= styled ======================= */
const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: "#44170D",
  boxShadow: "none",
}));

const HeaderToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 64,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  position: "relative",
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

const IconsRow = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
}));

const TopIconButton = styled(IconButton)({
  color: "#fff",
  padding: "8px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

const SearchBarWrap = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  background: "transparent",
  marginTop: 4,
  marginBottom: 4,
  [theme.breakpoints.down("md")]: {
    marginTop: 6,
    marginBottom: 5,
    paddingLeft: 2,
    paddingRight: 2,
  },
}));

const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "25px",
  backgroundColor: alpha("#000", 0.15),
  border: "1px solid rgba(255, 255, 255, 0.3)",
  "&:hover": {
    backgroundColor: alpha("#000", 0.25),
  },
  width: "100%",
  minWidth: "600px",
  maxWidth: "800px",
  [theme.breakpoints.down("lg")]: {
    minWidth: "300px",
  },
  [theme.breakpoints.down("md")]: {
    minWidth: 0,
    maxWidth: "100%",
    borderRadius: "18px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#fff",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: theme.spacing(2),
    fontSize: "14px",
    "&::placeholder": {
      color: "rgba(255, 255, 255, 0.7)",
      opacity: 1,
    },
  },
}));

const NavigationBar = styled(Box)(({ theme }) => ({
  backgroundColor: "#44170D",
  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  padding: "8px 0",
  position: "relative",
  "@media (max-width: 600px)": {
    padding: "0px",
  },
}));

const NavButton = styled(Button)(() => ({
  color: "#fff",
  textTransform: "none",
  fontSize: "13px",
  fontWeight: 400,
  padding: "6px 12px",
  minWidth: "auto",
  gap: "6px",
  justifyContent: "flex-start",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#FFD700",
  },
}));

const DrawerNavList = styled(Box)(({ theme }) => ({
  flex: 1,
  marginTop: theme.spacing(1),
  paddingLeft: 16,
  overflowY: "auto",
}));

const PopupHead = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2, 2, 1, 2.5),
  borderBottom: "1px solid rgba(255,255,255,0.06)",
}));

const DrawerMenuAction = styled(Button)({
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.17)",
  background: "#fff",
  color: "#44170D",
  fontWeight: 700,
  fontSize: 14,
  marginTop: 7,
  padding: "6px 22px",
  textTransform: "none",
  "&:hover": {
    background: "#fff",
    opacity: 0.8,
  },
});

/* ======================= component ======================= */
export default function Header() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);

  // IDs of menu items with dropdown
  const hasDropdown = ["category", "price", "gender", "occasion"];

  // Static menu items
  const menuItems = [
    { id: "category", icon: <Star sx={{ fontSize: 16 }} />, label: "All Jewellery", navigate: () => navigate("/allJewellery") },
    { id: "price", icon: <Circle sx={{ fontSize: 16, color: "#FFD700" }} />, label: "Gold" },
    { id: "gender", icon: <DiamondOutlined sx={{ fontSize: 16 }} />, label: "Diamond" },
    { id: "occasion", icon: <Circle sx={{ fontSize: 16, color: "#d8d7d0ff" }} />, label: "Silver" },
    { id: null, icon: <Circle sx={{ fontSize: 16 }} />, label: "Earrings" },
    { id: null, icon: <Circle sx={{ fontSize: 16 }} />, label: "Rings" },
    { id: null, icon: <Star sx={{ fontSize: 16 }} />, label: "Daily Wear" },
    { id: null, icon: <LocalMallOutlined sx={{ fontSize: 16 }} />, label: "Collections" },
    { id: "wedding", icon: <Favorite sx={{ fontSize: 16 }} />, label: "Wedding", navigate: () => navigate("/wedding") },
    { id: "gifting", icon: <CardGiftcard sx={{ fontSize: 16 }} />, label: "Gifting", navigate: () => navigate("/gifting") },
    { id: null, icon: <MoreHoriz sx={{ fontSize: 16 }} />, label: "More" },
  ];

  return (
    <StyledAppBar sx={{ position: "fixed", padding: "4px" }}>
      {/* Topbar */}
      <HeaderToolbar disableGutters>
        <div style={{ display: "flex", alignItems: "center" }}>
          {!isMdUp && (
            <IconButton
              onClick={() => setOpen(true)}
              size="large"
              edge="start"
              sx={{ color: "#fff", mr: 0.5 }}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}
          <LogoContainer sx={{ ml: !isMdUp ? 0.5 : 0, flex: "none", cursor: "pointer" }}>
            <img onClick={() => navigate("/")} src="/logo.svg" alt="logo" />
          </LogoContainer>
        </div>

        {isMdUp && (
          <Box sx={{ flex: 1, px: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <SearchContainer>
              <SearchIconWrapper>
                <SearchIcon sx={{ fontSize: 20 }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search for Gold Jewellery, Diamond Jewellery and more..."
                inputProps={{ "aria-label": "search" }}
              />
            </SearchContainer>
          </Box>
        )}

        <IconsRow>
          <TopIconButton size="small">
            <DiamondOutlined sx={{ fontSize: 20 }} />
          </TopIconButton>
          <TopIconButton size="small">
            <FavoriteBorder onClick={() => navigate("/wishlist")} sx={{ fontSize: 20 }} />
          </TopIconButton>
          <TopIconButton size="small">
            {/* If you want click instead of hover, change onMouseEnter -> onClick */}
            <PersonOutline onMouseEnter={() => setShowAccountPopup(true)} sx={{ fontSize: 20 }} />
          </TopIconButton>
          <TopIconButton size="small">
            <ShoppingBagOutlined onClick={() => navigate("/cart")} sx={{ fontSize: 20 }} />
          </TopIconButton>
        </IconsRow>
      </HeaderToolbar>

      {showAccountPopup && <AccountPopup />}

      {!isMdUp && (
        <SearchBarWrap>
          <SearchContainer>
            <SearchIconWrapper>
              <SearchIcon sx={{ fontSize: 20 }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for Gold Jewellery, Diamond Jewellery and more..."
              inputProps={{ "aria-label": "search" }}
            />
          </SearchContainer>
        </SearchBarWrap>
      )}

      {/* Navigation Bar */}
      <NavigationBar
        onMouseLeave={() => {
          setDropdownOpen(false);
          setHoveredMenu(null);
          setShowAccountPopup(false);
        }}
      >
        <Container maxWidth="xl" sx={{ position: "relative" }}>
          {isMdUp ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "space-between", md: "center" },
                flexWrap: "wrap",
                gap: 1,
                position: "relative",
              }}
              onMouseLeave={() => {
                setDropdownOpen(false);
                setHoveredMenu(null);
              }}
            >
              {/* Static items */}
              {menuItems.map(({ id, icon, label, navigate: go }) => (
                <NavButton
                  key={label}
                  startIcon={icon}
                  onClick={go}
                  onMouseEnter={() => {
                    if (id && hasDropdown.includes(id)) {
                      setHoveredMenu(id);
                      setDropdownOpen(true);
                    } else {
                      setHoveredMenu(null);
                      setDropdownOpen(false);
                    }
                  }}
                >
                  {label}
                </NavButton>
              ))}

              {/* Hover dropdown */}
              {dropdownOpen && hoveredMenu && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    zIndex: 1200,
                  }}
                >
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
          ) : null}
        </Container>
      </NavigationBar>

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            p: 0,
            background: "#44170D",
            color: "#fff",
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
            sx={{ color: "#fff", bgcolor: "rgba(255,255,255,0.06)" }}
          >
            <CloseIcon />
          </IconButton>
        </PopupHead>

        <Box sx={{ display: "flex", gap: 1.5, py: 1.5, px: 2.5 }}>
          <DrawerMenuAction onClick={() => setOpen(false)}>Log In</DrawerMenuAction>
          <DrawerMenuAction
            onClick={() => setOpen(false)}
            sx={{
              fontWeight: 500,
              border: "1px solid #FFD700",
              color: "#FFD700",
              background: "rgba(255,222,90,0.09)",
            }}
          >
            Sign Up
          </DrawerMenuAction>
        </Box>

        <Divider sx={{ bgcolor: "rgba(255,255,255,0.11)" }} />

        <DrawerNavList>
          {menuItems.map(({ icon, label }, i) => (
            <NavButton
              key={label}
              startIcon={icon}
              fullWidth
              onClick={() => setOpen(false)}
              sx={{
                justifyContent: "flex-start",
                fontWeight: i === 0 ? 700 : 500,
                bgcolor: i === 0 ? "rgba(255,255,255,0.045)" : "transparent",
                borderRadius: 10,
                px: 2.2,
                mb: 0.5,
                color: "#fff",
                "&:hover": { bgcolor: "rgba(255,255,255,0.11)" },
              }}
            >
              {label}
            </NavButton>
          ))}
        </DrawerNavList>
      </Drawer>
    </StyledAppBar>
  );
}


