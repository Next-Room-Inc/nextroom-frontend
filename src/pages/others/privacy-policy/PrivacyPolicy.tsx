import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';
import Loader from '@src/components/Loader';
import CommonLayout from '@src/layouts/Common.Layout';
import { APP_INFO } from '@src/utils/constants';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef, useState } from 'react';
import { motion } from "framer-motion";
import { LANGUAGES } from '@src/utils/constants/app-info.constant';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
    const printRef = useRef<HTMLDivElement | null>(null);
    const { i18n } = useTranslation();
    const [loader, setLoader] = useState(false);


    const handleDownloadPdf = async () => {
        setLoader(true)
        const element: HTMLDivElement | null = printRef.current;
        if (!element) return;

        const canvas = await html2canvas(element);
        const data = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("download.pdf");
        setLoader(false)

    };

    return (
        <CommonLayout>
            {/* loader */}
            {loader && <Loader />}

            <div className=' px-5 md:px-20 '>
                {/* Heading */}
                <div className='my-5 flex  gap-2 md:flex-row flex-col-reverse'>
                    <div className=' w-full md:w-1/2 '>
                        <h1 className='text-[#B3322F] font-semibold text-4xl'>Privacy Policy</h1>
                        <h5 className='italic font-semibold mt-2'>Last updated: January 07, 2025</h5>
                    </div>
                    <div className=' w-full md:w-1/2 flex justify-end '>
                        <div className='text-[#B3322F]'>
                            {LANGUAGES.map((lang) => (
                                <span
                                    key={lang.code}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => i18n.changeLanguage(lang.code)}
                                    className={` transition duration-300 mx-2  ${i18n.language === lang.code
                                        ? "underline underline-offset-4 font-bold"
                                        : ""
                                        }`}
                                >
                                    {lang.label}
                                </span>
                            ))}</div>
                        {/* download */}
                        <div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ArrowDownTrayIcon
                                    onClick={handleDownloadPdf}
                                    className="w-9 text-[#B3322F] bg-white shadow rounded-full p-2 -mt-1.5 ml-3 cursor-pointer"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Diclamer card */}
                <div className='bg-[#B3322F] py-8 text-white mb-5 px-5  rounded-2xl'>
                    <h1 className='font-semibold text-xl mb-2'>Translation Disclaimer</h1>
                    <p>The contents of this Privacy Policy are provided in the original language of publication. Translation of this Policy through Google Translate, other automated tools, or AI-based services is strictly prohibited. We do not warrant or guarantee the accuracy, reliability, or completeness of any translation performed by third-party services. Should you elect to rely upon such translations, you do so at your own risk, and you expressly agree that we shall bear no responsibility or liability for any errors, misinterpretations, or inconsistencies arising therefrom.</p>
                </div>

                {/* Privacy & policies */}
                <div className='bg-white shadow p-5 md:p-10 rounded-2xl my-7 ' ref={printRef}>
                    {/* Interpretation and Definitions */}
                    <h1 className='font-bold text-xl mb-2 text-[#B3322F]'>Interpretation and Definitions</h1>
                    <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                        Definitions</p>
                    <p className='my-2'>For the purposes of this Privacy Policy:</p>

                    <ul className="list-disc pl-6 space-y-0">
                        <li>Account means a unique account created for You to access our Service.</li>
                        <li>Application refers to thirdspace, the software program provided by the Company.</li>
                        <li>Company refers to Swibe Social Inc., 1233 Colonel By Drive Ottawa, Ontario Canada K1S 5B7.</li>
                        <li>Country refers to: Ontario, Canada.</li>
                        <li>Device means any device like a computer or cellphone that can access the Service.</li>
                        <li>Personal Data is any information that relates to an identified or identifiable individual.</li>
                        <li>Service refers to the Application.</li>
                        <li>Service Provider means a third party that processes data on behalf of the Company.</li>
                        <li>Usage Data refers to data collected automatically from the Service.</li>
                        <li>You means the individual accessing the Service or on behalf of an organization.</li>
                    </ul>
                    {/* Collecting and Using Your Personal Data */}
                    <h1 className='font-bold text-xl mb-2 text-[#B3322F] mt-3'>Collecting and Using Your Personal Data</h1>
                    <p className='font-semibold text-lg'>Personal Data</p>
                    <p className='my-2'>We may ask You to provide personally identifiable information, including:</p>

                    <ul className="list-disc pl-6 space-y-0">
                        <li>Email address</li>
                        <li>First and last name</li>
                        <li>Phone number</li>
                        <li>Student Identification</li>
                    </ul>

                    <p className='font-semibold mt-4 mb-2 text-lg'>Usage Data</p>
                    <p>Usage Data is collected automatically when using the Service. It may include: IP address, browser type, pages visited, time spent, and device identifiers.
                        When using the mobile app, we may collect info such as device type, OS, IP, and browser data.</p>

                    <p className='font-semibold mt-4 mb-2 text-lg'>Information Collected via App</p>
                    <p className='my-2'>With Your permission, we may collect:</p>

                    <ul className="list-disc pl-6 space-y-0">
                        <li>Location data</li>
                        <li>Photos and camera usage</li>
                    </ul>
                    <p>This helps deliver features and personalize Your experience. You can manage access in your device settings.</p>

                    {/* Use of Your Personal Data */}
                    <h1 className='font-bold text-xl mb-2 text-[#B3322F] mt-3'>Use of Your Personal Data</h1>
                    <p className='my-2'>We use your data to:</p>
                    <ul className="list-disc pl-6 space-y-0">
                        <li>Provide and improve the Service</li>
                        <li>Manage Your Account</li>
                        <li>Fulfill contracts or purchases</li>
                        <li>Contact you for updates, offers, or important notices</li>
                        <li>Manage user support requests</li>
                        <li>Analyze and improve the Service</li>
                    </ul>
                    {/* Sharing Your Data */}
                    <h1 className='font-bold text-xl mb-2 text-[#B3322F] mt-3'>Sharing Your Data</h1>
                    <p className='my-2'>We may share your info with:</p>
                    <ul className="list-disc pl-6 space-y-0">
                        <li>Service Providers</li>
                        <li>Affiliates</li>
                        <li>Business Partners</li>
                        <li>Other users (in public spaces)</li>
                        <li>With your consent</li>
                    </ul>

                    {/* Data Retention and Transfer */}
                    <h1 className='font-bold text-xl mb-2 text-[#B3322F] mt-3'>Data Retention and Transfer</h1>
                    <p>We retain data only as long as needed. Usage data is usually kept shorter, unless required for security or improvement.</p>
                    <p>Your data may be transferred outside your region. We ensure adequate safeguards are in place.</p>

                    <p className='font-semibold mt-4 mb-2 text-lg'>Delete Your Data</p>
                    <p>You may request deletion of your data via account settings or by contacting us. Legal obligations may prevent full deletion in some cases.</p>

                    <p className='font-semibold mt-4 mb-2 text-[#B3322F] text-lg'>Disclosure & Security</p>
                    <p>In legal cases or business transactions, your data may be shared appropriately. We strive to protect your data but cannot guarantee 100% security.</p>

                    <p className='font-semibold mt-4 mb-2 text-lg'>Children's Privacy </p>
                    <p>We do not knowingly collect data from users under 18. If you are a parent and become aware of this, please contact us.</p>

                    <p className='font-semibold mt-4 mb-2 text-lg'> Third-Party Links</p>
                    <p>Our service may link to third-party sites. We are not responsible for their content or privacy policies.</p>

                    <p className='font-semibold mt-4 mb-2 text-lg'> Changes </p>
                    <p>We may update this policy. We'll notify users of major changes and update the date at the top. Please check back periodically.</p>

                </div>

                {/* Contact Card */}
                <div className='text-white w-fit py-5 px-4 pr-10 bg-[#B3322F] rounded-2xl'>
                    <p className='font-semibold text-xl'>Contact Us</p>
                    <p className='mt-2 mb-1'>{APP_INFO.EMAIL}</p>
                    <p>{APP_INFO.NUMBER}</p>
                </div>
            </div>

        </CommonLayout>
    )
}

export default PrivacyPolicy