

type LatLngTuple = [number, number];

type Corners = {
  topLeft: LatLngTuple;
  topRight: LatLngTuple;
  bottomRight: LatLngTuple;
  bottomLeft: LatLngTuple;
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  corners: Corners | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, corners }) => {
  if (!isOpen || !corners) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Выделенная область</h2>
        <ul>
          <li className="list-item"><strong>Верхний левый</strong>: {corners.topLeft.join(', ')}</li>
          <li className="list-item"><strong>Нижний левый</strong>: {corners.bottomLeft.join(', ')}</li>
          <li className="list-item"><strong>Нижний правый</strong>: {corners.bottomRight.join(', ')}</li>
          <li className="list-item"><strong>Верхний правый</strong>: {corners.topRight.join(', ')}</li>
        </ul>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default Modal;