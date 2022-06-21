import React, {Fragment} from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import classes from '../pages/ContactPage.module.css';

export default function BakeryMap() {

    const center = {lat: 52.25329170143578 , lng: 20.899711145480424};

    const zoom = 15;

    const containerStyle = {
        width: '100%',
        height: '600px',
        margin: 'auto'
      };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAcUgiAjTCSuuB7CREm4RFZjPK85p0E5d4"
    })

    return isLoaded ? <Fragment>
        <div className={classes.map}>
            <GoogleMap center={center} zoom={zoom} mapContainerStyle={containerStyle}>
                <Marker position={center}/>
            </GoogleMap>
        </div>
    </Fragment> : <></>
}
