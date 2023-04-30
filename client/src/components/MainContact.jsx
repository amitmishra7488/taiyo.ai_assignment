import React from 'react'
import { Box } from '@chakra-ui/react'
import Contact from './Contact'
import ContactCard from './ContactCard'
export default function MainContact() {
  return (
    <Box display="flrx" flexDirection="column">
      <Contact />
      <ContactCard />
    </Box>
  )
}
