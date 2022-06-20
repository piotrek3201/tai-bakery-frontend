import { useParams } from "react-router-dom";
import classes from "./AboutPage.module.css";

function AboutPage(){
  const params = useParams();
  return (
    <div className={classes.containerAbout}>
      <div className={classes.photoContainer}>
        <div className={classes.titleDesc}>
          <div className={classes.title}>
            <h1>O cukierni Słodzianki</h1>
            <hr />
          </div>
          <p>Cukiernia “Słodzianki” powstała w 2022 roku. Jako pierwsza cukiernia w Polsce posiada kreator tortów, dzięki któremu w 5 min możesz stworzyć swój wymarzony tort, a co najważniejsze – będzie UNIKATOWY. Posiadamy bogaty asortyment wyrobów cukierniczych: ciast, tortów, lodów, cukierków i babeczek. Cechą charakterystyczną naszych produktów jest niepowtarzalny smak, który uzyskujemy dzięki stosowaniu naturalnych składników i sprawdzonych, tradycyjnych receptur. Każde zamówienie traktujemy jako unikatowy projekt, łącząc tradycyjne, domowe receptury z pasją zdobienia i dbałością o każdy detal. Zamówienia są specjalnie pakowane w opakowania termiczne wypełnione suchym lodem, aby nasze wyroby dotarły świeże i wyglądały idealnie.</p>
        </div>
        <img src="https://nationaltoday.com/wp-content/uploads/2019/10/national-cake-decorating-day.jpg"></img>
      </div>
    </div>
    
  );
}

export default AboutPage;