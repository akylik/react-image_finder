import axios from 'axios';

const apiKey = 'Fvhh4z9NX-FC1xEeSCXHy1edJx-23UstYx-0vS7_9oA';

const fetchImages = ({ searchQuery = '', currentPage = 1, currentPagePrev = 0, pageSize = 15 }) => {
  return axios
    .get(
      `https://api.unsplash.com/search/photos/?query=${searchQuery}&client_id=${apiKey}&page=${currentPage}&per_page=15`,
    )
    .then(response => response.data.results);
};

const fetchImagesPrev = ({
  searchQuery = '',
  currentPage = 1,
  currentPagePrev = 0,
  pageSize = 15,
}) => {
  return axios
    .get(
      `https://api.unsplash.com/search/photos/?query=${searchQuery}&client_id=${apiKey}&page=${
        currentPagePrev - 1
      }&per_page=15`,
    )
    .then(response => response.data.results);
};

export default { fetchImages, fetchImagesPrev };



