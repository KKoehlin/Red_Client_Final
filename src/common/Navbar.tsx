import React from 'react'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from 'reactstrap'
import './Navbar.css'


type SBProps = {
  token: string | null
  logout: () => void
}

type SBState = {
  isOpen: boolean
}
export class Sitebar extends React.Component<SBProps, SBState> {
  constructor(props: SBProps) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen })

  logoutButton = () => {
    return localStorage.getItem('token') === null ? (
      ''
    ) : (
      <Link to='/'>
        <button className="navbutton" onClick={this.props.logout}>Logout</button>
      </Link>
    )
  }

  render() {
    return (
      <div className="navbar">
        <Navbar color='light' light expand='md'>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='mr-auto' navbar>
              <NavItem>
                <NavLink>
                  <Link to='/'className="links">
                    Home
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link to='/member'className="links">
                    Travel Journal
                  </Link>
                </NavLink>
                </NavItem>
                <NavItem>
                <NavLink>
                  <Link to='/post'className="links">
                    Plan Your Trip 
                    </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link to='/brewery' className="links">
                    Find Local Spots
                    </Link>
                </NavLink>
              </NavItem>
            </Nav>
            <NavbarText>{this.logoutButton()}</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}