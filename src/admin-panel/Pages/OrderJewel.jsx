// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../../common components/AxiosInstance';
// import {
//   Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Typography, CircularProgress, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions,
//   Divider, Grid, TablePagination, MenuItem, Select, FormControl, InputLabel
// } from '@mui/material';
// import { Receipt, LocalShipping, CheckCircle, Pending, Cancel } from '@mui/icons-material';
// import { styled } from '@mui/material/styles';

// const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
//   marginTop: theme.spacing(3),
//   boxShadow: theme.shadows[3],
//   borderRadius: theme.shape.borderRadius,
// }));

// const StatusChip = styled(Chip)(({ theme, status }) => ({
//   fontWeight: 600,
//   backgroundColor:
//     status === 'Delivered' ? theme.palette.success.light
//       : status === 'Pending' ? theme.palette.warning.light
//         : status === 'Cancelled' ? theme.palette.error.light
//           : theme.palette.info.light,
//   color:
//     status === 'Delivered' ? theme.palette.success.dark
//       : status === 'Pending' ? theme.palette.warning.dark
//         : status === 'Cancelled' ? theme.palette.error.dark
//           : theme.palette.info.dark,
// }));

// const OrderJewel = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [updating, setUpdating] = useState(false);
//   const [statusValue, setStatusValue] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get('/api/orders');
//         // const response = await axiosInstance.patch(`/api/orders/${selectedOrder._id}/status`, { status: newStatus });

//         setOrders(response.data.orders);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//       setLoading(false);
//     };
//     fetchData();
//   }, []);

//   const handleViewOrder = (order) => {
//     setSelectedOrder(order);
//     setStatusValue(order.status);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedOrder(null);
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'Delivered': return <CheckCircle />;
//       case 'Pending': return <Pending />;
//       case 'Cancelled': return <Cancel />;
//       default: return <LocalShipping />;
//     }
//   };

//   // Pagination
//   const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };
//   const currentOrders = orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   // Handle status update
//   const handleStatusChange = async (event) => {
//     const newStatus = event.target.value;
//     setStatusValue(newStatus);
//     if (!selectedOrder) return;
//     setUpdating(true);
//     try {
//       await axiosInstance.patch(`/api/orders/${selectedOrder._id}/status`, { status: newStatus });
//       setOrders(orders =>
//         orders.map(order =>
//           order._id === selectedOrder._id ? { ...order, status: newStatus } : order
//         )
//       );
//       setSelectedOrder({ ...selectedOrder, status: newStatus });
//     } catch (err) {
//       alert('Status update failed. Try again.');
//     }
//     setUpdating(false);
//   };


//   return (
//     <Container maxWidth="xl">
//       <Box sx={{ my: 4 }}>
//         <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'text.primary', mb: 4 }}>
//           Orders
//         </Typography>
//         {loading ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <StyledTableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: (theme) => theme.palette.primary.main }}>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Product ID</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Quantity</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Payment ID</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {currentOrders.map((order) =>
//                   order.items.map((item) => (
//                     <TableRow key={`${order._id}-${item.productId}`} hover>
//                       <TableCell>{item.productId}</TableCell>
//                       <TableCell>{item.name}</TableCell>
//                       <TableCell>₹{item.price}</TableCell>
//                       <TableCell>{item.quantity}</TableCell>
//                       <TableCell>{order.paymentId || 'N/A'}</TableCell>
//                       <TableCell>
//                         <StatusChip
//                           icon={getStatusIcon(order.status)}
//                           label={order.status}
//                           status={order.status}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Button
//                           variant="outlined"
//                           size="small"
//                           onClick={() => handleViewOrder(order)}
//                         >
//                           View
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//             <TablePagination
//               rowsPerPageOptions={[10, 20, 30]}
//               component="div"
//               count={orders.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//               sx={{
//                 backgroundColor: '#f5f5f5',
//                 borderBottomLeftRadius: '8px',
//                 borderBottomRightRadius: '8px',
//                 width: "100%" 
//               }}
//             />
//           </StyledTableContainer>
//         )}
//       </Box>

//       {/* Order Details Dialog - Enhanced with Address, Phone, Status Edit */}
//       <Dialog
//         open={openDialog}
//         onClose={handleCloseDialog}
//         maxWidth="sm"
//         fullWidth
//       >
//         {selectedOrder && (
//           <>
//             <DialogTitle>
//               <Typography sx={{ fontWeight: 'bold',fontSize: '1.5rem' }} >Order Details</Typography>
//             </DialogTitle>
//             <DialogContent dividers>
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
//                     Order Information
//                   </Typography>
//                   <Divider sx={{ mb: 2 }} />
//                   <div><strong>Status:</strong>
//                     <FormControl sx={{ ml: 1, width: 160 }} size="small">
//                       <InputLabel>Status</InputLabel>
//                       <Select
//                         label="Status"
//                         value={statusValue}
//                         onChange={handleStatusChange}
//                         disabled={updating}
//                       >
//                         <MenuItem value="Pending">Pending</MenuItem>
//                         <MenuItem value="Delivered">Delivered</MenuItem>
//                         <MenuItem value="Cancelled">Cancelled</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </div>
//                   <Typography><strong>Payment ID:</strong> {selectedOrder.paymentId || 'N/A'}</Typography>
//                   <Typography><strong>Address:</strong> {selectedOrder.address}</Typography>
//                   <Typography><strong>Phone:</strong> {selectedOrder.phone}</Typography>
//                   <Typography><strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}</Typography>
//                   <Typography><strong>Created At:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</Typography>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
//                     Items in this Order
//                   </Typography>
//                   <Divider sx={{ mb: 2 }} />
//                   {selectedOrder.items.map((item, index) => (
//                     <Box key={index} sx={{ mb: 2, p: 1, border: '1px solid #eee', borderRadius: 1 }}>
//                       <Typography><strong>Product ID:</strong> {item.productId}</Typography>
//                       <Typography><strong>Name:</strong> {item.name}</Typography>
//                       <Typography><strong>Price:</strong> ₹{item.price}</Typography>
//                       <Typography><strong>Quantity:</strong> {item.quantity}</Typography>
//                     </Box>
//                   ))}
//                 </Grid>
//               </Grid>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCloseDialog} color="primary">Close</Button>
//             </DialogActions>
//           </>
//         )}
//       </Dialog>
//     </Container>
//   );
// };

// export default OrderJewel;


// // 2:
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../common components/AxiosInstance';
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Chip,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Divider,
  Grid,
  TablePagination,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(3),
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 600,
  backgroundColor:
    status === 'delivered' ? theme.palette.success.light :
      status === 'pending' ? theme.palette.warning.light :
        status === 'cancelled' ? theme.palette.error.light :
          status === 'refunded' ? theme.palette.info.light :
            status === 'captured' || status === 'paid' ? theme.palette.success.light :
              status === 'failed' ? theme.palette.error.light :
                status === 'processed' ? theme.palette.success.light :
                  theme.palette.grey.light,
  color:
    status === 'delivered' ? theme.palette.success.dark :
      status === 'pending' ? theme.palette.warning.dark :
        status === 'cancelled' ? theme.palette.error.dark :
          status === 'refunded' ? theme.palette.info.dark :
            status === 'captured' || status === 'paid' ? theme.palette.success.dark :
              status === 'failed' ? theme.palette.error.dark :
                status === 'processed' ? theme.palette.success.dark :
                  theme.palette.grey.dark,
}));

const statusOptions = ['Pending', 'Delivered', 'Cancelled'];

const OrderJewel = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/api/orders');
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const currentOrders = orders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const updateOrderStatus = async (orderId, newStatus) => {
    if (newStatus === 'Cancelled') {
      setOrderToCancel(orderId);
      setShowCancelDialog(true);
      return;
    }

    setUpdatingStatusId(orderId);
    try {
      const response = await axiosInstance.put(`/api/orders/${orderId}/status`, {
        status: newStatus,
      });

      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert("Failed to update order status. Please try again.");
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const confirmCancelOrder = async () => {
    if (!orderToCancel) return;

    setUpdatingStatusId(orderToCancel);
    try {
      const response = await axiosInstance.put(`/api/orders/${orderToCancel}/status`, {
        status: 'Cancelled',
        cancelReason: cancelReason || 'Cancelled by admin'
      });

      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderToCancel ? {
            ...order,
            status: 'Cancelled',
            cancelReason: cancelReason || 'Cancelled by admin',
            cancelledAt: new Date()
          } : order
        )
      );

      // Show success message about refund
      alert(`Order cancelled successfully! ${response.data.refundProcessed ? 'Automatic refund has been initiated.' : 'No refund needed.'}`);

      // Refresh data to get updated refund info
      fetchData();

    } catch (error) {
      console.error("Failed to cancel order:", error);
      alert("Failed to cancel order. Please try again.");
    } finally {
      setUpdatingStatusId(null);
      setShowCancelDialog(false);
      setOrderToCancel(null);
      setCancelReason('');
    }
  };

  const processManualRefund = async (orderId, amount) => {
    try {
      const response = await axiosInstance.post(`/api/orders/${orderId}/refund`, {
        amount,
        reason: 'Manual refund by admin',
        speed: 'optimum'
      });

      alert('Refund processed successfully!');
      fetchData(); // Refresh data
    } catch (error) {
      console.error("Failed to process refund:", error);
      alert("Failed to process refund. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRefundStatusText = (refundInfo) => {
    if (!refundInfo) return 'No Refund';

    const status = refundInfo.status;
    if (status === 'processed') return 'Refund Processed';
    if (status === 'failed') return 'Refund Failed';
    if (status === 'pending') return 'Refund Pending';
    return `Refund ${status}`;
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" className='fontSize25sml' gutterBottom sx={{ fontWeight: 'bold' }}>
          Orders Management
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <StyledTableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: (theme) => theme.palette.primary.main }}>
                  {/* <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Product ID</TableCell> */}
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Quantity</TableCell>
                  {/* <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Payment ID</TableCell> */}
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Order Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Payment Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Refund Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentOrders.map((order) => {
                  const items = order.items || [];

                  return items.map((item, index) => (
                    <TableRow key={`${order._id}-${item.productId}-${index}`} hover>
                      {/* <TableCell>{item.productId}</TableCell> */}
                      <TableCell>{item.name}</TableCell>

                      {index === 0 && (
                        <TableCell rowSpan={items.length}>₹{order.totalAmount}</TableCell>
                      )}

                      <TableCell>{item.quantity}</TableCell>

                      {/* {index === 0 && (
                        <TableCell rowSpan={items.length}>
                          {order.paymentInfo?.paymentId || 'N/A'}
                        </TableCell>
                      )} */}

                      {index === 0 && (
                        <TableCell rowSpan={items.length}>
                          <select
                            value={order.status}
                            disabled={updatingStatusId === order._id}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          >
                            {statusOptions.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </TableCell>
                      )}
                      {/* payment status */}
                      {index === 0 && (
                        <TableCell rowSpan={items.length}>
                          <StatusChip
                            label={order.paymentInfo?.status === 'captured' ? 'Paid' : (order.paymentInfo?.status || 'Unknown')}
                            status={order.paymentInfo?.status?.toLowerCase() || 'unknown'}
                            size="small"
                            sx={{ minWidth: '80px', textAlign: 'center' }}
                          />
                        </TableCell>
                      )}

                      {index === 0 && (
                        <TableCell rowSpan={items.length}>
                          <StatusChip
                            label={getRefundStatusText(order.refundInfo)}
                            status={order.refundInfo?.status?.toLowerCase() || 'none'}
                            size="small"
                            sx={{ minWidth: '100px', textAlign: 'center' }}
                          />
                        </TableCell>
                      )}

                      {index === 0 && (
                        <TableCell rowSpan={items.length}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleViewOrder(order)}
                            >
                              View Details
                            </Button>
                            {order.paymentInfo?.status === 'captured' &&
                              order.status !== 'Cancelled' &&
                              !order.refundInfo?.refundId && (
                                <Button
                                  variant="outlined"
                                  color="warning"
                                  size="small"
                                  onClick={() => processManualRefund(order._id, order.totalAmount)}
                                >
                                  Process Refund
                                </Button>
                              )}
                          </Box>
                        </TableCell>
                      )}
                    </TableRow>
                  ));
                })}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                backgroundColor: '#f5f5f5',
                borderBottomLeftRadius: '8px',
                borderBottomRightRadius: '8px',
              }}
            />
          </StyledTableContainer>
        )}
      </Box>
      {/* Order Details Dialog - Simplified to match your data structure */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        {selectedOrder && (
          <>
            <div>
              <Typography variant="h6" sx={{ padding: 2 }}>Order Details</Typography>
            </div>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Order Information
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <><strong>Status:</strong>
                    <StatusChip
                      label={selectedOrder.status}
                      status={selectedOrder.status}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </>
                  <Typography><strong>Payment ID:</strong> {selectedOrder.paymentInfo?.paymentId || 'N/A'}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Items in this Order
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  {selectedOrder.items.map((item, index) => (
                    <Box key={index} sx={{ mb: 2, p: 1, border: '1px solid #eee', borderRadius: 1 }}>
                      <Typography><strong>Product ID:</strong> {item.productId}</Typography>
                      <Typography><strong>Name:</strong> {item.name}</Typography>
                      <Typography><strong>Price:</strong> ₹{item.price}</Typography>
                      <Typography><strong>Quantity:</strong> {item.quantity}</Typography>
                    </Box>
                  ))}
                  <Typography><strong>Date:</strong> {selectedOrder.createdAt}</Typography>
                  <Typography><strong>Phone:</strong> {selectedOrder.phone}</Typography>
                  <Typography><strong>Address:</strong> {selectedOrder.address}</Typography>
                  <Typography><strong>Razorpay Order ID:</strong> {selectedOrder.razorpayOrderId}</Typography>
                  <Typography><strong>User ID:</strong> {selectedOrder.userId}</Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default OrderJewel;