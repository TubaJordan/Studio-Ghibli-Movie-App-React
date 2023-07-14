import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100 custom-card p-3 movieCard" onClick={() => onMovieClick(movie)}>
            <Card.Text className="mt-1 cardTop"></Card.Text>
            <Card.Title className="text-center cardTitle">{movie.title}</Card.Title>
            <Card.Img className="mt-2 cardImage" src={movie.imageUrl} />
            <Card.Body className="text-center cardGenre d-flex">
                <Card.Text>{movie.releaseYear}</Card.Text>
                <Card.Text>{`${movie.genres.name.charAt(0).toUpperCase()}${movie.genres.name.slice(1)}`}</Card.Text>
            </Card.Body>
        </Card >
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        releaseYear: PropTypes.string.isRequired,
        director: PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired,
        description: PropTypes.string.isRequired,
        genres: PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};