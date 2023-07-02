import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card"
import { MovieView } from "../movie-view/movie-view"

const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Pom Poko",
            description: "A community of magical shape-shifting raccoon dogs struggle to prevent their forest home from being destroyed by urban development.",
            genre: {
                name: "fantasy",
                description: "Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds."
            },
            director: {
                name: "Isao Takahata",
                bio: "Isao Takahata was a Japanese director, screenwriter and producer. A co-founder of Studio Ghibli, he earned international critical acclaim for his work as a director of Japanese animated feature films.",
                birthYear: 1935,
                deathYear: 2018
            },
            imageUrl: "https://m.media-amazon.com/images/I/51HNZD5N7NL._SY445_.jpg",
            featured: false
        },
        {
            id: 2,
            title: "From Up On Poppy Hill",
            description: "From Up on Poppy Hill follows Umi, a young schoolgirl who runs her family's lodging house, where she lives with her grandmother and siblings while their mother is away in America. Umi's father died in the Korean War, and she raises flags every day from Poppy Hill as a memorial.",
            genre: {
                name: "romance",
                description: "Romance films involve romantic love stories recorded in visual media for broadcast in theatres or on television that focus on passion, emotion, and the affectionate romantic involvement of the main characters."
            },
            director: {
                name: "Gorō Miyazaki",
                bio: "Goro Miyazaki is a Japanese director. He is the son of animator and film director Hayao Miyazaki, who is one of the co-founders of Studio Ghibli. Described as 'reluctant' to follow his father's career, Goro initially worked as a landscaper for many years before entering the film business. He has directed three films — Tales from Earthsea (2006), From Up on Poppy Hill (2011), and Earwig and The Witch (2020).",
                birthYear: 1967
            },
            imageUrl: "https://m.media-amazon.com/images/I/51o+HVdOf8L._SY300_.jpg",
            featured: false
        },
        {
            id: 3,
            title: "Porco Rosso",
            description: "Set in a fictional late 19th century, it follows the adventures of a boy and girl who are trying to keep a powerful crystal from the army, a group of secret agents, and a family of pirates, while searching for a legendary floating castle.",
            genre: {
                name: "fantasy",
                description: "Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds."
            },
            director: {
                name: "Hayao Miyazaki",
                bio: "Hayao Miyazaki is a Japanese animator, filmmaker, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.",
                birthYear: 1941
            },
            imageUrl: "https://m.media-amazon.com/images/I/61TdubxADNL._SX342_.jpg",
            featured: false
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

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

export default MainView;