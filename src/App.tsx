import React from "react";
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";
import { useUsers, type User } from "./hooks/useUsers";

const App = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useUsers();

  const { ref: sentinelRef, rootRef } = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>Error fetching data</p>;

  return (
    <div
      className="flex items-center justify-center h-screen w-full bg-gray-200"
      ref={rootRef}
    >
      <ul className="w-full max-w-md max-h-[300px] overflow-auto border-2 border-blue-500 rounded-lg shadow p-4 bg-white ">
        {data.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.results.map((user: User, index: number) => (
              <li
                key={index}
                className="p-4 mb-3 border-2 border-green-400 rounded-md "
              >
                <p className="font-medium text-center">
                  {user.name.first} {user.name.last}
                </p>
              </li>
            ))}
          </React.Fragment>
        ))}
        <li className="trigger" ref={sentinelRef}>
          <p className="text-center mt-4 text-sm text-gray-500">
            {hasNextPage ? "Loading more..." : ""}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default App;
