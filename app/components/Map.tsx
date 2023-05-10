'use client';
import React, { useEffect, useState } from 'react';

import { default as Leaflet } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useGeolocated } from 'react-geolocated';
import ScaleLoader from 'react-spinners/ScaleLoader';

import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

//@ts-ignore
delete Leaflet.Icon.Default.prototype._getIconUrl;
Leaflet.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

type Props = {
  center?: number[];
};

const Map = ({ center }: Props) => {
  const [userPosition, setUserPosition] = useState<(number | undefined)[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setUserPosition(() => [coords?.latitude, coords?.longitude]);
    }, 3000);
    setIsLoading(false);
    return () => clearTimeout(timer);
  }, [coords]);

  const currentPosition = !isLoading ? userPosition : [51, 0.09];

  return (
    <>
      <div className="">
        {userPosition.length === 0 ? (
          <div className="flex items-center justify-center text-center">
            <div>
              <ScaleLoader color="#ffe4e6" />
              <small className="block text-center">Fetching your current location</small>
            </div>
          </div>
        ) : (
          <MapContainer
            center={(center as Leaflet.LatLngExpression) || currentPosition}
            zoom={center || currentPosition ? 4 : 2}
            scrollWheelZoom={false}
            className="h-[35vh] rounded-lg"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={(center as Leaflet.LatLngExpression) || currentPosition}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </>
  );
};

export default Map;
