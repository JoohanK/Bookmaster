import React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type SearchTypeSelectProps = {
  searchType: string;
  handleSearchTypeChange: (event: SelectChangeEvent<string>) => void;
};

const SearchTypeSelect = ({
  searchType,
  handleSearchTypeChange,
}: SearchTypeSelectProps) => (
  <FormControl fullWidth>
    <InputLabel id="search-type-label">Search Type</InputLabel>
    <Select
      labelId="search-type-label"
      id="search-type"
      value={searchType}
      label="Search Type"
      onChange={handleSearchTypeChange}
    >
      <MenuItem value="book">Book</MenuItem>
      <MenuItem value="author">Author</MenuItem>
    </Select>
  </FormControl>
);

export default SearchTypeSelect;
