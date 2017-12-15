import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Book from './Book';

class ListBooks extends React.Component {
  static propTypes = {
    booksData: PropTypes.array.isRequired,
    updateBooks: PropTypes.func.isRequired
  };

  render() {
    const { booksData, updateBooks } = this.props;
    if (!booksData || booksData.length === 0) {
      return null;
    }
    console.log('booksData: ', booksData);
    const currentlyReading = booksData.filter(
      b => b.shelf === 'currentlyReading'
    );
    // console.log('currentlyReading: ', currentlyReading);
    const wantToRead = booksData.filter(b => b.shelf === 'wantToRead');
    // console.log('wantToRead: ', wantToRead);
    const read = booksData.filter(b => b.shelf === 'read');
    // console.log('concat: ', wantToRead.concat(read));
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
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url("${
                                book.imageLinks.thumbnail
                              }")`
                            }}
                          />
                          <div className="book-shelf-changer">
                            <select
                              value={book.shelf}
                              onChange={e => updateBooks(book, e.target.value)}
                            >
                              <option value="none" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                      </div>
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
                      {/* <Book data={} /> */}
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url("${
                                book.imageLinks.thumbnail
                              }")`
                            }}
                          />
                          <div className="book-shelf-changer">
                            <select
                              value={book.shelf}
                              onChange={e => updateBooks(book, e.target.value)}
                            >
                              <option value="none" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                      </div>
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
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url("${
                                book.imageLinks.thumbnail
                              }")`
                            }}
                          />
                          <div className="book-shelf-changer">
                            <select
                              value={book.shelf}
                              onChange={e => updateBooks(book, e.target.value)}
                            >
                              <option value="none" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                      </div>
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
