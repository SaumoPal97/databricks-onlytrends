import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "/logo.png";

const TopNav = () => {
  return (
    <nav className="absolute top-0 left-0 inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link className="flex items-center" to="/">
            <img className="w-36" src={Logo} />
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              to="/"
            >
              Home
            </Link>
            <Link
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              to="/reports"
            >
              Reports
            </Link>
            <Link
              className="font-medium flex items-center text-sm transition-colors hover:underline"
              to="/chat"
            >
              Chat with AI
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link className="flex items-center" to="/upload">
              <Button size="sm" variant="outline">
                Upload a Report
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
