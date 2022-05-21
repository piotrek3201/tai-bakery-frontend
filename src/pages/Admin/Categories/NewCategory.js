import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import { addCategory } from "../../../lib/api";
import CategoryForm from "./CategoryForm";

function NewCategory(props) {
  const {sendRequest, status} = useHttp(addCategory);
  const history = useHistory();

  useEffect(() => {
    if (status === 'completed') {
      history.push('/admin');
    }
  }, [status, history]);
  
  function addCategoryHandler(categoryData) {
    sendRequest(categoryData);
  }

  return (
    <CategoryForm onAddCategory={addCategoryHandler} />
  );
}

export default NewCategory;