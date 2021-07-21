import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import '../../styles/base.scss';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  state = {
    imgUrl: this.props.imgUrl,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">
          <img src={this.state.imgUrl} alt="" />
        </div>
      </div>,
      modalRoot,
    );
  }
}
