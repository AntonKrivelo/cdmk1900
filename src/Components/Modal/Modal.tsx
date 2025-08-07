import { LatLngBoundsExpression } from 'leaflet';

const Modal = ({ bounds, onClose }: {
  bounds: LatLngBoundsExpression;
  onClose: () => void }) => {
    const [[lat1, lng1]] = bounds as [[number, number]];
  return (
    <div className='modal'>
      <h3>Выделенная область</h3>
      <p>
        <strong>Координаты:</strong><br />
        {lat1.toFixed(6)}, {lng1.toFixed(6)}
      </p>
      <button onClick={onClose} style={{ marginTop: '10px' }}>
        Закрыть
      </button>
    </div>
  );
};

export default Modal;