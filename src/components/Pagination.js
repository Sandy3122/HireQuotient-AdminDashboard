
// Pagination.js
import React from "react";

const Pagination = ({ page, handlePageChange, totalPageCount, renderPageNumbers }) => {
  return (
    <div className="row">
      <div className="col-12 d-flex justify-content-end">
        <button
          onClick={() => handlePageChange(1)}
          className="btn btn-outline-secondary btn-sm first-page"
        >
          <img width="18" height="18" src="https://img.icons8.com/external-line-adri-ansyah/64/external-music-music-player-button-line-adri-ansyah-24.png" alt="external-music-music-player-button-line-adri-ansyah-24"/>
        </button>
        <button
          onClick={() => handlePageChange(page - 1)}
          className={`btn btn-outline-secondary btn-sm ml-2 previous-page ${
            page === 1 ? "disabled" : ""
          }`}
          disabled={page === 1}
        >
          <img width="18" height="18" src="https://img.icons8.com/metro/52/back.png" alt="back"/>
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(page + 1)}
          className={`btn btn-outline-secondary btn-sm ml-2 next-page ${
            page === Math.ceil(totalPageCount) ? "disabled" : ""
          }`}
          disabled={page === Math.ceil(totalPageCount)}
        >
          <img width="18" height="18" src="https://img.icons8.com/metro/52/forward.png" alt="forward"/>
        </button>
        <button
          onClick={() => handlePageChange(Math.ceil(totalPageCount))}
          className="btn btn-outline-secondary btn-sm ml-2 last-page"
        >
          <img width="18" height="18" src="https://img.icons8.com/external-line-adri-ansyah/64/external-music-music-player-button-line-adri-ansyah-10.png" alt="external-music-music-player-button-line-adri-ansyah-10"/>
        </button>
      </div>
    </div>
  );
};

export default Pagination;