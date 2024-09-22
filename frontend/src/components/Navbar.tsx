import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      <nav className="border bg-gray-100 b-2 w-full py-4 ">
        <main className="flex justify-between items-center px-4 sm:mx-8 md:mx-16 lg:mx-64">
          <div>
            <Link className="text-2xl font-bold" to="/">
              Otp-sender-app
            </Link>
          </div>
          <div>
            <ul className="flex justify-center items-center gap-4 lg:gap-8">
              {/* Highlight the 'Users' link when pathname is "/" */}
              <Link to="/">
                <li
                  className={`${
                    pathname === "/" ? "font-bold underline" : "text-black"
                  }`}
                >
                  Users
                </li>
              </Link>

              {/* Highlight the 'Messages' link when pathname is "/messages" */}
              <Link to="/messages">
                <li
                  className={`${
                    pathname === "/messages"
                      ? "font-bold underline"
                      : "text-black"
                  }`}
                >
                  Messages
                </li>
              </Link>
            </ul>
          </div>
        </main>
      </nav>
    </>
  );
};

export default Navbar;
