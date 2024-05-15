import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import { removeFavBook } from "@/app/state/favBook/favBookSlice";
import { Button } from "@mui/material";

const FavBook = () => {
  const favBooks = useSelector((state: RootState) => state.favBook.value);
  const dispatch = useDispatch();

  return (
    <>
      <div className="favorite-books">
        <h1>Books</h1>
        <ul>
          {favBooks.map((book) => (
            <li key={book.key}>
              <h2>{book.title}</h2>
              <p>{book.author}</p>
              <div className="button-position">
                <img src={book.img} alt={book.title} />

                <Button
                  variant="contained"
                  disableRipple
                  onClick={() => dispatch(removeFavBook(book.key))}
                >
                  <span>Remove</span>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FavBook;
