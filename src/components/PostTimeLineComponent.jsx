import React, { Component } from 'react';
import { WiredCard, WiredImage, WiredDivider, WiredIconButton,WiredDialog,WiredButton } from "wired-elements";
import {
  Row,
  Col,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody
} from "reactstrap";
import {config} from "../config"
const PostStyle = {
    width: "400px",
    height: "100%",
  };

class Post extends Component {

  constructor(props) {
    super(props);
    this.state={
      isOpen:false
    };

    this.modalToggle = this.modalToggle.bind(this);
    this.getPostById = this.getPostById.bind(this);

  }

  modalToggle= ()=>{
  this.setState({isOpen:!this.state.isOpen})
  }

  getPostById = (params) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
   
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(config.baseURL+"posts/"+params, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        window.location.reload();
      })
      .catch(error => console.log('error', error));
  }
  
  render() {
    return (
      <div>
        <wired-card style={{color:this.props.cardColor}}>
          <div className="d-flex justify-content-between mb-2">
            <div> {this.props.date}</div>
            <div> {this.props.time}</div>
           
          </div>
          <div>
            <wired-image
              style={PostStyle}
              src={this.props.img}
            ></wired-image>
            <p>{this.props.content}</p>
          </div>
          <div className="d-flex justify-content-end">
            <wired-icon-button
              onClick={() => this.getPostById(this.props.id)}
            >
              <i className="fa fa-trash fa-lg"></i>
            </wired-icon-button>
          </div>
        </wired-card>
      </div>
    );
  
}
  
}






class PostTimeLine extends Component {
    constructor(props) {
        super(props);
      this.state = {
        list:[]
      }
        this.fetchPost = this.fetchPost.bind(this);
  }

  fetchPost = () => {
    fetch(config.baseURL +"posts?_sort=id&_order=desc")
    .then((resp) => resp.json())
    .then((res) => {
      this.setState({list: res });
      console.log(this.state)
    })
  }

  componentDidMount() {
   this.fetchPost();
  }


  render() { 
      
    const PostList = (props) => {
      console.log(props.postArray)
      if (props.postArray.length === 0)
        return (
          <Col xs={12} style={{fontSize:"24px"}} className="d-flex justify-content-center m-5">
           A book is not meant to be empty<span role="img" >🌈</span>
          </Col>
        )
      else {
        return (
          props.postArray.map((item) => {
            return (
              <Col key={item.id} xs={12} className="d-flex justify-content-center m-5">
                <Post
                  id={item.id}
                  date={item.date}
                  time={item.time}
                  content={item.text}
                  img={item.image}
                  cardColor={item.cardColor}
                />
              </Col>
            );
          })
        )
      }
    }
        return (
          <div className="mt-5">
            <Row>
                <PostList postArray={this.state.list} />
            </Row>
          </div>
        );
    }
}
 
export default PostTimeLine;