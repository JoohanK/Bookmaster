import React, { useState } from "react";
import FetchBook from "../fetch&show/book/FetchBook";
import FetchAuthor from "../fetch&show/author/FetchAuthor";
import SearchTypeSelect from "../select/SearchTypeSelect";
import { SelectChangeEvent } from "@mui/material";
import Button from "@mui/material/Button";

const Search = () => {
  const [searchType, setSearchType] = useState<string>("book");
  const [searchResult, setSearchResult] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [displayedSearchTerm, setDisplayedSearchTerm] = useState<string>("");

  const handleSearchTypeChange = (e: SelectChangeEvent<string>) => {
    setSearchType(e.target.value as string);
    setSearchResult("");
  };

  const handleSearch = () => {
    const url =
      searchType === "book"
        ? `https://openlibrary.org/search.json?q=${searchTerm}`
        : `https://openlibrary.org/search/authors.json?q=${searchTerm}`;
    setSearchResult(url);
    setDisplayedSearchTerm(searchTerm);
    setSearchTerm("");
  };

  return (
    <>
      <h1 className="title-page">Search</h1>
      <div className="search-list">
        <div className="search-items">
          <SearchTypeSelect
            searchType={searchType}
            handleSearchTypeChange={handleSearchTypeChange}
          />
          <input
            type="text"
            placeholder="Enter book or author"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="contained" onClick={handleSearch} disableRipple>
            <span>Search</span>
          </Button>
        </div>
        {searchResult && searchType === "book" && (
          <FetchBook url={searchResult} searchTerm={displayedSearchTerm} />
        )}
        {searchResult && searchType === "author" && (
          <FetchAuthor url={searchResult} searchTerm={displayedSearchTerm} />
        )}
      </div>
    </>
  );
};

export default Search;