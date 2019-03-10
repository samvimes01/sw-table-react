const BASE_URL = 'https://swapi.co/api/';

const Swapi = {
  getRoot: () => (
    fetch(BASE_URL)
      .then(data => data.json())
  ),

  getResourcesList: (resource, query, page) => (
    // eslint-disable-next-line prefer-template
    fetch(BASE_URL + resource + '/?search=' + query + '&page=' + page)
      .then(data => data.json())
  ),

  getResourceByUrl: resourceUrl => (
    fetch(BASE_URL + resourceUrl)
      .then(data => data.json())
  ),

  getResourceById: (resource, id) => (
    // eslint-disable-next-line prefer-template
    fetch(BASE_URL + resource + '/' + id)
      .then(data => data.json())
  ),
};

export default Swapi;
