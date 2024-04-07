'use client';

import { Fragment } from 'react';
import useTimeLine from '../hooks/useTimeline';

const TimeLine = () => {
  const pageSize = 10;
  // const [page, setPage] = useState(1);
  const {
    data: posts,
    error,
    fetchNextPage,
    isFetchingNextPage
  } = useTimeLine({ pageSize });

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {/*
         {posts?.map((post) => (
         <li key={post.id} className="list-group-item">
         {post.title}
         </li>
         ))}
         */}
        {posts?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </Fragment>
        ))}
      </ul>
      <div className="space-x-4 mt-6">
        <button
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className="bg-black text-white rounded-md px-4 py-2"
        >
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </>
  );
};

export default TimeLine;
