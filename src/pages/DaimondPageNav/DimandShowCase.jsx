import React from 'react'
import { Box } from '@mui/material'
import DiamondSliderThree from './DiamondSliderThree'
import DiamondSliderTwo from './DiamondSliderTwo'
import DiamondSlider from './DiamondSlider'
import DiamondSliderOne from './DiamondSliderOne'


const DimandShowCase = () => {
    return (
        <Box sx={{
            overflowX: 'hidden',
            backgroundColor: '#ffffff', // White background
            minHeight: '100vh',
            margin: 0,
            padding: 0
        }}>

            <DiamondSliderThree />
            {/* <DiamondSliderTwo /> */}
            <DiamondSlider />
            {/* <DiamondSliderOne /> */}

        </Box>
    )
}

export default DimandShowCase