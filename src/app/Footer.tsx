// app/Footer.tsx
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>© {new Date().getFullYear()} Next Shop. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
