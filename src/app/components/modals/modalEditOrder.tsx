'use client'

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
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
import { FormEvent, useContext, useEffect, useState } from "react"
import { ReloadContext } from "@/hooks/reloadContent";
import api from "../../../../api"
import { IOrders } from "@/interfaces/IOrders";
import { verifyCep } from "@/app/format/getCepData";

interface ModalEditOrdersProps {
  isOpen: boolean;
  onClose: () => void;
  row: IOrders
}

const ModalEditOrders: React.FC<ModalEditOrdersProps> = ({isOpen, onClose, row }) => {
  const [zipCode, setZipCode] = useState((row.zip_code) || "");
  const [street, setStreet] = useState(row.street || "");
  const [neighborhood, setNeighborhood] = useState(row.neighborhood || "");
  const [city, setCity] = useState(row.city || "");
  const [state, setState] = useState(row.uf || "");
  const [number, setNumber] = useState(row.number || "");
  const [status, setStatus] = useState(String(row.status) || "");
  const [loading, setLoading] = useState(false);
  const { updatedData } = useContext(ReloadContext);

  useEffect(() => {
   if (isOpen) {
    setZipCode((row.zip_code) || ""); 
    setStreet(row.street || "");
    setNeighborhood(row.neighborhood || "");
    setCity(row.city || "");
    setState(row.uf || "");
    setNumber(row.number || "");
    setStatus(String(row.status) || "");
   }
  }, [isOpen])


  const closeModal = () => {
    const closeButton = document.getElementById("close");
     
    if (closeButton) {
      closeButton.click();
    }
   
    setZipCode("");
    setStreet("");
    setNeighborhood("");
    setCity("");
    setState("");
    setNumber("");
    setStatus("");
  }

  const editOrder = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        zipCode: Number(zipCode),
        street: street,
        neighborhood: neighborhood,
        city: city,
        uf: state,
        number: number,
        status: Number(status)
      }

      await api.put(`/orders/${row.id}`, data);
      
      updatedData();
      closeModal();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const verifyZipCode = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(e.target.value);

    if (e.target.value.length === 8 && (e.target.value != row.zip_code || (e.target.value == row.zip_code && row.street != street))) {
      const data: any = await verifyCep(e.target.value);
      
      setStreet(data.street);
      setNumber('');
      setNeighborhood(data.neighborhood);
      setCity(data.city);
      setState(data.uf);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:w-full max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Pedido</DialogTitle>
            <DialogDescription>
              Preencha as informações do pedido aqui, quando estiver pronto, clique em salvar.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={(e) => editOrder(e)}>
            <section className="flex flex-col gap-6 py-4 pb-10 justify-start w-full overflow-y-auto relative" style={{ maxHeight: "600px" }}>
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="zipCode">
                  Cep:
                </Label>

                <Input
                  id="zipCode"
                  type="text"
                  value={zipCode != "" ? zipCode : zipCode}
                  onChange={(e) => verifyZipCode(e)}
                  className="col-span-3 max-w-full"
                  placeholder="Digite o cep de entrega do pedido..."
                  required
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="street">
                  Rua:
                </Label>

                <Input
                  id="street"
                  type="text"
                  value={street != "" ? street : street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="col-span-3 max-w-full"
                  placeholder="Digite a rua de entrega do pedido..."
                  required
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="number">
                  Número:
                </Label>

                <Input
                  id="number"
                  type="text"
                  value={number != "" ? number : number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="col-span-3 max-w-full"
                  placeholder="Digite o número de entrega do pedido..."
                  required
                />
              </div>
              
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="neighborhood">
                  Bairro:
                </Label>

                <Input
                  id="neighborhood"
                  type="text"
                  value={neighborhood != "" ? neighborhood : neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="col-span-3 max-w-full"
                  placeholder="Digite o bairro de entrega do pedido..."
                  required
                />
              </div>
              
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="city">
                  Cidade:
                </Label>

                <Input
                  id="city"
                  type="text"
                  value={city != "" ? city : city}
                  onChange={(e) => setCity(e.target.value)}
                  className="col-span-3 max-w-full"
                  placeholder="Digite a cidade de entrega do pedido..."
                  required
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="uf">
                  Estado:
                </Label>

                <Input
                  id="uf"
                  type="text"
                  value={state != "" ? state : state}
                  onChange={(e) => setState(e.target.value)}
                  className="col-span-3 max-w-full"
                  placeholder="Digite o estado de entrega do pedido..."
                  required
                />
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
                    <SelectItem value="1">Em análise</SelectItem>
                    <SelectItem value="2">Bloqueado</SelectItem>
                    <SelectItem value="3">Cancelado</SelectItem>
                    <SelectItem value="4">Faturado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </section>
          <DialogFooter className=" mt-5 bg-white">
            <Button type="submit" className="bg-blue-900 text-white hover:bg-blue-800">
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

export default ModalEditOrders;