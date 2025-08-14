import React from 'react'
import { Button } from '../../../../components/Button'

const Support = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-[60vh] gap-y-6 bg-white shadow-md rounded-2xl px-5 md:px-0 '>
            <img alt="" className="h-20 mt-1" src="/assets/img/icons/mail.svg" />
            <p className='text-[#B3322F] text-center '>
                For any support inquiries or concerns, please contact us at <br /><span className='font-bold'>info@nextroom.ca</span> — we’re here to help.
            </p>
            <Button className='bg-[#B3322F] text-white py-2 w-full md:w-60 rounded-full'>
                Email
            </Button>

        </div>
    )
}

export default Support