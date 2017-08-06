import React from 'react';

// Instead of declaring Loading as a class that extends component, we can create a function that returns JSX. i.e. a stateless component
const Loading = ({ text }) => {
    text = text || "Loading...";
    return (
        <h1>{text}</h1>
    )
}

export default Loading;