import { Box } from '@chakra-ui/react'
import React from 'react'
import { Triangle } from 'react-loader-spinner'
export default function Loading() {
    return (
        <Box display="flex" justifyContent="center">
            <Triangle
                height="120"
                width="120"
                color="#4fa94d"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </Box>
    )
}
