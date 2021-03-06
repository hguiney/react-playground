import React, { Component } from 'react';
import uuid from 'uuid';
import $ from 'jquery';
import Projects from './Components/Projects';
import AddProject from './Components/AddProject';
// import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      projects: []
    };
  }

  getTodos() {
    $.ajax( {
      url: 'https://jsonplaceholder.typicode.com/todos'
    } );
  }

  getProjects() {
    this.setState( {
      projects: [
        {
          id: uuid.v4(),
          title: 'Business Website',
          category: 'Web Design'
        },
        {
          id: uuid.v4(),
          title: 'Social App',
          category: 'Mobile Development'
        },
        {
          id: uuid.v4(),
          title: 'Ecommerce Shopping Cart',
          category: 'Web Development'
        }
      ]
    } ); // setState
  }

  // Lifecycle method, fires every time component is re-rendered
  componentWillMount() {
    this.getProjects();
    this.getTodos();
  }

  componentDidMount() {
    this.getTodos();
  }

  handleAddProject( project ) {
    // console.log( project );
    let projects = this.state.projects;

    projects.push( project );

    this.setState( { projects: projects } );
  }

  handleDeleteProject( id ) {
    let projects = this.state.projects;
    let index = projects.findIndex( x => x.id === id );

    projects.splice( index, 1 );
    this.setState( { projects: projects } );
  }

  render() {
    return (
      // Only one element is permitted at top-level
      <div className="App">
        <AddProject addProject={ this.handleAddProject.bind( this ) } />
        { /*<Projects test="Hello World" />*/ }
        <Projects projects={ this.state.projects } onDelete={ this.handleDeleteProject.bind( this ) } />
      </div>
    );
  }
}

export default App;
