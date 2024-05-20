import { useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import Modal from "react-modal";
import SelectedAuthor from "../../popup/author/SelectedAuthor";
import { Pagination } from "@mui/material";
import { AuthorData } from "../../../types/types";

type FetchProps = {
  url: string;
  displayedSearchTerm: string;
};

const FetchAuthor = ({ url, displayedSearchTerm }: FetchProps) => {
  const { data, isLoading, error } = useFetch<AuthorData>(url);
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  const profileImg = selectedAuthor
    ? `http://covers.openlibrary.org/a/olid/${selectedAuthor.key}-L.jpg`
    : "";

  const handleClick = (author: AuthorData) => {
    setSelectedAuthor(author);
    setIsModalOpen(true);
    console.log(author);
  };

  const closeModal = () => {
    setSelectedAuthor(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="author-list">
        <h2>Search: "{displayedSearchTerm}"</h2>
        <div>
          {data &&
            data.slice(startIndex, endIndex).map((author, index) => (
              <div className="cover-and-bio" key={index}>
                <div className="cover">
                  <img
                    src={`http://covers.openlibrary.org/a/olid/${author.key}-M.jpg`}
                    alt={author.name}
                  ></img>
                </div>
                <div className="author-bio">
                  <h2
                    className="click-name"
                    onClick={() => handleClick(author)}
                  >
                    {author.name}
                  </h2>
                  {author.birth_date && (
                    <p>
                      <strong>Birth:</strong> {author.birth_date}
                    </p>
                  )}
                  {author.death_date && (
                    <p>
                      <strong>Death:</strong> {author.death_date}
                    </p>
                  )}
                  <p>
                    <strong>Top Work:</strong> {author.top_work}
                  </p>
                </div>
              </div>
            ))}
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
          contentLabel="Author Modal"
        >
          {selectedAuthor && (
            <SelectedAuthor
              name={selectedAuthor.name}
              birth_date={selectedAuthor.birth_date}
              death_date={selectedAuthor.death_date}
              top_work={selectedAuthor.top_work}
              work_count={selectedAuthor.work_count}
              img={profileImg}
              authorKey={selectedAuthor.key}
              closeModal={closeModal}
            />
          )}
        </Modal>
      </div>
    </>
  );
};

export default FetchAuthor;
