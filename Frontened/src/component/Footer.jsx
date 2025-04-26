import logo from '../assets/logo.jpg'
import { CiLocationOn, CiClock2 } from "react-icons/ci";
import { SlEarphones } from "react-icons/sl";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";

function Footer() {
    const features = new Array(5).fill({
        icon: "https://ecommerce-fullstack-web-app.netlify.app/static/media/icon-1.5b1776e2a1d7ec897722f605a8118984.svg",
        title: "Best prices & offers",
        desc: "Orders $50 or more"
    });
    return (
        <div className="w-full bg-white mt-11 mb-5">
            {/* Features */}
            <div className=" mx-auto flex  overflow-x-auto  gap-4 px-2 py-4">
                {features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-x-4 border rounded-2xl bg-gray-100 px-4 py-3 min-w-[240px]">
                        <img src={f.icon} alt="feature" className="w-10 h-10 object-cover" />
                        <div>
                            <p className="text-sm font-medium">{f.title}</p>
                            <p className="text-sm text-gray-600">{f.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Footer Grid */}
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-11">
                {/* Logo & Info */}
                <div className="flex flex-col gap-y-3">
                    <img src={logo} alt="logo" className="w-[150px] h-auto mb-2" />
                    <p className="text-sm text-gray-500">Awesome grocery store website template</p>
                    <div className="flex gap-x-2 text-gray-500 text-sm items-start">
                        <CiLocationOn className='text-green-400 text-lg mt-1' />
                        <span><strong>Address:</strong> 5171 W Campbell Ave, Kent, Utah 53127</span>
                    </div>
                    <div className="flex gap-x-2 text-gray-500 text-sm items-center">
                        <SlEarphones className='text-green-400 text-lg' />
                        <span><strong>Call Us:</strong> (+91) - 540-025-124553</span>
                    </div>
                    <div className="flex gap-x-2 text-gray-500 text-sm items-center">
                        <MdOutlineMailOutline className='text-green-400 text-lg' />
                        <span><strong>Email:</strong> sale@Nest.com</span>
                    </div>
                    <div className="flex gap-x-2 text-gray-500 text-sm items-center">
                        <CiClock2 className='text-green-400 text-lg' />
                        <span><strong>Hours:</strong> 10:00 - 18:00, Mon - Sat</span>
                    </div>
                </div>

                {/* Company Links */}
                <div className='flex flex-col gap-y-3'>
                    <h1 className='font-bold text-gray-800 text-lg'>Company</h1>
                    <ul className='text-sm text-gray-500 flex flex-col gap-y-2'>
                        <li>Account</li>
                        <li>Delivery Information</li>
                        <li>Privacy Policy</li>
                        <li>Terms & Conditions</li>
                        <li>Contact Us</li>
                        <li>Support Center</li>
                        <li>Careers</li>
                    </ul>
                </div>

                {/* Corporate Links */}
                <div className='flex flex-col gap-y-3'>
                    <h1 className='font-bold text-gray-800 text-lg'>Corporate</h1>
                    <ul className='text-sm text-gray-500 flex flex-col gap-y-2'>
                        <li>About Us</li>
                        <li>Delivery Information</li>
                        <li>Privacy Policy</li>
                        <li>Terms & Conditions</li>
                        <li>Contact Us</li>
                        <li>Support Center</li>
                        <li>Careers</li>
                    </ul>
                </div>

                {/* Popular Links */}
                <div className='flex flex-col gap-y-3'>
                    <h1 className='font-bold text-gray-800 text-lg'>Popular</h1>
                    <ul className='text-sm text-gray-500 flex flex-col gap-y-2'>
                        <li>About Us</li>
                        <li>Delivery Information</li>
                        <li>Privacy Policy</li>
                        <li>Terms & Conditions</li>
                        <li>Contact Us</li>
                        <li>Support Center</li>
                        <li>Careers</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center border-t mt-8 pt-4 text-sm text-gray-600 gap-y-4">
                <p>© 2024, Ecommerce Template. All rights reserved.</p>
                <div className="flex items-center gap-x-4">
                    <span className="font-semibold">Follow Us</span>
                    <FaFacebook className='w-6 h-6 text-blue-500' />
                    <FaTwitter className='w-6 h-6 text-sky-500' />
                    <IoLogoInstagram className='w-6 h-6 text-pink-500' />
                    <FaYoutube className='w-6 h-6 text-red-500' />
                </div>
            </div>
        </div>
    );
}

export default Footer;
