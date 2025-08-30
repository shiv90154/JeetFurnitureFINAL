import React from 'react'

const ShippingPolicy = () => {
  return (
    <div>
       <Box>
      <Typography variant="h5" gutterBottom>
        Shipping Policy
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Last updated: {lastUpdated}
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Orders are processed within {processingTimeDays} business days.
      </Typography>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Shipping Methods</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Standard & expedited options are available at checkout.</Typography>
        </AccordionDetails>
      </Accordion>

      <ContactBlock {...{ company, supportEmail, phone, address }} />
    </Box>
    </div>
  )
}

export default ShippingPolicy
