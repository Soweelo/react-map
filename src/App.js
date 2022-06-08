import "./leaflet.css"
import "./app.css";
import Modal from "./components/modal/Modal"
import Map from "./components/map/Map"
import { useState } from "react";
import useTrait from "./hooks/useTrait";
import MapData from "./dummydata.json";

function App() {
    const showModal= useTrait(false);
    const [mapId, setMapId] = useState("landscapeMap");

    return (
        <div className="homeContainer">
            <Map
                showModal={showModal}
                mapId={mapId}
                setMapId={setMapId}
            />
            <Modal showModal={showModal} />
        </div>
    );
}

export default App;
