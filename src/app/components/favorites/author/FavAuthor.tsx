import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import { removeFavAuthor } from "@/app/state/favAuthor/favAuthorSlice";
import { Button } from "@mui/material";

const FavBook = () => {
  const favBooks = useSelector((state: RootState) => state.favAuthor.value);
  const dispatch = useDispatch();

  return (
    <>
      <div className="favorite-authors">
        <h1>Authors</h1>
        <ul>
          {favBooks.map((author) => (
            <li key={author.key}>
              <h2>{author.name}</h2>
              <div className="button-position">
                <img src={author.img} alt={author.name} />
                <Button
                  variant="contained"
                  disableRipple
                  onClick={() => dispatch(removeFavAuthor(author.key))}
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
