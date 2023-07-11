import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <Card className="mb-3 mt-3 cardView">
            <Card.Img src={movie.imageUrl} className="imgCard" />
            <Card.ImgOverlay>
                <Card.Body className="text-left">
                    <Card.Text className="viewTitle text-center">{movie.title}</Card.Text>
                    <Card.Text><span className="fw-bold">Description:</span> {movie.description}</Card.Text>
                    <Card.Text><span className="fw-bold">Genre:</span> {`${movie.genres.name.charAt(0).toUpperCase()}${movie.genres.name.slice(1)}`}</Card.Text>
                    <Card.Text><span className="fw-bold">Director:</span> {movie.director.name}</Card.Text>
                    <Card.Text><span className="fw-bold">Release Year:</span> {movie.releaseYear}</Card.Text>
                    <Button className="backButton" onClick={onBackClick}><span>&#11119;</span> Back</Button>
                </Card.Body>
            </Card.ImgOverlay>
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