import api from "../../api";
import StatisticsCard from "./components/cards/statisticsCard";

const Home = async () => {
  const response = await api.get("/statistics");
  
  return (
    <section className="grid grid-cols-4 gap-5 mt-5 mb-10 w-full mr-5 mx-5 xl:mx-0">
      {
        response.data.products >= 0 && (
          <StatisticsCard data={response.data.products} type="Produtos" route="/products" />
        )
      }

      {
         response.data.orders >= 0 && (
          <StatisticsCard data={response.data.orders} type="Pedidos" route="/orders" />
        )
      }

      {
         response.data.clients >= 0 && (
          <StatisticsCard data={response.data.clients} type="Clientes" route="/clients" />
        )
      }
    </section>
  );
}

export default Home;