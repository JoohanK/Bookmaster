import React from "react";
import useFetchSingle from "../../../../hooks/useFetchSingle";
import { useDispatch, useSelector } from "react-redux";
import { addFavAuthor } from "@/app/state/favAuthor/favAuthorSlice";
import { RootState } from "@/app/state/store";
import Button from "@mui/material/Button";

import CloseIcon from "@mui/icons-material/Close";

type Bio = {
  bio: string | { value: string };
};

type SelectedAuthorProps = {
  name: string;
  birth_date: string;
  death_date: string;
  top_work: string;
  img: string;
  work_count: number;
  authorKey: string;
  closeModal: () => void;
};

const SelectedAuthor = ({
  name,
  birth_date,
  death_date,
  top_work,
  work_count,
  img,
  authorKey,
  closeModal,
}: SelectedAuthorProps) => {
  const {
    data: authorData,
    isLoading: authorLoading,
    error: authorError,
  } = useFetchSingle<Bio>(`https://openlibrary.org/authors/${authorKey}.json`);

  const favAuthor = useSelector((state: RootState) => state.favAuthor.value);
  const dispatch = useDispatch();

  const isFavAuthor = favAuthor.some((author) => author.key === authorKey);

  return (
    <div className="modal-author">
      <Button className="close-button" aria-label="close" onClick={closeModal}>
        <CloseIcon />
      </Button>
      {authorLoading && <div>Loading...</div>}
      {authorError && <div>{authorError}</div>}
      {authorData && (
        <div className="popup-modal">
          <div className="name-and-button">
            <div className="bio-name">
              <h1>{name}</h1>

              <p>
                <strong>Birth:</strong> {birth_date}
              </p>
              <p>
                <strong>Death:</strong> {death_date}
              </p>

              <p>
                <span className="bot-info">Top Work: </span>
                {top_work}
              </p>

              <p>
                <span className="bot-info">Work Count: </span>
                {work_count}
              </p>
              <br />
            </div>
            <div className="favorite-button">
              <Button
                variant="contained"
                disableRipple
                onClick={() => {
                  if (!favAuthor.some((author) => author.key === authorKey)) {
                    const smallImg = img.replace("-L", "-S");
                    dispatch(
                      addFavAuthor({
                        key: authorKey,
                        name: name,
                        work_count: work_count,
                        img: smallImg,
                      })
                    );
                  }
                }}
                style={{
                  backgroundColor: isFavAuthor
                    ? "rgb(192, 233, 176)"
                    : undefined,
                }}
              >
                <span>
                  {isFavAuthor ? "Added to favorites!" : "Add to favorite"}
                </span>
              </Button>
            </div>
          </div>

          <img src={img} alt={name} />

          <p>
            <h2>Bio</h2>
            {typeof authorData.bio === "object"
              ? authorData.bio.value
              : authorData.bio}
          </p>
          <br />
        </div>
      )}
    </div>
  );
};

export default SelectedAuthor;
