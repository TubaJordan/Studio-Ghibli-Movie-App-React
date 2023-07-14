import { useParams } from "react-router";
import { Link } from "react-router-dom"
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieView = ({ movie }) => {
    const { movieId } = useParams();

    const Movies = movie.find((m) => m._id === movieId);


    return (
        <Card className="mb-3 mt-3 cardView">
            <Card.Img src={Movies.imageUrl} className="imgCard" />
            <Card.ImgOverlay>
                <Card.Body className="text-left">
                    <Card.Text className="viewTitle text-center">{Movies.title}</Card.Text>
                    <Card.Text><span className="fw-bold">Description:</span> {Movies.description}</Card.Text>
                    <Card.Text><span className="fw-bold">Genre:</span> {`${Movies.genres.name.charAt(0).toUpperCase()}${Movies.genres.name.slice(1)}`}</Card.Text>
                    <Card.Text><span className="fw-bold">Director:</span> {Movies.director.name}</Card.Text>
                    <Card.Text><span className="fw-bold">Release Year:</span> {Movies.releaseYear}</Card.Text>
                    <Link to={"/"}>
                        <Button className="backButton"><span>&#11119;</span> Back</Button>
                    </Link>
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
    }).isRequired
};