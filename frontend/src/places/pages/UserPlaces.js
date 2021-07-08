import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "nagoya castle",
    description: "a castle",
    imageUrl: "https://source.unsplash.com/random",
    address: "1-1 Honmaru, Naka Ward, Nagoya, Aichi 460-0031",
    location: {
      lat: 35.1847501,
      lng: 136.8996883,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "nagoya castle",
    description: "a castle",
    imageUrl: "https://source.unsplash.com/random",
    address: "1-1 Honmaru, Naka Ward, Nagoya, Aichi 460-0031",
    location: {
      lat: 35.1847501,
      lng: 136.8996883,
    },
    creator: "u2",
  },
];
const UserPlaces = () => {
  const userId = useParams().userId;
  const filteredPlaces = DUMMY_PLACES.filter(
    (place) => place.creator === userId
  );
  return <PlaceList items={filteredPlaces} />;
};

export { UserPlaces, DUMMY_PLACES };
