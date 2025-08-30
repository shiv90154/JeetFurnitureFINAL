// PolicyCenter.jsx
import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Link,
  MenuItem,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// ---------- Utils ----------
function a11yProps(index) {
  return {
    id: `policy-tab-${index}`,
    "aria-controls": `policy-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`policy-tabpanel-${index}`}
      aria-labelledby={`policy-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function ContactBlock({ company, supportEmail, phone, address }) {
  return (
    <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Contact {company}
      </Typography>
      <Stack spacing={0.5}>
        <Typography>
          Email:{" "}
          <Link href={`mailto:${supportEmail}`} underline="hover">
            {supportEmail}
          </Link>
        </Typography>
        <Typography>
          Phone:{" "}
          <Link href={`tel:${phone}`} underline="hover">
            {phone}
          </Link>
        </Typography>
        <Typography>Address: {address}</Typography>
      </Stack>
    </Paper>
  );
}

// ---------- Content: Privacy ----------
function PrivacyPolicyContent({ company, supportEmail, phone, address, lastUpdated }) {
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

      <ContactBlock {...{ company, supportEmail, phone, address }} />
    </Box>
  );
}

// ---------- Content: Shipping ----------
function ShippingPolicyContent({
  company,
  supportEmail,
  phone,
  address,
  processingTimeDays,
  lastUpdated,
}) {
  return (
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
  );
}

// ---------- Content: Cancellation & Refund ----------
function CancellationRefundPolicyContent({
  company,
  supportEmail,
  phone,
  address,
  returnsWindowDays,
  lastUpdated,
}) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Cancellation & Refund Policy
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Last updated: {lastUpdated}
      </Typography>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Order Cancellation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>You may cancel an order before it ships.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Returns</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Returns accepted within {returnsWindowDays} days in original condition.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <ContactBlock {...{ company, supportEmail, phone, address }} />
    </Box>
  );
}

// ---------- Content: Contact Us ----------
function ContactUsContent({ company, supportEmail, phone, address }) {
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    topic: "Order",
    message: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Contact form submitted:", form);
    setSubmitted(true);
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Contact Us
      </Typography>
      {submitted && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Thanks! Your message has been recorded.
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField required name="name" label="Full Name" value={form.name} onChange={handleChange} />
          <TextField required type="email" name="email" label="Email" value={form.email} onChange={handleChange} />
          <TextField select name="topic" label="Topic" value={form.topic} onChange={handleChange}>
            {["Order", "Refund", "Shipping", "Other"].map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>
          <TextField required name="message" label="Message" value={form.message} onChange={handleChange} multiline minRows={4} />
          <Button type="submit" variant="contained">
            Send
          </Button>
        </Stack>
      </Box>
      <ContactBlock {...{ company, supportEmail, phone, address }} />
    </Box>
  );
}

// ---------- Main Wrapper with Tabs ----------
export default function PolicyCenter({
  company = "Your Company",
  supportEmail = "support@example.com",
  phone = "+1 555 123 4567",
  address = "123 Main Street, City, Country",
  returnsWindowDays = 30,
  processingTimeDays = 2,
  lastUpdated = "Aug 30, 2025",
  title = "Policies",
}) {
  const tabs = [
    {
      slug: "privacy",
      label: "Privacy Policy",
      render: () => (
        <PrivacyPolicyContent {...{ company, supportEmail, phone, address, lastUpdated }} />
      ),
    },
    {
      slug: "shipping",
      label: "Shipping Policy",
      render: () => (
        <ShippingPolicyContent {...{ company, supportEmail, phone, address, processingTimeDays, lastUpdated }} />
      ),
    },
    {
      slug: "cancellation-refund",
      label: "Cancellation & Refund",
      render: () => (
        <CancellationRefundPolicyContent {...{ company, supportEmail, phone, address, returnsWindowDays, lastUpdated }} />
      ),
    },
    {
      slug: "contact",
      label: "Contact Us",
      render: () => <ContactUsContent {...{ company, supportEmail, phone, address }} />,
    },
  ];

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {title}
      </Typography>

      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        allowScrollButtonsMobile
        aria-label="Policy tabs"
      >
        {tabs.map((t, i) => (
          <Tab key={t.slug} label={t.label} {...a11yProps(i)} />
        ))}
      </Tabs>

      {tabs.map((t, i) => (
        <TabPanel key={t.slug} value={value} index={i}>
          {t.render()}
        </TabPanel>
      ))}
    </Container>
  );
}
