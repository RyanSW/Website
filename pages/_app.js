import React from "react";
import App, { Container } from "next/app";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import "bootstrap/dist/css/bootstrap.min.css";

import "../css/global.css";

class Website extends App {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default Website;
