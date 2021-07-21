import React, { Component } from 'react';
import Searchbar from '../components/Searchbar';
import Modal from '../components/Modal';
import imageApi from '../services/image-api';
import '../styles/base.scss';

class ArticlesView extends Component {
  state = {
    currentPage: 1,
    currentPagePrev: 0,
    searchQuery: '',
    error: null,
    results: [],
    propsPage: 0,
    showModal: false,
    imageUrl: '',
  };

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      if (this.state.currentPage > this.state.currentPagePrev) {
        this.fetchImages();
      } else {
        this.fetchImagesPrev();
      }
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      currentPagePrev: 0,
      results: [],
    });
  };

  fetchImages = () => {
    const { searchQuery, currentPage, currentPagePrev } = this.state;
    const options = {
      searchQuery,
      currentPage,
      currentPagePrev,
    };

    imageApi.fetchImages(options).then(results => {
      this.setState(prevState => ({
        results: results,
        currentPage: prevState.currentPage + 1,
        currentPagePrev: prevState.currentPagePrev + 1,
      }));
    });
  };

  fetchImagesPrev = () => {
    const { searchQuery, currentPage, currentPagePrev } = this.state;
    const options = {
      searchQuery,
      currentPage,
      currentPagePrev,
    };

    imageApi.fetchImagesPrev(options).then(results => {
      this.setState(prevState => ({
        results: results,
        currentPage:
          prevState.currentPage > 1
            ? prevState.currentPage - 1
            : prevState.currentPage,
        currentPagePrev:
          prevState.currentPagePrev > 1
            ? prevState.currentPagePrev - 1
            : prevState.currentPagePrev,
      }));
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  clickImg = e => {
   //  console.log(e.currentTarget.dataset.url);
    this.setState({
      imageUrl: e.currentTarget.dataset.url,
    });
    this.toggleModal();
  };

  render() {
    const { error, results } = this.state;

    return (
      <div>
        <div>
          {error && <h1>Ой ошибка, всё пропало!!!</h1>}

          {this.state.showModal && (
            <Modal
              onClose={this.toggleModal}
              imgUrl={this.state.imageUrl}
            ></Modal>
          )}
          <Searchbar onSubmit={this.onChangeQuery} />

          <div>
            <ul className="ImageGallery">
              {results.map(({ id, urls }) => (
                <li key={id} className="ImageGalleryItem">
                  <img
                    src={urls.small}
                    id={id}
                    data-url={urls.regular}
                    className="ImageGalleryItem-image"
                    onClick={this.clickImg}
                  />
                </li>
              ))}
            </ul>

            {results.length > 0 && (
              <div className="Button__container">
                <button
                  type="button"
                  onClick={this.fetchImagesPrev}
                  className="Button"
                  disabled={this.state.currentPagePrev === 1 && true}
                >
                  Назад
                </button>
                <button
                  type="button"
                  onClick={this.fetchImages}
                  className="Button"
                >
                  Далее
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ArticlesView;
