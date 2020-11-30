import React from "react";
import { GoogleLogin, GoogleLogout } from 'react-google-login';

class GoogleAuth extends React.Component {
    state = {
        isSignedIn: null
    };

    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            window.gapi.client
                .init({
                    clientId: "249911573207-6d8rhfrbq2n9p1tgub9g5of8bt19rvea.apps.googleusercontent.com",
                    scope: "email", 
                })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.handleAuthChange();
                    this.auth.isSignedIn.listen(this.handleAuthChange);
                });
        });
    }

    handleAuthChange = () => {
        this.setState({
            isSignedIn: this.auth.isSignedIn.get()
        });
    };

    handleSignIn = () => {
        this.auth.signIn();
    };

    handleSignOut = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {
            return <GoogleLogout onClick = {this.handleSignOut} > Sign Out </GoogleLogout>;
        } else {
            return <GoogleLogin onClick = {this.handleSignIn } > Sign in with Google </GoogleLogin>;
        }
    }
    render() {
        return <div > {
            this.renderAuthButton()
        } </div>;
    }
}

export default GoogleAuth;