import React, { Component } from 'react';
import {BrowserRouter , Route  ,Switch } from 'react-router-dom';
import Login from '../Auth/Login';
import SignUp from '../Auth/Signup';
import Gallery from './gallery';
import Home from '../homepage/home';
import firebase from 'firebase';
import Auctioneer from '../auctioneer/auctioneer';
import BidMenubar from '../bidder/bidder';
import Myproduct from '../bidder/productlist';
import Sold from '../purchaseandsold/sold';
import Purchase from '../purchaseandsold/purchase';
// function PrivateRoute1({component : Component ,  authentication , ...rest }){
//       console.log(authentication , firebase.auth().currentUser.email);
//   return(
//     <Route 
//           {...rest}
//           render={(props) => authentication === true ? <Component {...props} /> : <Redirect to={{pathname: "/login", state :{from : props.location}}} />
//           }
//         />

//   )
// };

export default class App extends Component {
  constructor(){
    super();
    this.state={
      authentication : false
    }
  }
  componentDidMount(){
    firebase.auth().currentUser ? this.setState({authentication: true}) : ''
  
  }

  
  render() {
    return (
      <div> 
        <BrowserRouter>
          <Switch>
                          
              <Route exact component={Gallery} path="/" />
              <Route component={Login} path="/login" />
              <Route component={SignUp} path="/signup"/>
              <Route component={Auctioneer} path="/auctioneer" />
              <Route authentication={this.state.authentication} component={Home} path="/mainpage"/>
              <Route component={BidMenubar} path="/bidder" />
              <Route component={Myproduct} path="/myproduct" />
              <Route component={Sold} path="/sold"/>
              <Route component={Purchase} path="/purchase"/>
              <br /><br/> 
          </Switch> 
            
        </BrowserRouter>
      </div>
    );
  }
}



