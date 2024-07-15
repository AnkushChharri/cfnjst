// components/Footer.js

export default function Footer() {
    return (

        <footer className="flex flex-col items-center pt-6 font-sans border-t bg-gradient-to-b from-zinc-50/75 mt-8">

            <div className="flex flex-col-reverse items-center w-11/12 mb-8 text-sm md:flex-row md:items-baseline md:justify-between">
                <div className="text-center text-slate-600 max-sm:text-sm/4">© 2024 - Free Fire Style Name. All rights reserved.</div>

                <nav className="flex flex-wrap justify-center font-medium md:justify-start gap-x-4 gap-y-2 md:gap-6 text-slate-700 [&>a:hover]:text-stone-800 pb-3.5">
                    <a href="#">About Us</a>
                    <a href="#">Investor Relations</a>
                    <a href="#">Jobs</a>
                    <a href="#">Press</a>
                    <a href="#">Blog Us</a>
                </nav>

            </div>
        </footer>


    );
}
