export const SIDENAV_TABS = [
  { key: "category", label: "Category" },
  { key: "price", label: "Price Range" },
  { key: "occasion", label: "Occasion" },
  { key: "gender", label: "Gender" },
];

export const PRICE_RANGES = [
  {
    img: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw20b368e1/header-mega-menu/banner-images/all-jew-below-25k-hr.jpg",
    name: "Under ₹25K"
  },
  {
    img: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw20b368e1/header-mega-menu/banner-images/all-jew-below-25k-hr.jpg",
    name: "₹25K-₹50K"
  },
  {
    img: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw20b368e1/header-mega-menu/banner-images/all-jew-below-25k-hr.jpg",
    name: "₹50K-₹1L"
  },
  {
    img: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw20b368e1/header-mega-menu/banner-images/all-jew-below-25k-hr.jpg",
    name: "Over ₹1L"
  },
];

export const GENDERS = [
  {
    img: "https://plus.unsplash.com/premium_photo-1674498704099-bdd05f6fc274?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmVtYWxlJTIwamV3ZWxsZXJ5JTIwbW9kZWx8ZW58MHx8MHx8fDA%3D",
    name: "Women"
  },
  {
    img: "https://images.unsplash.com/photo-1728949687207-e92da7b5538a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1hbGUlMjBqZXdlbGxlcnklMjBtb2RlbHxlbnwwfHwwfHx8MA%3D%3D",
    name: "Men"
  },
  {
    img: "https://images.unsplash.com/photo-1589128657906-cf6813f7eeed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHVuaXNleCUyMGpld2VsbGVyeXxlbnwwfHwwfHx8MA%3D%3D",
    name: "Unisex"
  },
];

// API endpoints
export const API_ENDPOINTS = {
  SUBCATEGORIES: "/user/allSubcategories",
  OCCASIONS: "/user/allOccasions"
};

// Responsive breakpoints for grid columns
export const GRID_BREAKPOINTS = {
  XL: 6,
  LG: 5,
  DEFAULT: 4
};
