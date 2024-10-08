'use client'

import { useState } from "react";
import Image from 'next/image';
import { FaHome, FaUserAlt } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoClose, IoLogOutOutline } from "react-icons/io5";
import logoObj from "../../images/rwalogo2.png";
const logo = logoObj.src;

const Header = () => {
  const [mobile, setMobile] = useState(false);

  const navigateToRoute = (route: string) => {
    setMobile(false);
  };

  return (
    <div className="relative transition-all">
      <header
        className={`${
          mobile ? "hidden" : "flex xl:hidden  justify-between items-center"
        } px-3 bg-white w-full`}
      >
        <div className=" flex items-center gap-2 pb-1 ml-2">
          <Image src={logo} alt="logo" width={40} height={40} />
          <p className="text-md font-medium">Rwa Suplementos</p>
        </div>

        <button
          className="p-3 my-5 rounded-lg hover:bg-gray-100"
          onClick={() => setMobile(true)}
        >
          <FaBarsStaggered fontSize={23} />
        </button>
      </header>

      <section
        className={`${
          mobile ? "flex flex-col xl:hidden" : "hidden"
        } items-center bg-white w-full h-svh absolute z-50 py-1 px-2`}
      >
        <div className="flex justify-between items-center w-full">
          <div className=" flex items-center gap-2 pt-4 pb-1 ml-2">
            <Image src={logo} alt="logo" width={42} height={42}  className="h-11 my-2" />
            <p className="text-md font-medium">Rwa Suplementos</p>
          </div>

          <button
            className="p-2 my-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobile(false)}
          >
            <IoClose fontSize={27} />
          </button>
        </div>

        <ul className="flex flex-col gap-2 w-full mt-1 select-none overflow-auto pb-20 xl:pb-0">
          <li
            onClick={() => navigateToRoute("/")}
            className="flex gap-3 hover:bg-gray-100 transition-all w-full p-4 rounded-lg items-center text-gray-600 font-semibold cursor-pointer"
          >
            <FaHome fontSize={24} />
            <p className="text-lg">Home</p>
          </li>

          <div className="fixed h-20 bottom-0 bg-white left-3 w-full pr-6">
            <hr/>

            <li className="flex justify-between gap-3 mt-2 w-full pl-3 py-2 rounded-lg items-center text-gray-600 font-semibold cursor-pointer">
              <div className="flex items-center gap-3.5">
                <FaUserAlt fontSize={23} />
                <p className="text-lg">Matheus Amaral</p>
              </div>

              <IoLogOutOutline
                // onClick={LogOut}
                fontSize={40}
                className="cursor-pointer mr-2 rounded-md p-2 hover:bg-gray-100 transition-all"
              />
            </li>
          </div>
        </ul>
      </section>
    </div>
  );
};

export default Header;
