function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Features Website. All rights reserved.</p>
        <p className="mt-2 text-gray-400">Inspired by Chronos</p>
      </div>
    </footer>
  );
}

export default Footer;
