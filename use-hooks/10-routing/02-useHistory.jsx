import {useHistory} from 'react-router-dom';

export default newQuote = props => {

    // useHistory allows us to change browser history, the hostory of pages we visited
    const history = useHistory();

    const addQuoteHandler = (quoteData) => {
        // we can navigate by using push, it pushes a new page on the stack of pagesi.e., a new page on history of pages
        // we can also use replace method instead of push.
        // difference b/w replace and push : with 'push' we can go back by clicking back button in browser.
        // with replace we cannot, replace is like a redirect
        addQuoteToDB(quoteData);
        history.push('/quotes');
    }
}

// alternate way of pushing to history
history.push({
    // pathname: location.pathname,
    pathname: "/",
    search: `?sort=${sortType}`
});