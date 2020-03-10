import React, { Component } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faEnvelope,
  faDownload,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithubSquare,
  faLinkedin,
  faGit,
  faGithub
} from "@fortawesome/free-brands-svg-icons";

import { Container, Row, Col, Button } from "reactstrap";

import pf_projects from "../portfolio/projects.json";
import pf_education from "../portfolio/education.json";
import pf_work from "../portfolio/work.json";

import "../css/main.css";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Head>
          <title>Ryan's Website</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <section id="sec-name">
          <Container>
            <Row className="text-xs-center">
              <Col md={6} className="text-center text-md-right">
                <img src="/images/profile.png" className="img-profile" />
              </Col>
              <Col md={6} className="text-center text-md-left my-auto">
                <p id="name">Ryan White</p>
                <p id="major">Computer Engineer</p>
                <div id="links">
                  <a href="https://github.com/RyanSW/">
                    <FontAwesomeIcon
                      icon={faGithubSquare}
                      className="social_link"
                    />
                  </a>
                  <a href="https://www.linkedin.com/in/ryan-white-b11943145/">
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      className="social_link"
                    />
                  </a>
                  <a href="https://www.ryansw.com/">
                    <FontAwesomeIcon icon={faGlobe} className="social_link" />
                  </a>
                  <a href="mailto:ryan@ryansw.com">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="social_link"
                    />
                  </a>
                </div>
                <Button color="primary" href="/documents/Resume.pdf">
                  <FontAwesomeIcon icon={faDownload} />
                  Download Resume
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
        <section id="sec-projects">
          <Container>
            <Row>
              <Col md={4}>
                <h2>Notable Projects</h2>
              </Col>
            </Row>
            <hr />
            {pf_projects.map(project => (
              <Row className="row-project">
                <Col md={4} className="text-center">
                  <img src={project.image} className="img-project" />
                </Col>
                <Col md={8}>
                  <p className="item-title">{project.title}</p>
                  {project.blurb}
                </Col>
              </Row>
            ))}
            {/* <Row>
              <Col md={12} className="text-center">
                <Button color="primary">
                  <FontAwesomeIcon icon={faPlus} />
                  See All Projects
                </Button>
              </Col>
            </Row> */}
          </Container>
        </section>
        <section id="sec-resume">
          <Container>
            <Row>
              <Col md={4}>
                <h2>Resume</h2>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={4}>
                <h3>Education</h3>
              </Col>
              <Col md={8}>
                {pf_education.map(school => (
                  <Row className="row-education">
                    <Col md={12}>
                      <p className="item-title">{school.name}</p>
                    </Col>
                    <Col md={8}>
                      <p className="item-extra">{school.program}</p>
                    </Col>
                    <Col md={4}>
                      <p className="item-date">
                        {school.start} - {school.end}
                      </p>
                    </Col>
                  </Row>
                ))}
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <h3>Awards</h3>
              </Col>
              <Col md={8}>
                <Row>
                  <Col xs={8}>
                    <p className="item-title">President's List</p>
                  </Col>
                  <Col xs={4}>
                    <p className="item-date">2 Years</p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={8}>
                    <p className="item-title">Dean's List</p>
                  </Col>
                  <Col xs={4}>
                    <p className="item-date">5 Terms</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <h3>Work Experience</h3>
              </Col>
              <Col md={8}>
                {pf_work.map(work => (
                  <Row className="row-work">
                    <Col md={12}>
                      <p className="item-title">{work.location}</p>
                    </Col>
                    <Col md={8}>
                      <p className="item-extra">{work.title}</p>
                    </Col>
                    <Col md={4}>
                      <p className="item-date">
                        {work.start} - {work.end}
                      </p>
                    </Col>
                    <Col md={12}>{work.blurb}</Col>
                  </Row>
                ))}
              </Col>
            </Row>
            {/* <Row>
              <Col md={12} className="text-center">
                <Button color="primary" href="/documents/Resume.pdf">
                  <FontAwesomeIcon icon={faDownload} />
                  Donwload Resume
                </Button>
              </Col>
            </Row> */}
          </Container>
        </section>
        <section id="sec-contact">
          <Container>
            <Row>
              <Col md={4}>
                <h2>Contact Me</h2>
              </Col>
            </Row>
            <hr />
            <Row className="row-social">
              <Col xs={4} className="text-right">
                GitHub
                <FontAwesomeIcon icon={faGithubSquare} />
              </Col>
              <Col xs={8}>
                <a href="https://github.com/RyanSW/">RyanSW</a>
              </Col>
            </Row>
            <Row className="row-social">
              <Col xs={4} className="text-right">
                LinkedIn
                <FontAwesomeIcon icon={faLinkedin} />
              </Col>
              <Col xs={8}>
                <a href="https://www.linkedin.com/in/ryan-white-b11943145/">
                  My LinkedIn Profile
                </a>
              </Col>
            </Row>
            <Row className="row-social">
              <Col xs={4} className="text-right">
                Website
                <FontAwesomeIcon icon={faGlobe} />
              </Col>
              <Col xs={8}>
                <a href="https://www.ryansw.com/">RyanSW.com</a>
              </Col>
            </Row>
            <Row className="row-social">
              <Col xs={4} className="text-right">
                Email
                <FontAwesomeIcon icon={faEnvelope} />
              </Col>
              <Col xs={8}>
                <a href="mailto:ryan@ryansw.com">Ryan@RyanSW.com</a>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    );
  }
}

export default Home;
