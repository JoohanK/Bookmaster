type Book = {
  rating?: number | null;
};

const CalculateAverageRating = (books: Book[]) => {
  const numberOfRatingsGiven = books.filter((book) => book.rating).length;
  return (
    Math.round(
      (books.reduce((sum, book) => sum + (book.rating || 0), 0) /
        numberOfRatingsGiven) *
        10
    ) / 10
  );
};

export default CalculateAverageRating;
