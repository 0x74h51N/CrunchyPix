'use client';
import { NavigationDocumentDataMenuItemsItem } from '@/prismicio-types';
import { setPosts } from '@/store/redux/postSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface PostComponentProps {
  items: NavigationDocumentDataMenuItemsItem[];
}

const PostsReducer = ({ items }: PostComponentProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPosts(items));
  }, [dispatch, items]);

  return null;
};

export default PostsReducer;
