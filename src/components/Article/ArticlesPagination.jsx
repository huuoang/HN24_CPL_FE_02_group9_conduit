import ReactPaginate from 'react-paginate';
import { useAuth } from '../../context/AuthContext';
import getArticles from '../../services/getArticles';

function ArticlesPagination({ articlesCount, location, tagName, updateArticles, username }) {
  const totalPages = Math.ceil(articlesCount / 10);
  const { headers } = useAuth();

  const handlePageChange = ({ selected: page }) => {
    const offset = page * 10; 
    getArticles({ headers, location, tagName, username, offset })
      .then(data => updateArticles(data))
      .catch(console.error);
  };

  return (
    <ReactPaginate
      activeClassName='active'
      breakClassName='page-item'
      breakLabel='...'
      breakLinkClassName='page-link'
      containerClassName='pagination pagination-sm'
      nextClassName='page-item'
      nextLabel={<i className='ion-arrow-right-b'></i>}
      nextLinkClassName='page-link'
      onPageChange={handlePageChange}
      pageClassName='page-item'
      pageCount={totalPages}
      pageLinkClassName='page-link'
      previousClassName='page-item'
      previousLabel={<i className='ion-arrow-left-b'></i>}
      previousLinkClassName='page-link'
      renderOnZeroPageCount={null}
    />
  );
}

export default ArticlesPagination;
