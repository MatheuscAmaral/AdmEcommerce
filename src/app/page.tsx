import { IoCart } from "react-icons/io5";
import api from "../../api"

const Home = async () => {
  const statistics = await fetch("http://localhost:3333/statistics");
  

  return (
    <section className="grid grid-cols-4 gap-5 mt-5 mb-10 w-full mr-5">
       {
        statistics.map((s) => {
          <div
            className="flex flex-col gap-20 shadow-md h-52 p-5 w-full rounded-lg bg-white cursor-pointer "
          >
            <p className="text-lg md:text-xl font-bold">
              Produtos
            </p>

            <div className="flex justify-between w-full">
              <IoCart fontSize={30} />
              <p className="text-3xl font-bold">
                {s.products}
              </p>
            </div>
          </div>
        })
       }
    </section>
  );
}

export default Home;