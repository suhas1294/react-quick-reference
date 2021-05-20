// products.jsx
export default Products = props => {
    return(
        <ul>
            <li><Link to=""></Link></li>
            <li><Link to=""></Link></li>
            <li><Link to=""></Link></li>
        </ul>
    )
}

// app.js
export function App(){
    return(
        <div>
            <Route path="/welcome"><Welcome /></Route>
            <Route path="/products"><Products /></Route>
            <Route path="/product-detail/:pid"><ProductDetail /></Route>
        </div>
    )
}

// ProductDetail.jsx
import {useParams} from 'react-router-dom';

export default ProductDetail = props => {

    // params will be an object with key-value pair
    const params = useParams();
    console.log(params.pid)

    return(
        <section>
            <h1>props.product_title</h1>
        </section>
    )
}