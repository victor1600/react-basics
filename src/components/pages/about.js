import React from 'react';

function About(props) {
    return (
        // React fragment is a ghost element, it doesnt show in the dom, but is need in jsx
        <React.Fragment>
            <h1>
                About
            </h1>
            <p>His is the TodoList app v1.0.0. It is part of
            React crash course.</p>
        </React.Fragment>
    );
}

export default About;