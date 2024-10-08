import api from "../../../api";
import Container from "../components/container";
import { DataTable } from "./dataTable";

const Products = async () => {
    const response = await api.get("/products/adm");

    return (
        <Container>
            <h1 className="text-2xl font-bold text-gray-700 flex items-center gap-1">
                Produtos <span className="text-sm mt-1">(0)</span>
            </h1>

            <DataTable data={response.data}/>
        </Container>
    )
}

export default Products;