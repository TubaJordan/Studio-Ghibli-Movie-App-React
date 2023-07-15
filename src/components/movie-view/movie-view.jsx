import { useParams } from "react-router";
import { Link } from "react-router-dom"
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ProfileView } from "../profile-view/profile-view";

export const MovieView = ({ movies, onAddToFavorites }) => {
    const handleAddToFavorites = () => {
        onAddToFavorites(movies._id);
    }

    const { movieId } = useParams();

    const movie = movies.find((m) => m._id === movieId)

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
                    <Link to={"/"}>
                        <Button className="backButton"><span>&#11119;</span> Back</Button>
                    </Link>
                    <Button onClick={handleAddToFavorites}>FAV</Button>
                </Card.Body>
            </Card.ImgOverlay>
        </Card >
    );
};

MovieView.propTypes = {
    movies: PropTypes.shape({
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
    onAddToFavorites: PropTypes.func.isRequired
};