import useFetchSingle from "@/hooks/useFetchSingle";
import React, { useEffect, useState } from "react";

type FetchBooksByGenreProps = {
  genre: string;
  count: number;
};

//hämta böcker efter genre
const FetchBooksByGenre = ({ genre, count }: FetchBooksByGenreProps) => {
  const { data, isLoading, error } = useFetchSingle<{ works: any[] }>(
    `https://openlibrary.org/subjects/${genre}.json`
  );
  const [books, setBooks] = useState<any[]>([]);

  //använder boknyckeln för att hämta cover_i
  useEffect(() => {
    if (data) {
      Promise.all(
        data.works.slice(0, count).map((book) =>
          fetch(`https://openlibrary.org${book.key}.json`)
            .then((response) => response.json())
            .then((bookData) => ({ ...book, cover_id: bookData.covers[0] }))
        )
      ).then(setBooks);
    }
  }, [data]);

  if (error) return <div>{error}</div>;
  if (!books) return null;

  return (
    <div className="showing-genre">
      <h1 className="genre-text">{genre}</h1>
      <ul>
        {books.map((book) => (
          <li key={book.key}>
            <h2>{book.title}</h2>
            <p>Author: {book.authors[0].name}</p>
            {book.cover_id && (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
                alt={book.title}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchBooksByGenre;
