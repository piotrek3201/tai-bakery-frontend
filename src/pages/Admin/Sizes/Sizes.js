import classes from "./Sizes.module.css";

const Sizes = props => {
    let sizeList;
    if (props.loadedSizes !== null) {
        sizeList = props.loadedSizes.map(size => (
            <tr key={size.sizeId}>
              <td>
                {size.sizeId}
              </td>
              <td>
                {size.diameter} cm
              </td>
              <td>
                <button className={classes.button} onClick={() => props.onEditHandler(size)}>Edytuj</button>
              </td>
              <td>
                <button className={classes.button} onClick={() => props.onDeleteHandler(size.sizeId)}>Usuń</button>
              </td>
            </tr>
        ));
    
        return sizeList = (
          <div className={classes.container}>
            <table className={classes.items}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Średnica</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sizeList}
              </tbody>
            </table>
          </div>
          
        );
      }
};

export default Sizes;