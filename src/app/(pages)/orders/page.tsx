'use client'

import { useContext, useEffect, useState } from "react";
import { columns } from "./table/columns";
import { DataTable } from "./table/dataTable";
import { IOrders } from "@/interfaces/IOrders";
import { ReloadContext } from "@/hooks/reloadContent";
import api from "../../../../api";
import Container from "../../components/container";

const Orders = () => {
  const [data, setData] = useState<IOrders[]>([]);
  const { data: response} = useContext(ReloadContext);

  const getOrders = async () => {
      try {
          const response = await api.get("/orders");
          setData(response.data);
      } catch (error) {
          console.log(error)
      }
  }

  useEffect(() => {
      getOrders();
  }, [response])

  return (
    <Container>
        <h1 className="text-2xl font-bold text-gray-700 flex items-center gap-1">
            Pedidos <span className="text-sm mt-1">({data.length})</span>
        </h1>

        <DataTable data={data} columns={columns}/>
    </Container>
  )
}

export default Orders;