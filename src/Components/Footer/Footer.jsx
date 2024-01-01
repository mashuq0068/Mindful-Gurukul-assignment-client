

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-200 via-blue-200 to-gray-200 mt-10 p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-1">
            <img
              src="https://multichannelworks.com/wp-content/uploads/2015/10/users.png"
              alt="logo"
              className="mr-5 h-6 sm:h-9"
            />
            <p className="mt-4 text-gradient font-bold">
              User Hub
            </p>
            <div className="flex mt-8 space-x-6 text-gray-600">
                 {/* Twitter icon path */}
                 <img
                  src="https://icons.iconarchive.com/icons/iynque/ios7-style/1024/Twitter-icon.png" 
                  alt="Instagram Icon"
                  className="w-6 h-6"
                />
               {/* Facebook icon path */}
               <img
                  src="https://www.freepnglogos.com/uploads/facebook-icons/facebook-6.png" 
                  alt="Instagram Icon"
                  className="w-6 h-6"
                />
              {/* LinkedIn icon path */}
              <img
                  src="https://www.freepnglogos.com/uploads/linkedin-blue-style-logo-png-0.png" 
                  alt="Instagram Icon"
                  className="w-6 h-6"
                />
              {/* Instagram icon path */}
              <img
                  src="https://clipartcraft.com/images/instagram-logo-transparent-background-2.png" 
                  alt="Instagram Icon"
                  className="w-6 h-6"
                />
            </div>
          </div>
          {/* company */}
          <div className="col-span-1">
            <p className="text-gradient font-bold ">Company</p>
            <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
              <a
                href="#"
                className="hover:opacity-75"
              >
                About
              </a>
              <a
                href="#"
                className="hover:opacity-75"
              >
                Meet the Team
              </a>
              <a
                href="#"
                className="hover:opacity-75"
              >
                History
              </a>
              <a
                href="#"
                className="hover:opacity-75"
              >
                Careers
              </a>
            </nav>
          </div>
          {/* services */}
          <div className="col-span-1">
            <p className="text-gradient font-bold">Services</p>
            <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
              <a
                href="#"
                className="hover:opacity-75"
              >
                1on1 Coaching
              </a>
              <a
                href="#"
                className="hover:opacity-75"
              >
                Company Review
              </a>
              <a
                href="#"
                className="hover:opacity-75"
              >
                Accounts Review
              </a>
              <a
                href="#"
                className="hover:opacity-75"
              >
                HR Consulting
              </a>
              <a
                href="#"
                className="hover:opacity-75"
              >
                SEO Optimisation
              </a>
            </nav>
          </div>
          {/* helpful Links */}
          <div className="col-span-1">
            <p className="text-gradient font-bold">Helpful Links</p>
            <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
              <a
                href="#"
                className="hover:opacity-75"
              >
                Contact
              </a>
              <a
                href="#"
                className="hover:opacity-75"
              >
                FAQs
              </a>
              <a
                href="#"
                className="hover:opacity-75"
              >
                Live Chat
              </a>
            </nav>
          </div>
        
        </div>
        <p className="text-gray-500 text-xs mt-8">&copy; 2023 Life Puls</p>
      </div>
    </footer>
  );
};

export default Footer;
