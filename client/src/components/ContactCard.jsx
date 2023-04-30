import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, fetchContactData, updateContact } from "../Redux/action";
import {
    Grid, GridItem, Box, Heading, Text, Button, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loading from './Loading';

const ContactCard = () => {
    const state = useSelector(data => data)
    const dispatch = useDispatch();
    const [selectedContact, setSelectedContact] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const fetchContacts = async () => {
        try {
            const response = await axios.get('https://taiyo-ai-assignment.vercel.app/contact');
            dispatch(fetchContactData(response.data));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleEdit = (contact) => {
        setSelectedContact(contact);
        setShowModal(true);
    };



    const handleUpdate = async (event) => {
        event.preventDefault();
        const updatedContact = {};
        if (firstName !== '') {
            updatedContact.firstName = firstName;
        }
        if (lastName !== '') {
            updatedContact.lastName = lastName;
        }
        if (email !== '') {
            updatedContact.email = email;
        }
        if (phone !== '') {
            updatedContact.phone = phone;
        }
        try {
            await axios.put(`https://taiyo-ai-assignment.vercel.app/contact${selectedContact}`, updatedContact);
            dispatch(updateContact(selectedContact, updatedContact));
        } catch (error) {
            console.error(error);
        }
        setShowModal(false);
    };


    const handleRemove = async (id) => {
        try {
            await axios.delete(`https://taiyo-ai-assignment.vercel.app/contact${id}`);
            dispatch(deleteContact(id));
        } catch (error) {
            console.error(error);
        }
    };


    const handleCloseModal = () => {
        setShowModal(false);
    };



    return (
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap="4">
            {state.contacts && state.contacts.length > 0
                ?

                state.contacts.map((contact) => (
                    <GridItem
                        key={contact._id}
                        borderWidth="1px"
                        borderRadius="lg"
                        w="95%"
                        textAlign="center"
                        transition="all 0.3s"
                        boxShadow="rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"
                        _hover={{
                            bg: "#5719AF",
                            color: 'white',
                            transform: 'scale(1.05)',
                            contrast: "1.75",
                        }}

                    >
                        <Heading as="h2" size="lg" >
                            {contact.firstName} {contact.lastName}
                        </Heading>
                        <Text fontSize="md" mt="3%">
                            {contact.phone}
                        </Text>
                        <Text fontSize="md" >
                            {contact.email}
                        </Text>

                        <Box m={{ base: "3% 0", md: "3%" }}>
                            <Button leftIcon={<FaEdit />} colorScheme="green" size="sm" mr="2" onClick={() => handleEdit(contact._id)}>
                                Edit
                            </Button>
                            <Button leftIcon={<FaTrash />} colorScheme="red" size="sm" onClick={() => handleRemove(contact._id)}>
                                Delete
                            </Button>
                        </Box>
                    </GridItem>
                ))
                :
                <Box textAlign="center" mt="10%">
                    <Text color="#5719AF" fontSize="30px" fontFamily="cursive" fontWeight="700">No Contact Found</Text>
                    <Loading />
                </Box>
            }
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
                        <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
                            Submit
                        </Button>
                        <Button variant="ghost" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Grid>
    );
}


export default ContactCard;

