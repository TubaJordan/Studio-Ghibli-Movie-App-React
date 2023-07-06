import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card"
import { MovieView } from "../movie-view/movie-view"

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://moviesapi-4d4b61d9048f.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const moviesFromApi = data.map((movie) => {
                    return {
                        id: movie._id,
                        title: movie.title,
                        description: movie.description,
                        genre: { name: movie.genre.name },
                        director: { name: movie.director.name },
                        imageUrl: movie.imageUrl
                    };
                });

                setMovies(moviesFromApi);
            });
    }, []);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
                />
            ))}
        </div>
    );
};