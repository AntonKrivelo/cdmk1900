import { LatLngBoundsExpression } from 'leaflet';

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

export default Modal;