import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import BookPagination from "../components/BookPagination";
import { Card, Col, Container, Jumbotron as Jumbo, Row } from "react-bootstrap";
import BooksService from "../services/Books.service";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Search from "../components/Search";

const booksService = new BooksService();

const BookList = () => {
  const history = useHistory();
  const location = useLocation();
  const path = window.location.pathname;
  const urlParams = new URLSearchParams(location.search);
  const requestedPage = Number(urlParams.get("page"));

  // component state
  const [books, setBooks] = useState(null);
  const [currentPage, setCurrentPage] = useState(requestedPage || 1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // will run on ComponentDidMount to get books and append page number in Url
  useEffect(() => {
    getBooks("", currentPage);
    history.push(`${path}?page=${currentPage}`);
  }, []);

  const getBooks = (searchTerm, newPage) => {
    setLoading(true);
    booksService
      .postBooks(searchTerm, newPage)
      .then((data) => {
        const pageLimit = Math.floor(data.count / 20) + 1;
        // if requested page does not exist set error msg and retrun
        if (pageLimit < requestedPage) {
          setError("Page does not exist");
          setLoading(false);
          return;
        }
        setTotalBooks(data.count);
        setBooks(data.books);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  const onPageChange = (newPage) => {
    // push new page to url query string and get books
    history.push(`${path}?page=${newPage}`);
    setCurrentPage(newPage);
    getBooks("", newPage);
  };

  const onsearch = (searchTerm) => {
    // on user search get books with requested search term
    getBooks(searchTerm, currentPage);
  };

  return (
    <>
      <Container>
        <Jumbo className="text-white text-center bg-primary">
          <h1>List of Books</h1>
        </Jumbo>
        {books && (
          <Row className="justify-content-center">
            <Col md="6" sm="8" xs="12">
              <Search callBack={onsearch} />
            </Col>
          </Row>
        )}
        <Row className="mt-2">
          {books &&
            !loading &&
            books.map((book) => {
              return (
                <Col className="mb-2" md="4" sm="6" xs="12">
                  <Card border="primary" className="w-100 h-100">
                    <Card.Body>
                      <Card.Title>{book.book_title}</Card.Title>
                      <Card.Text>
                        <b>Author:</b> {book.book_author[0]}
                      </Card.Text>
                      <Card.Text>
                        <b>Pages:</b> {book.book_pages}
                      </Card.Text>
                      <Card.Text>
                        <b>Publication Year:</b> {book.book_publication_year}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
        {books && (
          <Row className="justify-content-center">
            <Col md="auto" sm="10" xs="12">
              <BookPagination
                callBack={onPageChange}
                totalbooks={totalBooks}
                currentPage={currentPage}
              />
            </Col>
          </Row>
        )}
        {loading && <Loading />}
        {error && !loading && <Error message={error} />}
      </Container>
    </>
  );
};

export default BookList;
