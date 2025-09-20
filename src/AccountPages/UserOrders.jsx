// // 1: implementation with real API call
// import React, { useEffect, useState } from 'react';
// import {
//     Box, Container, Typography, CircularProgress, Card, CardContent,
//     CardActions, Button, Chip, Collapse, Divider, Grid, Avatar, List, ListItem, ListItemText
// } from '@mui/material';
// import {
//     CheckCircle, Pending, Cancel, LocalShipping, ExpandMore, ExpandLess
// } from '@mui/icons-material';
// import axiosInstance from '../common components/AxiosInstance';
// import { publicUrl } from '../common components/PublicUrl';

// // Helper: Status Chip
// const getStatusChip = (status) => {
//     let icon, color, label;
//     switch (status) {
//         case 'Delivered':
//             icon = <CheckCircle />; color = 'success'; label = 'Delivered'; break;
//         case 'Pending':
//             icon = <Pending />; color = 'warning'; label = 'Pending'; break;
//         case 'Cancelled':
//             icon = <Cancel />; color = 'error'; label = 'Cancelled'; break;
//         default:
//             icon = <LocalShipping />; color = 'info'; label = status;
//     }
//     return (
//         <Chip
//             icon={icon}
//             label={label}
//             color={color}
//             sx={{ fontWeight: 600 }}
//             size="small"
//         />
//     );
// };

// const UserOrders = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [expanded, setExpanded] = useState(null);
//     const userId = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData'))._id : null;

//     // useEffect(() => {
//     //     const fetchOrders = async () => {
//     //         try {
//     //             // const response = await axiosInstance.get('/api/orders/');
//     //             const response = await axiosInstance.get(`/api/orders/${userId}`);
//     //             setOrders(response.data.orders);
//     //         } catch (error) {
//     //             setOrders([]);
//     //         }
//     //         setLoading(false);
//     //     };
//     //     fetchOrders();
//     //     // }, []);
//     // }, [userId]);


//     // option2: Polling every 10 seconds to fetch latest orders and status
//     useEffect(() => {
//         let intervalId;

//         const fetchOrders = async () => {
//             try {
//                 const response = await axiosInstance.get(`/api/orders/${userId}`);
//                 setOrders(response.data.orders);
//             } catch (error) {
//                 setOrders([]);
//             }
//             setLoading(false);
//         };

//         fetchOrders();

//         intervalId = setInterval(fetchOrders, 10000); // 10 seconds

//         return () => clearInterval(intervalId); // cleanup
//     }, [userId]);


//     const handleExpand = (orderId) => {
//         setExpanded(expanded === orderId ? null : orderId);
//     };

//     return (
//         <Container maxWidth="md" sx={{ py: 4 }}>
//             <Typography variant="h4" fontWeight={700} gutterBottom>
//                 My Orders
//             </Typography>
//             {loading ? (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
//                     <CircularProgress />
//                 </Box>
//             ) : orders.length === 0 ? (
//                 <Typography>No orders found.</Typography>
//             ) : (
//                 <Grid container spacing={3}>
//                     {orders.map((order) => (
//                         <Grid item xs={12} key={order._id}>
//                             <Card sx={{ borderRadius: 2, boxShadow: 2, p: 2 }}>
//                                 <CardContent>
//                                     <Box display="flex" alignItems="center" justifyContent="space-between">
//                                         <Typography variant="h6">
//                                             Order #{order._id.slice(-6)}
//                                         </Typography>
//                                         {getStatusChip(order.status)}
//                                     </Box>
//                                     <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                                         Placed on: {new Date(order.createdAt).toLocaleDateString()}
//                                     </Typography>
//                                     <Typography variant="body2" sx={{ mb: 1 }}>
//                                         Payment ID: <strong>{order.paymentId || 'N/A'}</strong>
//                                     </Typography>
//                                     <Button
//                                         endIcon={expanded === order._id ? <ExpandLess /> : <ExpandMore />}
//                                         onClick={() => handleExpand(order._id)}
//                                         sx={{ mt: 1 }}
//                                     >
//                                         {expanded === order._id ? 'Hide Details' : 'Show Details'}
//                                     </Button>
//                                     <Collapse in={expanded === order._id}>
//                                         <Divider sx={{ my: 2 }} />
//                                         <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
//                                             Items:
//                                         </Typography>
//                                         <List dense disablePadding>
//                                             {order.items.map((item, idx) => (
//                                                 <ListItem key={item.productId + idx} disableGutters>
//                                                     <Avatar
//                                                         variant="rounded"
//                                                         src={publicUrl(item.image)}
//                                                         sx={{ width: 48, height: 48, mr: 2 }}
//                                                     >
//                                                         {item.name}
//                                                     </Avatar>
//                                                     <ListItemText
//                                                         primary={`${item.name} (x${item.quantity})`}
//                                                         secondary={`₹${item.price.toLocaleString()} each`}
//                                                     />
//                                                 </ListItem>
//                                             ))}
//                                         </List>
//                                         <Divider sx={{ my: 1 }} />
//                                         <Typography variant="body2">
//                                             <strong>Total:</strong> ₹{order.items.reduce((acc, i) => acc + i.price * i.quantity, 0)}
//                                         </Typography>
//                                     </Collapse>
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     ))}
//                 </Grid>
//             )}
//         </Container>
//     );
// };

// export default UserOrders;


// // 2:
import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Chip, Button, Typography, Modal, Box, CardContent
} from '@mui/material';
import {
    Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent
} from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../common components/AxiosInstance';

// --- STATUS COLOR LOGIC ---
const statusColor = status => {
    switch (status?.toLowerCase()) {
        case 'pending': return 'warning';
        case 'cancelled': return 'error';
        case 'delivered': return 'success';
        default: return 'default';
    }
};
const paymentColor = status => (
    status === 'captured' ? 'success' : status === 'failed' ? 'error' : status === 'refunded' ? 'info' : 'default'
);
const refundColor = status => (
    status === 'processed' ? 'info' : status === 'failed' ? 'error' : status === 'pending' ? 'warning' : 'default'
);

// --- LABEL HELPERS ---
function paymentStatusLabel(status) {
    if (!status) return 'Unknown';
    if (status === 'captured') return 'Paid';
    if (status === 'failed') return 'Failed';
    if (status === 'refunded') return 'Refunded';
    return status.charAt(0).toUpperCase() + status.slice(1);
}
function refundStatusLabel(refundInfo) {
    if (!refundInfo) return 'No Refund';
    const status = refundInfo.status;
    if (status === 'processed') return 'Refund Processed';
    if (status === 'failed') return 'Refund Failed';
    if (status === 'pending') return 'Refund Pending';
    return `Refund ${status}`;
}
function formatDate(dateString) {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
function getEstimatedRefundDays(refundInfo) {
    if (!refundInfo || !refundInfo.estimatedSettlement) return null;
    const now = new Date();
    const settlement = new Date(refundInfo.estimatedSettlement);
    const diffTime = settlement - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return 'Should be settled';
    if (diffDays === 1) return 'Expected tomorrow';
    return `Expected in ${diffDays} days`;
}

// --- MAIN PAGE COMPONENT ---
const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const userData = JSON.parse(localStorage.getItem('userData'));
    const userId = userData?._id;

    useEffect(() => {
        if (!userData) {
            navigate('/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [navigate, userData]);

    // Fetch order including live payment/refund status every 30 seconds
    useEffect(() => {
        if (userId) {
            fetchOrders();
            const interval = setInterval(() => {
                fetchOrders();
            }, 30000);
            return () => clearInterval(interval);
        }
    }, [userId]);

    const fetchLivePaymentStatus = async (orderId) => {
        try {
            const response = await axiosInstance.get(`/api/paymentStatus/${orderId}`);
            return response.data.paymentInfo;
        } catch (error) {
            console.error('Error fetching payment status:', error);
            return null;
        }
    };

    const fetchRefundStatus = async (orderId) => {
        try {
            const response = await axiosInstance.get(`/api/orders/${orderId}/refund-status`);
            return response.data.refundInfo;
        } catch (error) {
            console.error('Error fetching refund status:', error);
            return null;
        }
    };

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/api/orders/${userId}`);
            const ordersWithLiveStatus = await Promise.all(
                (response.data.orders || []).map(async (order) => {
                    // Fetch live payment status
                    const paymentInfo = await fetchLivePaymentStatus(order._id);
                    // Fetch live refund status if order is cancelled
                    let refundInfo = order.refundInfo;
                    if (order.status === 'Cancelled' && order.refundInfo?.refundId) {
                        refundInfo = await fetchRefundStatus(order._id);
                    }
                    return {
                        ...order,
                        paymentInfo,
                        refundInfo
                    };
                })
            );
            setOrders(ordersWithLiveStatus);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const openOrderDetails = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };
    const closeOrderDetails = () => {
        setShowModal(false);
        setSelectedOrder(null);
    };

    if (isAuthenticated === null) return null;

    return (
        <Box sx={{ p: { xs: 1, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
            <Typography variant="h4" fontWeight={600} mb={4}>My Orders</Typography>
            <TableContainer component={Paper} elevation={2}>
                <Table>
                    <TableHead>
                        <TableRow 
                        // sx={{ backgroundColor: (theme) => theme.palette.primary.main, color: 'white' }}
                        >
                            <TableCell>#</TableCell>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Product(s)</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Order Status</TableCell>
                            <TableCell>Payment Status</TableCell>
                            <TableCell>Refund Status</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={9} align="center">Loading...</TableCell>
                            </TableRow>
                        ) : orders.length > 0 ? orders.map((order, index) => (
                            <TableRow key={order._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{order._id.slice(-8)}</TableCell>
                                <TableCell>{order.items.map(item => item.name).join(', ')}</TableCell>
                                <TableCell>{formatDate(order.createdAt)}</TableCell>
                                <TableCell>
                                    <Chip label={order.status} color={statusColor(order.status)} variant="filled" />
                                </TableCell>
                                <TableCell>
                                    <Chip label={paymentStatusLabel(order.paymentInfo?.status)} color={paymentColor(order.paymentInfo?.status)} variant="filled" />
                                </TableCell>
                                <TableCell>
                                    <Chip label={refundStatusLabel(order.refundInfo)} color={refundColor(order.refundInfo?.status)} variant="filled" />
                                    {order.refundInfo && (
                                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>{getEstimatedRefundDays(order.refundInfo)}</Typography>
                                    )}
                                </TableCell>
                                <TableCell>{`₹${order.totalAmount}`}</TableCell>
                                <TableCell>
                                    <Button variant="contained" size="small" onClick={() => openOrderDetails(order)}>
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={9} align="center">No orders found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* MODAL FOR ORDER DETAILS */}
            {/* <Modal open={showModal} onClose={closeOrderDetails}>
        <Box sx={{
          maxWidth: 800, width: '100%', bgcolor: 'background.paper', borderRadius: 2,
          boxShadow: 24, mx: 'auto', my: 4, overflowY: 'auto'
        }}>
          {selectedOrder && (
            <>
             
            </>
          )}
        </Box>
      </Modal> */}

            {/* MODAL FOR ORDER DETAILS */}
            <Modal open={showModal} onClose={closeOrderDetails}>
                <Box sx={{
                    maxWidth: 800, width: '100%', bgcolor: 'background.paper', borderRadius: 2,
                    boxShadow: 24, mx: 'auto', my: 4, overflowY: 'auto'
                }}>
                    {selectedOrder && (
                        <>
                            <Box sx={{
                                bgcolor: 'primary.main', color: 'common.white', p: 2, borderRadius: '12px 12px 0 0',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                            }}>
                                <Typography variant="h6">{`Order Details - #${selectedOrder._id.slice(-8)}`}</Typography>
                                <Button variant="text" color="inherit" onClick={closeOrderDetails} sx={{ fontSize: 28 }}>×</Button>
                            </Box>
                            <CardContent>
                                {/* Order Info Section */}
                                <Box mb={3}>
                                    <Typography variant="h6" mb={2}>Order Information</Typography>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                                        <Box><strong>Status:</strong> {selectedOrder.status}</Box>
                                        <Box><strong>Order Date:</strong> {formatDate(selectedOrder.createdAt)}</Box>
                                        <Box><strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}</Box>
                                        <Box><strong>Phone:</strong> {selectedOrder.phone}</Box>
                                        <Box><strong>Address:</strong> {selectedOrder.address}</Box>
                                    </Box>
                                    {/* Cancellation Info */}
                                    {selectedOrder.cancelReason && (
                                        <Box mt={2} p={2} bgcolor="#fff3cd" borderRadius={1}>
                                            <Typography variant="subtitle2" color="warning.main">Cancellation Details</Typography>
                                            <Typography variant="body2"><strong>Reason:</strong> {selectedOrder.cancelReason}</Typography>
                                            {selectedOrder.cancelledAt && (
                                                <Typography variant="body2"><strong>Cancelled on:</strong> {formatDate(selectedOrder.cancelledAt)}</Typography>
                                            )}
                                        </Box>
                                    )}
                                </Box>
                                {/* Payment Info */}
                                <Box mb={3}>
                                    <Typography variant="h6" mb={2}>Payment Information</Typography>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                                        <Box><strong>Payment ID:</strong> {selectedOrder.paymentInfo?.paymentId || 'N/A'}</Box>
                                        <Box>
                                            <strong>Payment Status:</strong>
                                            <Chip
                                                label={paymentStatusLabel(selectedOrder.paymentInfo?.status)}
                                                color={paymentColor(selectedOrder.paymentInfo?.status)}
                                                size="small"
                                                sx={{ ml: 1 }}
                                            />
                                        </Box>
                                        {selectedOrder.paymentInfo?.updatedAt && (
                                            <Box mb={1}><strong>Payment Updated:</strong> {formatDate(selectedOrder.paymentInfo.updatedAt)}</Box>
                                        )}
                                    </Box>
                                </Box>
                                {/* Refund Info Section */}
                                {selectedOrder.refundInfo && (
                                    <Box mb={3} bgcolor="#e8f4fd" border={2} borderColor="#74b9ff" borderRadius={2} p={2}>
                                        <Typography variant="h6" mb={2}>Refund Information</Typography>
                                        <Box display="flex" alignItems="center" mb={2}>
                                            <Chip
                                                label={refundStatusLabel(selectedOrder.refundInfo)}
                                                color={refundColor(selectedOrder.refundInfo?.status)}
                                                sx={{ mr: 2 }}
                                            />
                                            <Typography variant="h5" color="primary.main">
                                                ₹{selectedOrder.refundInfo.amount}
                                            </Typography>
                                        </Box>

                                        <Box>
                                            <Typography variant="body2"><strong>Refund ID:</strong> {selectedOrder.refundInfo.refundId}</Typography>
                                            <Typography variant="body2"><strong>Refund Reason:</strong> {selectedOrder.refundInfo.reason}</Typography>
                                            <Typography variant="body2"><strong>Processing Speed:</strong> {selectedOrder.refundInfo.speed}</Typography>
                                            <Typography variant="body2"><strong>Initiated:</strong> {formatDate(selectedOrder.refundInfo.createdAt)}</Typography>
                                            {selectedOrder.refundInfo.processedAt && (
                                                <Typography variant="body2"><strong>Processed:</strong> {formatDate(selectedOrder.refundInfo.processedAt)}</Typography>
                                            )}
                                            {selectedOrder.refundInfo.estimatedSettlement && (
                                                <Typography variant="body2">
                                                    <strong>Expected Settlement:</strong> {formatDate(selectedOrder.refundInfo.estimatedSettlement)}
                                                    <span style={{ color: '#28a745', fontWeight: 600, fontSize: 11, marginLeft: 8 }}>
                                                        ({getEstimatedRefundDays(selectedOrder.refundInfo)})
                                                    </span>
                                                </Typography>
                                            )}
                                            {selectedOrder.refundInfo.notes && (
                                                <Typography variant="body2" mt={2}><strong>Note:</strong> {selectedOrder.refundInfo.notes}</Typography>
                                            )}
                                        </Box>
                                        {/* Refund Timeline */}
                                        <Box mt={3}>
                                            <Typography variant="subtitle1" fontWeight={600} mb={1}>Refund Timeline</Typography>
                                            <Timeline position="alternate">
                                                <TimelineItem>
                                                    <TimelineSeparator>
                                                        <TimelineDot color="primary" />
                                                        <TimelineConnector />
                                                    </TimelineSeparator>
                                                    <TimelineContent>
                                                        <strong>Refund Initiated</strong><br />
                                                        <Typography variant="caption">{formatDate(selectedOrder.refundInfo.createdAt)}</Typography>
                                                    </TimelineContent>
                                                </TimelineItem>
                                                {selectedOrder.refundInfo.processedAt && (
                                                    <TimelineItem>
                                                        <TimelineSeparator>
                                                            <TimelineDot color="success" />
                                                            <TimelineConnector />
                                                        </TimelineSeparator>
                                                        <TimelineContent>
                                                            <strong>Refund Processed</strong><br />
                                                            <Typography variant="caption">{formatDate(selectedOrder.refundInfo.processedAt)}</Typography>
                                                        </TimelineContent>
                                                    </TimelineItem>
                                                )}
                                                <TimelineItem>
                                                    <TimelineSeparator>
                                                        <TimelineDot color={selectedOrder.refundInfo.status === 'processed' ? 'info' : 'grey'} />
                                                    </TimelineSeparator>
                                                    <TimelineContent>
                                                        <strong>Amount Credited to Account</strong><br />
                                                        <Typography variant="caption">
                                                            {selectedOrder.refundInfo.estimatedSettlement
                                                                ? formatDate(selectedOrder.refundInfo.estimatedSettlement)
                                                                : 'Pending'}
                                                        </Typography>
                                                    </TimelineContent>
                                                </TimelineItem>
                                            </Timeline>
                                        </Box>
                                    </Box>
                                )}
                                {/* Items Info Section */}
                                <Box mb={2}>
                                    <Typography variant="h6" mb={2}>Items Ordered</Typography>
                                    <Box display="grid" gap={2}>
                                        {selectedOrder.items.map((item, index) => (
                                            <Box key={index} p={2} bgcolor="#fff" border={1} borderColor="divider" borderRadius={2}>
                                                <Typography variant="subtitle1">{item.name}</Typography>
                                                <Typography fontSize={13} color="text.secondary">Product ID: {item.productId}</Typography>
                                                <Box display="flex" alignItems="center" gap={2} mt={1}>
                                                    <Typography>₹{item.price} × {item.quantity}</Typography>
                                                    <Typography color="primary.main" fontWeight={600}>₹{item.price * item.quantity}</Typography>
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            </CardContent>
                        </>
                    )}
                </Box>
            </Modal>
        </Box>
    );
};

export default UserOrders;
