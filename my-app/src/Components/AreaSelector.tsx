import {useState} from 'react';
import { Rectangle, useMapEvents } from 'react-leaflet';
import { LatLngBoundsExpression, LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const AreaSelector = ({
  onSelect,
}: {
  onSelect: (bounds: LatLngBoundsExpression) => void;
}) => {
  const [start, setStart] = useState<LatLng | null>(null);
  const [end, setEnd] = useState<LatLng | null>(null);

  useMapEvents({
    mousedown(e) {
      setStart(e.latlng);
      setEnd(null);
    },
    mousemove(e) {
      if (start) {
        setEnd(e.latlng);
      }
    },
    mouseup() {
      if (start && end) {
        const bounds: LatLngBoundsExpression = [
          [start.lat, start.lng],
          [end.lat, end.lng],
        ];
        onSelect(bounds);
      }
      setStart(null);
      setEnd(null);
    },
  });
  
  return start && end ? (
    <Rectangle
      bounds={[
        [start.lat, start.lng],
        [end.lat, end.lng],
      ]}
      pathOptions={{ color: 'blue' }}
    />
  ) : null;

  
};

export default AreaSelector;