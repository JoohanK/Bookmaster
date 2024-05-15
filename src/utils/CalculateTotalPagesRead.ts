const CalculateTotalPagesRead = (
  books: { number_of_pages_median: number }[]
) => {
  return books.reduce(
    (total, book) =>
      total +
      (Number.isFinite(book.number_of_pages_median)
        ? book.number_of_pages_median
        : 0),
    0
  );
};

export default CalculateTotalPagesRead;
