import { Fragment } from "react";
import { Link } from "react-router-dom";

const Category = props => {

    const link = `/products/${props.id}`;

    return <Fragment>
        <li><Link to={link}>{props.name}</Link></li>
    </Fragment>
};

export default Category;