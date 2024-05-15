"use client";

import FavBook from "../components/favorites/book/FavBook";
import FavAuthor from "../components/favorites/author/FavAuthor";

export default function Page() {
  return (
    <>
      <div className="h1-page">
        <h1 className="title-page">Favorites</h1>
      </div>
      <div className="favorite-box">
        <FavBook />
        <FavAuthor />
      </div>
    </>
  );
}
