const express = require('express')
const contactModel = require('../models/contact.models')
const routes = express.Router();



routes.post('/create', async (req, res) => {
    const { firstName, lastName, phone, email } = req.body;

    try {
        const contact = await contactModel.create({
            firstName,
            lastName,
            phone,
            email,
        });

        console.log('Contact created: ', contact);
        res.status(201).json(contact);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating contact');
    }
});


routes.get('/', async (req, res) => {
    try {
        const contacts = await contactModel.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


routes.put('/:id', async (req, res) => {
    const { id } = req.params;

    // Check if req.body is empty
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Empty request body' });
    }

    try {
        const updatedContact = await contactModel.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

routes.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedContact = await contactModel.findByIdAndDelete(id);

        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = routes;