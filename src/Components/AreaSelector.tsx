import {useState, useRef} from 'react';
import { Rectangle, useMapEvents } from 'react-leaflet';
import { LatLngBoundsExpression, LatLng, LeafletMouseEvent  } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const AreaSelector = ({
  onSelect,
}: {
  onSelect: (bounds: LatLngBoundsExpression) => void;
}) => {
  const [start, setStart] = useState<LatLng | null>(null);
  const [end, setEnd] = useState<LatLng | null>(null);
  const dragging = useRef(false);

  useMapEvents({
    mousedown(e: LeafletMouseEvent) {
      if (e.originalEvent.button !== 2) return; 
      dragging.current = false;
      setStart(e.latlng);
      setEnd(null);
      e.originalEvent.preventDefault(); 
    },
    mousemove(e: LeafletMouseEvent) {
      if (start) {
        dragging.current = true;
        setEnd(e.latlng);
      }
    },
    mouseup(e: LeafletMouseEvent) {
      if (e.originalEvent.button !== 2) return; 
      if (start && end && dragging.current) {
        const bounds: LatLngBoundsExpression = [
          [start.lat, start.lng],
          [end.lat, end.lng],
        ];
        onSelect(bounds);
      }
      setStart(null);
      setEnd(null);
      dragging.current = false;
      e.originalEvent.preventDefault();
    },
    contextmenu(e) {
      e.originalEvent.preventDefault(); 
    },
  });

  return start && end && dragging.current ? (
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