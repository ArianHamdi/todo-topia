import { useRouter as useNextRouter } from 'next/router';
import { useEffect, useState } from 'react';

/**
 * Custom useRouter hook to preserve the router query during page transitions in Next.js.
 *
 * Implementation:
 * 1. Utilizes `useRouter` from '@/hooks/useRouter' to get the router object.
 * 2. Initializes a local state `query` with the router query using `useState`.
 * 3. Uses `useEffect` to set `query` once when the component mounts.
 * 4. Returns an object that spreads the original router object, overriding the `query` property with the local `query` state.
 *
 * This ensures the router query is retained across page transitions without causing any issues as we remount pages when asPath changes.
 *
 */

export const useRouter = () => {
  const router = useNextRouter();
  const [query, setQuery] = useState(router.query);

  useEffect(() => {
    setQuery(router.query);
  }, []);

  return {
    ...router,
    query,
  };
};
