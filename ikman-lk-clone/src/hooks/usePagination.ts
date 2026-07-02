import { useState, useCallback } from 'react';

export const usePagination = (perPage = 20) => {
  const [page, setPage] = useState(1);

  const goTo = useCallback((p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const reset = useCallback(() => setPage(1), []);

  const totalPages = (total: number) => Math.ceil(total / perPage);

  return { page, perPage, goTo, reset, totalPages };
};
