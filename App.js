import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
  {
    title:'React',
    url : 'https://reactjs.org',
    author:'Jordan Walke',
    num_comments : 3,
    points : 4,
    objectID:0
  },
  {
    title:'abcdefg',
    url : 'https://reactjs.org',
    author:'Jordan Walke',
    num_comments : 3,
    points : 4,
    objectID:1
  }
];

/* ES5
 function isSearched(searchTerm) {
 return function(item) {
 return item.title.toLowerCase().includes(searchTerm.toLowerCase());
 };
 }*/

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

const Search= ({value, onChange, children})=> {
  return (
    <form>
      {children}
      <input
        type="text"
        value={value}
        onChange={onChange}
      />
    </form>
  );
};

const Button=({onClick, className='', children}) =>{
  return(
    <button onClick={onClick}
            className={className}
            type="button">
      {children}
    </button>
  );
};

const Table=({list, pattern, onDismiss}) => {
  return (
    <div>
      {list.filter(isSearched(pattern)).map(item=>
        <div key={item.objectID}>
            <span>
              <a href={item.url}>
                {item.title}
              </a>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <Button onClick={()=>onDismiss(item.objectID)}>Dismiss</Button>
              </span>
            </span>
        </div>
      )}
    </div>
  )
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm:'',
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange=this.onSearchChange.bind(this);

  }

  onSearchChange(event) {
    this.setState({
      searchTerm:event.target.value
    });
  }

  onDismiss(id) {
    console.log(id);
    const isNotId = item=> item.objectID!==id;
    const updateList = this.state.list.filter(isNotId);
    this.setState({list:updateList});
  }

  render() {
    const {searchTerm,list}=this.state;



    return (
      <div className="App">
        <Search value={searchTerm}
                onChange={this.onSearchChange}>
          Search
        </Search>
        <Table list={list}
               pattern={searchTerm}
               onDismiss={this.onDismiss}
        />
      </div>
    );
  }

}

export default App;