'use client';
import { BlogPostDocument } from '@/prismicio-types';
import { setPosts } from '@/store/redux/postSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface PostComponentProps {
  posts: BlogPostDocument<string>[];
}

const PostsReducer = ({ posts }: PostComponentProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const filteredPosts = posts.map((post) => ({
      uid: post.uid,
      title: post.data.title,
    }));
    console.log('filteredPost', filteredPosts);

    dispatch(setPosts(filteredPosts));
  }, [dispatch, posts]);

  return null;
};

export default PostsReducer;
