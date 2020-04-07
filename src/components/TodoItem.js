import React, {Component} from 'react';
import PropTypes from "prop-types";
import Todos from "./Todos";

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
        // Pullying variables out
        const { id, title } = this.props.todo;
        return (
            <div style ={this.getStyle()} >
               <p>
                   <input type="checkbox" onChange={this.props.markComplete.bind(this, id)} />  {' '}
                   {title}
                   <button onClick ={this.props.delTodo.bind(this, id)} style={btnStyle}>x</button>
               </p>
            </div>
        );
    }
}
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired,
}

const btnStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 8px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}


export default TodoItem;

