import { useEffect, useState } from 'react';
import { PostType } from '../helpers/types';
import { getPostsAPI } from '../api/post_api';
import { useQuery } from '@tanstack/react-query';

type UsePostsReturnType = {
  posts: PostType[];
  isPending: boolean;
  setPosts: (posts: PostType[]) => void;
  refetch: () => void;
};

function usePosts(): UsePostsReturnType {
  const [posts, setPosts] = useState<PostType[]>([] as PostType[]); // [1
  const { data, isPending, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: getPostsAPI,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (data) {
      setPosts(data.reverse()); // Reverse the order of fetched posts
    }
  }, [data, setPosts]);

  return { posts, isPending, setPosts, refetch };
}

export default usePosts;
