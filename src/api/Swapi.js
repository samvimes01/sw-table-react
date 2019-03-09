const BASE_URL = 'https://swapi.co/api/';

const Swapi = {
  getRoot: () => (
    fetch(BASE_URL)
      .then(data => data.json())
  ),

  getResourcesList: resource => (
    fetch(BASE_URL + resource)
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

  getSearchResults: (resource, query) => (
    // eslint-disable-next-line prefer-template
    fetch(BASE_URL + resource + '/?search=' + query)
      .then(data => data.json())
  ),

  getSchema: resource => (
    // eslint-disable-next-line prefer-template
    fetch(BASE_URL + resource + '/schema')
      .then(data => data.json())
  ),

  getNext: (resObj) => {
    if (resObj.next) {
      return fetch(resObj.next)
        .then(data => data.json());
    }
    return false;
  },

  getPrev: (resObj) => {
    if (resObj.previous) {
      return fetch(resObj.previous)
        .then(data => data.json());
    }
    return false;
  },

  hasNext: resObj => (
    resObj.next
  ),

  hasPrev: resObj => (
    resObj.previous
  ),
};

export default Swapi;
