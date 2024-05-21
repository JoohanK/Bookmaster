export type favAuthorState = {
  value: { key: string; name: string; img: string; work_count: number }[];
};

export type favBookState = {
  value: { key: string; title: string; author: string; img: string }[];
};

export type ReadBookState = {
  value: {
    key: string;
    title: string;
    author: string;
    img: string;
    number_of_pages_median: number;
    review?: string;
    rating?: number | null;
  }[];
};

export type BookData = {
  title: string;
  author_name: string[];
  first_publish_year: number;
  key: string;
  number_of_pages_median: number;
  cover_i: number;
  first_sentence: string[];
  reviews?: string;
  rating?: number;
};

export type AuthorData = {
  key: string;
  name: string;
  birth_date: string;
  death_date: string;
  top_work: string;
  work_count: number;
};
