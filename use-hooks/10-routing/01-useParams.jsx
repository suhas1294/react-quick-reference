import {useParams} from 'react-router-dom';

// https://example.com/products/:pid
// we need to extract pid in above url, hence use useParams

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