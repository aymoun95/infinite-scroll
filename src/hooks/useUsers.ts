import { useInfiniteQuery } from "@tanstack/react-query";

export type User = {
  name: {
    first: string;
    last: string;
  };
};

type PaginatedUsers = {
  results: User[];
};
const fetchUsers = async (pageParam: number): Promise<PaginatedUsers> => {
  const res = await fetch(
    `https://randomuser.me/api/?page=${pageParam}&results=10`
  );
  return res.json();
};

export const useUsers = () => {
  return useInfiniteQuery<PaginatedUsers>({
    queryKey: ["users"],
    queryFn: ({ pageParam }) => fetchUsers(pageParam as number),
    getNextPageParam: (_, allPages) => {
      if (allPages.length >= 5) return undefined; // Stop after 5 pages
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
};
