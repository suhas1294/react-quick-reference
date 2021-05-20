export function App() {
    return (
        <div>
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/welcome" />
                </Route>
                <Route path="/welcome"><Welcome /></Route>
                <Route path="/products" exact><Products /></Route>
                <Route path="/products/:pid"><ProductDetail /></Route>
                {/* path="*" should come at last only. */}
                <Route path="*"><NotFoundPage /></Route>
            </Switch>
        </div>
    )
}