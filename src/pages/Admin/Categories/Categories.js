import classes from "./Categories.module.css";

const Categories = props => {
    let categoryList;
    if (props.loadedCategories !== null) {
        categoryList = props.loadedCategories.map(category => (
            <tr key={category.categoryId}>
              <td>
                {category.categoryId}
              </td>
              <td>
              {category.categoryName} 
              </td>
              <td>
                <button className={classes.button} onClick={() => props.onEditHandler(category)}>Edytuj</button>
              </td>
              <td>
                <button className={classes.button} onClick={() => props.onDeleteHandler(category.categoryId)}>Usuń</button>
              </td>
            </tr>
        ));
    
        return categoryList = (
          <div className={classes.container}>
            <table className={classes.items}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nazwa kategorii</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {categoryList}
              </tbody>
            </table>
          </div>
          
        );
      }
};

export default Categories;