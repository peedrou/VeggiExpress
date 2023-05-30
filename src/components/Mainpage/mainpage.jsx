import Contact from "../Contact/contact";
import Footer from "../Footer/footer";
import person from "../../images/person.png";
import veggiexpress from "../../images/veggiexpresss.png";
import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "My Profile", href: "/dashboard" },
  { name: "Contact Us", href: "#" },
  { name: "Follow Us", href: "#" },
];

function MainSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const [logged, setLogged] = useState(false);
  const [orderRedirect, setOrderRedirect] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [pushMenu, setPushMenu] = useState(false);
  const [transformMenu, setTransformMenu] = useState(0);
  const Navigate = useNavigate();

  useEffect(() => {
    let cb = function () {
      const totalWidth = window.innerWidth;
      if (totalWidth <= 800) {
        setBurgerMenu(true);
      } else {
        setBurgerMenu(false);
      }
    };
    window.addEventListener("resize", cb);

    return () => {
      window.removeEventListener("resize", cb);
    };
  });

  useEffect(() => {
    const totalWidth = window.innerWidth;
    if (totalWidth <= 800) {
      setBurgerMenu(true);
    } else {
      setBurgerMenu(false);
    }
  }, []);

  useEffect(() => {
    if (!pushMenu) {
      setTransformMenu(-250);
    } else {
      setTransformMenu(0);
    }
  });

  useEffect(() => {
    if (logged) {
      setOrderRedirect(false);
    }
  }, []);

  useEffect(() => {
    try {
      if (currentUser.email != null) {
        setLogged(true);
      }
    } catch {
      console.log(1);
    }
  }, []);

  async function handleLogout() {
    await logout();
    window.location.reload();
  }

  function handleRedirect(value, product) {
    Navigate({
      pathname: "/order",
      search: `?value=${value}&product=${product}`,
    });
  }

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <img className="h-24 w-auto" src={veggiexpress} alt="" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            ></button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {!logged && (
              <div className="flex justify-between gap-6">
                <a
                  href="/signup"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Sign Up
                </a>
                <a
                  href="/login"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Log in <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            )}
            {logged && (
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => handleLogout()}
              >
                Sign Out <span aria-hidden="true">&rarr;</span>
              </a>
            )}
          </div>
        </nav>
      </header>
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
        <div
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
              One click away....
            </h1>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-lg leading-8 text-gray-600">
                from getting fresh veggies at your door
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <button
                  className="rounded-md bg-green-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => {
                    orderRedirect == false
                      ? logged
                        ? handleRedirect(4.99, "One Basket")
                        : setOrderRedirect(true)
                      : logged
                      ? handleRedirect(4.99, "One Basket")
                      : setOrderRedirect(true);
                  }}
                >
                  I want one basket
                </button>
                <button
                  className="text-sm font-semibold leading-6 text-gray-900"
                  onClick={() => {
                    orderRedirect == false
                      ? logged
                        ? handleRedirect(2.99, "Monthly Delivery")
                        : setOrderRedirect(true)
                      : logged
                      ? handleRedirect(2.99, "Monthly Delivery")
                      : setOrderRedirect(true);
                  }}
                >
                  I want the basket every month{" "}
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
            <img
              src={person}
              alt=""
              className="bg-green-700 mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
    </div>
  );
}

function Mainpage() {
  return (
    <div className="super-div">
      <MainSection />
      <Contact />
      <Footer />
    </div>
  );
}

export default Mainpage;
