import { push } from 'react-router-redux'

// const API_HOST = 'http://localhost:8080';
const API_HOST = process.env.REACT_APP_API_HOST;

function createHeaders() {
    return {
        'Content-Type': 'application/json;charset=utf-8',
    };
}

function fetchingMovies() {
    return {
        type: 'FETCHING_MOVIES',
    };
}

function fetchedMovies(response) {
    return {
        type: 'FETCHED_MOVIES',
        response,
    };
}

export function fetchMovies() {
    return dispatch => {
        dispatch(fetchingMovies());

        fetch(`${API_HOST}/api/movies`)
            .then(response => response.json())
            .then(data => {
                dispatch(fetchedMovies(data));
            })
            .catch(err => console.log(err));
    }
}

export function setIsUpdate(isUpdate) {
    return {
        type: 'SET_MOVIE_UPDATE',
        isUpdate,
    };
}

function fetchingMovie() {
    return {
        type: 'FETCHING_SINGLE_MOVIE',
    };
}

function fetchedMovie(responseMovie) {
    return {
        type: 'FETCHED_SINGLE_MOVIE',
        responseMovie,
    };
}

export function fetchMovie(title) {
    return dispatch => {
        dispatch(fetchingMovie());

        fetch(`${API_HOST}/api/movies/${title}`)
            .then(response => response.json())
            .then(data => {
                dispatch(fetchedMovie(data));
            })
            .catch(err => console.log(err));
    }
}

function creatingMovie() {
    return {
        type: 'CREATING_MOVIE',
    };
}

function createdMovie() {
    return {
        type: 'CREATED_MOVIE',
    };
}

export function createNewMovie(movie) {
    return dispatch => {
        dispatch(creatingMovie());

        fetch(`${API_HOST}/api/movies`, {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify(movie),
        })
            .then(response => response.json())
            .then(data => {
                dispatch(createdMovie());
                dispatch(push('/movies'));
            })
            .catch(err => console.log(err));
    }
}

function updatingMovie() {
    return {
        type: 'UPDATING_MOVIE',
    };
}

function updatedMovie() {
    return {
        type: 'UPDATED_MOVIE',
    };
}

export function updateMovie(movie) {
    return dispatch => {
        dispatch(updatingMovie());

        fetch(`${API_HOST}/api/movies/${movie.title}`, {
            method: 'PUT',
            headers: createHeaders(),
            body: JSON.stringify(movie),
        })
            .then(response => response.json())
            .then(data => {
                dispatch(updatedMovie());
                dispatch(push('/movies'));
            })
            .catch(err => console.log(err));
    }
}

function deletingMovie() {
    return {
        type: 'DELETING_MOVIE',
    };
}

function deletedMovie() {
    return {
        type: 'DELETED_MOVIE',
    };
}

export function deleteMovie(title) {
    return dispatch => {
        dispatch(deletingMovie());

        fetch(`${API_HOST}/api/movies/${title}`, {
            method: 'DELETE',
            headers: createHeaders(),
        })
            .then(() => {
                dispatch(deletedMovie());
                dispatch(fetchMovies());
            })
            .catch(err => console.log(err));
    }
}