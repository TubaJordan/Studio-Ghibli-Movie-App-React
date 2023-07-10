import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <Card className="h-100 border-0 mb-3 mt-3 bg-light shadow rounded">
            <Card.Img variant="top" src={movie.imageUrl} className="imgCard m-auto mb-3 mt-4 shadow rounded" />
            <Card.Body className="text-center">
                <Card.Text className="border-top"></Card.Text>
                <Card.Text><span className="fw-bold">Title:</span> {movie.title}</Card.Text>
                <Card.Text><span className="fw-bold">Description:</span> {movie.description}</Card.Text>
                <Card.Text><span className="fw-bold">Genre:</span> {`${movie.genres.name.charAt(0).toUpperCase()}${movie.genres.name.slice(1)}`}</Card.Text>
                <Card.Text><span className="fw-bold">Director:</span> {movie.director.name}</Card.Text>
                <Button onClick={onBackClick}>Back</Button>
            </Card.Body>
        </Card >
    );
};

MovieView.propTypes = {
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
    onBackClick: PropTypes.func.isRequired
};