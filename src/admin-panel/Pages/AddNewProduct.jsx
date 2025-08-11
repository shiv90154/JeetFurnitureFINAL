import React, { useEffect, useState, useRef } from 'react';
import axiosInstance from '../../common components/AxiosInstance';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Stack,
  IconButton,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddNewProduct = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    media: [],
    retail_price: '',
    consumer_price: '',
    discount: '',
    mrp: '',
    gst: '',
    stock: 'yes',
    quantity: [],
    category: '',
    productvariety: '',
    sub_category: '',
    expires_on: '',
    created_at: new Date().toISOString(),
    deleted_at: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const categoriesResponse = await axiosInstance.get('/user/allcategories');
        setCategoryList(categoriesResponse.data);

        if (isEditMode) {
          const productResponse = await axiosInstance.get(`/user/product/${id}`);
          const product = productResponse.data;

          if (product.category) {
            const subCategoryResponse = await axiosInstance.get(
              `/user/allSubcategories?category=${encodeURIComponent(product.category)}`
            );
            setSubCategoryList(subCategoryResponse.data);
          }

          setFormData({
            ...product,
            expires_on: product.expires_on?.split('T')[0] || '',
            media: (product.media || []).map(m => ({
              ...m,
              url: m.url.startsWith('http') ? m.url : `${m.url}`,
              type: m.type.includes('video') ? 'video' : 'image',
              file: null,
            })),
            quantity: Array.isArray(product.quantity)
              ? product.quantity
              : typeof product.quantity === 'string' && product.quantity.length > 0
                ? [product.quantity]
                : [],
            stock: (product.stock ?? '').toLowerCase().trim() === 'no' ? 'no' : 'yes',
          });
        }
      } catch (error) {
        console.error('Error during initialization:', error);
      }
    };
    init();
  }, [id, isEditMode]);

  const fetchSubCategories = async category => {
    try {
      const response = await axiosInstance.get(
        `/user/allSubcategories?category=${encodeURIComponent(category)}`
      );
      setSubCategoryList(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      const mrp = parseFloat(updated.mrp);
      const discount = parseFloat(updated.discount);
      const gst = parseFloat(updated.gst);

      let discountedPrice = 0;
      if (!isNaN(mrp) && !isNaN(discount)) {
        discountedPrice = mrp - (mrp * discount) / 100;
      }

      if (!isNaN(gst) && gst > 0) {
        updated.consumer_price = (discountedPrice + (discountedPrice * gst) / 100).toFixed(2);
      } else {
        updated.consumer_price = discountedPrice > 0 ? discountedPrice.toFixed(2) : '';
      }

      if (name === 'category') {
        updated.sub_category = '';
        fetchSubCategories(value);
      }

      return updated;
    });
  };

  const handleMediaChange = e => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    Promise.all(
      files.map(
        file =>
          new Promise(resolve => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve({
                url: reader.result,
                type: file.type.startsWith('video') ? 'video' : 'image',
                name: file.name,
                size: file.size,
                file,
              });
            };
            reader.readAsDataURL(file);
          })
      )
    ).then(newMedia => {
      setFormData(prev => ({ ...prev, media: [...prev.media, ...newMedia] }));
    });
  };

  const removeMedia = index => {
    setFormData(prev => {
      const updated = [...prev.media];
      updated.splice(index, 1);
      return { ...prev, media: updated };
    });
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
      fileInputRef.current.click();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'name',
      'description',
      'retail_price',
      'consumer_price',
      'quantity',
      'category',
      'expires_on',
      'dosage',
      'productvariety',
    ];

    requiredFields.forEach(field => {
      if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        newErrors[field] = `${field.replace('_', ' ')} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'media') return;
        if (Array.isArray(value)) {
          value.forEach(val => formPayload.append(`${key}[]`, val));
        } else if (value !== null && value !== undefined) {
          formPayload.append(key, value);
        }
      });
      formData.media.forEach(item => {
        if (item?.file) formPayload.append('media', item.file);
        else formPayload.append('existingMedia', item.url);
      });

      if (isEditMode) {
        await axiosInstance.put(`/user/updateProduct/${id}`, formPayload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Product updated successfully!');
      } else {
        await axiosInstance.post('/user/createProduct', formPayload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Product added successfully!');
      }
      navigate('/pharma-admin/products');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submit Error:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      description: '',
      media: [],
      retail_price: '',
      consumer_price: '',
      discount: '',
      mrp: '',
      gst: '',
      stock: 'yes',
      quantity: [],
      category: '',
      productvariety: '',
      sub_category: '',
      expires_on: '',
      created_at: new Date().toISOString(),
      deleted_at: null,
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const handleQuantityChange = (index, value) => {
    setFormData(prev => {
      const newQuantities = [...prev.quantity];
      newQuantities[index] = value;
      return { ...prev, quantity: newQuantities };
    });
  };

  const addQuantityField = () => {
    setFormData(prev => ({
      ...prev,
      quantity: [...prev.quantity, ''],
    }));
  };

  const removeQuantityField = index => {
    setFormData(prev => {
      const newQuantities = [...prev.quantity];
      newQuantities.splice(index, 1);
      return { ...prev, quantity: newQuantities };
    });
  };

  const formatFileSize = bytes => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / 1048576).toFixed(2)} MB`;
  };

  return (
    <Box maxWidth="1000px" mx="auto" p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">{isEditMode ? 'Edit Product' : 'Add New Product'}</Typography>
        <Button variant="outlined" onClick={() => navigate('/pharma-admin/products')}>
          Cancel
        </Button>
      </Box>

      {isSubmitted ? (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" mb={2} color="success.main">
            Product submitted successfully!
          </Typography>
          <Button variant="contained" onClick={handleReset}>
            Add Another Product
          </Button>
        </Box>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {/* Basic Information */}
          <Box mb={4}>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
            <Box display="flex" gap={2} mb={2}>
              {/* Product Name Input */}
              <TextField
                label="Product Name *"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                error={!!errors.name}
                helperText={errors.name}
                required
              />

              {/* Add Media Button and Help Text */}
              <Box flex={1} display="flex" flexDirection="column" justifyContent="flex-end">
                <input
                  multiple
                  accept="image/*,video/*"
                  ref={fileInputRef}
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleMediaChange}
                />
                <Button
                  variant="contained"
                  fullWidth
                  onClick={triggerFileInput}
                  sx={{ mb: 0.5 }}
                >
                  Add Media
                </Button>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  textAlign="center"
                  sx={{ minHeight: 18 }}
                >
                  Supports JPG, PNG, GIF, MP4 (Max 10MB each)
                </Typography>
                {/* This next Typography is always shown when no media is uploaded */}
                {formData.media.length === 0 && (
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    textAlign="center"
                    sx={{ minHeight: 18 }}
                  >
                    No media selected
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Media Preview: ONLY displayed if media.length > 0. Each shown on a card row with X. */}
            {formData.media.length > 0 && (
              <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
                {formData.media.map((media, index) => (
                  <Card
                    key={index}
                    sx={{
                      maxWidth: 150,
                      minWidth: 120,
                      position: 'relative',
                      p: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {media.type === 'video' ? (
                      <CardMedia
                        component="video"
                        controls
                        src={media.url}
                        sx={{ height: 100, width: '100%' }}
                      />
                    ) : (
                      <CardMedia
                        component="img"
                        image={media.url}
                        alt={`Media preview ${index}`}
                        sx={{ height: 100, objectFit: 'cover', width: '100%' }}
                      />
                    )}
                    <IconButton
                      aria-label="Remove media"
                      onClick={() => removeMedia(index)}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 2,
                        right: 2,
                        bgcolor: 'rgba(255,255,255,0.7)',
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                    <CardContent sx={{ p: 1, pb: '8px!important' }}>
                      <Typography variant="body2" noWrap>
                        {media.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary" noWrap>
                        {formatFileSize(media.size)}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}

            <TextField
              label="Description *"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              minRows={3}
              fullWidth
              error={!!errors.description}
              helperText={errors.description}
              required
              sx={{ mt: 2 }}
            />
          </Box>


          {/* Pricing Information */}
          <Box mb={4}>
            <Typography variant="h6" gutterBottom>
              Pricing Information
            </Typography>
            <Box display="flex" gap={2} mb={2}>
              <TextField
                label="MRP"
                name="mrp"
                type="number"
                value={formData.mrp}
                onChange={handleChange}
                placeholder="Enter maximum retail price"
                inputProps={{ min: 0, step: 0.01 }}
                fullWidth
              />
              <TextField
                label="Discount (%)"
                name="discount"
                type="number"
                value={formData.discount}
                onChange={handleChange}
                placeholder="Enter discount percentage"
                inputProps={{ min: 0, max: 100 }}
                fullWidth
              />
              <TextField
                label="Discounted Price"
                name="consumer_price"
                type="number"
                value={formData.consumer_price}
                InputProps={{ readOnly: true }}
                placeholder="Calculated consumer price"
                fullWidth
              />
            </Box>

            <Box display="flex" gap={2} mb={2}>
              <TextField
                label="GST"
                name="gst"
                type="number"
                value={formData.gst}
                onChange={handleChange}
                placeholder="Enter GST %"
                inputProps={{ min: 0, step: 0.01 }}
                fullWidth
              />
              <TextField
                label="WholesalePartner Price (MRP) *"
                name="retail_price"
                type="number"
                value={formData.retail_price}
                onChange={handleChange}
                placeholder="Enter retail price"
                inputProps={{ min: 0, step: 0.01 }}
                error={!!errors.retail_price}
                helperText={errors.retail_price}
                fullWidth
                required
              />
              {/* Empty box to keep last row consistent width */}
              <Box flex={1} />
            </Box>

            <Box display="flex" gap={2} alignItems="flex-start">
              <Box flex={1}>
                <Typography variant="subtitle1" gutterBottom>
                  Quantities *
                </Typography>
                {formData.quantity.length === 0 && (
                  <Typography variant="caption" color="textSecondary" gutterBottom>
                    No quantities added yet. Click 'Add Quantity' to start.
                  </Typography>
                )}
                <Stack spacing={1}>
                  {formData.quantity.map((qty, idx) => (
                    <Box key={idx} display="flex" alignItems="center">
                      <TextField
                        placeholder="Enter quantity"
                        value={qty}
                        onChange={e => handleQuantityChange(idx, e.target.value)}
                        fullWidth
                        size="small"
                      />
                      <IconButton
                        color="error"
                        aria-label="Remove quantity"
                        onClick={() => removeQuantityField(idx)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button variant="contained" color="success" onClick={addQuantityField}>
                    Add Quantity
                  </Button>
                  {errors.quantity && <FormHelperText error>{errors.quantity}</FormHelperText>}
                </Stack>
              </Box>

              <Box flex={1}>
                <FormControl fullWidth>
                  <InputLabel id="stock-label">Stock</InputLabel>
                  <Select
                    labelId="stock-label"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    label="Stock"
                  >
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>

          {/* Category Information */}
          <Box mb={4}>
            <Typography variant="h6" gutterBottom>
              Category Information
            </Typography>
            <Box display="flex" gap={2}>
              <FormControl fullWidth required error={!!errors.productvariety}>
                <InputLabel id="variety-label">Variety *</InputLabel>
                <Select
                  labelId="variety-label"
                  name="productvariety"
                  value={formData.productvariety}
                  onChange={e => {
                    const selectedVariety = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      productvariety: selectedVariety,
                      category: '',
                      sub_category: '',
                    }));
                  }}
                  label="Variety *"
                >
                  <MenuItem value="">
                    <em>Select Variety</em>
                  </MenuItem>
                  <MenuItem value="Human">Human</MenuItem>
                  <MenuItem value="Veterinary">Veterinary</MenuItem>
                </Select>
                {errors.productvariety && <FormHelperText>{errors.productvariety}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth required error={!!errors.category}>
                <InputLabel id="category-label">Category *</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label="Category *"
                >
                  <MenuItem value="">
                    <em>Select Category</em>
                  </MenuItem>
                  {categoryList
                    .filter(cat => cat.variety === formData.productvariety)
                    .map((sub, idx) => (
                      <MenuItem key={idx} value={sub.name}>
                        {sub.name}
                      </MenuItem>
                    ))}
                </Select>
                {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth error={!!errors.sub_category}>
                <InputLabel id="subcategory-label">Sub Category</InputLabel>
                <Select
                  labelId="subcategory-label"
                  name="sub_category"
                  value={formData.sub_category}
                  onChange={handleChange}
                  label="Sub Category"
                >
                  <MenuItem value="">
                    <em>Select subcategory</em>
                  </MenuItem>
                  {subCategoryList.map((sub, idx) => (
                    <MenuItem key={idx} value={sub.name}>
                      {sub.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.sub_category && <FormHelperText>{errors.sub_category}</FormHelperText>}
              </FormControl>
              {/* Spacer Box to keep flex aligned */}
              <Box flex={1} />
            </Box>
          </Box>

          {/* Form actions */}
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="contained" color="primary" type="submit">
              {isEditMode ? 'Update Product' : 'Submit Product'}
            </Button>
          </Stack>
        </form>
      )}
    </Box>
  );
};

export default AddNewProduct;
