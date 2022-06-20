import classes from "./Fillings.module.css";

const Fillings = props => {
    let fillingList;
    if (props.loadedFillings !== null) {
        fillingList = props.loadedFillings.map(filling => (
            <tr key={filling.fillingId}>
              <td>
                {filling.fillingId}
              </td>
              <td>
                {filling.fillingName} 
              </td>
              <td>
                <div style={{backgroundColor: filling.fillingColor}}>{'\u00A0'}</div>
              </td>
              <td>
                <button className={classes.button} onClick={() => props.onEditHandler(filling)}>Edytuj</button>
              </td>
              <td>
                <button className={classes.button} onClick={() => props.onDeleteHandler(filling.fillingId)}>Usuń</button>
              </td>
            </tr>
        ));
    
        return fillingList = (
          <div className={classes.container}>
            <table className={classes.items}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Rodzaj nadzienia</th>
                  <th>Kolor nadzienia</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {fillingList}
              </tbody>
            </table>
          </div>
          
        );
      }
};

export default Fillings;