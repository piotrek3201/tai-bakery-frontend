import classes from './Products.module.css';

const Products = props => {
    let productList;
    if (props.loadedProducts !== null) {
        productList = props.loadedProducts.map(product => (
          <tr key={product.productId}>
            <td>{product.productId}</td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.category.categoryName}</td>
            <td>{product.isByWeight ? "TAK" : "NIE"}</td>
            <td>{product.isCustomizable ? "TAK" : "NIE"}</td>
            <td>{product.price}</td>
            <td className={classes.product_image} style={{background: `url(${product.imageUrl})`}}></td>
            <td>
              <button className={classes.button} onClick={() => props.onEditHandler(product)}>Edytuj</button>
            </td>
            <td>
              <button className={classes.button} onClick={() => props.onDeleteHandler(product.productId)}>Usuń</button>
            </td>
          </tr>
        ));
    
        return productList = (
            <div className={classes.container}>
                <table className={classes.items}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nazwa produktu</th>
                        <th>Opis</th>
                        <th>Kategoria</th>
                        <th>Na wagę?</th>
                        <th>Dostosowywalny?</th>
                        <th>Cena</th>
                        <th>Zdjęcie</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {productList}
                    </tbody>
                </table>
            </div>
        );
      }
};

export default Products;