import { Button } from '@src/components/Button'
import CommonLayout from '@src/layouts/Common.Layout'

const SupportDetails = () => {
    return (
        <CommonLayout>
            <div className="bg-gradient-to-b from-[#B3322F] to-[#4D1614] flex flex-col-reverse md:flex-row "   >

                <div className="md:1/2  w-full flex items-end">
                    <img src="/assets/img/images/support-page-girl.svg" className='h-full md:pt-30' />
                </div>

                <div className="md:1/2  w-full   flex items-center  my-10">
                    <div>
                        {/* Heading */}
                        <h2 className="text-2xl w-[80%]   mx-auto md:mx-0   text-center md:text-left md:text-6xl font-bold text-white mb-4   ">
                            Your Safety  Is

                            <br className="inline" /> Our Priority.
                            {/* <br className=" " /> Housing
                        <br className="hidden md:inline" /> Starts Here. */}
                        </h2>
                        {/* Description */}
                        <div className="w-[80%] md:w-[60%] mx-auto   md:mx-0   text-center md:text-left text-[#FFFFFF] ">

                            <p
                            >
                                Every Day, We Protect Students From Scams,
                                Roommate Disputes, And Unsafe
                                Living Conditions.
                            </p>
                        </div>
                    </div>


                </div>
            </div>

            {/*  */}
            <div className="bg-gradient-to-b from-[#B3322F] to-[#4D1614] py-15 px-5 text-white text-center w-full shadow-lg">
                <h1 className="font-bold text-3xl mb-10">Jump To...</h1>

                <div className="flex flex-col gap-4">
                    {[
                        "How We Verify Listings",
                        "Reporting Tools",
                        "Mediation and Dispute Resolution",
                        "Community Guidelines",
                        "Handling Emergencies",
                        "Partnerships and Institutional Support",
                        "Tenant Rights and Advocacy",
                    ].map((item, index) => (
                        <p
                            key={index}
                            className="cursor-pointer text-lg hover:text-gray-200"
                        >
                            {item}
                        </p>
                    ))}
                </div>
            </div>

            {/*  */}
            <div className=' px-5 md:px-20 '>
                <div className='bg-white shadow p-5 pb-10 md:p-10 rounded-2xl mt-20' >
                    {/* How We Verify Listings */}
                    <h1 className='font-bold text-xl mb-3 mt-3 md:mt-10 text-[#B3322F]'>How We Verify Listings</h1>
                    <p className='my-2'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum</p>

                    {/* Reporting Tools */}
                    <h1 className='font-bold text-xl mb-3 mt-3 md:mt-10 text-[#B3322F]'>Reporting Tools</h1>
                    <p className='my-2'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum</p>

                    {/* Mediation and Dispute Resolution */}
                    <h1 className='font-bold text-xl mb-3 mt-3 md:mt-10 text-[#B3322F]'>Mediation and Dispute Resolution</h1>
                    <p className='my-2'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum</p>

                    {/* Community Guidelines */}
                    <h1 className='font-bold text-xl mb-3 mt-3 md:mt-10 text-[#B3322F]'>Community Guidelines</h1>
                    <p className='my-2'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum</p>

                    {/* Handling Emergencies */}
                    <h1 className='font-bold text-xl mb-3 mt-3 md:mt-10 text-[#B3322F]'>Handling Emergencies</h1>
                    <p className='my-2'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum</p>

                    {/* How We Verify Listings */}
                    <h1 className='font-bold text-xl   mb-3 mt-3 md:mt-10 text-[#B3322F]'>How We Verify Listings</h1>
                    <p className='my-2'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum</p>

                    {/* Partnerships and Institutional Support */}
                    <h1 className='font-bold text-xl mb-3 mt-3 md:mt-10 text-[#B3322F]'>Partnerships and Institutional Support</h1>
                    <p className='my-2'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum</p>


                    {/* Tenant Rights and Advocacy */}
                    <h1 className='font-bold text-xl mb-3 mt-3 md:mt-10 text-[#B3322F]'>Tenant Rights and Advocacy</h1>
                    <p className='my-2'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum</p>


                </div>
                {/* Chat */}
                <div className='flex md:justify-end justify-center'>
                    <div className='flex items-center -mt-7'>
                        <img
                            src="/assets/img/search-property/chat_icon.svg"
                            alt="Chat Icon"
                            className="h-15 transition-transform duration-300 hover:rotate-6 z-10"
                        />
                        <Button className='bg-[#B3322F] text-white font-bold w-45 py-2 rounded-full h-fit -ml-10'>Chat</Button>
                    </div>
                </div>
            </div>
        </CommonLayout>
    )
}

export default SupportDetails