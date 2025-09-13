import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Fade, Grow, Zoom } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useLocation, useNavigate } from "react-router-dom";
import { clearProducts } from "../store/Action";
import { connect } from "react-redux";


const OrderSuccessPage = ({ clearProducts }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state?.data || {};
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const duration = 1 * 1000;
        const end = Date.now() + duration;
        setTimeout(() => setShowContent(true), duration + 100);
    }, []);

    const handleClose = () => {
        setShowContent(false);
        navigate("/userOrder");
        clearProducts();
    };

    return (
        <Fade in={showContent} timeout={1000}>
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    bgcolor: "rgba(0, 0, 0, 0.9)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 9999,
                }}
            >
                {showContent && (
                    <Zoom in={showContent} timeout={50}>
                        <Box sx={{ textAlign: "center", color: "white" }}>
                            <Grow in={showContent} timeout={500}>
                                <CheckCircleOutlineIcon
                                    sx={{
                                        fontSize: 120,
                                        color: "success.main",
                                        mb: 4,
                                    }}
                                />
                            </Grow>
                            <Typography variant="h3" component="h1" gutterBottom>
                                Order Placed Successfully!
                            </Typography>
                           
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={handleClose}
                                sx={{
                                    mt: 2,
                                    fontSize: "1.2rem",
                                    padding: "12px 24px",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        transition: "transform 0.2s",
                                    },
                                    borderRadius: 2,
                                }}
                            >
                                Check Orders
                            </Button>
                        </Box>
                    </Zoom>
                )}
            </Box>
        </Fade>
    );
};

const mapStateToProps = (state) => ({
    data: state.data,
});

const mapDispatchToProps = {
    clearProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSuccessPage);


// //2:
// import React, { useState, useEffect } from "react";
// import { Box, Typography, Button, Fade, Grow, Zoom } from "@mui/material";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import { useLocation, useNavigate } from "react-router-dom";
// import { clearProducts } from "../store/Action";
// import { connect } from "react-redux";
// import axiosInstance from "../common components/AxiosInstance";


// const OrderSuccessPage = ({ clearProducts }) => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const state = location.state || {};
//     const data = state?.app?.data || {};
//     const [showContent, setShowContent] = useState(false);
//     const [paymentId, setPaymentId] = useState(data?.payment_id || null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axiosInstance.get('/api/orders');
//                 console.log("Fetched orders:", response.data.orders);
//                 console.log("Current payment ID:", data?.payment_id);
//                 setPaymentId(response.data.orders[0]?.payment_id || null);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };
//         fetchData();
//     }, []);

//     useEffect(() => {
//         const duration = 1 * 1000;
//         const end = Date.now() + duration;
//         setTimeout(() => setShowContent(true), duration + 100);
//     }, []);

//     const handleClose = () => {
//         setShowContent(false);
//         navigate("/userOrder");
//         clearProducts();
//     };

//     return (
//         <Fade in={showContent} timeout={1000}>
//             <Box
//                 sx={{
//                     position: "fixed",
//                     top: 0,
//                     left: 0,
//                     width: "100vw",
//                     height: "100vh",
//                     bgcolor: "rgba(0, 0, 0, 0.9)",
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     zIndex: 9999,
//                 }}
//             >
//                 {showContent && (
//                     <Zoom in={showContent} timeout={50}>
//                         <Box sx={{ textAlign: "center", color: "white" }}>
//                             <Grow in={showContent} timeout={500}>
//                                 <CheckCircleOutlineIcon
//                                     sx={{
//                                         fontSize: 120,
//                                         color: "success.main",
//                                         mb: 4,
//                                     }}
//                                 />
//                             </Grow>
//                             <Typography variant="h3" component="h1" gutterBottom>
//                                 Order Placed Successfully!
//                             </Typography>
//                             {/* <Typography variant="h6" sx={{ mt: 2, mb: 4 }}>
//                                 Thank you for your order. We'll send you a confirmation email
//                                 shortly.
//                             </Typography> */}
//                             <Typography variant="body1" sx={{ mb: 4, color: "white" }}>
//                                 Transaction ID: <strong>{paymentId}</strong>
//                             </Typography>
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 size="large"
//                                 onClick={handleClose}
//                                 sx={{
//                                     mt: 2,
//                                     fontSize: "1.2rem",
//                                     padding: "12px 24px",
//                                     "&:hover": {
//                                         transform: "scale(1.05)",
//                                         transition: "transform 0.2s",
//                                     },
//                                     borderRadius: 2,
//                                 }}
//                             >
//                                 Check Orders
//                             </Button>
//                         </Box>
//                     </Zoom>
//                 )}
//             </Box>
//         </Fade>
//     );
// };

// const mapStateToProps = (state) => ({
//     data: state.data,
// });

// const mapDispatchToProps = {
//     clearProducts,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(OrderSuccessPage);


