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
  const map = useMapEvents({
    mousedown(e: LeafletMouseEvent) {
      dragging.current = false;
      setStart(e.latlng);
      setEnd(null);
    },
    mousemove(e: LeafletMouseEvent) {
      if (start) {
        // Проверим, насколько пользователь сместил мышь
        const dx = Math.abs(e.containerPoint.x - map.latLngToContainerPoint(start).x);
        const dy = Math.abs(e.containerPoint.y - map.latLngToContainerPoint(start).y);

        if (dx > 5 || dy > 5) {
          dragging.current = true;
          setEnd(e.latlng);
        }
      }
    },
    mouseup(e: LeafletMouseEvent) {
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
    },
    contextmenu(e) {
      e.originalEvent.preventDefault(); // отключаем меню браузера
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