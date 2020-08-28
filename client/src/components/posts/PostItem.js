import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLikes, deletePost } from '../../actions';
import { Link } from 'react-router-dom';

function PostItem(props) {
    const {
        post,
        auth: { loading, user },
        setActions,
    } = props;
    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profiles/${post.user}`}>
                    <img
                        className="round-img"
                        src={
                            post.avatar
                                ? post.avatar
                                : 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
                        }
                        alt=""
                    />
                    <h4>{post.name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">{post.text}</p>
                <p className="post-date">
                    Posted on{' '}
                    <Moment format="YYYY-MM-DD">{post.createdDate}</Moment>
                </p>
                {setActions ? (
                    <Fragment>
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => props.addLikes(post._id)}
                        >
                            <i className="fas fa-thumbs-up"></i>
                            {post.likes.length > 0 ? (
                                <span> {post.likes.length}</span>
                            ) : null}
                        </button>
                        <Link
                            to={`/posts/${post._id}`}
                            className="btn btn-primary"
                        >
                            Discussion{' '}
                            {post.comments.length > 0 ? (
                                <span className="comment-count">
                                    {post.comments.length}
                                </span>
                            ) : null}
                        </Link>
                        {!loading && user._id === post.user ? (
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => props.deletePost(post._id)}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        ) : null}
                    </Fragment>
                ) : null}
            </div>
        </div>
    );
}

const mapStateToProps = (store) => {
    return {
        auth: store.auth,
    };
};

export default connect(mapStateToProps, { addLikes, deletePost })(PostItem);
