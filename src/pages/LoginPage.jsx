import React, { useState } from 'react';
import {
    Box, Tabs, Tab, Typography, TextField, Button,
    InputAdornment, Paper, useMediaQuery, Fade,
    Container, CircularProgress
} from '@mui/material';
import {
    Email, Lock, Person, Visibility, VisibilityOff,
    LocationOn, Store, Security
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../commonComponents/AxiosInstance';
import { toast, ToastContainer } from 'react-toastify';

// New Color Palette
const COLORS = {
    primary: '#003B78',
    secondary: '#FF6A00',
    accent: '#C18A46',
    backgroundLight: '#FFFFFF',
    backgroundDark: '#1E1E1E',
    textDark: '#222222',
    textLight: '#F5F5F5',
    success: '#2E7D32',
    error: '#D32F2F',
    warning: '#ED6C02'
};

const themeColors = {
    background: COLORS.backgroundLight,
    accent: COLORS.primary,
    glass: "rgba(255,255,255,0.85)",
    input: "rgba(255,255,255,0.9)",
    lightTint: "#F0F7FF",
    tabInactive: "#90A4AE",
};

const fieldStyles = {
    inputSx: {
        background: themeColors.input,
        color: COLORS.textDark,
        borderRadius: 3,
        boxShadow: "0 2px 12px 0 rgba(0, 59, 120, 0.08)",
        '& input': { 
            color: COLORS.textDark,
            fontSize: '16px', // Better for mobile
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: themeColors.tabInactive,
            borderWidth: 1.5,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: COLORS.primary,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: COLORS.primary + " !important",
            borderWidth: 2,
        },
    },
    labelSx: {
        color: COLORS.textDark + " !important",
        fontWeight: 500,
        '&.Mui-focused': {
            color: COLORS.primary + " !important",
        }
    }
};

export default function LoginPage() {
    const [mode, setMode] = useState("login");
    const matches = useMediaQuery("(max-width:600px)");
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [signupData, setSignupData] = useState({ name: '', email: '', password: '', phone: '' });
    const [formError, setFormError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validateInputs = () => {
        const email = mode === "login" ? loginData.email : signupData.email;
        const password = mode === "login" ? loginData.password : signupData.password;
        if (!email || !password) return "Please fill in all required fields.";
        if (!validateEmail(email)) return "Please enter a valid email address.";
        if (password.length < 6) return "Password must be at least 6 characters.";
        if (mode === "signup" && !signupData.name) return "Name is required.";
        if (mode === "signup" && signupData.phone && signupData.phone.length !== 10) return "Phone number must be 10 digits.";
        return "";
    };

    const handleTabChange = (_ev, newValue) => {
        setMode(newValue);
        setFormError("");
        setOtpSent(false);
        setOtp('');
        setOtpError('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (otpSent && name === 'email' && mode === "signup") return;
        if (mode === "login") {
            setLoginData({ ...loginData, [name]: value });
        } else {
            setSignupData({ ...signupData, [name]: value });
        }
        setFormError("");
        setOtpError('');
    };

    // Check if email exists before sending OTP for signup
    const checkEmailExists = async (email) => {
        try {
            const res = await axiosInstance.get('/admin/exists', { params: { email } });
            return res.data.exists;
        } catch {
            return false;
        }
    };

    // Send OTP (only for signup)
    const sendOtpForSignup = async () => {
        if (!validateEmail(signupData.email)) {
            setFormError("Please enter a valid email address.");
            return;
        }

        const alreadyExists = await checkEmailExists(signupData.email);
        if (alreadyExists) {
            setFormError("Email is already registered. Please login.");
            return;
        }

        setIsLoading(true);
        setFormError("");
        try {
            const res = await axiosInstance.post('/api/send-otp', { email: signupData.email });
            toast.success(res.data.message || "OTP sent to your email.");
            setOtpSent(true);
        } catch (error) {
            setFormError(error.response?.data?.message || 'Failed to send OTP.');
            setOtpSent(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Verify OTP (only for signup)
    const verifyOtpForSignup = async () => {
        if (otp.length !== 6) {
            setOtpError("OTP must be 6 digits.");
            return false;
        }
        setIsLoading(true);
        setOtpError('');
        try {
            const res = await axiosInstance.post('/api/verify-otp', { email: signupData.email, otp });
            toast.success(res.data.message || "OTP verified successfully.");
            setOtpError('');
            return true;
        } catch (error) {
            setOtpError(error.response?.data?.message || 'OTP verification failed.');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Submit signup after OTP verified
    const finalizeSignup = async () => {
        try {
            const response = await axiosInstance.post('/admin/createAdmin', signupData);
            if (response.status === 201 || response.status === 200) {
                toast.success("Signup successful! Please login.");
                setSignupData({ name: '', email: '', password: '', phone: '' });
                setOtpSent(false);
                setOtp('');
                setMode('login');
            }
        } catch (error) {
            setFormError(error.response?.data?.message || 'Signup error.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");
        if (mode === "login") {
            const err = validateInputs();
            if (err) {
                setFormError(err);
                return;
            }
            setIsLoading(true);
            try {
                const loginResponse = await axiosInstance.post('/admin/login', { 
                    email: loginData.email, 
                    password: loginData.password 
                });
                if (loginResponse.status === 200) {
                    localStorage.setItem('authToken', loginResponse.data.token);
                    localStorage.setItem('userData', JSON.stringify(loginResponse.data.data));
                    toast.success("Login successful!");
                    navigate('/');
                }
            } catch (error) {
                setFormError(error.response?.data?.message || 'Login failed. Please check your credentials.');
            } finally {
                setIsLoading(false);
            }
        } else {
            if (!otpSent) {
                const err = validateInputs();
                if (err) {
                    setFormError(err);
                    return;
                }
                await sendOtpForSignup();
            } else {
                if (!otp) {
                    setOtpError("Please enter the OTP sent to your email.");
                    return;
                }
                const isVerified = await verifyOtpForSignup();
                if (isVerified) {
                    await finalizeSignup();
                }
            }
        }
    };

    return (
        <Box sx={{ 
            background: `linear-gradient(135deg, ${COLORS.primary}15 0%, ${COLORS.backgroundLight} 50%, ${COLORS.secondary}08 100%)`, 
            minHeight: '100vh',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontFamily: '"Inter", "Roboto", sans-serif',
            py: 5,
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background decorative elements */}
            <Box sx={{
                position: 'absolute',
                top: -100,
                right: -100,
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${COLORS.primary}15 0%, transparent 70%)`,
                zIndex: 0
            }} />
            <Box sx={{
                position: 'absolute',
                bottom: -50,
                left: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${COLORS.secondary}10 0%, transparent 70%)`,
                zIndex: 0
            }} />

            <ToastContainer 
                position="top-right" 
                autoClose={3000} 
                hideProgressBar={false}
                toastStyle={{
                    borderRadius: '12px',
                    fontFamily: '"Inter", sans-serif'
                }}
            />
            
            <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
                <Paper elevation={24} sx={{ 
                    borderRadius: 4, 
                    px: matches ? 3 : 6, 
                    py: matches ? 3 : 5, 
                    background: themeColors.glass, 
                    boxShadow: '0 20px 60px 0 rgba(0, 59, 120, 0.15), 0 4px 20px 0 rgba(0, 59, 120, 0.08)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '0 25px 80px 0 rgba(0, 59, 120, 0.2), 0 6px 25px 0 rgba(0, 59, 120, 0.12)',
                    }
                }}>
                    {/* Header Section */}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="h4" sx={{ 
                            fontWeight: 700, 
                            fontFamily: '"Poppins", "Inter", sans-serif', 
                            color: COLORS.primary, 
                            mb: 1,
                            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 4px 20px rgba(0, 59, 120, 0.15)'
                        }}>
                            {mode === "login" ? "Welcome Back" : "Create Account"}
                        </Typography>
                        <Typography variant="body1" sx={{ 
                            color: COLORS.textDark,
                            opacity: 0.7,
                            fontSize: '16px'
                        }}>
                            {mode === "login" ? "Sign in to your account" : "Join us today"}
                        </Typography>
                    </Box>

                    {/* Tabs */}
                    <Tabs 
                        value={mode} 
                        onChange={handleTabChange} 
                        centered 
                        TabIndicatorProps={{ 
                            style: { 
                                background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
                                borderRadius: 4, 
                                height: 4 
                            } 
                        }} 
                        sx={{ 
                            mb: 4,
                            '& .MuiTab-root': {
                                fontWeight: 600,
                                fontSize: '16px',
                                textTransform: 'none',
                                color: themeColors.tabInactive,
                                minWidth: 'auto',
                                px: 3,
                                '&.Mui-selected': {
                                    color: COLORS.primary,
                                }
                            }
                        }}
                    >
                        <Tab label="Sign In" value="login" />
                        <Tab label="Sign Up" value="signup" />
                    </Tabs>

                    {/* Error Message */}
                    <Fade in={Boolean(formError)}>
                        <Typography color="error" sx={{ 
                            fontSize: 14, 
                            textAlign: "center", 
                            mb: 2,
                            p: 2,
                            borderRadius: 2,
                            backgroundColor: `${COLORS.error}08`,
                            border: `1px solid ${COLORS.error}20`,
                            fontWeight: 500
                        }}>
                            {formError}
                        </Typography>
                    </Fade>

                    {/* Form */}
                    <Box component="form" autoComplete="off" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {/* Signup Fields */}
                        {mode === "signup" && !otpSent && (
                            <>
                                <TextField
                                    label="Full Name"
                                    name="name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    value={signupData.name}
                                    onChange={handleChange}
                                    InputProps={{ 
                                        startAdornment: <InputAdornment position="start"><Person sx={{ color: COLORS.primary }} /></InputAdornment>, 
                                        sx: fieldStyles.inputSx 
                                    }}
                                    InputLabelProps={{ sx: fieldStyles.labelSx }}
                                    placeholder="Enter your full name"
                                />
                                <TextField
                                    label="Phone Number"
                                    fullWidth
                                    value={signupData.phone}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                        setSignupData((p) => ({ ...p, phone: val }));
                                    }}
                                    inputProps={{ maxLength: 10 }}
                                    InputProps={{ 
                                        startAdornment: <InputAdornment position="start">+91</InputAdornment>, 
                                        sx: fieldStyles.inputSx 
                                    }}
                                    InputLabelProps={{ sx: fieldStyles.labelSx }}
                                    placeholder="10-digit mobile number"
                                />
                            </>
                        )}

                        {/* Email Field */}
                        <TextField
                            label="Email Address"
                            name="email"
                            type="email"
                            variant="outlined"
                            required
                            fullWidth
                            value={mode === "login" ? loginData.email : signupData.email}
                            onChange={handleChange}
                            disabled={otpSent && mode === "signup"}
                            InputProps={{ 
                                startAdornment: <InputAdornment position="start"><Email sx={{ color: COLORS.primary }} /></InputAdornment>, 
                                sx: fieldStyles.inputSx 
                            }}
                            InputLabelProps={{ sx: fieldStyles.labelSx }}
                            placeholder="your@email.com"
                        />

                        {/* Password Field */}
                        {!otpSent && (
                            <TextField
                                label="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                required
                                fullWidth
                                value={mode === "login" ? loginData.password : signupData.password}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><Lock sx={{ color: COLORS.primary }} /></InputAdornment>,
                                    endAdornment: (
                                        <InputAdornment position="end" sx={{ cursor: 'pointer' }} onClick={togglePasswordVisibility}>
                                            {showPassword ? 
                                                <VisibilityOff sx={{ color: COLORS.primary }} /> : 
                                                <Visibility sx={{ color: COLORS.primary }} />
                                            }
                                        </InputAdornment>
                                    ),
                                    sx: fieldStyles.inputSx
                                }}
                                InputLabelProps={{ sx: fieldStyles.labelSx }}
                                placeholder="At least 6 characters"
                            />
                        )}

                        {/* OTP Section for Signup */}
                        {mode === "signup" && otpSent && (
                            <>
                                <Box sx={{ 
                                    p: 3, 
                                    borderRadius: 3, 
                                    backgroundColor: `${COLORS.primary}08`,
                                    border: `1px solid ${COLORS.primary}20`
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                        <Security sx={{ color: COLORS.primary }} />
                                        <Typography variant="h6" sx={{ color: COLORS.primary, fontWeight: 600 }}>
                                            Verify Your Email
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" sx={{ color: COLORS.textDark, mb: 3, opacity: 0.8 }}>
                                        We've sent a 6-digit verification code to <strong>{signupData.email}</strong>
                                    </Typography>
                                    
                                    <TextField
                                        label="Enter OTP Code"
                                        name="otp"
                                        type="text"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        value={otp}
                                        onChange={(e) => { 
                                            const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                            setOtp(value); 
                                            setOtpError(''); 
                                        }}
                                        error={Boolean(otpError)}
                                        helperText={otpError}
                                        InputProps={{ sx: fieldStyles.inputSx }}
                                        InputLabelProps={{ sx: fieldStyles.labelSx }}
                                        inputProps={{ maxLength: 6 }}
                                        placeholder="000000"
                                    />
                                    
                                    <Button 
                                        type="submit" 
                                        disabled={otp.length !== 6 || isLoading} 
                                        variant="contained" 
                                        fullWidth
                                        sx={{ 
                                            mt: 2,
                                            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                                            color: COLORS.textLight,
                                            fontWeight: 600,
                                            fontSize: '16px',
                                            py: 1.5,
                                            borderRadius: 3,
                                            boxShadow: `0 4px 15px 0 ${COLORS.primary}40`,
                                            '&:hover': {
                                                background: `linear-gradient(135deg, ${COLORS.primary}E0, ${COLORS.secondary}E0)`,
                                                boxShadow: `0 6px 20px 0 ${COLORS.primary}60`,
                                            },
                                            '&:disabled': {
                                                background: `${COLORS.textDark}20`,
                                                color: `${COLORS.textDark}60`
                                            }
                                        }}
                                    >
                                        {isLoading ? <CircularProgress size={24} sx={{ color: 'inherit' }} /> : "Verify OTP"}
                                    </Button>
                                    
                                    <Typography 
                                        sx={{ 
                                            textAlign: "center", 
                                            color: COLORS.primary, 
                                            fontSize: 14, 
                                            mt: 2, 
                                            cursor: 'pointer',
                                            fontWeight: 500,
                                            '&:hover': {
                                                textDecoration: 'underline'
                                            }
                                        }} 
                                        onClick={() => {
                                            setOtpSent(false);
                                            setOtp('');
                                            setFormError('');
                                            setOtpError('');
                                        }}
                                    >
                                        Resend OTP
                                    </Typography>
                                </Box>
                            </>
                        )}

                        {/* Submit Button */}
                        {!otpSent && (
                            <Button 
                                type="submit" 
                                variant="contained" 
                                fullWidth 
                                disabled={isLoading}
                                sx={{ 
                                    mt: 1,
                                    background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                                    color: COLORS.textLight,
                                    fontWeight: 700,
                                    fontSize: '18px',
                                    py: 1.8,
                                    borderRadius: 3,
                                    boxShadow: `0 6px 20px 0 ${COLORS.primary}40`,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        background: `linear-gradient(135deg, ${COLORS.primary}E0, ${COLORS.secondary}E0)`,
                                        boxShadow: `0 8px 25px 0 ${COLORS.primary}60`,
                                        transform: 'translateY(-2px)'
                                    },
                                    '&:active': {
                                        transform: 'translateY(0)'
                                    },
                                    '&:disabled': {
                                        background: `${COLORS.textDark}20`,
                                        color: `${COLORS.textDark}60`,
                                        transform: 'none',
                                        boxShadow: 'none'
                                    }
                                }}
                            >
                                {isLoading ? (
                                    <CircularProgress size={28} sx={{ color: 'inherit' }} />
                                ) : mode === "login" ? (
                                    "Sign In"
                                ) : (
                                    "Create Account"
                                )}
                            </Button>
                        )}
                    </Box>

                    {/* Footer Links */}
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        {mode === "login" ? (
                            <Typography sx={{ 
                                color: COLORS.textDark,
                                fontSize: 15,
                                opacity: 0.7,
                                '& span': {
                                    color: COLORS.primary,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }
                            }}>
                                Don't have an account? <span onClick={() => setMode('signup')}>Sign up now</span>
                            </Typography>
                        ) : !otpSent && (
                            <Typography sx={{ 
                                color: COLORS.textDark,
                                fontSize: 15,
                                opacity: 0.7,
                                '& span': {
                                    color: COLORS.primary,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }
                            }}>
                                Already have an account? <span onClick={() => setMode('login')}>Sign in</span>
                            </Typography>
                        )}
                    </Box>

                    {/* Security Note */}
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: 1, 
                        mt: 4,
                        pt: 3,
                        borderTop: `1px solid ${COLORS.primary}15`
                    }}>
                        <Security sx={{ fontSize: 16, color: COLORS.primary, opacity: 0.7 }} />
                        <Typography variant="caption" sx={{ color: COLORS.textDark, opacity: 0.6 }}>
                            Your data is securely encrypted
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}