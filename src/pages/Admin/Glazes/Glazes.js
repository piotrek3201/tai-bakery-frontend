import classes from "./Glazes.module.css";

const Glazes = props => {
    let glazeList;
    if (props.loadedGlazes !== null) {
        glazeList = props.loadedGlazes.map(glaze => (
            <tr key={glaze.glazeId}>
              <td>
                {glaze.glazeId}
              </td>
              <td>
                {glaze.glazeName} 
              </td>
              <td>
                <div style={{backgroundColor: glaze.glazeColor}}>{'\u00A0'}</div>
              </td>
              <td>
                <button className={classes.button} onClick={() => props.onEditHandler(glaze)}>Edytuj</button>
              </td>
              <td>
                <button className={classes.button} onClick={() => props.onDeleteHandler(glaze.glazeId)}>Usuń</button>
              </td>
            </tr>
        ));
    
        return glazeList = (
          <div className={classes.container}>
            <table className={classes.items}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Rodzaj polewy</th>
                  <th>Kolor polewy</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {glazeList}
              </tbody>
            </table>
          </div>
          
        );
      }
};

export default Glazes;