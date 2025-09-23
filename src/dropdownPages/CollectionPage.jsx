// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Container,
//   Card,
//   CardContent,
//   styled,
// } from '@mui/material';
// import axiosInstance from '../common components/AxiosInstance';
// import { useNavigate, useParams } from 'react-router-dom';
// import { publicUrl } from '../common components/PublicUrl';
// import Slider from "react-slick"
// import { useTheme } from "@mui/material/styles"
// import "slick-carousel/slick/slick.css"
// import "slick-carousel/slick/slick-theme.css"

// const Slide = styled(Box)(({ theme }) => ({
//   width: "100%",
//   height: "auto",
//   // position: "relative",
//   // overflow: "hidden",
//   backgroundColor: "#fae6e1", // Match SlideImage bg, looks good if image is not full size
//   [theme.breakpoints.down("lg")]: {
//     // height: 400,
//   },
//   [theme.breakpoints.down("sm")]: {
//     // height: 250,
//     width: "100%",
//   },
// }));

// const SlideImage = styled("img")({
//   height: "auto",
//   width: "auto",
//   maxWidth: "100%",
//   display: "block",
//   margin: "0 auto",
//   backgroundColor: "#fae6e1", // optional: matches your theme
// });

// export default function CollectionPage() {
//   const { variety } = useParams();
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate()
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [filteredBanner, setFilteredBanner] = useState(null);
//   const [banners, setBanners] = useState([]);

//   useEffect(() => {
//     fetchAllProducts();
//     fetchBanners();
//   }, [])

//   const fetchAllProducts = async () => {
//     try {
//       const response = await axiosInstance.get(`/user/allproducts`);
//       setProducts(response?.data ?? []);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const fetchBanners = async () => {
//     try {
//       const response = await axiosInstance.get("/user/allBanners");
//       const bannerData = response.data;
//       const mainBanners = bannerData.filter(
//         (banner) =>
//           banner.type === "EndSlider" &&
//           Array.isArray(banner.slider_image) &&
//           banner.slider_image.length > 0
//       );
//       setBanners(mainBanners);

//     } catch (error) {
//       console.error("Error fetching banners:", error);
//     }
//   };


//   useEffect(() => {
//     if (variety && products.length && banners.length) {
//       // Find the correct banner
//       const bannerForVariety = banners.find(b => b.variety?.toLowerCase() === variety.toLowerCase());
//       setFilteredBanner(bannerForVariety);

//       // Filter products for this variety
//       const productsForVariety = products.filter(p => p.productvariety?.toLowerCase() === variety.toLowerCase());
//       setFilteredProducts(productsForVariety);
//     }
//   }, [variety, products, banners]);


//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     pauseOnHover: true,
//     arrows: false,
//   }

//   return (
//     <Box sx={{ backgroundColor: '#fff' }}>
//       {/* <Box
//         sx={{
//           width: '100vw',
//           overflow: 'hidden',
//           backgroundColor: '#fff',
//           position: 'relative',
//           left: '50%',
//           right: '50%',
//           marginLeft: '-50vw',
//           marginRight: '-50vw',
//         }}
//       >
//         {filteredBanner && filteredBanner.slider_image && filteredBanner.slider_image.length > 0 ? (
//           <img
//             src={publicUrl(filteredBanner.slider_image)}
//             alt="Variety Banner"
//             style={{
//               width: '100vw',
//               maxHeight: '350px', // Adjust as needed (e.g., 300-400px)
//               height: 'auto',
//               // objectFit: 'contain',
//               objectFit: 'cover',
//               display: 'block',
//               margin: '0 auto',
//             }}
//           />
//         ) : (
//           <img
//             src="/hero_img.png"
//             alt="Default Banner"
//             style={{
//               width: '100%',
//               height: 'auto',
//               objectFit: 'contain',
//               // objectFit: 'inherit',
//               display: 'block',
//               margin: '0 auto',
//             }}
//           />
//         )}
//       </Box> */}

//       {/* 2 */}
//       <Slider {...settings} >
//         {banners.map((item, index) => (
//           <Slide key={index}
//             onClick={() => navigate(`/collection/${(item.variety || 'all').toLowerCase()}`)}
//           >
//             <SlideImage src={publicUrl(item.slider_image[0])} alt={`slide-${index}`} />
//           </Slide>
//         ))}
//       </Slider>

//       {/* Products Section */}
//       <Box sx={{ backgroundColor: '#fff', py: '20px' }}>
//         <Container maxWidth="xl">
//           <Box
//             sx={{
//               display: 'flex',
//               flexWrap: 'wrap',
//               justifyContent: 'center',
//               gap: { xs: 2, lg: 3 },
//             }}
//           >
//             {(variety ? filteredProducts : products).map((item) =>
//             (<Card
//               key={item._id}
//               onClick={() => navigate(`/allJewellery?variety=${item.productvariety.toLowerCase()}`)}
//               sx={{
//                 borderRadius: 0,
//                 boxShadow: 'none',
//                 border: '1px solid #eee',
//                 cursor: 'pointer',
//                 transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 flexBasis: {
//                   // xs: '45%',
//                   xs: '30%',
//                   sm: '23%',
//                 },
//                 maxWidth: {
//                   // xs: '45%',
//                   xs: '30%',
//                   sm: '23%',
//                 },
//                 // minWidth: 0,
//                 '&:hover': {
//                   transform: 'translateY(-5px)',
//                   boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
//                 },
//               }}
//             >
//               <Box
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   height: { xs: 100, md: 120, lg: 200 },
//                   width: '100%'
//                 }}
//               >
//                 <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={publicUrl(item.media[0].url)} alt={item.name} />
//               </Box>

//               <CardContent
//                 sx={{
//                   textAlign: 'center',
//                   padding: { xs: '10px 4px' },
//                   borderTop: '1px solid #eee',
//                   flexGrow: 1,
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}
//               >
//                 <Typography
//                   sx={{
//                     fontSize: { xs: 12, md: 14 },
//                     fontWeight: 500,
//                     color: '#2C2C2C',
//                     marginBottom: 1,
//                     // lineHeight: 1.3,
//                     textAlign: 'center',
//                   }}
//                 >
//                   {item.productvariety}
//                 </Typography>
//                 <Typography
//                   sx={{
//                     fontSize: { xs: 12, md: 14 },
//                     fontWeight: 500,
//                     color: '#2C2C2C',
//                     marginBottom: 1,
//                     lineHeight: 1.1,
//                     textAlign: 'center',
//                   }}
//                 >
//                   {item.name}
//                 </Typography>
//               </CardContent>
//             </Card>
//             )
//             )}
//           </Box>
//         </Container>
//       </Box>
//     </Box>
//   );
// }


// //2:
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
} from '@mui/material';
import axiosInstance from '../common components/AxiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { publicUrl } from '../common components/PublicUrl';
export default function CollectionPage() {
  const { variety } = useParams();
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const navigate = useNavigate()
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredBanner, setFilteredBanner] = useState(null);

  useEffect(() => {
    fetchAllProducts();
    fetchBanner();
  }, [])

  const fetchAllProducts = async () => {
    try {
      const response = await axiosInstance.get(`/user/allproducts`);
      setProducts(response?.data ?? []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchBanner = async () => {
    try {
      const response = await axiosInstance.get("/user/allBanners");
      const bannerData = response.data;

      const mainBanners = bannerData.filter(
        (banner) =>
          banner.type === "HomePageSlider" &&
          Array.isArray(banner.slider_image) &&
          banner.slider_image.length > 0
      );

      setBanners(mainBanners);

    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  useEffect(() => {
    if (variety && products.length && banners.length) {
      // Find the correct banner
      const bannerForVariety = banners.find(b => b.variety?.toLowerCase() === variety.toLowerCase());
      setFilteredBanner(bannerForVariety);

      // Filter products for this variety
      const productsForVariety = products.filter(p => p.productvariety?.toLowerCase() === variety.toLowerCase());
      setFilteredProducts(productsForVariety);
    }
  }, [variety, products, banners]);

  return (
    <Box sx={{ backgroundColor: '#fff' }}>
      {/* Hero Section */}
      {/* <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}
      >
        <Box  sx={{
            width: '100%',
            height: '400px',
          }}>
          {filteredBanner && filteredBanner.slider_image && filteredBanner.slider_image.length > 0 ? (
            <img 
            style={{ width: '100%', height:'100%',  objectFit: 'cover',  }}
             src={publicUrl(filteredBanner.slider_image)} alt="Variety Banner" />
          ) : (
            <img src="/hero_img.png" alt="Default Banner" />
          )}
        </Box>
      </Box> */}

      <Box
        sx={{
          width: '100vw',
          overflow: 'hidden',
          backgroundColor: '#fff',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
        }}
      >
        {filteredBanner && filteredBanner.slider_image && filteredBanner.slider_image.length > 0 ? (
          <img
            src={publicUrl(filteredBanner.slider_image)}
            alt="Variety Banner"
            style={{
              width: '100vw',
              maxHeight: '350px', // Adjust as needed (e.g., 300-400px)
              height: 'auto',
              // objectFit: 'contain',
              objectFit: 'cover',
              display: 'block',
              margin: '0 auto',
            }}
          />
        ) : (
          <img
            src="/hero_img.png"
            alt="Default Banner"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              // objectFit: 'inherit',
              display: 'block',
              margin: '0 auto',
            }}
          />
        )}
      </Box>


      {/* Products Section */}
      <Box sx={{ backgroundColor: '#fff', py: '20px' }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: { xs: 2, lg: 3 },
            }}
          >
            {(variety ? filteredProducts : products).map((item) =>
            (<Card
              key={item._id}
              onClick={() => navigate(`/allJewellery?variety=${item.productvariety.toLowerCase()}`)}
              sx={{
                borderRadius: 0,
                boxShadow: 'none',
                border: '1px solid #eee',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                flexBasis: {
                  // xs: '45%',
                  xs: '30%',
                  sm: '23%',
                },
                maxWidth: {
                  // xs: '45%',
                  xs: '30%',
                  sm: '23%',
                },
                // minWidth: 0,
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: { xs: 100, md: 120, lg: 200 },
                  width: '100%'
                }}
              >
                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={publicUrl(item.media[0].url)} alt={item.name} />
              </Box>

              <CardContent
                sx={{
                  textAlign: 'center',
                  padding: { xs: '10px 4px' },
                  borderTop: '1px solid #eee',
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 12, md: 14 },
                    fontWeight: 500,
                    color: '#2C2C2C',
                    marginBottom: 1,
                    // lineHeight: 1.3,
                    textAlign: 'center',
                  }}
                >
                  {item.productvariety}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: 12, md: 14 },
                    fontWeight: 500,
                    color: '#2C2C2C',
                    marginBottom: 1,
                    lineHeight: 1.1,
                    textAlign: 'center',
                  }}
                >
                  {item.name}
                </Typography>
              </CardContent>
            </Card>
            )
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
