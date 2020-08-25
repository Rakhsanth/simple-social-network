import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions';
import Spinner from '../layouts/Spinner';

function ProfileGitRepos(props) {
    const { username, repos } = props;

    useEffect(() => {
        props.getGithubRepos(username);
    }, [props.getGithubRepos]);
    return (
        <Fragment>
            {repos === null ? (
                <Spinner size="lg" />
            ) : (
                <Fragment>
                    <div className="profile-github">
                        <h2 className="text-primary my-1">
                            <i className="fab fa-github"></i> Github
                            Repositories
                        </h2>
                        {repos.length > 0 ? (
                            <Fragment>
                                {repos.map((repo) => (
                                    <div
                                        key={repo.id}
                                        className="repo bg-white p-1 my-1"
                                    >
                                        <div>
                                            <h4>
                                                <a
                                                    href={repo.html_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {repo.name}
                                                </a>
                                            </h4>
                                            <p>{repo.description}</p>
                                        </div>
                                        <div>
                                            <ul>
                                                <li className="badge badge-primary">
                                                    Stars:{' '}
                                                    {repo.stargazers_count}
                                                </li>
                                                <li className="badge badge-dark">
                                                    Watchers:{' '}
                                                    {repo.watchers_count}
                                                </li>
                                                <li className="badge badge-light">
                                                    Forks: {repo.forks_count}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </Fragment>
                        ) : (
                            <h4>User has no github repositories</h4>
                        )}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

const mapStateToProps = (store) => {
    return {
        repos: store.profile.repos,
    };
};

export default connect(mapStateToProps, { getGithubRepos })(ProfileGitRepos);
