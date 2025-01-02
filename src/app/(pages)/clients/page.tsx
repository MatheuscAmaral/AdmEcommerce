'use client'

import { useContext, useEffect, useState } from "react";
import { columns } from "./table/columns";
import { DataTable } from "./table/dataTable";
import { IClients } from "@/interfaces/IClients";
import { ReloadContext } from "@/hooks/reloadContent";
import Container from "../../components/container";
import api from "../../../../api";

const Clients = () => {
  const [data, setData] = useState<IClients[]>([]);
  const { data: response} = useContext(ReloadContext);

  const getClients = async () => {
      try {
          const response = await api.get("/users");
          setData(response.data);
      } catch (error) {
          console.log(error)
      }
  }

  useEffect(() => {
      getClients();
  }, [response])
  
  return (
    <Container>
        <h1 className="text-2xl font-bold text-gray-700 flex items-center gap-1">
            Clientes <span className="text-sm mt-1">({data.length})</span>
        </h1>

        <DataTable data={data} columns={columns}/>
    </Container>
  )
}

export default Clients;