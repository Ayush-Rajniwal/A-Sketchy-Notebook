import React, { Component } from 'react';
import  Header  from "./HeaderComponent";
import PostTimeLine from './PostTimeLineComponent';
class Main extends Component {
    state = {  }
    render() { 
        return (
          <div className="container" >
            <Header />
            <PostTimeLine />
          </div>
        );
    }
}
 
export default Main;