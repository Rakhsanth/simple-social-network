import React, { Fragment, useEffect } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import PostItem from './PostItem';
import { getPost } from '../../actions';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

function Post(props) {
    const {
        post: { loading, post },
        match,
    } = props;

    useEffect(() => {
        props.getPost(match.params.id);
    }, [props.getPost, match]);

    return loading || post === null ? (
        <Spinner size="lg" />
    ) : (
        <Fragment>
            <PostItem post={post} setActions={false} />
            <CommentForm postId={post._id} />
            {post.comments.length > 0 ? (
                <Fragment>
                    <div class="comments">
                        {post.comments.map((comment) => (
                            <CommentItem
                                key={comment._id}
                                postId={post._id}
                                comment={comment}
                            />
                        ))}
                    </div>
                </Fragment>
            ) : (
                <h4>No comments to display</h4>
            )}
        </Fragment>
    );
}

const mapStateToProps = (store) => {
    return {
        post: store.post,
    };
};

export default connect(mapStateToProps, { getPost })(Post);
