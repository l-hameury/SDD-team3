import React, { Component } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  handleLogout = () => {
    localStorage.clear();
    // this.props.setUser(null);
  };

  render() {
    return (
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
          light
        >
          <Container>
            <NavbarBrand tag={Link} to="/">
              rtchatty
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/counter">
                    Counter
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/fetch-data">
                    Fetch data
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/chat">
                    Chat
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <Link
                    to="/login"
                    onClick={this.handleLogout}
                    className="nav-link"
                  >
                    Logout
                  </Link>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}

// export default class NavMenu extends Component{
//   render(){
//     return(
//     <nav className="navbar navbar-expand navbar-light fixed-top">
//     <div className="container">
//       <a href="" className="navbar-brand">Home</a>
//       <div className="collapse navbar-collapse">
//         <ul className="navbar-nav ml-auto">
//           <li className="nav-item">
//             <a href="" className="nav-link">Login</a>
//           </li>
//           <li className="nav-item">
//             <a href="" className="nav-link">Chat</a>
//           </li>
//         </ul>
//       </div>
//     </div>
//   </nav>);

//   }
// }
