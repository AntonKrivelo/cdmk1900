import React, { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Rectangle,
} from 'react-leaflet';
import { LatLngBoundsExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import AreaSelector from './Components/AreaSelector';



const Modal = ({ bounds, onClose }: {
  bounds: LatLngBoundsExpression;
  onClose: () => void }) => {
    const [[lat1, lng1], [lat2, lng2]] = bounds as [[number, number], [number, number]];
  return (
    <div
      style={{
        position: 'fixed',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -30%)',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        padding: '20px',
        zIndex: 1000,
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        width: '300px',
        textAlign: 'center',
      }}
    >
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

const MyMap: React.FC = () => {
  const position: [number, number] = [55.751244, 37.618423]; // Москва
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

export default MyMap;