import React, { useState } from 'react';
import { IoMdContacts } from 'react-icons/io'
import { useDispatch } from "react-redux";
import {
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    Text,
} from '@chakra-ui/react';
import '../Styles/Contact.css';
import axios from 'axios';
import { createContact } from '../Redux/action';

function Contact() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleCreateContact = async (event) => {
        event.preventDefault();
        try {
            if (firstName && lastName && email && phone) {
                const newContact = { firstName, lastName, email, phone };
                const response = await axios.post(`https://taiyo-ai-assignment.vercel.app/create`, newContact);
                dispatch(createContact(response.data));
            } else {
                throw new Error('All fields are required.');
            }

        } catch (error) {
            console.error(error);
        }
        setShowModal(false);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };


    return (
        <Box>
            <Box className='contact-container'>
                <Text fontSize="30px" fontFamily="cursive" fontWeight="700" >Contact Page</Text>
                <Button onClick={() => setShowModal(true)} colorScheme='twitter' leftIcon={<IoMdContacts size="24px" />}>Create Contact</Button>
            </Box>

            <Modal isOpen={showModal} onClose={handleCloseModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Contact</ModalHeader>
                    <ModalBody>
                        <FormControl isRequired>
                            <FormLabel htmlFor="firstName">First Name:</FormLabel>
                            <Input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor="lastName">Last Name:</FormLabel>
                            <Input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel htmlFor="email">Email:</FormLabel>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel htmlFor="phone">Phone:</FormLabel>
                            <Input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleCreateContact}>
                            Submit
                        </Button>
                        <Button variant="ghost" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default Contact;
