import { useState, useEffect, useCallback } from 'react';
import getComments from '../services/getComments';
import postComment from '../services/postComment';
import deleteComment from '../services/deleteComment';
import { useAuth } from '../context/AuthContext'; 

export function useComments(slug) {
  const [comments, setComments] = useState([]);
  const { loggedUser } = useAuth();
  const { username, token } = loggedUser || {};

  // Fetch comments from the API and filter by current user
  const fetchComments = useCallback(() => {
    getComments({ slug, headers: { Authorization: `Token ${token}` } })
      .then(fetchedComments => {
        // Lọc comment của người dùng hiện tại
        const userComments = fetchedComments.filter(comment => comment.author.username === username);
        setComments(userComments);
      })
      .catch(console.error);
  }, [slug, username, token]);

  useEffect(() => {
    fetchComments();
  }, [slug, fetchComments]);

  // Add a new comment and update the state
  const addComment = useCallback((newComment) => {
    return postComment({
      body: newComment,
      headers: { Authorization: `Token ${token}` },
      slug
    })
    .then(addedComment => {
      // Chỉ thêm bình luận nếu nó của người dùng hiện tại
      if (addedComment.author.username === username) {
        setComments(prevComments => [...prevComments, addedComment]);
      }
      return addedComment;
    });
  }, [slug, username, token]);

  // Remove a comment and update the state
  const removeComment = useCallback((commentId) => {
    return deleteComment({
      commentId,
      headers: { Authorization: `Token ${token}` },
      slug
    })
    .then(() => {
      setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
    });
  }, [slug, token]);

  return { comments, addComment, removeComment, fetchComments };
}
