import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';

class ListBooks extends React.Component {
  // eslint-disable-next-line
  static propTypes = {
    booksData: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
  };

  render() {
    const { booksData, updateBook } = this.props;
    if (!booksData || booksData.length === 0) {
      return null;
    }
    // console.log('booksData: ', booksData);
    const currentlyReading = booksData.filter(
      b => b.shelf === 'currentlyReading'
    );
    const wantToRead = booksData.filter(b => b.shelf === 'wantToRead');
    const read = booksData.filter(b => b.shelf === 'read');
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReading.map(book => (
                    <li key={book.id}>
                      <Book bookinfo={book} updateBook={updateBook} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToRead.map(book => (
                    <li key={book.id}>
                      <Book bookinfo={book} updateBook={updateBook} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {read.map(book => (
                    <li key={book.id}>
                      <Book bookinfo={book} updateBook={updateBook} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;
