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
import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

// step-2: store/index.js
import { AuthContextProvider } from './store/auth-context';

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById('root')
);

// step-3: store/LoginButton.js
import { useContext } from 'react';
import AuthContext from './store/auth-context';

const LoginButton =  props => {
    const ctx = useContext(AuthContext);
    return (
        <>
            <SomeDashboard />
            <p>user login status: {ctx.isLoggedIn}</p>
        </>
    )
}