import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    useEffect(() => {

        if (!token) {
            return;
        }

        fetch("https://moviesapi-4d4b61d9048f.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((movie) => {
                    return {
                        _id: movie._id,
                        title: movie.title,
                        description: movie.description,
                        genres: { name: movie.genre.name },
                        director: { name: movie.director.name },
                        imageUrl: movie.imageUrl,
                        releaseYear: movie.releaseYear
                    };
                });
                setMovies(moviesFromApi);
            });
    }, [token]);

    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <Col md={5} className="welcomeBG">
                    <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }} />
                    <div className="fs-4 text-center">or</div>
                    <SignupView />
                </Col>
            ) : selectedMovie ? (
                <Col md={12}>
                    <MovieView
                        movie={selectedMovie}
                        onBackClick={() => setSelectedMovie(null)}
                    />
                </Col>
            ) : movies.length === 0 ? (
                <div>The list is empty!</div>
            ) : (
                <>

                    {movies.map((movie) => (
                        <Col className="mb-5" key={movie._id} xl={4} lg={6} md={6} sm={12} xs={12}>
                            <MovieCard
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>
                    ))}

                    <Button className="mb-4 col-5 mx-auto logoutButton" onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>

                </>
            )}
        </Row>



    );
};