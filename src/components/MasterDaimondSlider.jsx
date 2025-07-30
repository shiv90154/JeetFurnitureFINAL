// import { Box, Typography, Container, styled } from "@mui/material";
// import { ChevronLeft, ChevronRight } from "@mui/icons-material";

// // You’ll fill these with real image URLs later:
// const images = [
//     "/masterSlider1.png",
//     "/masterSlider2.png",
//     "/masterSlider3.png",
//     "/masterSlider1.png",
//     "/masterSlider2.png",
//     "/masterSlider3.png",
// ];

// // Dummy product titles/categories for the overlay (center card)
// const overlayLabels = [
//     { title: "Dazzling Cuff", category: "Gold Bracelet" },
//     { title: "Classic Hoops", category: "Diamond Earring" },
//     { title: "New Arrival", category: "Teardrop Diamond Drop" }, // Center card
//     { title: "Elegant Pendant", category: "Gold Chain" },
//     { title: "Statement Ring", category: "Cocktail Ring" }
// ];

// // Card positions for desktop: [FarLeft, Left, Center, Right, FarRight]
// const CARD_LAYER_PROPS = [
//     { w: 270, h: 420, z: 1, l: "2%", t: "33%", s: 0.75, a: -13, r: undefined },
//     { w: 300, h: 420, z: 2, l: "13%", t: "18%", s: 0.89, a: -7, r: undefined},
//     { w: 325, h: 480, z: 5, l: "50%", t: "20%", s: 1, a: 0, r: undefined, centered: true },
//     { w: 300, h: 420, z: 2, l: undefined, t: "18%", s: 0.89, a: 7, r: "13%" },
//     { w: 270, h: 420, z: 1, l: undefined, t: "33%", s: 0.75, a: 13, r: "2%" },
// ];

// const SectionContainer = styled(Box)({
//     backgroundColor: "#fff",
//     paddingTop: "80px",
//     paddingBottom: "80px",
// });

// const HeaderContainer = styled(Container)({
//     textAlign: "center",
//     marginBottom: "34px",
// });

// const MainTitle = styled(Typography)({
//     fontFamily: "serif",
//     fontSize: "44px",
//     fontWeight: 700,
//     color: "#31202c",
//     marginBottom: "6px",
//     lineHeight: "1.1",
//     letterSpacing: "-0.5px",
//     "@media (max-width: 900px)": { fontSize: "34px" },
//     "@media (max-width: 600px)": { fontSize: "24px" },
// });

// const SubTitle = styled(Typography)({
//     fontSize: "18px",
//     fontWeight: 400,
//     color: "#8e7889",
//     letterSpacing: "0.3px",
//     "@media (max-width: 600px)": { fontSize: "15px" }
// });

// const SliderContainer = styled(Box)({
//     position: "relative",
//     width: "100%",
//     maxWidth: "960px",
//     margin: "0 auto",
//     height: "520px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     "@media (max-width:900px)": {
//         height: "400px",
//         maxWidth: "600px",
//     },
//     "@media (max-width:600px)": {
//         height: "260px",
//         maxWidth: "330px",
//     },
// });

// const SlideCard = styled(Box, {
//     shouldForwardProp: (prop) => !["layer", "centered"].includes(prop),
// })(({ layer, centered }) => ({
//     position: "absolute",
//     width: layer.w,
//     height: layer.h,
//     left: centered ? `calc(50% - ${layer.w / 2}px)` : layer.l ?? "auto",
//     top: layer.t,
//     right: layer.r ?? "auto",
//     zIndex: layer.z,
//     opacity: layer.o,
//     transform: `scale(${layer.s}) rotate(${layer.a}deg)`,
//     boxShadow:
//         layer.z === 5
//             ? "0 18px 54px 0px rgba(80,40,50,0.23)"
//             : "0 3px 19px 0 rgba(100,60,90,0.07)",
//     background: "#eee",
//     borderRadius: "22px",
//     overflow: "hidden",
//     transition: "all .29s cubic-bezier(.35,.62,.47,1)",
//     display: "flex",
//     flexDirection: "column",
//     "@media (max-width:900px)": {
//         width: layer.w * 0.68,
//         height: layer.h * 0.68,
//         left: centered ? `calc(50% - ${(layer.w * 0.68) / 2}px)` : layer.l ?? "auto",
//         right: layer.r ?? "auto",
//     },
//     "@media (max-width:600px)": {
//         width: layer.w * 0.5,
//         height: layer.h * 0.5,
//         left: centered ? `calc(50% - ${(layer.w * 0.5) / 2}px)` : layer.l ?? "auto",
//         right: layer.r ?? "auto",
//     },
// }));

// const SlideImage = styled("img")({
//     width: "100%",
//     height: "100%",
//     objectFit: "cover",
//     objectPosition: "center",
//     display: "block",
// });

// const CenterOverlay = styled(Box)({
//     position: "absolute",
//     left: "50%",
//     bottom: "20px",
//     width: "82%",
//     transform: "translateX(-50%)",
//     background: "rgba(54, 38, 41, 0.88)",
//     borderRadius: "12px",
//     padding: "13px 20px 11px 16px",
//     boxShadow: "0 4px 16px 0 rgba(0,0,0,.13)",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "flex-start"
// });

// const OverlayTitle = styled(Typography)({
//     color: "#fff",
//     fontWeight: 500,
//     fontSize: "16px",
//     letterSpacing: ".08em",
//     lineHeight: 1.28,
//     marginBottom: "2px"
// });
// const OverlayCategory = styled(Typography)({
//     color: "#ecd4d6",
//     fontWeight: 300,
//     fontSize: "13px",
//     opacity: 0.82
// });

// const NavigationArrow = styled(Box)(({ direction }) => ({
//     position: "absolute",
//     top: "50%",
//     transform: "translateY(-50%)",
//     left: direction === "prev" ? "-54px" : "auto",
//     right: direction === "next" ? "-54px" : "auto",
//     zIndex: 15,
//     width: "38px",
//     height: "38px",
//     borderRadius: "50%",
//     backgroundColor: "#fff",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     cursor: "pointer",
//     boxShadow: "0 2px 12px rgba(100,80,80,0.17)",
//     transition: "all .20s",
//     "&:hover": {
//         backgroundColor: "#f8e3ef",
//         transform: "translateY(-50%) scale(1.07)",
//         boxShadow: "0 6px 22px rgba(102,44,56,0.21)",
//     },
//     "@media (max-width:900px)": {
//         left: direction === "prev" ? "-30px" : "auto",
//         right: direction === "next" ? "-30px" : "auto",
//         width: "28px",
//         height: "28px",
//     },
//     "@media (max-width:600px)": {
//         left: direction === "prev" ? "-5px" : "auto",
//         right: direction === "next" ? "-5px" : "auto",
//         width: "20px",
//         height: "20px",
//     }
// }));

// export default function MasterDaimondSlider() {
//     return (
//         <SectionContainer>
//             <HeaderContainer maxWidth="lg">
//                 <MainTitle>Master the Art of Diamond Styling</MainTitle>
//                 <SubTitle>Elevate Every Look with Fashion-Forward Diamond Jewellery</SubTitle>
//             </HeaderContainer>
//             <SliderContainer>
//                 <NavigationArrow direction="prev">
//                     <ChevronLeft sx={{ fontSize: "22px", color: "#bf224b" }} />
//                 </NavigationArrow>
//                 <NavigationArrow direction="next">
//                     <ChevronRight sx={{ fontSize: "22px", color: "#bf224b" }} />
//                 </NavigationArrow>
//                 {CARD_LAYER_PROPS.map((layer, idx) => (
//                     <SlideCard key={idx} layer={layer} centered={!!layer.centered}>
//                         <SlideImage
//                             src={images[idx]}
//                             alt="img"
//                             style={{
//                                 opacity: layer.o,
//                                 filter: layer.z === 5 ? "none" : "brightness(0.91)",
//                             }}
//                         />
//                         {layer.z === 5 && (
//                             <CenterOverlay>
//                                 <OverlayTitle>{overlayLabels[idx].title}</OverlayTitle>
//                                 <OverlayCategory>{overlayLabels[idx].category}</OverlayCategory>
//                             </CenterOverlay>
//                         )}
//                     </SlideCard>
//                 ))}
//             </SliderContainer>
//         </SectionContainer>
//     );
// }

import { Box, Typography, Container, styled } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
    "/masterSlider1.png",
    "/masterSlider2.png",
    "/masterSlider3.png",
    "/masterSlider1.png",
    "/masterSlider2.png",
    "/masterSlider3.png",
];

const overlayLabels = [
    { title: "Regal Tiara", category: "Bridal Headwear" },
    { title: "Floral Charm", category: "Diamond Earring" },
    { title: "New Arrival", category: "Teardrop Diamond Drop" },
    { title: "Sleek Sparkle", category: "Diamond Bangle" },
    { title: "Statement Piece", category: "Necklace Set" },
    { title: "Eternity Rings", category: "Gold & Diamond Rings" },
];

const SectionContainer = styled(Box)({
    backgroundColor: "#fff",
    padding: "80px 0",
    overflow: "hidden",
});

const HeaderContainer = styled(Container)({
    textAlign: "center",
    marginBottom: "40px",
});

const MainTitle = styled(Typography)({
    fontFamily: "'Playfair Display', serif",
    fontSize: "44px",
    fontWeight: 700,
    color: "#31202c",
    marginBottom: "6px",
});

const SubTitle = styled(Typography)({
    fontSize: "18px",
    color: "#8e7889",
    fontFamily: "'Roboto', sans-serif",
});

const SlideCard = styled(Box)({
    width: "325px",
    height: "480px",
    position: 'relative',
    margin: "0 auto",
});

const SlideImage = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "22px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
});

const ImageOverlay = styled(Box)({
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "20px",
    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
    borderBottomLeftRadius: "22px",
    borderBottomRightRadius: "22px",
});

const OverlayTitle = styled(Typography)({
    color: "#fff",
    fontWeight: 600,
    fontSize: "20px",
    lineHeight: 1.3,
    marginBottom: "4px",
});

const OverlayCategory = styled(Typography)({
    color: "rgba(255,255,255,0.9)",
    fontWeight: 400,
    fontSize: "14px",
});

const NavigationArrow = styled(Box)(({ direction }) => ({
    position: "absolute",
    top: "45%",
    transform: "translateY(-50%)",
    left: direction === "prev" ? "-60px" : "auto",
    right: direction === "next" ? "-60px" : "auto",
    zIndex: 10,
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 2px 12px rgba(100,80,80,0.17)",
    transition: "all .2s",
    "&:hover": {
        transform: "translateY(-50%) scale(1.07)",
        boxShadow: "0 6px 22px rgba(102,44,56,0.21)",
    },
    "@media (max-width:1200px)": {
        left: direction === "prev" ? "10px" : "auto",
        right: direction === "next" ? "10px" : "auto",
    },
}));

export default function MasterDiamondSlider() {
    const sliderRef = useRef(null);

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        slidesToShow: 5,
        speed: 500,
        arrows: false,
        initialSlide: 2,
        responsive: [
            { breakpoint: 960, settings: { slidesToShow: 3 } },
            { breakpoint: 600, settings: { slidesToShow: 1, centerPadding: '20px' } },
        ],
    };

    return (
        <SectionContainer>
            <HeaderContainer maxWidth="lg">
                <MainTitle>Master the Art of Diamond Styling</MainTitle>
                <SubTitle>Elevate Every Look with Fashion-Forward Diamond Jewellery</SubTitle>
            </HeaderContainer>

            <Box sx={{ position: "relative", maxWidth: "1100px", margin: "0 auto" }}>
                <NavigationArrow direction="prev" onClick={() => sliderRef.current?.slickPrev()}>
                    <ChevronLeft sx={{ fontSize: "24px", color: "#bf224b" }} />
                </NavigationArrow>

                <Slider {...settings} ref={sliderRef}>
                    {images.map((imgSrc, index) => (
                        <SlideCard key={index}>
                            <SlideImage src={imgSrc} alt={overlayLabels[index]?.title || "Jewellery"} />
                            <ImageOverlay>
                                <OverlayTitle>{overlayLabels[index]?.title}</OverlayTitle>
                                <OverlayCategory>{overlayLabels[index]?.category}</OverlayCategory>
                            </ImageOverlay>
                        </SlideCard>
                    ))}
                </Slider>

                <NavigationArrow direction="next" onClick={() => sliderRef.current?.slickNext()}>
                    <ChevronRight sx={{ fontSize: "24px", color: "#bf224b" }} />
                </NavigationArrow>
            </Box>
        </SectionContainer>
    );
}


