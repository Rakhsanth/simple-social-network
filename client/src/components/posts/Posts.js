import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAllPosts, setAlert } from '../../actions';
import Spinner from '../layouts/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

function Posts(props) {
    const {
        post: { loading, posts },
    } = props;

    useEffect(() => {
        props.getAllPosts();
    }, [props.getAllPosts]);

    return (
        <Fragment>
            {loading ? (
                <Spinner size="lg" />
            ) : (
                <Fragment>
                    <h1 className="large text-primary">Posts</h1>
                    <p className="lead">
                        <i className="fas fa-user"></i> Welcome to the
                        community!
                    </p>

                    <PostForm />

                    <div className="posts">
                        {posts.map((post) => (
                            <PostItem
                                key={post._id}
                                post={post}
                                setActions={true}
                            />
                        ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

const mapStateToProps = (store) => {
    return {
        post: store.post,
    };
};

export default connect(mapStateToProps, { getAllPosts })(Posts);
