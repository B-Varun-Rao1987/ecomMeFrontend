import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/varunbrude";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dosjqfd8e/image/upload/v1693574656/ecommerceme/qckdhhgwjawqi69ycf0o.png"
              alt="Founder"
            />
            <Typography>B. Varun Rao</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @B.Varun Rao. Only with the
              purpose to teach MERN Stack on the channel 6 Pack Programmer
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">My Profiles</Typography>
            <a
              href="https://www.linkedin.com/in/b-varun-rao-a15857208"
              target="blank"
            >
              <LinkedInIcon className="linkedInSvgIcon" />
            </a>

            <a href="https://github.com/B-Varun-Rao1987" target="blank">
              <GitHubIcon className="gitHubSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
