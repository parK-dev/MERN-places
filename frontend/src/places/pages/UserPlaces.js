import React from "react";

import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "nagoya castle",
    description: "a castle",
    imageUrl: "https://source.unsplash.com/random",
    address: "〒460-0031 愛知県名古屋市中区本丸１−１",
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
    address: "〒460-0031 愛知県名古屋市中区本丸１−１",
    location: {
      lat: 35.1847501,
      lng: 136.8996883,
    },
    creator: "u2",
  },
];
const UserPlaces = () => {
  return <PlaceList items={DUMMY_PLACES} />;
};

export default UserPlaces;
