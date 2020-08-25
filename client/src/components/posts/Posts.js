import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllPosts } from '../../actions';

function Posts(props) {
    const { posts } = props;

    useEffect(() => {
        props.getAllPosts();
    }, [props.getAllPosts]);

    return <div></div>;
}

const mapStateToProps = (store) => {
    return {
        posts: store.post.posts,
    };
};

export default connect(mapStateToProps, { getAllPosts })(Posts);
