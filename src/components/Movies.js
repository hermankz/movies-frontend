import React from 'react';
import { Link } from 'react-router-dom'
import { bindActions, mapStateToProps } from '../stores';
import * as actions from '../actions';
import { connect } from 'react-redux';

class Movies extends React.Component {
    componentDidMount() {
        this.props.actions.fetchMovies();
    }

    doDelete(title, props) {
        return event => {
            event.preventDefault();

            console.log(title);

            props.actions.deleteMovie(title);
        };
    }

    render() {
        const { moviesData } = this.props;

        return (
            <div className='grid'>
                <div className='container'>
                    <div className='row align-items-start'>
                        <div className='col-lg-3'>Title</div>
                        <div className='col-lg-3'>Director</div>
                        <div className='col-sm'>Release Date</div>
                        <div className='col-sm'>Type</div>
                        <div className='col-sm'>Update</div>
                        <div className='col-sm align-content-center'>Delete</div>
                    </div>

                    {moviesData && (moviesData.map((movie, idx) => (
                        <div className='row' key={idx}>
                            <div className='col-lg-3'>{movie.title}</div>
                            <div className='col-lg-3'>{movie.director}</div>
                            <div className='col-sm'>{movie.releaseDate}</div>
                            <div className='col-sm'>{movie.type}</div>
                            <div className='col-sm'>
                                <Link to={`/movie/${movie.title}`} className='nav-link'>Update</Link>
                            </div>
                            <div className='col-sm'>
                                <Link to='#' className='nav-link' onClick={this.doDelete(movie.title, this.props)}>Delete</Link>
                            </div>
                        </div>
                    )))}
                </div>
            </div>
        );
    }
}

const mapProps = state => {
    const { store } = mapStateToProps('movies')(state);

    return {
        moviesData: store.response,
    };
};

export default connect(mapProps, bindActions(actions))(Movies);