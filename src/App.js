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
      clientId='249911573207-6d8rhfrbq2n9p1tgub9g5of8bt19rvea.apps.googleusercontent.com'
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
