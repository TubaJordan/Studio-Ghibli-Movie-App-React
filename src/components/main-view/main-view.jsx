import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

    const sortMoviesByTitle = (movies) => { return movies.slice().sort((a, b) => a.title.localeCompare(b.title)) };
    const sortMoviesByTitleReverse = (movies) => { return movies.slice().sort((b, a) => a.title.localeCompare(b.title)) };
    const sortMoviesByYear = (movies) => { return movies.slice().sort((a, b) => a.releaseYear.localeCompare(b.releaseYear)) };
    const sortMoviesByYearReverse = (movies) => { return movies.slice().sort((b, a) => a.releaseYear.localeCompare(b.releaseYear)) };
    const sortMoviesByGenre = (movies) => { return movies.slice().sort((a, b) => a.title.localeCompare(b.title)).sort((a, b) => a.genres.name.localeCompare(b.genres.name)) };

    const sortOptions = [
        { label: "Title (A-Z)", value: "titleAsc", sortFn: sortMoviesByTitle },
        { label: "Title (Z-A)", value: "titleDesc", sortFn: sortMoviesByTitleReverse },
        { label: "Release Year (Oldest First)", value: "yearAsc", sortFn: sortMoviesByYear },
        { label: "Release Year (Newest First)", value: "yearDesc", sortFn: sortMoviesByYearReverse },
        { label: "Genre", value: "genre", sortFn: sortMoviesByGenre }
    ];

    const [currentSortOption, setCurrentSortOption] = useState("titleAsc");
    const handleSortOptionSelect = (optionValue) => {
        setCurrentSortOption(optionValue);
    }


    useEffect(() => {
        if (movies.length > 0) {
            const sortOption = sortOptions.find(option => option.value === currentSortOption);
            if (sortOptions && sortOptions.sortFn) {
                const sortedMovies = sortOptions.sortFn(movies);
                setFilteredMovies(sortedMovies);
            }
        }
    }, [movies, currentSortOption])


    useEffect(() => {
        const sortOption = sortOptions.find(option => option.value === currentSortOption);
        if (movies.length > 0 && sortOption && sortOption.sortFn) {
            if (searchQuery.trim() === "") {
                setFilteredMovies(sortOption.sortFn(movies));
            } else {
                const filtered = movies.filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase())
                );
                const sortedFilter = sortOption.sortFn(filtered);
                setFilteredMovies(sortedFilter);
            }
        }
    }, [searchQuery, movies, currentSortOption]);


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


    return (
        <BrowserRouter>

            <NavigationBar
                user={user}
                movies={movies}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
                onSearch={setSearchQuery}
                handleSortOptionSelect={handleSortOptionSelect}
                searchQuery={searchQuery}
                sortOptions={sortOptions}
                currentSortOption={currentSortOption}
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
                                            < Col className="mb-5" key={movie._id} xl={4} lg={6} md={6} sm={12} xs={12} aria-label={`Movie: ${movie.title}`}>
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