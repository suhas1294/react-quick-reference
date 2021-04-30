// src/App.js
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from './store/ui-slice';

let isInitial = true;

export default function App() {
    const dispatch = useDispatch();
    const showCart = useSelector((state) => state.ui.cartIsVisible);
    const cart = useSelector((state) => state.cart);
    const notification = useSelector((state) => state.ui.notification);

    useEffect(() => {
        const sendCartData = async () => {
            dispatch( uiActions.showNotification( { status: 'pending', message: 'Sending cart data!'}));
            const response = await fetch(
                'https://react-http-6b4a6.firebaseio.com/cart.json',
                {method: 'PUT', body: JSON.stringify(cart)}
            );
            if (!response.ok) throw new Error('Sending cart data failed.');
            dispatch(uiActions.showNotification({status: 'success', message: 'Sent cart data successfully!'}));
        };

        if (isInitial) {
            isInitial = false;
            return;
        }

        sendCartData()
            .catch( error => {
                dispatch(uiActions.showNotification({status: 'error',message: 'Sending cart data failed!'}));
            });
    }, [cart, dispatch]);

    return (
        <Fragment>
            {notification && (
                <Notification
                    status={notification.status}
                    message={notification.message}
                />
            )}
            <Layout>
                {showCart && <Cart />}
                <Products />
            </Layout>
        </Fragment>
    );
}