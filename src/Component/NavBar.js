import React from 'react'
import {Menu, Container, Button } from 'semantic-ui-react';
import { useNavigate, Link } from 'react-router-dom'


const NavBar = () => {

    const navigate = useNavigate();

  return (
    <Menu inverted borderless style={{padding: '0.3rem', marginBottom: '20px'}} attached>
      <Container>
        <Menu.Item name='home'>
           <Link to='/'> <h2>SaveCloud</h2> </Link>
        </Menu.Item>
        <Menu.Item>
            <h3>Save your images in 5 minutes </h3>
        </Menu.Item>
        <Menu.Item position='right'>
            <Button size='mini' primary onClick={()=> navigate('/add')}> Add User</Button>
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default NavBar

