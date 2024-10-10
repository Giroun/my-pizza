import React from 'react'
import ReactPaginate from 'react-paginate';

import  styles  from './PaginationBlock.module.scss';

const Pagination = () => {
  return (
    <ReactPaginate
    className={styles.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        // onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={3}
        renderOnZeroPageCount={null}
      />
 )
}

export default Pagination;
