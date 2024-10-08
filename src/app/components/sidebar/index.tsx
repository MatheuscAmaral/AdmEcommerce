'use client'

import { useRouter } from 'next/navigation';
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { RiUserSettingsFill } from "react-icons/ri";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Input,
} from "@material-tailwind/react";

import logoObj from "../../images/rwalogo2.png";

const logo = logoObj.src;

import { FaUserAlt, FaHome } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = (() => {
      let items = [
        { label: "Início", icon: <FaHome fontSize={24} />, path: "/" },
        {
          label: "Produtos",
          icon: <IoCart fontSize={24} />,
          path: "/products",
        }
      ];

    return items.filter((item: { label: string }) =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  })();


  return (
    //@ts-ignore
    <Card className="hidden xl:block h-svh relative w-full p-4 shadow-xl shadow-blue-gray-900/5 select-none max-w-72">
      <div className=" flex items-center gap-2 pt-4 pb-1 ml-2">
        <img src={logo} alt="brand" className="h-11 my-2" />
        <p className="text-md font-medium">Rwa Suplementos</p>
      </div>

      <div className="p-2">
        {/* @ts-ignore */}
        <Input
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          label="Pesquisar..."
          onChange={handleSearch}
        />
      </div>

      {/* @ts-ignore */}
      <List>
        <div className="overflow-auto max-h-[calc(100vh-200px)] pb-10 ">
          {filteredItems.map((item: {icon: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; label: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
            // @ts-ignore
            <ListItem className="my-1" key={index} onClick={() => handleNavigate(item.path)}>
              {/* @ts-ignore */}
              <ListItemPrefix>{item.icon}</ListItemPrefix>
              {item.label}
            </ListItem>
          ))}
        </div>

        <div className="fixed bottom-0 bg-white left-4 max-w-64 w-full">
          <hr className="my-3 mr-3 border-blue-gray-50" />

          <div className="flex justify-between items-center ml-2 mr-4 pb-4">
            <div className="flex gap-4 items-center whitespace-nowrap">
              <FaUserAlt fontSize={20} />
              <p className="flex gap-1" style={{ fontSize: 15 }}>
                <span>Matheus Amaral</span>
              </p>
            </div>

            <IoLogOutOutline
              // onClick={LogOut}
              fontSize={32}
              title="Sair"
              className="cursor-pointer hover:bg-gray-100 p-1 rounded-md"
            />
          </div>
        </div>
      </List>
    </Card>
  );
};

export default Sidebar;
