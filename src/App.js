import {BrowserRouter as Router, Route} from 'react-router-dom';

import Todos from './components/Todos';
import './App.css';
import React, {Component} from 'react';
import Header from './components/layout/header'
import AddTodo from './components/addTodo'
// import uuid from 'uuid';
import About from "./components/pages/about"
import axios from 'axios';

class App extends Component {
    state = {
        todos: []
    }

    componentDidMount() {
        // URL that serves as backend
        axios.get('http://jsonplaceholder.typicode.com/todos?_limit=10')
            .then(res => this.setState({todos: res.data}))
    }

    // Toggle Complete
    markComplete = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo;
            })
        });
    }
    // Delete Todo
    delTodo = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(res => this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]}));

    }

    // Add Todo
    // Doing a POST Request
    addTodo = (title) => {
        axios.post('http://jsonplaceholder.typicode.com/todos', {
            title,
            completed: false
        })
            .then(res => this.setState({
                todos:
                    [...this.state.todos, res.data]
            }));
        // Copy what we have into a new array and add the newTodo
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <Header/>
                        <Route exact path="/" render={props => (
                            <React.Fragment>
                                <AddTodo addTodo={this.addTodo}/>
                                <Todos todos={this.state.todos} delTodo={this.delTodo}
                                       markComplete={this.markComplete}/>
                            </React.Fragment>
                        )}/>
                        <Route path="/about" component={About}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;