import useFetchSingle from "@/hooks/useFetchSingle";
import { useDispatch, useSelector } from "react-redux";
import { addFavBook } from "@/app/state/favBook/favBookSlice";
import { RootState } from "@/app/state/store";
import { addReadBook } from "@/app/state/readBook/readBookSlice";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

type Description = {
  description: string | { value: string };
};

type SelectedBookProps = {
  bookKey: string;
  author: string[];
  img: string;
  title: string;
  firstPublishYear: number;
  numberOfPages: number;
  closeModal: () => void;
};

const SelectedBook = ({
  bookKey,
  author,
  img,
  title,
  firstPublishYear,
  numberOfPages,
  closeModal,
}: SelectedBookProps) => {
  const {
    data: bookData,
    isLoading: bookLoading,
    error: bookError,
  } = useFetchSingle<Description>(`https://openlibrary.org${bookKey}.json`);

  const favBooks = useSelector((state: RootState) => state.favBook.value);
  const readBooks = useSelector((state: RootState) => state.readBook.value);
  const dispatch = useDispatch();

  const isFavBook = favBooks.some((book) => book.key === bookKey);
  const isReadBook = readBooks.some((book) => book.key === bookKey);

  return (
    <>
      {bookLoading && <div>Loading...</div>}
      {bookError && <div>{bookError}</div>}
      {bookData && (
        <div className="modal-book">
          <div className="top-box">
            <div className="title-box">
              <h1>{title}</h1>
              <p>
                <strong>Author:</strong> {author.join(", ")}
              </p>
              <p>
                <strong>First publish year:</strong> {firstPublishYear}
              </p>
              <p>
                <strong>Number of pages: </strong>
                {numberOfPages}
              </p>
              <img src={img} alt={title} />
            </div>
            <div className="button-box">
              <Button
                variant="contained"
                disableRipple
                onClick={() => {
                  if (!favBooks.some((book) => book.key === bookKey)) {
                    const smallImg = img.replace("-L", "-S");
                    dispatch(
                      addFavBook({
                        key: bookKey,
                        title: title,
                        author: author.join(", "),
                        img: smallImg,
                      })
                    );
                  }
                }}
                style={{
                  backgroundColor: isFavBook ? "rgb(192, 233, 176)" : undefined,
                }}
              >
                <span>
                  {isFavBook ? "Added to favorites!" : "Add to favorite"}
                </span>
              </Button>

              <Button
                variant="contained"
                disableRipple
                onClick={() => {
                  if (!readBooks.some((book) => book.key === bookKey)) {
                    const smallImg = img.replace("-L", "-S");
                    dispatch(
                      addReadBook({
                        key: bookKey,
                        title: title,
                        author: author.join(", "),
                        number_of_pages_median: numberOfPages,
                        img: smallImg,
                      })
                    );
                  }
                }}
                style={{
                  backgroundColor: isReadBook
                    ? "rgb(192, 233, 176)"
                    : undefined,
                }}
              >
                <span>{isReadBook ? "Already read!" : "Mark as read"}</span>
              </Button>
            </div>
          </div>
          <p className="bio">
            <h2>Bio</h2>
            {typeof bookData.description === "object"
              ? bookData.description.value
              : bookData.description}
          </p>
          <Button
            className="close-button"
            aria-label="close"
            onClick={closeModal}
          >
            <CloseIcon />
          </Button>
        </div>
      )}
    </>
  );
};

export default SelectedBook;
