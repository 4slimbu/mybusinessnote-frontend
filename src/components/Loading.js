import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => (
    <ReactLoading type='spin' color='lightgrey' height='40px' width='40px' delay={200} className="loading-spinner"/>
);

export default Loading;