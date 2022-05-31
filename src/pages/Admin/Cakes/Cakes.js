import classes from "./Cakes.module.css";

const Cakes = props => {
    let cakeList;
    if (props.loadedCakes !== null) {
        cakeList = props.loadedCakes.map(cake => (
            <tr key={cake.cakeId}>
              <td>
                {cake.cakeId}
              </td>
              <td>
                {cake.cakeName} 
              </td>
              <td>
                <div style={{backgroundColor: cake.cakeColor}}>PLACEHOLDER</div>
              </td>
              <td>
                <button className={classes.button} onClick={() => props.onEditHandler(cake)}>Edytuj</button>
              </td>
              <td>
                <button className={classes.button} onClick={() => props.onDeleteHandler(cake.cakeId)}>Usuń</button>
              </td>
            </tr>
        ));
    
        return cakeList = (
          <div className={classes.container}>
            <table className={classes.items}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Rodzaj ciasta</th>
                  <th>Kolor ciasta</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cakeList}
              </tbody>
            </table>
          </div>
          
        );
      }
};

export default Cakes;