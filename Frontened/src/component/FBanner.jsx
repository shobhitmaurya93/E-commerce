import { FiSend } from "react-icons/fi";
function FBanner(){
    return (
        <div className="w-full box-border mt-11 relative ">
            <div className="p-16 flex  items-center bg-green-300 rounded-2xl mx-auto relative justify-between">
                {/* left     */}
                <div className="flex flex-col w-full md:w-[45%] lg:h-60 h-auto gap-y-2 item my-auto flex-wrap);
                ">
                    <h1 className=" xs:text-2xl text-3xl md:text-4xl text-left text-gray-600">Stay home & get your daily needs from our shop</h1>
                    <p className=" sx:text-base md:text-xl text-2xl text-gray-500 text-left">Start You'r Daily Shopping with Nest Mart</p>
                    <div className="w-full rounded-2xl flex relative items-center mt-4">
                        < FiSend className="text-2xl text-gray-500 absolute left-2"/>
                        <input type="text " placeholder="Your E-Mail Address" className="text-black rounded-2xl outline-none py-3 w-full text-center bg-white"></input>
                        <button className="px-5 py-2 rounded-2xl text-white absolute right-2 bg-green-700">Subscribe</button>
                    </div>
                </div>
                <div className="h-60 hidden md:block" >
                    <img src="https://ecommerce-fullstack-web-app.netlify.app/static/media/newsletter.5931358dd220a40019fc.png" alt="img" className="w-[413px] h-[269px] object-cover"/>
                </div>
            </div>
        </div>
    )
}
export default FBanner;


