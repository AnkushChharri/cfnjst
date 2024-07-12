// components/Footer.js

export default function Footer() {
    return (
        <footer className="bg-white text-black text-center mt-auto border-double  rounded-lg shadow-2xl">
            <div className="container mx-auto px-1">
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <h5 className="text-base font-bold mb-1">About Us</h5>
                        <p className="text-xs">
                            I am Learning Under Ankush Guruji Mahan Ho.
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <h5 className="text-base font-bold mb-1">Quick Links</h5>
                        <ul>
                            <li><a href="#" className="text-xs hover:underline">Fancy FancyTextGenerator</a></li>
                            <li><a href="#" className="text-xs hover:underline">Font FontGenerator</a></li>
                            <li><a href="#" className="text-xs hover:underline"> Zalgo Text</a></li>
                            <li><a href="#" className="text-xs hover:underline">About</a></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <h5 className="text-base font-bold mb-1">Contact Us</h5>
                        <p className="text-xs">
                            1234 Street Name<br />
                            City, State, 12345<br />
                            Email: info@example.com
                        </p>
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-xs">&copy; 2024 Stylish Text. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
