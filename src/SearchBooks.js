import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchBooks extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;
  }
  // eslint-disable-next-line
  static propTypes = {
    shelfbooks: PropTypes.array.isRequired,
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
    BooksAPI.search(query).then(searchbooks => {
      if (searchbooks instanceof Array) {
        // console.log('shelfbooks: ', this.props.shelfbooks);
        // console.log('searchbooks: ', searchbooks);
        searchbooks.map(searchbook => {
          this.props.shelfbooks.forEach(shelfbook => {
            if (searchbook.id === shelfbook.id) {
              searchbook.shelf = shelfbook.shelf;
            }
          });
          return searchbook;
        });
        this.setState({
          books: searchbooks
        });
      } else {
        this.setState({
          books: []
        });
      }
    });
  }
  /**
   * 更新书本信息
   * @param  {Object} book 更新书本
   * @param  {String} shelf 书架名
   */
  updateBk(book, shelf) {
    this.props.updateBook(book, shelf).then(() => {
      this.setState({
        books: this.state.books.map(bk => {
          if (bk.id === book.id) {
            bk.shelf = shelf;
          }
          return bk;
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
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  this.search(e.target.value);
                }
              }}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book => (
              <li key={book.id}>
                <span className="search-book-tag">{book.shelf}</span>
                <Book bookinfo={book} updateBook={this.updateBk} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
