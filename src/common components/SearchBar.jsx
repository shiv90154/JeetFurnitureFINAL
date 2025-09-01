import React, { useEffect, useRef, useState } from "react";
import { Box, InputBase, Typography, styled, alpha } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./AxiosInstance";

const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "25px",
  backgroundColor: alpha("#000", 0.15),
  border: "1px solid rgba(255, 255, 255, 0.3)",
  "&:hover": {
    backgroundColor: alpha("#000", 0.25),
  },
  width: "100%",
  minWidth: "300px",
  maxWidth: "800px",
  [theme.breakpoints.down("md")]: {
    borderRadius: "18px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#fff",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: theme.spacing(2),
    fontSize: "14px",
    "&::placeholder": {
      color: "rgba(255, 255, 255, 0.7)",
      opacity: 1,
    },
  },
}));

const SuggestionsBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "55px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1300,
  maxHeight: "320px",
  width: "100%",
  maxWidth: "520px",
  borderRadius: 2,
  boxShadow: "0 6px 24px rgba(44,19,14,0.12)",
  backgroundColor: "#fff",
  padding: 0,
  marginTop: 8,
  border: "1px solid #eee",
  overflowY: "auto",
}));

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const searchBoxRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() !== "") {
        axiosInstance
          .get(`/user/search?query=${encodeURIComponent(query)}`)
          .then((res) => setResults(res.data.results))
          .catch(() => setResults([]));
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (productId) => {
    navigate(`/singleProduct/${productId}`);
    setIsOpen(false);
  };

  return (
    <Box sx={{ flex: 1, px: 2, display: "flex", justifyContent: "center", position: "relative" }} ref={searchBoxRef}>
      <SearchContainer>
        <SearchIconWrapper>
          <SearchIcon sx={{ fontSize: "20px" }} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search for Gold Jewellery, Diamond Jewellery and more..."
          inputProps={{ "aria-label": "search" }}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && results.length > 0) {
              handleSuggestionClick(results[0]._id);
            }
          }}
        />
      </SearchContainer>

      {isOpen && query.trim() !== "" && results.length > 0 && (
        <SuggestionsBox ref={suggestionsRef}>
          {results.map((product, idx) => (
            <Box
              key={product._id}
              onClick={() => handleSuggestionClick(product._id)}
              sx={{
                px: 2,
                py: 1.2,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                bgcolor: idx === 0 ? "rgba(68,23,13,0.07)" : "transparent",
                "&:hover": { bgcolor: "rgba(68,23,13,0.13)" },
                borderBottom: idx === results.length - 1 ? "none" : "1px solid #f7f4f2",
                fontWeight: 500,
                fontSize: "15px",
                color: "#44170D",
                textTransform: "capitalize",
              }}
            >
              {product.name}
            </Box>
          ))}
        </SuggestionsBox>
      )}
    </Box>
  );
}
