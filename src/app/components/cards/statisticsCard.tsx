'use client'

import { IoCart } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { FaTruckRampBox } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";

const StatisticsCard = ({ data, type, route }: { data: number, type: string, route: string }) => {
  const router = useRouter();
  
  return (
      <div
          className="flex flex-col gap-20 shadow-md h-52 p-5 w-full rounded-lg bg-white cursor-pointer"
          onClick={() => router.push(route)}
        >
          <p className="text-lg md:text-xl font-bold">
            {type}
          </p>

          <div className="flex justify-between w-full">
            {
              type === "Produtos" && (
                <IoCart className="text-gray-800" fontSize={30} />
              ) ||
              type === "Pedidos" && (
                <FaTruckRampBox className="text-gray-800" fontSize={30} />
              ) || 
              type === "Clientes" && (
                <FaUsers className="text-gray-800" fontSize={30} />
              ) ||
              type === "Formas de pagamento" && (
                <RiSecurePaymentFill className="text-gray-800" fontSize={30} />
              ) 
            }
            <p className="text-3xl font-bold ">
              {data || 0}
            </p>
          </div>
      </div>
  )
}

export default StatisticsCard;