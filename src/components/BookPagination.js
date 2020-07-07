import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";

const BookPagination = (props) => {
  const totalPages = Math.floor(props.totalbooks / 20) + 1;
  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const [activePage, setActivePage] = useState(props.currentPage || 1);
  const [currentPages, setCurrentPages] = useState(pages.slice(0, 10));

  useEffect(() => {
    setInitialPages();
  }, [totalPages]);

  const setInitialPages = () => {
    // set initial pages according to requested page number
    let numberofPages = 9;
    let initialPages = [];
    if (totalPages - activePage < 10) {
      numberofPages = totalPages - activePage;
    }
    for (
      let a = props.currentPage;
      a <= props.currentPage + numberofPages;
      a++
    ) {
      initialPages.push(a);
    }
    setCurrentPages(initialPages);
  };

  const changePageNumbers = (direction) => {
    // show next or prev 10 pages on button click
    if (direction === "next") {
      setCurrentPages(
        pages.slice(
          currentPages[currentPages.length - 1],
          currentPages[currentPages.length - 1] + 10
        )
      );
      onPageChange(currentPages[currentPages.length - 1] + 1);
    } else {
      let numberofPages = 11;
      if (currentPages[0] < 10) {
        numberofPages = currentPages[0];
      }
      setCurrentPages(
        pages.slice(currentPages[0] - numberofPages, currentPages[0] - 1)
      );
      onPageChange(currentPages[0] - numberofPages + 1);
    }
  };

  const onPageChange = (pageNumber) => {
    props.callBack(pageNumber);
    setActivePage(pageNumber);
  };

  return (
    <Pagination
      size="md
    "
    >
      <Pagination.First
        onClick={() => changePageNumbers("prev")}
        disabled={currentPages[0] === 1 ? true : false}
      />
      {currentPages.map((page) => {
        return (
          <Pagination.Item
            key={page}
            active={activePage === page}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Pagination.Item>
        );
      })}
      <Pagination.Last
        onClick={() => changePageNumbers("next")}
        disabled={
          currentPages[currentPages.length - 1] === totalPages ? true : false
        }
      />
    </Pagination>
  );
};

export default BookPagination;
