import { useState, useEffect, useCallback } from 'react';
import getComments from '../services/getComments';
import postComment from '../services/postComment';
import deleteComment from '../services/deleteComment';

export function useComments(slug) {
  const [comments, setComments] = useState([]);

  const fetchComments = useCallback(() => {
    getComments({ slug })
      .then(fetchedComments => {
        setComments(fetchedComments);
        localStorage.setItem(`comments_${slug}`, JSON.stringify(fetchedComments));
      })
      .catch(console.error);
  }, [slug]);

  useEffect(() => {
    const savedComments = localStorage.getItem(`comments_${slug}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      fetchComments();
    }
  }, [slug, fetchComments]);

  const addComment = useCallback((newComment, headers) => {
    return postComment({ body: newComment, headers, slug })
      .then(addedComment => {
        setComments(prevComments => {
          const updatedComments = [...prevComments, addedComment];
          localStorage.setItem(`comments_${slug}`, JSON.stringify(updatedComments));
          return updatedComments;
        });
        return addedComment;
      });
  }, [slug]);

  const removeComment = useCallback((commentId, headers) => {
    return deleteComment({ commentId, headers, slug })
      .then(() => {
        setComments(prevComments => {
          const updatedComments = prevComments.filter(comment => comment.id !== commentId);
          localStorage.setItem(`comments_${slug}`, JSON.stringify(updatedComments));
          return updatedComments;
        });
      });
  }, [slug]);

  return { comments, addComment, removeComment, fetchComments };
}
