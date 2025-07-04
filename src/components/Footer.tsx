import { Rocket, Atom } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="relative border-t border-cyan-500/20 mt-auto cosmic-border">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute inset-0 cosmic-grid opacity-10" />
      <div className="max-w-7xl mx-auto px-4 py-8 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Atom className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '3s' }} />
            <span>Powered by Quantum Computing & Neural Networks</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/support" className="text-gray-400 hover:text-cyan-300 transition-colors">
              Support
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-cyan-300 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-cyan-300 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;