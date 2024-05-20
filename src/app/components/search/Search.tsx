import React, { useState } from "react";
import FetchBook from "../fetch&show/book/FetchBook";
import FetchAuthor from "../fetch&show/author/FetchAuthor";
import SearchTypeSelect from "../select/SearchTypeSelect";
import Button from "@mui/material/Button";

const Search = () => {
  const [searchType, setSearchType] = useState<string>("book");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string>("");
  const [displayedSearchTerm, setDisplayedSearchTerm] = useState<string>("");

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
            setSearchType={setSearchType}
            setSearchResult={setSearchResult}
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
          <FetchBook
            url={searchResult}
            displayedSearchTerm={displayedSearchTerm}
          />
        )}
        {searchResult && searchType === "author" && (
          <FetchAuthor
            url={searchResult}
            displayedSearchTerm={displayedSearchTerm}
          />
        )}
      </div>
    </>
  );
};

export default Search;
