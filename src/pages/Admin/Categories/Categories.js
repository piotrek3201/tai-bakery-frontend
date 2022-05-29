
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
                <button onClick={() => props.onEditHandler(category)}>Edytuj</button>
              </td>
              <td>
                <button onClick={() => props.onDeleteHandler(category.categoryId)}>Usuń</button>
              </td>
            </tr>
        ));
    
        return categoryList = (
          <table>
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
        );
      }
};

export default Categories;