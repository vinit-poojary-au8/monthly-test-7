import { connect } from 'react-redux';
// import NotePosts from './components/Notes';
import Login from './components/Login';
import { GoogleLogout } from "react-google-login";
import { logOutUser } from "./redux/actions/userAction";
// import WeatherApp from './page/WeatherApp';
import HomePage from './page/HomePage';



function App({user, logOutUser}) {

  const handleLogoutFailure = (err) => {
    console.error(err);
  };

  const handleLogoutSuccess = () => {
    logOutUser();
  };

  return (
    <div className="App">
      {!user ?
      <Login/> :  <GoogleLogout
      clientId='249911573207-aqnueua6d7ril0audjh5oiireo2q13sj.apps.googleusercontent.com'
      buttonText="Logout"
      onLogoutSuccess={handleLogoutSuccess}
      onFailure={handleLogoutFailure}
    />}
      <HomePage/>
    </div>
  );
}

const mapStateToProps = (state) => {
  
  return {
    user: state.userState.user
  }
}

export default connect(mapStateToProps, { logOutUser })(App);
