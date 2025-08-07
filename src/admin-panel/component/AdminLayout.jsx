// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import { Menu } from 'lucide-react';
// // import '../pharma.css';
// import SidebarJewel from './SidebarJewel';

// const AdminLayout = () => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//     return (
//         <div className="pharmaAdminContainer">
//             <div className="mobileHeader">
//                 <Menu onClick={() => setIsSidebarOpen(true)} size={24} />
//             </div>

//             <div className={`pharmaSidebar ${isSidebarOpen ? 'open' : ''}`}>
//                 <SidebarJewel onClose={() => setIsSidebarOpen(false)} />
//             </div>

//             <div className="pharmaAdminContent">
//                 <Outlet />
//             </div>
//         </div>
//     );
// };

// export default AdminLayout;


import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Box, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import SidebarJewel from './SidebarJewel';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const theme = useTheme();

    // Check if screen width < 760px for mobileHeader and sidebar behavior
    const isMobile = useMediaQuery('(max-width:760px)');

    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                position: 'relative',
            }}
        >
            {/* Mobile Header with Menu */}
            {isMobile && (
                <Box
                    sx={{
                        p: 1.25, // 10px
                        color: '#68171b',
                        position: 'sticky',
                        top: 0,
                        zIndex: 999,
                        display: 'flex',
                        justifyContent: 'space-around',
                        bgcolor: 'background.paper', // optional contrast bg on sticky header
                    }}
                >
                    <Menu onClick={() => setIsSidebarOpen(true)} size={24} style={{ cursor: 'pointer' }} />
                </Box>
            )}

            {/* Sidebar */}
            <Box
                component="aside"
                sx={{
                    width: 260,
                    transition: 'transform 0.3s ease',
                    zIndex: 1000,
                    bgcolor: 'background.paper',
                    // On mobile: fixed position with slide-in/out
                    ...(isMobile
                        ? {
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            height: '100%',
                            transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
                            boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)',
                        }
                        : {
                            position: 'static',
                            transform: 'none',
                            height: 'auto',
                            boxShadow: 'none',
                        }),
                }}
            >
                <SidebarJewel onClose={() => setIsSidebarOpen(false)} />
            </Box>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: isMobile ? 1.25 : 3, // 10px on mobile, 24px otherwise
                    overflowX: 'auto',
                    width: isMobile ? '100%' : 'auto',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default AdminLayout;


