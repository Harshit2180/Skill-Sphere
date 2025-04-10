import { BadgeInfo } from 'lucide-react'
import React from 'react'

const CourseDetail = () => {
    return (
        <div className='mt-20 space-y-5'>
            <div className='bg-[#2D2F31] text-white'>
                <div className='max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2'>
                    <h1 className='font-bold text-2xl md:text-3xl'>Course Title</h1>
                    <p className='text-base md:text-lg'>Subtitle</p>
                    <p>Created By{" "}<span className='text-[#C0C4FC] underline italic'>Alex Doe</span></p>
                    <div className='flex items-center text-sm gap-2'>
                        <BadgeInfo size={16} />
                        <p>Last updated 10-04-2025</p>
                    </div>
                    <p>Students enrolled: 37</p>
                </div>
            </div>
            <div className='max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10'>
                <div className='w-full lg:w-1/2 space-y-2'>
                    <h1 className='font-bold text-xl md:text-2xl'>Description</h1>
                    <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, expedita! Ex dignissimos libero repudiandae fuga sapiente aut quae quod consectetur nulla reiciendis placeat tempore iste corporis, debitis earum voluptate blanditiis!</p>
                </div>
            </div>
        </div>
    )
}

export default CourseDetail