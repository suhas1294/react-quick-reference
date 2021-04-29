// assume there is a nested components like this:

// app.js
<App>
    <MainHeader />
    <main></main>
</App>

// Mainheader.js
<MainHeader>
    <Navigation />
</MainHeader>

//Navigation.js
<Navigation>
    <LoginButton />
</Navigation>

<LoginButton>
    {/* need login information here which needs to be passed from App component */}
</LoginButton>

// --------------- Basic implementation of Context ---------------

// step-1: store/app-context.js
export const AuthContext = React.createContext({
    isLoggedIn: false
})

// step-2: store/App.js
<AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn, // right side isLoggedIn is a state in App.js
      }}
>
    <App>
        <MainHeader />
        <main></main>
    </App>
</AuthContext.Provider>

// step-3: store/LoginButton.js
const LoginButton =  props => {
    <AuthContext.Consumer>
        {
            ctx => {
                return (
                    <p>user login status: {ctx.isLoggedIn}</p>
                )
            }
        }
    </AuthContext.Consumer>
}