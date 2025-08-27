import { useUserStore } from "~/stores/user_store";
import { useEffect, useRef } from "react";

export default function User_map() {
    const selectedUser = useUserStore.getState().selectedUser;
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map>(null);

    useEffect(() => {
        // ssr error
        if (typeof window === 'undefined') return;

        const initMap = async () => {
            if (!selectedUser || !mapRef.current) return;

            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }

            const L = await import('leaflet');

            const map = L.map(mapRef.current, { dragging: false }).setView([selectedUser.latitude, selectedUser.longitude], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

            L.marker([selectedUser.latitude, selectedUser.longitude])
                .addTo(map)
                .bindPopup(selectedUser.name)
                .openPopup();

            mapInstanceRef.current = map;
        };

        initMap();

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [selectedUser]);

    return <div ref={mapRef} className={"relative leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom"} style={{ width: 240, height: 240 }}></div>
}
