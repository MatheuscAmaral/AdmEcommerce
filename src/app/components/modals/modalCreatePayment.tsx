'use client'

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TbLoader3 } from "react-icons/tb";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEvent, useContext, useState } from "react"
import { ReloadContext } from "@/hooks/reloadContent";
import api from "../../../../api"
import { HiCreditCard } from "react-icons/hi2";

const ModalCreatePayment = () => {
  const { updatedData, file: updatedFile } = useContext(ReloadContext);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const closeModal = () => {
    const closeButton = document.getElementById("close");
     
    if (closeButton) {
      closeButton.click();
    }

    setDescription("");
    setType("");
    setStatus("");
  }

  const createPayment = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
          description: description,
          type: Number(type),
          status: Number(status)
      }
      
      await api.post('/payments', data);
      closeModal();
      updatedData();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-1 bg-primaryColor text-white hover:bg-secondaryColor">
            <HiCreditCard fontSize={17}/> Criar Gateway
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:w-full max-w-2xl">
          <DialogHeader>
            <DialogTitle>Criar Forma de pagamento</DialogTitle>
            <DialogDescription>
              Preencha as informações da forma de pagamento aqui, quando estiver pronto, clique em salvar.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={(e) => createPayment(e)}>
            <section className="flex flex-col gap-6 py-4 pb-10 justify-start w-full overflow-y-auto relative" style={{ maxHeight: "600px" }}>
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="description">
                  Descrição:
                </Label>

                <Input
                  id="description"
                  type="text"
                  value={description != "" ? description : description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="col-span-3 max-w-full"
                  placeholder="Digite a descrição da forma de pagamento..."
                  required
                />
              </div>
              
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="type">
                  Tipo:
                </Label>

                <Select
                    value={type != "" ? type : ""}
                    onValueChange={(e) => setType(e)} 
                    required
                  >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Boleto</SelectItem>
                    <SelectItem value="2">Cartão de Crédito</SelectItem>
                    <SelectItem value="3">Pix</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="status">
                  Status:
                </Label>

                <Select
                    value={status != "" ? status : ""}
                  onValueChange={(e) => setStatus(e)} 
                  required 
                  defaultValue="1">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ativo</SelectItem>
                    <SelectItem value="0">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </section>
          <DialogFooter className=" mt-5 bg-white">
            <Button type="submit" className="bg-blue-900 text-white hover:bg-secondaryColor">
              {
                loading ? (
                  <TbLoader3 className=" animate-spin "/>
                ) : "Salvar"
              }
            </Button>
          </DialogFooter>
          </form>

        </DialogContent>
      </Dialog>
  )
}

export default ModalCreatePayment;