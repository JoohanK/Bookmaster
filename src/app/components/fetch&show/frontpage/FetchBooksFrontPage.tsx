import React from "react";
import FetchBooksByGenre from "./fetchBooksByGenre/FetchBooksByGenre";

const FetchBookFrontPage = () => {
  return (
    <>
      <h1 className="title-page">Home</h1>
      <div className="showing-books">
        <FetchBooksByGenre genre="love" count={5} />
        <FetchBooksByGenre genre="crime" count={5} />
        <FetchBooksByGenre genre="horror" count={5} />
      </div>
    </>
  );
};

export default FetchBookFrontPage;
