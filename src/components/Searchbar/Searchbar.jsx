import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import { useState } from "react";

import { Header, Form, Input, Button, Svg } from './Searchbar.styled';

export const Searchbar = ({onSubmit}) => {
  const [name, setName] = useState('');
  
  const handleInput = e => {
    setName(e.currentTarget.value.toLowerCase())
  };
  const handleSubmit = e => {
    // const { name } = e.currentTarget.elements;
    e.preventDefault()
    if(name.trim() === '') {
        toast.error("Please enter word in search")
    }
    setName(e.currentTarget.elements.name)
    onSubmit(name)
  };
    return ( 
       <Header>
         <Form onSubmit={handleSubmit}> 
            <Button type="submit">
            <Svg />
            </Button>

            <Input 
            onChange={handleInput}
            className="input"
            name="name"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            />
          </Form>
        </Header>
    );
  
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}