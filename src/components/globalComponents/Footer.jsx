function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; 2023 Your Awesome Website. All rights reserved.</p>
        <p>Contact us at: yourwebsite@email.com</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="text-blue-400">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-blue-400">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-red-400">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
