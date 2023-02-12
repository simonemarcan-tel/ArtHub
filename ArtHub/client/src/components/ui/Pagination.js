import { Pagination as MUIPagination } from "@mui/material";

export function Pagination({ listingsPerPage, totalListings, currentPage, setCurrentPage }) {
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <MUIPagination
      count={Math.ceil(totalListings / listingsPerPage)}
      page={currentPage}
      onChange={handleChange}
    />
  );
}
