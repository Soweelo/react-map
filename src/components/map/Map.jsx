import "./map.css"
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    LayersControl,
    LayerGroup,
} from "react-leaflet";
import {useRef, useMemo, useState, useEffect} from "react";
import DraggableMarker from "../draggableMarker/DraggableMarker";
import Legend from "../legend/Legend";
import L, {latLngBounds, Icon} from "leaflet";
import MapData from "./../../dummydata.json";

;


export default function Map({showModal, mapId, setMapId}) {
    // Variables
    const lightBulb = new Icon({
        iconUrl: "images/light-bulb_icon_small.png",
        iconSize: [70, 70],
    });
    const stockage = new Icon({
        iconUrl: "images/stockage_icon.png",
        iconSize: [70, 70],
    });
    const map = useRef();

    const tileLayer = useRef();
    const marker = useRef();
    const [dataSets, setDataSets] = useState(MapData.tilesMaps[mapId].dataLayers) //array of layers name
    const handleClick = (e) => {
        e.preventDefault();
        showModal.set(true);
    };
    useEffect(() => {
        if (tileLayer.current) {
            tileLayer.current.setUrl(MapData.tilesMaps[mapId].mapUrl);
            setDataSets(MapData.tilesMaps[mapId].dataLayers);
        }

    }, [mapId]);

    return (
        <div className="mapContainer">
            <div className="title">
                <h1>Try me</h1>
            </div>
            <div className="mapWrapper">
                <Legend
                    setMapId={setMapId}
                />
                <MapContainer
                    ref={map}
                    center={MapData.tilesMaps[mapId].center}
                    zoom={2}
                    scrollWheelZoom={true}
                    zoomControl={false}
                    // maxBounds={latLngBounds(NE, SW)}
                    // maxBounds={latLngBounds([-76, -180], [76, 180])}
                    maxBounds={
                        MapData.tilesMaps[mapId].crs
                            ? latLngBounds(
                                MapData.tilesMaps[mapId].maxBounds[0],
                                MapData.tilesMaps[mapId].maxBounds[1]
                            )
                            : [
                                [-76, -180],
                                [76, 180],
                            ]
                    }
                >
                    <TileLayer
                        ref={tileLayer}
                        url={MapData.tilesMaps[mapId].mapUrl}
                        minZoom="1"
                        maxZoom="4"
                        continuousWorld={false}
                        noWrap={true}
                        crs={MapData.tilesMaps[mapId].crs ? L.CRS.Simple : null}
                    />
                    {/*<DraggableMarker/>*/}
                    {dataSets.map(dataSet => (
                            MapData[dataSet].map(featurePoint => (
                                <Marker
                                        position={featurePoint.geometry.coordinates}
                                        icon={featurePoint.type == "consumeFeatures" ? lightBulb : stockage}
                                        key={featurePoint.properties.ID}
                                    >

                                        {featurePoint.type == "consumeFeatures" ?
                                        <Popup
                                            width={90}
                                            position={featurePoint.geometry.coordinates}
                                        >
                                            <div className="elecPopupWrapper">
                                                <b>{featurePoint.properties.NAME}</b>
                                                <br/>
                                                <div
                                                    className="elecPopupLink"
                                                    onClick={handleClick}
                                                >
                                                    {featurePoint.properties.DESCRIPTIO}
                                                    <img
                                                        src="/images/nosgestesclimat.png"
                                                        width={80}
                                                        height={80}
                                                        alt=""
                                                        className="elecPopupImg"
                                                    />
                                                </div>
                                            </div>
                                        </Popup> :
                                            <Popup
                                                width={90}
                                                position={featurePoint.properties.coordinates}
                                            >
                                                <b>{featurePoint.properties.NAME}</b>
                                            </Popup>
                                        }
                                    </Marker>
                                )
                            )

                        )
                    )}


                </MapContainer>
            </div>
        </div>
    );
};
