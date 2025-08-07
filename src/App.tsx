import React, { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Rectangle,
} from 'react-leaflet';
import AreaSelector from './Components/AreaSelector';
import './App.css';
import 'leaflet/dist/leaflet.css';
import Modal from './Components/Modal/Modal';

type LatLngTuple = [number, number];

type Corners = {
  topLeft: LatLngTuple;
  topRight: LatLngTuple;
  bottomRight: LatLngTuple;
  bottomLeft: LatLngTuple;
};

const App: React.FC = () => {
  const position: LatLngTuple  = [53.922579, 27.517172]
  const [area, setArea] = useState<Corners | null>(null);

  const [showModal, setShowModal] = useState(false);

  const handleSelect = (corners: Corners) => {
    setArea(corners);
    setShowModal(true);
    
  };

  return (
    <>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        <AreaSelector onSelect={handleSelect} />
        {area && (
          <Rectangle  bounds={[area.bottomLeft, area.topRight]}
          pathOptions={{ color: 'red' }} />
        )}
      </MapContainer>

      {showModal && area && (
        <Modal
          isOpen={true} onClose={() => setShowModal(false)} corners={area}
        />
      )}
    </>
  );
};

export default App;