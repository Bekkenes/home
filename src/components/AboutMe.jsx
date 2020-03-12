import React, { Component } from "react";
import Configs from "../configurations.json";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "bootstrap/dist/js/bootstrap.bundle.min";

class AboutMe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heading: "About me",
      aboutDev: Configs.aboutDev,
      instaProfilePic: Configs.showInstaProfilePic,
      resumeURL: Configs.resumeURL
    };
  }

  componentDidMount = () => {
    if (Configs.showInstaProfilePic) this.handleRequest();
  };

  handleRequest = (e) => {
    axios
      .get(Configs.instaLink + Configs.instaUsername + Configs.instaQuerry)
      .then(response => {
        // handle success
        // console.log(response.data.graphql);
        return this.setState({
          instaProfilePic: response.data.graphql.user.profile_pic_url_hd
        });
      })
      .catch(error => {
        // handle error
        this.setState({instaProfilePic : false});
        return console.error(error.message);
      })
      .finally(() => {
        // always executed
      });
  };

  render() {
    return (
      <div id="aboutme" className="jumbotron jumbotron-fluid m-0">
        <div className="container container-fluid p-5">
          <div className="row">
          {this.state.instaProfilePic &&
              <div className="col-5 d-none d-lg-block align-self-center">
                <img
                  className="border border-secondary rounded-circle"
                  src={this.state.instaProfilePic}
                  alt="profilepicture"
                />
              </div>
            }
            <div className={`col-lg-${this.state.instaProfilePic ? "7" : "12"}`}>
              <h1 className="display-4 mb-5 text-center">
                {this.state.heading}
              </h1>
              <p className="lead text-center">{this.state.aboutDev}</p>
              {this.state.resumeURL &&
                <p className="lead text-center">
                  <a
                    className="btn btn-outline-dark btn-lg"
                    href={this.state.resumeURL}
                    target="_blank"
                    rel="noreferrer noopener"
                    role="button"
                    aria-label="Resume/CV"
                  >
                    Resume/CV
                  </a>
                </p>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutMe;