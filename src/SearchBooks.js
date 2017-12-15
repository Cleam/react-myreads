import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
class SearchBooks extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;
  }
  static propTypes = {
    updateBook: PropTypes.func.isRequired
  };
  // eslint-disable-next-line
  state = {
    books: []
  };
  /**
   * 通过关键词搜索书本
   * @param  {String} query 关键词
   */
  search(query) {
    if (!query) {
      return null;
    }
    this.timer && (clearTimeout(this.timer), (this.timer = null));
    this.timer = setTimeout(() => {
      BooksAPI.search(query).then(books => {
        console.log('search books: ', books);
        if (!(books instanceof Array)) {
          this.setState({
            books: []
          });
        } else {
          this.setState({
            books: books
          });
        }
      });
    }, 200);
  }
  /**
   * 更新书本信息
   * @param  {Object} book 更新书本
   * @param  {String} shelf 书架名
   */
  updateBk(book, shelf) {
    this.props.updateBook(book, shelf).then(() => {
      this.setState({
        books: this.state.books.filter(bk => {
          return bk.id !== book.id;
        })
      });
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={e => this.search(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book => (
              <li key={book.id}>
                {book.shelf}
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url("${book.imageLinks.thumbnail}")`
                      }}
                    />
                    <div className="book-shelf-changer">
                      <select
                        value={book.shelf || 'none'}
                        onChange={e => this.updateBk(book, e.target.value)}
                      >
                        <option disabled>Move to...</option>
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
    );
  }
}

export default SearchBooks;
