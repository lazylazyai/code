import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { Rocket, Code2, Sparkles, Atom } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";

import RunButton from "./RunButton";
import HeaderProfileBtn from "./HeaderProfileBtn";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";

async function Header() {
  // Check if Convex URL is available
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  
  let convexUser = null;
  let user = null;

  try {
    if (convexUrl) {
      const convex = new ConvexHttpClient(convexUrl);
      user = await currentUser();

      if (user?.id) {
        convexUser = await convex.query(api.users.getUser, {
          userId: user.id,
        });
      }
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Continue rendering without user data
  }

  return (
    <div className="relative z-10">
      <div className="glass rounded-2xl p-6 mb-6 relative overflow-hidden cosmic-border">
        {/* Cosmic grid background */}
        <div className="absolute inset-0 cosmic-grid opacity-30" />
        
        {/* Holographic effect */}
        <div className="absolute inset-0 holographic opacity-20" />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-50" />
        
        <div className="relative flex items-center lg:justify-between justify-center">
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="flex items-center gap-4 group relative">
              {/* Animated cosmic glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />

              {/* Logo container with energy pulse */}
              <div className="relative energy-pulse bg-gradient-to-br from-cyan-600 to-purple-600 p-4 rounded-2xl shadow-glow group-hover:shadow-glow-purple transition-all duration-300 transform group-hover:scale-110">
                <Rocket className="w-8 h-8 text-white transform group-hover:rotate-12 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-2xl animate-pulse" />
              </div>

              <div className="flex flex-col">
                <span className="block text-2xl font-bold gradient-text neon-text">
                  SyntaxForge
                </span>
                <span className="block text-sm text-cyan-400/80 font-medium">
                  Cosmic Code Laboratory
                </span>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center space-x-2">
              <Link
                href="/snippets"
                className="relative group flex items-center gap-3 px-6 py-3 rounded-xl glass-dark hover:bg-cyan-500/20 transition-all duration-300 shadow-lg overflow-hidden card-hover cosmic-border"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Code2 className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors group-hover:rotate-3 transform duration-300" />
                <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors relative z-10">
                  Code Vault
                </span>
                <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 glass-dark rounded-xl p-2 cosmic-border">
              <ThemeSelector />
              <div className="w-px h-8 bg-gradient-to-b from-cyan-500/50 to-purple-500/50" />
              <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
            </div>

            {!convexUser?.isPro && (
              <Link
                href="/pricing"
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 hover:border-amber-400/50 transition-all duration-300 card-hover shadow-glow"
              >
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-semibold text-amber-300">
                  Quantum Upgrade
                </span>
              </Link>
            )}

            {convexUser?.isPro && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 cosmic-border">
                <Atom className="w-4 h-4 text-purple-400 animate-spin" />
                <span className="text-sm font-medium text-purple-300">Quantum Pro</span>
              </div>
            )}

            <SignedIn>
              <RunButton />
            </SignedIn>

            <div className="pl-4 border-l border-gradient-to-b from-cyan-500/50 to-purple-500/50">
              <HeaderProfileBtn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;