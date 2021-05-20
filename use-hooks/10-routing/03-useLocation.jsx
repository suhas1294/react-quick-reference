// we use 'useLocation' to read the query params in the url
// it gives information about currently loaded page.
// useHistory: change and manage url
// useLocation: gives info about currently loaded page
import { useLocation } from 'react-router-dom';

const sortQuotes = (quotes, ascending) => {
    // sort logic
};

export default QuoteList = (props) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const isSortingAscending = queryParams.get('sort') === 'asc';

    const changeSortingHandler = () => {
        history.push('/quotes?sort=' + (isSortingAscending ? 'desc' : 'asc'));
    };

    const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

    return(
        <>
            {/* UI to display */}
        </>
    )
}