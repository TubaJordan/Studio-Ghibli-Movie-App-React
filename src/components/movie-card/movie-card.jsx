import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

export const MovieCard = ({ movie }) => {

    return (

        <Link to={`/movies/${encodeURIComponent(movie._id)}`} className="links">
            <Card className="h-100 custom-card p-3 movieCard" >
                <Card.Text className="mt-1 cardTop"></Card.Text>
                <Card.Title className="text-center cardTitle">{movie.title}</Card.Title>
                <Card.Img className="mt-2 cardImage" src={movie.imageUrl} />
                <Card.Body className="text-center cardGenre d-flex">
                    <Card.Text>{movie.releaseYear}</Card.Text>
                    <Card.Text>{`${movie.genres.name.charAt(0).toUpperCase()}${movie.genres.name.slice(1)}`}</Card.Text>
                </Card.Body>

            </Card >
        </Link>
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
};