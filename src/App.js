import React from 'react';
import SearchBooks from './SearchBooks';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  // eslint-disable-next-line
  state = {
    booksData: []
  };

  componentDidMount() {
    this.getAll();
  }

  /**
   * 获取所有书架上的书
   */
  getAll() {
    BooksAPI.getAll().then(data => {
      this.setState({
        booksData: data
      });
    });
  }

  /**
   * 更新书本信息
   * @param  {Object} book 需要更新的书
   * @param  {String} shelf 该书所在书架
   */
  updateBook = (book, shelf) => { // eslint-disable-line
    return BooksAPI.update(book, shelf).then(() => {
      this.setState({
        books: this.state.booksData.map(bk => {
          if (bk.id === book.id) {
            bk.shelf = shelf;
          }
          return bk;
        })
      });
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => <SearchBooks shelfbooks={this.state.booksData} updateBook={this.updateBook} />}
        />
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              booksData={this.state.booksData}
              updateBook={this.updateBook}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
