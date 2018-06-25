const reducers = {
    FETCHING_MOVIES: (movies) => ({
        ...movies,
        isFetching: true,
    }),
    FETCHED_MOVIES: (movies, { response }) => ({
        ...movies,
        response,
        isFetching: false,
    }),
    SET_MOVIE_UPDATE: (movies, { isUpdate }) => ({
        ...movies,
        isUpdate,
        responseMovie: null,
    }),
    FETCHING_SINGLE_MOVIE: (movies) => ({
        ...movies,
        isFetching: true,
    }),
    FETCHED_SINGLE_MOVIE: (movies, { responseMovie }) => ({
        ...movies,
        responseMovie,
        isFetching: false,
    }),
    CREATING_MOVIE: (movies) => ({
        ...movies,
        isFetching: true,
    }),
    CREATED_MOVIE: (movies, { response }) => ({
        ...movies,
        isFetching: false,
    }),
    UPDATING_MOVIE: (movies) => ({
        ...movies,
        isFetching: true,
    }),
    UPDATED_MOVIE: (movies, { response }) => ({
        ...movies,
        isFetching: false,
    }),
    DELETING_MOVIE: (movies) => ({
        ...movies,
        isFetching: true,
    }),
    DELETED_MOVIE: (movies, { response }) => ({
        ...movies,
        isFetching: false,
    }),
};

export default (state = {}, action) =>
    reducers && reducers[action.type] ? reducers[action.type](state, action) : state;