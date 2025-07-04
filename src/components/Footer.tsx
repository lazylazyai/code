import { Code } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="relative border-t border-indigo-500/20 mt-auto modern-border">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="max-w-7xl mx-auto px-4 py-8 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Code className="w-5 h-5 text-indigo-400" />
            <span>Built with modern web technologies</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/support" className="text-gray-400 hover:text-indigo-300 transition-colors">
              Support
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-indigo-300 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-indigo-300 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;