import {useState, useRef} from 'react';
import { Rectangle, useMapEvents } from 'react-leaflet';
import { LatLng, LeafletMouseEvent  } from 'leaflet';
import 'leaflet/dist/leaflet.css';

type LatLngTuple = [number, number];

type Corners = {
  topLeft: LatLngTuple;
  topRight: LatLngTuple;
  bottomRight: LatLngTuple;
  bottomLeft: LatLngTuple;
};

const AreaSelector = ({
  onSelect,
}: {
  onSelect: (corners: Corners) => void;
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
        const lat1 = start.lat;
        const lng1 = start.lng;
        const lat2 = end.lat;
        const lng2 = end.lng;

        const top = Math.max(lat1, lat2);
        const bottom = Math.min(lat1, lat2);
        const left = Math.min(lng1, lng2);
        const right = Math.max(lng1, lng2);

        const corners: Corners = {
          topLeft: [top, left],
          topRight: [top, right],
          bottomRight: [bottom, right],
          bottomLeft: [bottom, left],
        };

        onSelect(corners);
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