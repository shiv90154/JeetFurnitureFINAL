import React from 'react'

const PrivacyPolicy = () => {
    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Privacy Policy
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                Last updated: {lastUpdated}
            </Typography>
            <Typography sx={{ mb: 2 }}>
                This Privacy Policy explains how {company} collects, uses, and safeguards your
                information.
            </Typography>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Information We Collect</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        • Account data (name, email, phone) <br />
                        • Order details <br />
                        • Payment tokens (handled by payment partners) <br />
                        • Device and usage data (cookies, analytics).
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>How We Use Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        To fulfill orders, provide support, personalize content, prevent fraud, and comply with
                        laws.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {/* <ContactBlock {...{ company, supportEmail, phone, address }} /> */}
        </Box>
    )
}

export default PrivacyPolicy
