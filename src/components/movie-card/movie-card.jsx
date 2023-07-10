import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100 bg-light" onClick={() => onMovieClick(movie)}>
            <Card.Img variant="top" src={movie.imageUrl} />
            <Card.Body className="text-center">
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{`${movie.genres.name.charAt(0).toUpperCase()}${movie.genres.name.slice(1)}`}</Card.Text>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
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