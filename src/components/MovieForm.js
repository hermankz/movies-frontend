import React from 'react';
import { bindActions, mapStateToProps } from '../stores';
import * as actions from '../actions';
import { connect } from 'react-redux';
import get from 'lodash.get';

class MovieForm extends React.Component {
    componentDidMount() {
        const titleParam = this.props.match.params.title;
        console.log(titleParam);

        if (titleParam) {
            this.props.actions.setIsUpdate(true);
            this.props.actions.fetchMovie(titleParam);
        } else {
            this.props.actions.setIsUpdate(false);
        }
    }

    handleSubmit(props) {
        return event => {
            event.preventDefault();
            const data = new FormData(event.target);
            const movie = {
                title: data.get('title'),
                director: data.get('director'),
                releaseDate: data.get('releaseDate'),
                type: data.get('type'),
            };

            const { isUpdate } = props;
            if (isUpdate) {
                props.actions.updateMovie(movie);
            } else {
                props.actions.createNewMovie(movie);
            }
        };
    }

    render() {
        const { responseMovie } = this.props;
        const title = get(responseMovie, 'title', '');
        const director = get(responseMovie, 'director', '');
        const releaseDate = get(responseMovie, 'releaseDate', '');
        const type = get(responseMovie, 'type', '');

        return (
            <form onSubmit={this.handleSubmit(this.props)}>
                <div className="form-group row">
                    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" name="title" placeholder="Title" defaultValue={title}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="director" className="col-sm-2 col-form-label">Director</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" name="director" placeholder="Director" defaultValue={director}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="releaseDate" className="col-sm-2 col-form-label">Release Date</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" name="releaseDate" placeholder="Release Date" defaultValue={releaseDate}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="type" className="col-sm-2 col-form-label">Type</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" name="type" placeholder="Type" defaultValue={type}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

const mapProps = state => {
    const { store } = mapStateToProps('movies')(state);

    return {
        isUpdate: store.isUpdate,
        responseMovie: store.responseMovie,
    };
};

export default connect(mapProps, bindActions(actions))(MovieForm);