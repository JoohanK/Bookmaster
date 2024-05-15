import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import CalculateTotalPagesRead from "../../../utils/CalculateTotalPagesRead";
import {
  removeReadBook,
  addReview,
  removeReview,
} from "@/app/state/readBook/readBookSlice";
import { useEffect, useRef, useState } from "react";
import { Button, Rating } from "@mui/material";
import CalculateAverageRating from "@/utils/CalulateAverageRating";
import { ReadBookState } from "../../types/types";

const ReadBook = () => {
  const readBooks = useSelector((state: RootState) => state.readBook.value);
  const dispatch = useDispatch();
  const [inputRating, setInputRating] = useState<number | null>(null);
  const [selectedBook, setSelectedBook] = useState<
    ReadBookState["value"][0] | null
  >({ ...readBooks[0], img: readBooks[0]?.img.replace("-S", "-M") } || null);
  const reviewInput = useRef<HTMLInputElement>(null);
  const ratingInput = useRef<HTMLInputElement>(null);

  const totalPagesRead = CalculateTotalPagesRead(readBooks);
  const numberOfBooksRead = readBooks.length;
  const numberOfReviewsWritten = readBooks.filter((book) => book.review).length;
  const numberOfRatingsGiven = readBooks.filter((book) => book.rating).length;
  const averagePagesPerBook =
    numberOfBooksRead > 0
      ? Math.round(totalPagesRead / numberOfBooksRead)
      : null;
  const averageRating = CalculateAverageRating(readBooks);

  useEffect(() => {
    if (reviewInput.current) reviewInput.current.value = "";
    if (ratingInput.current) ratingInput.current.value = "";
  }, [selectedBook]);

  const handleClick = () => {
    const newReview = reviewInput.current?.value;
    if (selectedBook) {
      dispatch(
        addReview({
          key: selectedBook.key,
          review: newReview,
          rating: inputRating,
        })
      );
      if (newReview !== undefined || inputRating !== null) {
        setSelectedBook({
          ...selectedBook,
          review: newReview,
          rating: inputRating,
        });
      }
    }
    if (reviewInput.current) reviewInput.current.value = "";
    setInputRating(null);
  };

  return (
    <>
      <h1 className="title-page">Read & Review</h1>
      <div className="agg-data-box">
        <div>
          <h4>Pages read</h4> <br />
          {totalPagesRead}
        </div>
        <div>
          <h4>Books read</h4>
          <br />
          {numberOfBooksRead}
        </div>
        <div>
          <h4>Reviews</h4>
          <br />
          {numberOfReviewsWritten}
        </div>
        <div>
          <h4>Ratings</h4>
          <br />
          {numberOfRatingsGiven}
        </div>
        <div>
          <h4>Average pages</h4>
          <br />
          {averagePagesPerBook}
        </div>
        <div>
          <h4>Average rating</h4>
          <br />
          {isNaN(averageRating) ? null : averageRating}
        </div>
      </div>
      <div className="read-and-review-box">
        <div className="read-box">
          <h1>Read Books</h1>
          <ul>
            {readBooks.map((book) => (
              <li
                key={book.key}
                onClick={() => {
                  const mediumImg = book.img.replace("-S", "-M");
                  setSelectedBook({ ...book, img: mediumImg });
                }}
              >
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <br />
                <div className="button-position">
                  <img src={book.img} alt={book.title} />
                  <div className="remove-buttons">
                    <Button
                      variant="contained"
                      disableRipple
                      onClick={() => {
                        setSelectedBook(null);
                        dispatch(removeReview(book.key));
                      }}
                    >
                      Remove review
                    </Button>
                    <Button
                      variant="contained"
                      disableRipple
                      onClick={() => dispatch(removeReadBook(book.key))}
                    >
                      <span>Delete</span>
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="review-box">
          <h1>Reviews</h1>
          {selectedBook && (
            <div>
              <h2>{selectedBook.title}</h2>
              <div className="img-position">
                <img src={selectedBook.img} alt={selectedBook.title} />
              </div>
              <form>
                <input
                  type="text"
                  ref={reviewInput}
                  defaultValue={selectedBook.review || ""}
                  placeholder="Add review"
                />
                <Rating
                  name="book-rating"
                  value={inputRating || 0}
                  onChange={(event, newValue) => {
                    setInputRating(newValue);
                  }}
                />
                <Button variant="contained" disableRipple onClick={handleClick}>
                  <span>SAVE REVIEW</span>
                </Button>
              </form>
              <div className="saved-reviews">
                <h3>Saved Review</h3>
                <p>{selectedBook.review}</p>
                {selectedBook.rating ? (
                  <Rating
                    name="read-only-rating"
                    value={selectedBook.rating || 0}
                    readOnly
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReadBook;
