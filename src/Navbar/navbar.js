import React from 'react';
import {
  Button,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';


export default class NavbarComponent extends React.Component {
  constructor() {
    super();
  }

  render() {
    return ( 
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/" image-src="/public/images" ></NavbarBrand>
            <Nav className="ml-auto" navbar>
               <Button color="primary" onClick={e => this.props.setUser({username:"Mario", user_id:'123'})}> Mario </Button>
               <Button color="danger" onClick={e => this.props.setUser({username:"Maria", user_id:'321'})}> Maria </Button>
            </Nav>
        </Navbar>
      </div>
    );
  }
}
