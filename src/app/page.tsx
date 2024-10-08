import { IoCart } from "react-icons/io5";
import api from "../../api";

const Home = async () => {
  const response = await api.get("http://localhost:3333/statistics");
  
  return (
    <section className="grid grid-cols-4 gap-5 mt-5 mb-10 w-full mr-5 mx-5 xl:mx-0">
      {
        <div
            className="flex flex-col gap-20 shadow-md h-52 p-5 w-full rounded-lg bg-white "
          >
            <p className="text-lg md:text-xl font-bold">
              Produtos
            </p>

            <div className="flex justify-between w-full">
              <IoCart fontSize={30} />
              <p className="text-3xl font-bold">
                {response.data.products}
              </p>
            </div>
        </div>
      }
    </section>
  );
}

export default Home;