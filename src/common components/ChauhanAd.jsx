import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Slider1 from "../img/Slider1.png";
import Slider2 from "../img/Slider2.png";
import Slider3 from "../img/Slider3.png";
import Slider4 from "../img/Slider4.png";

// Styled components
const RootContainer = styled(Box)({
  width: "100%",
  backgroundColor: "#fceae4", // light peach background
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px 0",
});

const ContentWrapper = styled(Grid)({
  maxWidth: "1400px",
  width: "100%",
  alignItems: "center",
});

const ImagesGrid = styled(Grid)({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridTemplateRows: "repeat(2, 300px)", // fixed equal heights
  gap: "12px",
});

const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover", // keeps aspect ratio but fills
  borderRadius: "10px",
});


const TextWrapper = styled(Box)({
  paddingLeft: "40px",
  paddingRight: "40px",
  textAlign: "left",
});

const ExploreButton = styled(Button)({
  fontFamily: "'Montserrat', sans-serif",
  letterSpacing: "0.15em",
  backgroundColor: "#a4855c",
  color: "#fff",
  padding: "10px 24px",
  borderRadius: "2px",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "#8c6f4d",
  },
});

const ChauhanAd = () => {
  const bridalImages = [Slider1, Slider2, Slider3, Slider4];

  return (
    <RootContainer>
      <ContentWrapper container spacing={4}>
        {/* Left 2x2 Images */}
        <Grid item xs={12} md={7}>
          <ImagesGrid>
            {bridalImages.map((image, idx) => (
              <StyledImage
                key={idx}
                src={image}
                alt={`Bridal ${idx + 1}`}
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/400x500?text=Image+Not+Found")
                }
              />
            ))}
          </ImagesGrid>
        </Grid>

        {/* Right Text Section */}
        <Grid item xs={12} md={5}>
          <TextWrapper>
            <Typography
              variant="overline"
              sx={{
                fontFamily: "'Playfair Display', serif",
                letterSpacing: "0.3em",
                display: "block",
                mb: 1,
                color: "#000",
                fontSize: "0.8rem",
              }}
            >
              A TATA PRODUCT
            </Typography>

            <Typography
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.6rem",
                fontWeight: 400,
                color: "#000",
                mb: 3,
                lineHeight: 1.4,
              }}
            >
              For marriages <br /> crafted by you
            </Typography>

            <Typography
              sx={{
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: "0.5em",
                fontSize: "1.3rem",
                fontWeight: 500,
                color: "#000",
              }}
            >
             Chauhan Jewellers
            </Typography>

            <Typography
              sx={{
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: "0.5em",
                fontSize: "0.8rem",
                mb: 2,
                color: "#000",
              }}
            >
              PRESENTS
            </Typography>

            <Typography
              sx={{
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: "0.2em",
                fontSize: "2rem",
                fontWeight: 300,
                color: "#000",
              }}
            >
              RIVAAH
            </Typography>

            <Typography
              sx={{
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: "0.2em",
                fontSize: "1rem",
                mb: 4,
                fontWeight: 300,
                color: "#000",
              }}
            >
              WEDDING JEWELLERY
            </Typography>

            <ExploreButton>EXPLORE NOW</ExploreButton>
          </TextWrapper>
        </Grid>
      </ContentWrapper>
    </RootContainer>
  );
};

export default ChauhanAd;
