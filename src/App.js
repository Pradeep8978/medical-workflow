import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css"
import Header from './components/header/Header';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import CaseList from './containers/case-list/CaseList'
import NewCase from './containers/new-case/NewCase'
import Login from './containers/login/Login';
import CaseDetails from './containers/case-details/CaseDetails';

function PrivateRoute({ component: Component, ...rest }) {
  console.log(store.getState())
  const { isAuthenticated } = store.getState().auth;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          <Component {...rest}/>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <div className="App">
      <Header/>
    </div>
    <Switch>
      <PrivateRoute  exact path="/" component={CaseList}/>
      <PrivateRoute exact path="/new" component={NewCase}/>
      <PrivateRoute exact path="/case/:id/edit" component={NewCase}/>
      <PrivateRoute exact path="/case/:id/details" component={CaseDetails}/>
      <Route exact path="/login" component={Login}/>
    </Switch>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
