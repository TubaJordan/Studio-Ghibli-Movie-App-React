import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useParams } from "react-router";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { movieId } = useParams();

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
                setFilteredMovies(moviesFromApi)
            });
    }, [token]);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredMovies(movies);
        } else {
            const filtered = movies.filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredMovies(filtered);
        }
    }, [searchQuery, movies])


    const handleAddToFavorites = (id) => {

        const movie = movies.find((m) => m._id === id)

        fetch(`https://moviesapi-4d4b61d9048f.herokuapp.com/users/${user.username}/movies/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token} `
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error("Error adding movie to favorties");
                }
            })
            .then((updatedUser) => {
                console.log("User information updated:", updatedUser);
                setUser(updatedUser);
            })
            .catch((error) => {
                console.log("Error updating user information ", error);
            });
    };

    const handleRemoveFromFavorites = (id) => {

        fetch(`https://moviesapi-4d4b61d9048f.herokuapp.com/users/${user.username}/movies/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);
            })
            .catch((error) => {
                console.log("Error removing from favorites ", error)
            })

    };

    const isMovieOrProfileView = (id) => {

        const movie = movies.find((m) => m._id === id)

        console.log(id)
        return (
            location.pathname === `/movies/${id}` || location.pathname === "/profile"
        );
    };

    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
                onSearch={setSearchQuery}

            />
            <Row className="justify-content-md-center">
                <Routes>

                    <Route
                        path="/signup"
                        element={
                            <>
                                {!user ? (
                                    <Col md={5} className="welcomeBG">
                                        <SignupView />
                                    </Col>
                                ) : (
                                    <Navigate to="/" />
                                )}
                            </>
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            <>
                                {!user ? (
                                    <Col md={5} className="welcomeBG">
                                        <LoginView
                                            onLoggedIn={(user, token) => {
                                                setUser(user);
                                                setToken(token);
                                            }}
                                        />
                                    </Col>
                                ) : (
                                    <Navigate to="/" />
                                )}
                            </>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col>
                                        <ProfileView
                                            user={user}
                                            token={token}
                                            setUser={setUser}
                                            movies={movies}
                                            favorites={user.favoriteMovies}
                                            onLoggedOut={() => {
                                                setUser(null);
                                                setToken(null);
                                                localStorage.clear();
                                            }}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />




                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={12}>
                                        <MovieView
                                            movies={movies}
                                            favorites={user.favoriteMovies}
                                            onAddToFavorites={handleAddToFavorites}
                                            onRemoveFromFavorites={handleRemoveFromFavorites}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="login" replace />
                                ) : filteredMovies.length === 0 ? (
                                    <Col>This list is empty!</Col>
                                ) : (
                                    <>
                                        {filteredMovies.map((movie) => (
                                            < Col className="mb-5" key={movie._id} xl={4} lg={6} md={6} sm={12} xs={12} >
                                                <MovieCard
                                                    movie={movie}
                                                    favorites={user.favoriteMovies}
                                                    onAddToFavorites={handleAddToFavorites}
                                                    onRemoveFromFavorites={handleRemoveFromFavorites}
                                                />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />

                </Routes>
            </Row>
        </BrowserRouter >
    );
};