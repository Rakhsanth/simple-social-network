import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert, deleteComment } from '../../actions';
import Moment from 'react-moment';

function CommentItem(props) {
    const {
        comment,
        postId,
        auth: { loading, user },
    } = props;
    return comment ? (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`profiles/${comment.user}`}>
                    <img
                        className="round-img"
                        src={
                            comment.avatar
                                ? comment.avatar
                                : 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
                        }
                        alt=""
                    />
                    <h4>{comment.name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">{comment.text}</p>
                <p className="post-date">
                    Posted on{' '}
                    <Moment format="YYYY-MM-DD">{comment.createdDate}</Moment>
                </p>
            </div>
            {!loading && user._id === comment.user ? (
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => props.deleteComment(postId, comment._id)}
                >
                    <i className="fas fa-times"></i>
                </button>
            ) : null}
        </div>
    ) : null;
}

const mapStateToProps = (store) => {
    return {
        auth: store.auth,
    };
};

export default connect(mapStateToProps, { setAlert, deleteComment })(
    CommentItem
);
