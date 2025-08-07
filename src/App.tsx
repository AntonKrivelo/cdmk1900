import React, { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Rectangle,
} from 'react-leaflet';
import { LatLngBoundsExpression } from 'leaflet';
import AreaSelector from './Components/AreaSelector';
import './App.css';
import 'leaflet/dist/leaflet.css';


const Modal = ({ bounds, onClose }: {
  bounds: LatLngBoundsExpression;
  onClose: () => void }) => {
    const [[lat1, lng1], [lat2, lng2]] = bounds as [[number, number], [number, number]];
  return (
    <div className='modal'>
      <h3>Выделенная область</h3>
      <p>
        <strong>Координата 1:</strong><br />
        {lat1.toFixed(6)}, {lng1.toFixed(6)}
      </p>
      <p>
        <strong>Координата 2:</strong><br />
        {lat2.toFixed(6)}, {lng2.toFixed(6)}
      </p>
      <button onClick={onClose} style={{ marginTop: '10px' }}>
        Закрыть
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const position: [number, number] = [53.975488, 27.411509]; 
  const [selectedBounds, setSelectedBounds] = useState<LatLngBoundsExpression | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSelect = (bounds: LatLngBoundsExpression) => {
    setSelectedBounds(bounds);
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
        {selectedBounds && (
          <Rectangle bounds={selectedBounds} pathOptions={{ color: 'red' }} />
        )}
      </MapContainer>

      {showModal && selectedBounds && (
        <Modal
          bounds={selectedBounds}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default App;