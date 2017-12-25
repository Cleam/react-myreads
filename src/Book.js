import React from 'react';
import PropTypes from 'prop-types';

class Book extends React.Component {
  // eslint-disable-next-line
  static propTypes = {
    bookinfo: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired
  };
  render() {
    const { bookinfo, updateBook } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${bookinfo.imageLinks.thumbnail}")`
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={bookinfo.shelf}
              onChange={e => updateBook(bookinfo, e.target.value)}
            >
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{bookinfo.title}</div>
        <div className="book-authors">{bookinfo.authors}</div>
      </div>
    );
  }
}

export default Book;
