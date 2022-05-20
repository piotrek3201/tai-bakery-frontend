import React, {Fragment} from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import classes from './ContactPage.module.css';

export default function ContactPage() {

    const center = {lat: 52.25329170143578 , lng: 20.899711145480424};

    const [map, setMap] = React.useState(null);

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
        googleMapsApiKey: "AIzaSyAPiYdkNKFdX353KgPQ1QkBlvx-Q_CzZYk"
    })

    return isLoaded ? <Fragment>
        <h1 className={classes.title}>Lokalizacja</h1>
        <h2 className={classes.title}>Cukiernia "Słodzianki"</h2>
        <p className={classes.description}>ul. gen. Sylwestra Kaliskiego 2<br />00-908 Warszawa</p>
        <div className={classes.map}>
            <GoogleMap center={center} zoom={12} mapContainerStyle={containerStyle} onLoad={onLoad}>
                <Marker position={center}/>
            </GoogleMap>
        </div>
    </Fragment> : <></>
}
