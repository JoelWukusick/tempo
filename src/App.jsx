import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import Login from './Login.jsx';
import Main from './Main.jsx';

import UserContextProvider from './UserContextProvider.jsx'
import Cookies from 'js-cookie';
import { CssBaseline } from '@material-ui/core';
import theme from './theme.js';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserContextProvider >
        <CssBaseline />
        <Header />
        <Main />
      </UserContextProvider>
    </ThemeProvider>

    // <div className="app-routes">
    //   <Switch>
    //     <Route path="/login" component={Login} />
    //     <Route path="/" component={Header} />
    //   </Switch>
    // </div>
  )
}
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/about">About</Link>
//             </li>
//             <li>
//               <Link to="/users">Users</Link>
//             </li>
//           </ul>
//         </nav>

//         {/* A <Switch> looks through its children <Route>s and
//             renders the first one that matches the current URL. */}
//         <Switch>
//           <Route path="/about">
//             <About />
//           </Route>
//           <Route path="/users">
//             <Users />
//           </Route>
//           <Route path="/">
//             <Home />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// function Home() {
//   return <h2>Home</h2>;
// }

// function About() {
//   return <h2>About</h2>;
// }

// function Users() {
//   return <h2>Users</h2>;


ReactDOM.render(<App />, document.getElementById('App'));