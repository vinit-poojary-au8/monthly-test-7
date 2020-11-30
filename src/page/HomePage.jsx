import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link, Route, Switch } from 'react-router-dom';
import WeatherApp from './WeatherApp';
import NotePosts from '../components/Notes';
import styled from 'styled-components';


const StyledLink = styled(Link)`
    text-decoration: none;
    margin: 20px;
    &:link, &:visited {
        background-color: #133b5c;
        color: white;
        padding: 14px 25px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
      }
      
      &:hover, &:active {
        background-color: #133b5c;
      }
      
`;



class HomePage extends Component {
    state = {
        disp: "none",
    };
    

    render() {
        const { user } = this.props;

        return (
            <div>
                {user ? (<>
                <StyledLink to="/WeatherApp">Weather App</StyledLink>
                <StyledLink to="/NotesApp">Note App</StyledLink>
                <Switch>
                    {/* <Route exact path="/"/> */}
                    <Route exact path="/WeatherApp" component={WeatherApp}/>
                    <Route path="/NotesApp" component={NotePosts}/>
                </Switch>
                </>):null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.userState.user,
    };
  };
  
  export default connect(mapStateToProps)(
    HomePage
  );
  

