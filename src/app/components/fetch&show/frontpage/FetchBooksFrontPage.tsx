import React from "react";
import FetchBooksByGenre from "./fetchBooksByGenre/FetchBooksByGenre";

const FetchBookFrontPage = () => {
  return (
    <>
      <h1 className="title-page">Home</h1>
      <div className="showing-books">
        <FetchBooksByGenre genre="love" count={7} />
        <FetchBooksByGenre genre="crime" count={7} />
        <FetchBooksByGenre genre="horror" count={7} />
      </div>
    </>
  );
};

export default FetchBookFrontPage;
