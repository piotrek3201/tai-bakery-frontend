import classes from "./Additions.module.css";

const Additions = props => {
    let additionList;
    if (props.loadedAdditions !== null) {
        additionList = props.loadedAdditions.map(addition => (
            <tr key={addition.additionId}>
              <td>
                {addition.additionId}
              </td>
              <td>
                {addition.additionName} 
              </td>
              <td>
                {addition.additionVisual}
              </td>
              <td>
                <button className={classes.button} onClick={() => props.onEditHandler(addition)}>Edytuj</button>
              </td>
              <td>
                <button className={classes.button} onClick={() => props.onDeleteHandler(addition.additionId)}>Usuń</button>
              </td>
            </tr>
        ));
    
        return additionList = (
          <div className={classes.container}>
            <table className={classes.items}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Dodatek</th>
                  <th>Wygląd</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {additionList}
              </tbody>
            </table>
          </div>
          
        );
      }
};

export default Additions;