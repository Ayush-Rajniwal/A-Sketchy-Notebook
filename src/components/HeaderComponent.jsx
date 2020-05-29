import React, { Component } from 'react';
import {
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  NavLink,
} from "reactstrap";
import {
  WiredButton,
  WiredDivider,
  WiredCard,
  WiredTextarea,
} from "wired-elements";
import { ImagePicker } from 'react-file-picker';
import { TwitterPicker} from "react-color";
import { config } from "../config";
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      img64: null,
      postText: "",
      cardColor: "black",
     darkMode:false
    };
    this.modalToggle = this.modalToggle.bind(this);
    this.addPost = this.addPost.bind(this);



  }

  
  
  modalToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  addPost=() => {
    if (this.state.postText.length === 0) return;
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      text: this.state.postText,
      image: this.state.img64,
      date:
        new Date().getDate() +
        " " +
        months[new Date().getMonth()] +
        " " +
        new Date().getFullYear(),
      time: new Date().getHours() + ":" + new Date().getMinutes(),
      cardColor:this.state.cardColor,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(config.baseURL + "posts", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
  }

  render() {
    return (
      <React.Fragment>
        <Navbar
          className="container"
          fixed="top"
          color="transparent"
          light

        >
          <NavbarBrand href="https://github.com/Ayush-Rajniwal/">
            A Sketchy Notebook
          </NavbarBrand>

          <Nav navbar>
            <NavItem>
              <wired-button
                onClick={() => this.setState({ isOpen: !this.state.isOpen })}
                elevation="2"
              >
                Add Post
              </wired-button>
            </NavItem>
          </Nav>
        </Navbar>
        {/* <Nav justified className="p-2 fixed">
          <NavItem>
            <wired-button onClick={() => {
              window.open("https://github.com/Ayush-Rajniwal/");
            }} elevation="2">
            GitHub
            </wired-button>
          </NavItem>
          <NavItem>
            <NavbarBrand>A Sketchy Notebook</NavbarBrand>
          </NavItem>
          <NavItem className="mr-auto">
            <wired-button
              onClick={() => this.setState({ isOpen: !this.state.isOpen })}
              elevation="2"
            >
              Add Post
            </wired-button>
          </NavItem>
        </Nav> */}

        <Modal centered isOpen={this.state.isOpen} toggle={this.modalToggle}>
          <wired-card style={{ color: this.state.cardColor }}>
            <ModalHeader toggle={this.modalToggle}>Add Post</ModalHeader>
            <Row className="pb-3 ml-3 mr-3 align-item-center">
              <Col xs="4">Set Card Color</Col>

              <Col xs="auto" className="pt-1">
                <TwitterPicker
                  colors={[
                    "#000000",
                    "#FCB900",
                    "#7BDCB5",
                    "#00D084",
                    "#8ED1FC",
                    "#0693E3",
                    "#ABB8C3",
                    "#EB144C",
                    "#F78DA7",
                    "#9900EF",
                  ]}
                  width="100%"
                  onChangeComplete={(color, event) => {
                    console.log(color, event.type);
                    this.setState({ cardColor: color.hex });
                  }}
                />
              </Col>
            </Row>

            <ImagePicker
              extensions={["jpg", "jpeg", "png"]}
              dims={{ minWidth: 400, minHeight: 400 }}
              onChange={(base64) => {
                console.log(base64);
                this.setState({ img64: base64 });
              }}
              onError={(error) => {
                this.setState({ img64: null });
                alert(error);
              }}
            >
              <wired-button style={{ color: "green" }}>
                Add a photo
              </wired-button>
            </ImagePicker>

            <ModalBody>
              <div className="d-flex justify-content-center pb-3">
                {this.state.img64 != null ? (
                  <wired-image
                    className="img-fluid"
                    alt="postImage"
                    style={{
                      width: "400px",
                      height: "100%",
                    }}
                    src={this.state.img64}
                  ></wired-image>
                ) : (
                  <p>No Image Selected</p>
                )}
              </div>
              <textarea
                onChange={(event) =>
                  this.setState({ postText: event.target.value })
                }
                rows="6"
                cols="12"
                placeholder="Story here"
                style={{
                  color: this.state.cardColor,
                  border: "none",
                  width: "100%",
                }}
              ></textarea>
            </ModalBody>

            <ModalFooter>
              <wired-button onClick={this.addPost} style={{ color: "orange" }}>
                Post
              </wired-button>
              <wired-button
                style={{ color: "black" }}
                onClick={this.modalToggle}
              >
                Close
              </wired-button>
            </ModalFooter>
          </wired-card>
        </Modal>
      </React.Fragment>
    );
  }
}
 
export default Header;