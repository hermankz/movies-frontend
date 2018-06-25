import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Movies from './components/Movies';
import MovieForm from './components/MovieForm';

const App = () => (
    <div>
        <header>
            <nav className="nav breadcrumb">
                <Link to="/" className="nav-link active">Home</Link>
                <Link to="/movies" className="nav-link">Movies</Link>
                <Link to="/movie-new" className="nav-link">New Movie</Link>
            </nav>
        </header>

        <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/movies" component={Movies} />
            <Route exact path="/movie-new" component={MovieForm} />
            <Route exact path="/movie/:title" component={MovieForm} />
        </main>
    </div>
);

export default App;
