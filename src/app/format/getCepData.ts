import axios from "axios";

export const verifyCep = async (zipCode: string) => {
  if(zipCode.length != 8 && zipCode.length != 0) {
      return;
  }

  if(zipCode.length == 0) {
      return;
  }

  try {
      const response = await axios.get(`https://opencep.com/v1/${zipCode}`);

      const data = {
          cep: response.data.cep,
          street: response.data.logradouro,
          neighborhood: response.data.bairro,
          city: response.data.localidade,
          state: response.data.uf
      }

      return data;
  }

  catch {
      console.error("Ocorreu um erro ao buscar o cep!");
  }  
}
