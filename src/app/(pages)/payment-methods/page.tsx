'use client'

import { useContext, useEffect, useState } from "react";
import { columns } from "./table/columns";
import { DataTable } from "./table/dataTable";
import { ReloadContext } from "@/hooks/reloadContent";
import { IPaymentMethods } from "@/interfaces/IPaymentsMethods";
import api from "../../../../api";
import Container from "../../components/container";

const PaymentMethods = () => {
  const [data, setData] = useState<IPaymentMethods[]>([]);
  const { data: response} = useContext(ReloadContext);

  const getPaymentMethods = async () => {
      try {
          const response = await api.get("/payments");
          setData(response.data);
      } catch (error) {
          console.log(error)
      }
  }

  useEffect(() => {
      getPaymentMethods();
  }, [response])

  return (
    <Container>
        <h1 className="text-2xl font-bold text-gray-700 flex items-center gap-1">
            Formas de pagamento <span className="text-sm mt-1">({data.length})</span>
        </h1>

        <DataTable data={data} columns={columns}/>
    </Container>
  )
}

export default PaymentMethods;