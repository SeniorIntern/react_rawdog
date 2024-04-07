import {
  keepPreviousData,
  useInfiniteQuery
} from '@tanstack/react-query';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  pageSize: number;
}

const useTimeLine = (query: PostQuery) => {
  const fetchPosts = (pageParam: number) =>
    axios
      .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _start: (pageParam - 1) * query.pageSize,
          _limit: query.pageSize
        }
      })
      .then((res) => res.data);

  return useInfiniteQuery<Post[], Error>({
    queryKey: ['posts', query],
    // @ts-ignore
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    staleTime: 1 * 60 * 1000,
    retry: 3,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    placeholderData: keepPreviousData
  });
};

export default useTimeLine;
