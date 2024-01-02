// AboutSection.js



const About = () => {
  return (
    <div>
      <header className="bg-gradient-to-r from-[#3490dc] to-[#6574cd] text-white text-center py-8">
        <h1 className="md:text-3xl text-2xl font-bold">Welcome to User Hub</h1>
      </header>

      <div className="container mx-auto mt-8 p-4">
        <div className="flex flex-col items-center">
          <img
          
            src="https://www.clipartmax.com/png/middle/349-3496311_download-users-icon-clipart-computer-icons-user-communication-users-group-icon.png"
            alt="User Hub Logo"
            className="md:max-w-md rounded-full mb-4"
          />

<p className="text-lg text-gray-700 mb-4">
            User Hub is more than just a platform; it's a thriving community where individuals from diverse backgrounds come together to share, learn, and connect. Whether you're a seasoned professional or just starting your journey, User Hub provides a space for everyone.
          </p>

          <p className="text-lg text-gray-700 mb-4">
            Share your experiences, insights, and expertise with our welcoming community. Connect with like-minded individuals, forge new friendships, and be a part of something bigger. User Hub is not just a platform; it's a network of individuals passionate about collaboration and growth.
          </p>

          <p className="text-lg text-gray-700 mb-4">
            Explore the world of User Hub as we embark on this journey together. Discover new perspectives, broaden your horizons, and make valuable connections. User Hub is where ideas flourish, and relationships are built. Join us today and become an integral part of our vibrant community!
          </p>
        </div>
      </div>

      <footer className="bg-gradient-to-r from-[#3490dc] to-[#6574cd] text-white text-center py-4">
        <p>&copy; 2024 User Hub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
