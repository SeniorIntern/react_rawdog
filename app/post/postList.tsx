'use client';

import { useState } from 'react';
import usePosts from '../hooks/usePosts';

const PostList = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const { data: posts, error } = usePosts({ page, pageSize });

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <div className="space-x-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-black text-white rounded-md px-4 py-2"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="bg-black text-white rounded-md px-4 py-2"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default PostList;
