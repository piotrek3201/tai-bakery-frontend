import React, {Fragment} from 'react';
import classes from './ContactPage.module.css';
import BakeryMap from '../components/Map';

export default function ContactPage() {
    
    return <Fragment>
        <h1 className={classes.title}>Lokalizacja</h1>
        <h2 className={classes.title}>Cukiernia "Słodzianki"</h2>
        <p className={classes.description}>
            ul. gen. Sylwestra Kaliskiego 2<br />
            00-908 Warszawa<br />
            tel. (+48) 261 839 083
        </p>
        <p className={classes.description}>
            Godziny otwarcia: <br />
            poniedziałek-piątek: 7-21 <br/>
            sobota-niedziela i święta: 8-20 <br />
        </p>
        <BakeryMap />
    </Fragment>
    
}
