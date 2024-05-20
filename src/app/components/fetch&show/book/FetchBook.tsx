import React, { useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import Modal from "react-modal";
import SelectedBook from "../../popup/book/SelectedBook";
import { Pagination } from "@mui/material";
import { BookData } from "../../../types/types";

type FetchProps = {
  url: string;
  displayedSearchTerm: string;
};

const FetchBook = ({ url, displayedSearchTerm }: FetchProps) => {
  const { data, isLoading, error } = useFetch<BookData>(url);
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const franc = require("franc-min").franc;
  const alternativeImg =
    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const coverImg = selectedBook
    ? `http://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg`
    : "";

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleClick = (book: BookData) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBook(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="book-list">
        <h1>Search: "{displayedSearchTerm}"</h1>
        {data &&
          data.slice(startIndex, endIndex).map((book, index) => {
            const englishFirstSentence =
              book.first_sentence && Array.isArray(book.first_sentence)
                ? book.first_sentence.find(
                    (sentence) => franc(sentence) === "eng"
                  )
                : "";
            return (
              <div className="cover-and-info" key={index}>
                <div className="cover">
                  <img
                    className={book.cover_i ? "" : "alternative-img"}
                    src={
                      book.cover_i
                        ? `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                        : alternativeImg
                    }
                    alt={book.title}
                  ></img>
                </div>
                <div className="book-info">
                  <h2 className="click-title" onClick={() => handleClick(book)}>
                    Title: {book.title}
                  </h2>
                  <h3>
                    Author:{" "}
                    {book.author_name
                      ? book.author_name.join(" & ")
                      : "Unknown"}
                  </h3>
                  <p>
                    <strong>First Publish Year:</strong>{" "}
                    {book.first_publish_year}
                  </p>
                  {book.number_of_pages_median && (
                    <p>
                      <strong>Number of Pages:</strong>{" "}
                      {book.number_of_pages_median}
                    </p>
                  )}

                  {englishFirstSentence && (
                    <p>
                      <strong>First Sentence:</strong> {englishFirstSentence}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
      </div>
      <Pagination
        count={Math.ceil((data ? data.length : 0) / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        {selectedBook && (
          <SelectedBook
            title={selectedBook.title}
            firstPublishYear={selectedBook.first_publish_year}
            bookKey={selectedBook.key}
            author={selectedBook.author_name}
            img={coverImg}
            numberOfPages={selectedBook.number_of_pages_median}
            closeModal={closeModal}
          />
        )}
      </Modal>
    </>
  );
};

export default FetchBook;
