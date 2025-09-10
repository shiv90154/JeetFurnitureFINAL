import { Box, Typography, Container, styled, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../common components/AxiosInstance";
import { publicUrl } from "../common components/PublicUrl";
import { useNavigate } from "react-router-dom";

const SectionContainer = styled(Box)({
    backgroundColor: "#fff",
    paddingTop: "50px",
    paddingBottom: 0,
    "@media (max-width: 600px)": { paddingTop: "20px" },
});

const HeaderContainer = styled(Container)({
    textAlign: "center",
    marginBottom: 30,
});

const MainTitle = styled(Typography)({
    fontFamily: "serif",
    fontSize: "48px",
    fontWeight: 400,
    color: "#2C2C2C",
    marginBottom: "12px",
    lineHeight: 1.2,
    "@media (max-width: 960px)": { fontSize: "40px" },
    "@media (max-width: 600px)": { fontSize: "32px" },
});

const SubTitle = styled(Typography)({
    fontSize: "18px",
    fontWeight: 400,
    color: "#666",
    letterSpacing: "0.3px",
    "@media (max-width: 600px)": { fontSize: "16px" },
});

const ImageSection = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'backgroundImage',
})(({ backgroundImage }) => ({
    position: "relative",
    width: "100%",
    height: "500px",
    backgroundImage: `url('${backgroundImage}')`,
    backgroundColor: "transparent",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    transition: "background-image 0.4s",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 40px rgba(0,0,0,0.22)",
    "@media (max-width: 960px)": { height: "400px" },
    "@media (max-width: 600px)": { height: "300px" },
}));


const OverlayFlex = styled(Box)({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
    display: "flex",
    zIndex: 2,
});

const CategoryColumn = styled(Box, {
    shouldForwardProp: (prop) => prop !== "isHovered" && prop !== "isLast",
})(({ isHovered, isLast }) => ({
    flex: 1,
    position: "relative",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    borderRight: isLast ? "none" : "1.5px solid #fff",
    height: "100%",
}));

const CategoryLabel = styled(Box, {
    shouldForwardProp: (prop) => prop !== "isActive",
})(({ isActive }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: isActive ? "#fff" : "transparent",
    color: isActive ? "#000" : "#fff",
    // padding: "0 0 0 22px", 
    padding: "30px 0",
    height: 80,
    transition: "background 0.19s, color 0.19s",
    boxShadow: "none",
    margin: 0,
    borderRadius: 0,
    border: "none",
    "@media (max-width: 600px)": {
        height: 48,
        padding: '14px 0'
    },
}));


const CategoryType = styled(Typography, {
    shouldForwardProp: (prop) => prop !== "isActive",
})(({ isActive }) => ({
    fontSize: "15px",
    fontWeight: 400,
    color: "inherit",
    marginBottom: 2,
    letterSpacing: ".4px",
    textShadow: "none",
    textTransform: 'capitalize',
    "@media (max-width: 600px)": { fontSize: "9px" },
}));

const CategoryName = styled(Typography)(() => ({
    fontSize: "26px",
    fontWeight: 300,
    color: "inherit",
    lineHeight: "1.12",
    textShadow: "none",
    textTransform: 'capitalize',
    "@media (max-width: 960px)": { fontSize: "18px" },
    "@media (max-width: 600px)": { fontSize: "12px" },
}));

const defaultImage = "/trendingImg.png";

function Trending() {
    const [currentImage, setCurrentImage] = useState(defaultImage);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [subcategoryName, setSubCategoryName] = useState([]);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    function shuffleArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }


    useEffect(() => {
        fetchSubCategories();
    }, [])
    const fetchSubCategories = async () => {
        try {
            const response = await axiosInstance.get(`/user/allSubcategories`);
            setSubCategoryName(response?.data);
            const shuffled = shuffleArray(response?.data);
            const selectedRandom = shuffled.slice(0, 3);
            setSubCategoryName(selectedRandom);
            setCurrentImage(selectedRandom[0]?.image || defaultImage);
            setLoading(false)
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    };

    return (
        <SectionContainer>
            <HeaderContainer maxWidth="lg">
                <MainTitle>Trending Now</MainTitle>
                <SubTitle>
                    Jewellery pieces everyone's eyeing right now
                </SubTitle>
            </HeaderContainer>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                    <CircularProgress />
                </Box>
            ) :
                <ImageSection
                    backgroundImage={publicUrl(currentImage)}
                >
                    <OverlayFlex>
                        {subcategoryName.map((item, idx) => {
                            const isActive = hoveredItem === item._id;
                            return (
                                <CategoryColumn
                                    key={item._id}
                                    isHovered={isActive}
                                    isLast={idx === subcategoryName.length - 1}
                                    onMouseEnter={() => {
                                        setCurrentImage(item.image);
                                        setHoveredItem(item._id);
                                    }}
                                    onMouseLeave={() => {
                                        // setCurrentImage(defaultImage);
                                        setCurrentImage(subcategoryName[0]?.image || defaultImage);

                                        setHoveredItem(null);
                                    }}
                                    onTouchStart={() => {
                                        // setCurrentImage(item.image);
                                        setCurrentImage(subcategoryName[0]?.image || defaultImage);
                                        setHoveredItem(item._id);
                                    }}
                                    onTouchEnd={() => {
                                        setCurrentImage(defaultImage);
                                        setHoveredItem(null);
                                    }}
                                    onClick={() => { navigate(`/allJewellery?subcategory=${item._id}`) }}
                                >
                                    <CategoryLabel isActive={isActive}>
                                        <CategoryType isActive={isActive}>{item.subCategoryvariety}</CategoryType>
                                        <CategoryName >{item.name}</CategoryName>
                                    </CategoryLabel>
                                </CategoryColumn>
                            );
                        })}
                    </OverlayFlex>
                </ImageSection>}
        </SectionContainer >
    );
}

export default Trending;

