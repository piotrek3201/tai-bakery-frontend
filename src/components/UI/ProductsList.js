import { Fragment } from "react";
import Card from "./card";
import classes from './card.module.css';

const dummyData = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1588539543889-20cc7ce4df55?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnJvd25pZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500",
      title: "Brownie",
      description: "Chocolate cake...",
      price: 24 + "zł"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1619985632461-f33748ef8f3e?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2hlZXNlY2FrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500",
      title: "Serniczek",
      description: "Delicious cake...",
      price: 20 + "zł"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1633952274330-08186e028447?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTl8fG1lcmluZ3VlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500",
      title: "Beza",
      description: "Blabla...",
      price: 13 + "zł"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1584541305671-af4f46b4be2f?ixlib=rb-1.2.1&raw_url=true&q=60&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fGFwcGxlJTIwcGllfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500",
      title: "Szarlotka",
      description: "Blabla...",
      price: 21 + "zł"
    }
  ]

const ProductsList = () => {
    console.log(dummyData);

    const productsList = dummyData.map((product) => (
        <Card key={product.id} title={product.title} description={product.description} price={product.price} url={product.url}/>
    ));

    return <Fragment>
        <h1 className={classes.product_title}>Ciasta</h1>
        <div className={classes.grid}>
            {productsList}
        </div>
    </Fragment>
}

export default ProductsList;