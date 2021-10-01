import React from "react";
import { withRouter } from "react-router";

export default function requireAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        auth: localStorage.getItem("token"),
      };
    }
    componentDidMount() {
      this.checkAuth();
    }
    checkAuth() {
      const location = this.props.location;
      const redirect = location.pathname + location.search;
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        this.props.history.push(`/login?redirect=${redirect}`);
      }
    }
    render() {
      return localStorage.getItem("token") ? (
        <Component {...this.props} />
      ) : null;
    }
  }
  return withRouter(AuthenticatedComponent);
}
