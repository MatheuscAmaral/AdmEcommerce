'use client'

import { useContext, useEffect, useState } from "react";
import api from "../../../../api";
import Container from "../../components/container";
import { columns } from "./table/columns";
import { DataTable } from "./table/dataTable";
import type { IProducts } from "@/interfaces/IProducts";
import { ReloadContext } from "@/hooks/reloadContent";

const Products = () => {
    const [data, setData] = useState<IProducts[]>([]);
    const { data: response} = useContext(ReloadContext)

    const getProducts = async () => {
        try {
            const response = await api.get("/products/adm");
            setData(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts();
    }, [response])

    return (
        <Container>
            <h1 className="text-2xl font-bold text-gray-700 flex items-center gap-1">
                Produtos <span className="text-sm mt-1">({data.length})</span>
            </h1>

            <DataTable data={data} columns={columns}/>
        </Container>
    )
}

export default Products;