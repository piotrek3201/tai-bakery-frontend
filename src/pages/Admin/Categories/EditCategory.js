import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import { updateCategory } from "../../../lib/api";
import CategoryForm from "./CategoryForm";

function EditCategory(props) {
  const {sendRequest, status} = useHttp(updateCategory);
  const history = useHistory();
  const params = useParams();
  
  const { categoryId } = params;

  useEffect(() => {
    if (status === 'completed') {
      history.push('/admin');
    }
  }, [status, history]);
  
  function addCategoryHandler(categoryData) {
    categoryData.categoryId = params.categoryId;
    console.log(categoryData);
    sendRequest(categoryData);
  }

  return (
    <CategoryForm onAddCategory={addCategoryHandler} />
  );
}

export default EditCategory;