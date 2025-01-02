'use client'

import { useContext, useEffect, useState } from "react";
import { ReloadContext } from "@/hooks/reloadContent";
import api from "../../../../api";
import Container from "../../components/container";
import { DataTable } from "./table/dataTable";
import { columns } from "./table/columns";
import { IGateways } from "@/interfaces/IGateways";

const Gateways = () => {
  const [data, setData] = useState<IGateways[]>([]);
  const { data: response} = useContext(ReloadContext);

  const getGateways = async () => {
      try {
          const response = await api.get("/gateways");
          setData(response.data);
      } catch (error) {
          console.log(error)
      }
  }

  useEffect(() => {
    getGateways();
  }, [response])

  return (
    <Container>
        <h1 className="text-2xl font-bold text-gray-700 flex items-center gap-1">
            Gateways <span className="text-sm mt-1">({data.length})</span>
        </h1>

        <DataTable data={data} columns={columns}/>
    </Container>
  )
}

export default Gateways;