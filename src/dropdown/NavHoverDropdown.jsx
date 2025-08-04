import { useState } from "react";
import { Box, Typography, Button, Paper, styled } from "@mui/material";

// --- Styled Components ---
const DropdownMenu = styled(Paper)({
    position: "fixed",
    top: 108,
    left: 0,
    right: 0,
    background: "#44170D", // your theme color
    borderRadius: "0 0 24px 24px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
    padding: 0,
    zIndex: 1200,
    maxWidth: "100vw",
    minHeight: 370,
    overflowX: "auto",
});
const NavGrid = styled(Box)({
    display: "flex",
    alignItems: "flex-start",
    minHeight: 370,
});
const Sidenav = styled(Box)({
    width: 192,
    background: "none",
    padding: "32px 0",
    borderRight: "1.3px solid #eee",
    display: "flex",
    flexDirection: "column",
    gap: 8,
});
const SidenavItem = styled(Box)(({ active }) => ({
    background: active ? "#381209" : "transparent",
    color: "#fff",
    fontWeight: 600,
    fontSize: 17,
    padding: "14px 30px",
    borderRadius: "12px",
    cursor: "pointer",
    margin: "0 18px 5px 0",
    borderLeft: active ? "4px solid #FFD700" : "4px solid transparent",
    transition: "all 0.14s"
}));

// CATEGORY grid
const CategoryGrid = styled(Box)({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    minWidth: 400,
    alignItems: "flex-start"
});
const CategoryCol = styled(Box)({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
});
const CategoryBox = styled(Box)({
    width: "100%",
    minWidth: 128,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "18px 0 14px",
    cursor: "pointer",
    borderRadius: 18,
});
const IconWrap = styled(Box)({
    width: 52,
    height: 52,
    background: "#fff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 7,
    overflow: "hidden"
});

// PRICE/GENDER/OCCASION grid
const BigGrid = styled(Box)({
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    gap: 40,
    flexWrap: "nowrap",
    marginTop: 32,
    marginBottom: 12,
    minHeight: 180
});
const BigItem = styled(Box)({
    minWidth: 158,
    maxWidth: 202,
    width: "18vw",
    borderRadius: 16,
    margin: "0 8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
});
const BigImageWrap = styled(Box)({
    width: 124,
    height: 124,
    borderRadius: 16,
    overflow: "hidden",
    background: "#f7efe8",
    marginBottom: 13,
    display: "flex", alignItems: "center", justifyContent: "center",
    "& img": { width: "100%", height: "100%", objectFit: "cover" }
});
const BigLabel = styled(Typography)({
    color: "#fff",
    fontWeight: 600,
    fontSize: 16,
    marginTop: 5,
    letterSpacing: 0.1,
});

// PromoBar (always below the grid)
const PromoBar = styled(Box)({
    display: "flex",
    alignItems: "center",
    // justifyContent: "center",
    background: "#fff",
    borderRadius: 17,
    padding: "13px 20px",
    gap: 18,
    margin: "30px 0 0 0",
    boxShadow: "0 1.1px 6px 0 #d3bfbf23",
    maxWidth: 590,
    width: "auto"
});
const PromoBarImg = styled("img")({
    width: 58,
    height: 56,
    borderRadius: 12,
    objectFit: "cover",
    marginRight: 7,
});
const PromoBarText = styled(Box)({
    flex: 1,
    display: "flex",
    flexDirection: "column",
});
const PromoBarHead = styled(Typography)({
    fontWeight: 700,
    color: "#44170D",
    fontSize: 17,
    marginBottom: 1,
});
const PromoBarSub = styled(Typography)({
    color: "#68492b",
    fontSize: 13,
    fontWeight: 500,
    marginTop: 1,
});
const PromoBarBtn = styled(Button)({
    borderRadius: 11,
    background: "#FFD700",
    textTransform: "none",
    fontWeight: 600,
    fontSize: 15,
    padding: "8px 26px",
    color: "#44170D",
    boxShadow: "none",
    minWidth: "max-content",
    "&:hover": { background: "#FFD700" }
});

// RIGHT PANEL (profile card)
const RightPanel = styled(Box)({
    flex: 1.2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: 220,
    background: "none",
    padding: "24px 22px 0 22px",
    gap: 21,
});
const ProfileCard = styled(Paper)({
    width: "100%",
    background: "transparent",
    borderRadius: "19px",
    marginBottom: 12,
    // padding: "18px 14px 16px 14px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // boxShadow: "0 1.1px 8px 0 #dec6b14c",
    // minHeight: 300
});

// --- Data ---
const sidenavTabs = [
    { key: "category", label: "Category" },
    { key: "price", label: "Price" },
    { key: "occasion", label: "Occasion" },
    { key: "gender", label: "Gender" }
];
const categoryGroups = [
    [
        { img: "/small_icons/popup_img1.png", name: "All Jewellery" },
        { img: "/small_icons/popup_img1.png", name: "Finger Rings" },
        { img: "/small_icons/popup_img1.png", name: "Nose Pin" },
        { img: "/small_icons/popup_img1.png", name: "Bangles" },
    ],
    [
        { img: "/small_icons/popup_img2.png", name: "Earrings" },
        { img: "/small_icons/popup_img1.png", name: "Mangalsutra" },
        { img: "/small_icons/popup_img1.png", name: "Necklaces" },
        { img: "/small_icons/popup_img1.png", name: "Bracelets" },
    ],
    [
        { img: "/small_icons/popup_img1.png", name: "Pendants" },
        { img: "/small_icons/popup_img1.png", name: "Chains" },
        { img: "/small_icons/popup_img1.png", name: "Necklaces Set" },
        { img: "/small_icons/popup_img1.png", name: "Pendants & Earrings Set" },
    ],
];
// Example images for price (replace with your actual URLs)
const priceRanges = [
    { img: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw20b368e1/header-mega-menu/banner-images/all-jew-below-25k-hr.jpg", name: "<25K" },
    { img: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw20b368e1/header-mega-menu/banner-images/all-jew-below-25k-hr.jpg", name: "25K-50K" },
    { img: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw20b368e1/header-mega-menu/banner-images/all-jew-below-25k-hr.jpg", name: "50K-1L" },
    { img: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw20b368e1/header-mega-menu/banner-images/all-jew-below-25k-hr.jpg", name: "1L & Above" },
];
const genders = [
    { img: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=240&fit=crop", name: "Women" },
    { img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=240&fit=crop", name: "Men" },
    { img: "https://images.unsplash.com/photo-1519764622345-23439dd774f7?w=240&fit=crop", name: "Kids & Teens" },
];
const occasions = [
    { img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=240&fit=crop", name: "Wedding" },
    { img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=240&fit=crop", name: "Party" },
    { img: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=240&fit=crop", name: "Office" },
    { img: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=240&fit=crop", name: "Casual" },
];

const NavHoverDropdown = ({ onClose }) => {
    const [tab, setTab] = useState("category");

    // Promo bar for below the grid
    const promoBar = (
        <PromoBar>
            <PromoBarImg src={categoryGroups[0][0].img} alt="Promo" />
            <PromoBarText>
                <PromoBarHead>Jewellery for Every Moment—See It All Here!</PromoBarHead>
                <PromoBarSub>20,000+ designs to choose from</PromoBarSub>
            </PromoBarText>
            <PromoBarBtn variant="contained">View All</PromoBarBtn>
        </PromoBar>
    );

    // Central content: either multi-column (category) or row (others)
    const centerPanel =
        tab === "category" ? (
            <CategoryGrid>
                {categoryGroups.map((col, idx) => (
                    <CategoryCol
                        key={idx}
                        sx={{
                            borderRight:
                                idx !== categoryGroups.length - 1
                                    ? "1px solid #402419"
                                    : "none",
                            px: { xs: 0.5, sm: 2 },
                            minWidth: 120,
                        }}
                    >
                        {col.map(cat => (
                            <CategoryBox key={cat.name}>
                                <IconWrap>
                                    <img src={cat.img} alt={cat.name} style={{ width: "100%", height: "100%" }} />
                                </IconWrap>
                                <Typography
                                    sx={{
                                        mt: 0.8,
                                        color: "#fff",
                                        fontWeight: 500,
                                        fontSize: { xs: 13, sm: 14.6 },
                                        textAlign: "center",
                                        width: "100%"
                                    }}>
                                    {cat.name}
                                </Typography>
                            </CategoryBox>
                        ))}
                    </CategoryCol>
                ))}
            </CategoryGrid>
        ) : (
            <BigGrid>
                {(tab === "price" ? priceRanges : tab === "gender" ? genders : occasions).map(option => (
                    <BigItem key={option.name}>
                        <BigImageWrap>
                            <img src={option.img} alt={option.name} />
                        </BigImageWrap>
                        <BigLabel>{option.name}</BigLabel>
                    </BigItem>
                ))}
            </BigGrid>
        );

    return (
        <DropdownMenu onClick={onClose}>
            <NavGrid onClick={e => e.stopPropagation()}>
                <Sidenav>
                    {sidenavTabs.map(({ key, label }) => (
                        <SidenavItem
                            key={key}
                            active={tab === key ? 1 : 0}
                            onMouseEnter={() => setTab(key)}
                        >
                            {label}
                        </SidenavItem>
                    ))}
                </Sidenav>
                {/* Center Panel with promoBar below */}
                <Box
                    sx={{
                        flex: 3.5,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        pl: { xs: 2, md: 3 },
                        pr: 0,
                        pt: 3,
                        minWidth: 440,
                        maxWidth: 850,
                        margin: "0 auto",
                    }}
                >
                    {centerPanel}
                    <Box sx={{ mt: 2, mb: 2, mx: "auto" }}>{promoBar}</Box>
                </Box>
                {/* Right panel always present */}
                <RightPanel>
                    <ProfileCard elevation={0}>
                        <img
                            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=370"
                            alt="Profile"
                            style={{
                                width: 200, height: 300, objectFit: "cover",
                                borderRadius: 16,
                            }}
                        />
                        <Typography sx={{
                            color: "#fff",
                            fontWeight: 600,
                            mt: 0, mb: 1, fontSize: 18,
                            textAlign: "center"
                        }}>
                            Elan - My World. My Story.
                        </Typography>
                        <Typography sx={{
                            mb: 0.8,
                            mt: 1,
                            color: "#FFD700"
                        }}>
                            <a
                                href="#"
                                style={{
                                    color: "#FFD700",
                                    fontWeight: "bold",
                                    textDecoration: "underline",
                                    fontSize: 16,
                                }}
                            >
                                Explore Now ↗
                            </a>
                        </Typography>
                    </ProfileCard>
                </RightPanel>
            </NavGrid>
        </DropdownMenu>
    );
};

export default NavHoverDropdown;
