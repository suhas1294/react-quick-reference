// useRouteMatch is more like useLocation, but it has more information about currently loaded route.
// not just url, but some internally managed data that react router is aware of.
// this is in most of the cases used in conjuction with nested routes.
// check for comments below to know more.

import { useRouteMatch } from 'react-router-dom';

export default QuoteDetail = () => {
    const match = useRouteMatch();
  
    if (!quote) {
      return <p>No quote found!</p>;
    }
  
    return (
      <Fragment>
        <HighlightedQuote text={quote.text} author={quote.author} />
        {/* 
            match.path will give "/quotes/:quoteId",
            So, in nested routes - instead of hardcoding like "/quotes/:quoteId"
            we use match.path instead.
            This is mainly to use react functionality instead of hard coding.
        */}
        
        {/* <Route path={`/quotes/${params.quoteId}`} exact> */}
        <Route path={match.path} exact>
          <div className='centered'>
            {/* <Link className='btn--flat' to={`quotes/${params.quoteId/comments`}> */}
            <Link className='btn--flat' to={`${match.url}/comments`}>
              Load Comments
            </Link>
          </div>
        </Route>
        {/* Since its a route component and not link component, we can use placeholder instead of concrete value */}
        {/* <Route path={`quotes/${params.quoteId/comments`}> */}
        <Route path={`${match.path}/comments`}>
          <Comments />
        </Route>
      </Fragment>
    );
  };
  
//  match.url : actaul url in browser : ex : localhost:8080/quotes/q2/comments
//  match.path : react code for url : ex : localhost:8080/quotes/:quoteId/comments
//  For <Link> use match.url, for <Route> you can use match.path
//  location.pathname = match.path