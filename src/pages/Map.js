import React, {Fragment, useEffect, useState, useRef} from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import classes from './ContactPage.module.css';
// import { MapContainer, TileLayer, useMap, Popup, Marker, Map } from 'react-leaflet';

export default function BakeryMap() {

    // const center = {lat: 52.25329170143578 , lng: 20.899711145480424};

    // return <div className={classes.map}>
    //     <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
    //         <TileLayer
    //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    //         />
    //         <Marker position={center}>
    //         <Popup>
    //             A pretty CSS3 popup. <br /> Easily customizable.
    //         </Popup>
    //         </Marker>
    //     </MapContainer>
    // </div>;

    const center = {lat: 52.25329170143578 , lng: 20.899711145480424};

    const [map, setMap] = React.useState(null);

    const zoom = 10;

    const containerStyle = {
        width: '100%',
        height: '600px',
        margin: 'auto'
      };

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAcUgiAjTCSuuB7CREm4RFZjPK85p0E5d4"
    })

    return isLoaded ? <Fragment>
        <h1 className={classes.title}>Lokalizacja</h1>
        <h2 className={classes.title}>Cukiernia "Słodzianki"</h2>
        <p className={classes.description}>ul. gen. Sylwestra Kaliskiego 2<br />00-908 Warszawa</p>
        <div className={classes.map}>
            <GoogleMap center={center} zoom={zoom} mapContainerStyle={containerStyle} onLoad={onLoad}>
                <Marker position={center}/>
            </GoogleMap>
        </div>
    </Fragment> : <></>
}
