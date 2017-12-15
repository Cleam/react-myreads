import React from 'react';
import SearchBooks from './SearchBooks';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    booksData: []
  };

  componentDidMount() {
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
  updateBooks = (book, shelf) => {
    BooksAPI.update(book, shelf).then(bk => {
      this.setState({
        booksData: this.state.booksData.map(b => {
          if (b.id === book.id) {
            b.shelf = shelf;
          }
          return b;
        })
      });
    });
  };

  render() {
    return (
      <div className="app">
        <Route path="/search" component={SearchBooks} />
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              booksData={this.state.booksData}
              updateBooks={this.updateBooks}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
