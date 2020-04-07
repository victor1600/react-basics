# Basics

Puts everything into a single component. 

- State: Object with values that determines how the component behaves and renders
- Events: Updates state dynamically

- Extends React.Componenet
- render() is a lifecycle methods, the only required method, it returns JSX, very similar to HTML,
we can have **JS expressions embedded there** inside the curly braces, we can have events, etc.

![anatomy](images/anatomy.png)


## Project Structure
React is a single web page app, everything runs through one phissicial page:
index.html.
The main app component will be outputted in:
```html
<div id="root"></div>
```


- package.json: manifest file with info about our app, dependecies,
packages, if we install packages, we have to put them there. The main ones
are:
    - Dependencies 
        - React
        - React-dom: Loading componentes in browser
        - react-scripts: Dev server, being able to compile app, run tests.
    - scripts:
        - start: start dev server
        - build: compile code in something browser can read without dev server,
        before we deploy we want to do ```npm-run-build``` and then deploy build.
        
- Public
    - index.html: Entry point. If we want to use bootstrap, we can include it there.

- src:
    - index.js: Entry point to react. We import the main app component that
    wraps everything. ReacDom is rendering the app component into the element
    in the root div in index.html.
    ```javascript
      ReactDOM.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
        document.getElementById('root')
      );
    ```
  - app.js: that's the component that's being loaded in index.js 
  

## Create new components using state and props
1. rcc + tab to create empty componenet, or rsf.
2. Import it in the parent component, e.g App.js
3. Embedded it in code using <componentName>
4. Create state

Different components can have it's own state, but many times
we need state that multiple need to access. So you can create state in parent component:

- Example 1: Array of objects:
```javascript
state = {
        todos: [
            {
                id: 1,
                title: 'take out the trash',
                completed: false
            },
            {
                id: 2,
                title: 'Meeting with boss',
                completed: false
            },
            {
                id: 3,
                title: 'Dinner with wife',
                completed: false
            },
        ]
    }
```

- Access state
> Use  this.state

- Pass the state down to child components:
    - We pass it like a ```property```: we do that just like an html attribute
      ```javascript
         render() {
                console.log(this.state.todos)
                return (
                    <div>
                        <Todos todos={this.state.todos}/>
                    </div>
                );
            }
      ```
    - We access in the child with ```this.props```, we use .map funcion of arrays
    so we can perform an action for every element. We could use a function or arrow function,
    Remember we can put inside the curly braces any jsx expression:
        ```javascript
          import React, {Component} from 'react';
          
          class Todos extends Component {
              render() {
                  return this.props.todos.map((todo) =>(
                      <h3>{todo.title}</h3>
                  ));
              }
          }
          
          export default Todos;
        ```
        

## Types of props

Validation for properties that components should have.
```javascript
Todos.propTypes = {
    todos: PropTypes.array.isRequired
}

```

### Adding style to components

We can: 
- Use it directly in tag
       ```html 
        class TodoItem extends Component {
            render() {
                return (
                    <div style ={{backgroundColor: '#f4f4f4'}} >
                       <p>{this.props.todo.title}</p>
                    </div>
                );
            }
        }
        TodoItem.propTypes = {
            todo: PropTypes.object.isRequired
        }
        ```
        
- Set a variable and then use it tag:

```javascript
class TodoItem extends Component {
    render() {
        return (
            <div style ={itemStyle} >
               <p>{this.props.todo.title}</p>
            </div>
        );
    }
}
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired
}

const itemStyle = {
    backgroundColor: '#f4f4f4'
}

export default TodoItem;
```

- Using a method:
```javascript
class TodoItem extends Component {
    getStyle = () =>{
        return {
            background: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.todo.completed ? 'line-through' : 'none'
        }
    }

    render() {
        return (
            <div style ={this.getStyle()} >
               <p>{this.props.todo.title}</p>
            </div>
        );
    }
}
```

# Events

Example:
- We use arrow functions! 
```javascript
class TodoItem extends Component {
    getStyle = () =>{
        return {
            background: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.todo.completed ? 'line-through' : 'none'
        }
    }
    // Takes event parameter
    markComplete = (e) => {
        console.log(this.props)
    }

    render() {
        return (
            <div style ={this.getStyle()} >
               <p>
                   <input type="checkbox" onChange={this.markComplete} />  {' '}
                   {this.props.todo.title}
               </p>
            </div>
        );
    }
} 
```

## React Router

In main component:

```javascript
render() {
        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <Header/>
                        <Route exact path ="/" render={props =>(
                            <React.Fragment>
                                <AddTodo  addTodo={this.addTodo}/>
                                <Todos todos={this.state.todos} delTodo={this.delTodo} markComplete={this.markComplete}/>
                            </React.Fragment>
                        )}/>
                        <Route path ="/about" component={About} />
                    </div>
                </div>
           </Router>
        );
    }
```

## Consuming an api, fetching JSON

- We use Axios library
- Declare empty initial state
- We use a lifecycle method called componentDidMount

- Get request:
```javascript
state = {
        todos: []
    }
    componentDidMount(){
        // URL that serves as backend
        axios.get('http://jsonplaceholder.typicode.com/todos?_limit=10')
            .then(res => this.setState({todos: res.data}))
    }
```

- Post Request:
```javascript
    // Doing a POST Request
    addTodo = (title) => {
        axios.post('http://jsonplaceholder.typicode.com/todos',{
            title,
            completed:false
        })
            .then(res=> this.setState({todos:
                    [...this.state.todos, res.data]}));
        // Copy what we have into a new array and add the newTodo
    }

```

- Delete request
```javascript
// Delete Todo
    delTodo = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(res => this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]}));

    }
```


## Deploy react page