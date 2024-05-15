"use client";

import { useState, useEffect } from "react";

type ApiResponse<T> = {
  start: number;
  numFound: number;
  numFoundExact?: boolean;
  docs: T[];
};

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return response.json();
      })
      .then((responseData: ApiResponse<T>) => {
        setIsLoading(false);
        setData(responseData.docs);
        setError(null);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
