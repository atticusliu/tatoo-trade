import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex justify-center items-center bottom-0 left-0 w-full py-4 bg-white border-t border-gray-200">
      <div className="flex gap-x-6">
        <p>&copy; 2024 Tattoo Trade</p>
        <Link href="/terms-of-service" className="hover:text-gray-300">
          Terms of Service
        </Link>
        <Link href="/privacy-policy" className="hover:text-gray-300">
          Privacy Policy
        </Link>
        <Link href="/contact-us" className="hover:text-gray-300">
          Contact Us
        </Link>
        <Link href="/credits" className="hover:text-gray-300">
          Credits
        </Link>
      </div>
    </footer>
  );
}