import PropTypes from 'prop-types';
import { useState } from "react";

import { Item, Image } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';


export const GalleryItem = ({item: { webformatURL, largeImageURL, tags}}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(isOpen => !isOpen)
    }

       return (
        <div>
        <Item> 
         <Image src={webformatURL} alt={tags} onClick={toggleModal} />   
         </Item>
        {isOpen && <Modal tags={tags} large={largeImageURL} onClose={toggleModal} />}
        </div>
    ) 
}

GalleryItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired
    }) 
}
    
    // state = {
    //     isOpen: false
    // }
    // openModal = () => {
    //     this.setState({
    //         isOpen: true
    //     })
    // }
    // closeOn = () => {
    //     this.setState({
    //         isOpen: false
    //     })
    // }