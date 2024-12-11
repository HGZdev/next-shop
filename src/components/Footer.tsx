// app/components/Footer.tsx
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 p-4 text-center text-white">
      <p>© {new Date().getFullYear()} Next Shop. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
