import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { Marker } from "react-leaflet";
import { Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"
const Pin=({listData})=>{
    return(
        <Marker position={[listData.latitude,listData.longitude ]}>
        <Popup >
            <div>
          <img src={listData.img} alt="" />
          </div>
          <div>
          <h1>{listData.bedroom} Bedroom</h1>
          <h1>{listData.price}</h1>
          </div>
        </Popup>
      </Marker>

    )
}

export default Pin;