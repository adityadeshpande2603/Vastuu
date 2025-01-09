import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { Marker } from "react-leaflet";
import { Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"
import Pin from './PIn';
const Map=({listData})=>{
    return(
        <div className="mapContainer rounded-lg h-full w-full ">
        <MapContainer center={listData.length===1 ? [listData[0].latitude,listData[0].longitude] : [20.5937,78.9629]} zoom={7} scrollWheelZoom={false} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
       {   listData.map((e,index)=>(
        <Pin listData={e}></Pin>
       ))}
        </MapContainer>
      </div>
    )
}

export default Map;