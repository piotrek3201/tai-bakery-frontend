import { Fragment } from "react";
import { Link } from "react-router-dom";

const Category = props => {

    const categoryName = `/${props.name}`;

    return <Fragment>
        <li><Link to={categoryName}>{props.name}</Link></li>
    </Fragment>
};

export default Category;