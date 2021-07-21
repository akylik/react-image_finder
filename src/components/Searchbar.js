import React, { Component } from 'react';
import '../../src/styles/base.scss';

class Searchbar extends Component {
  state = { query: '' };

  handleChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.query);
    console.log(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <div className="Searchbar">
        <form onSubmit={this.handleSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label"></span>
          </button>
          <input
            type="text"
            value={this.state.query}
            onChange={this.handleChange}
            className="SearchForm-input"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </div>
    );
  }
}

export default Searchbar;
