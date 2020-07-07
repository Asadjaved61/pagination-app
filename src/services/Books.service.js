import { api, itemsPerPage } from "../constanst";

class BooksService {
  postBooks = (searchTerm, currentPage) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: currentPage || 1,
        itemsPerPage,
        filters: [{ type: "all", values: [searchTerm] }],
      }),
    };
    return fetch(`${api.baseUrl}${api.books}`, requestOptions)
      .then((response) => response.json())
      .then((data) => data);
  };
}

export default BooksService;
