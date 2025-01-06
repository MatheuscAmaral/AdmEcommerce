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
import { ReloadContext } from "@/hooks/reloadContent";
import { IPaymentMethods } from "@/interfaces/IPaymentsMethods";
import { FormEvent, useContext, useEffect, useState } from "react"
import api from "../../../../api"

interface ModalEditPaymentsProps {
  isOpen: boolean;
  onClose: () => void;
  row: IPaymentMethods
}

const ModalEditPayments: React.FC<ModalEditPaymentsProps> = ({isOpen, onClose, row }) => {
  const [description, setDescription] = useState(row.description || "");
  const [status, setStatus] = useState(String(row.status) || "");
  const [loading, setLoading] = useState(false);
  const { updatedData } = useContext(ReloadContext);

  useEffect(() => {
   if (isOpen) {
    setDescription(row.description || "");
    setStatus(String(row.status) || "");
   }
  }, [isOpen])


  const closeModal = () => {
    const closeButton = document.getElementById("close");
     
    if (closeButton) {
      closeButton.click();
    }
   
    setDescription("");
    setStatus("");
  }

  const editPaymentMethods = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        description,
        status: Number(status)
      }

      await api.put(`/payments/${row.id}`, data);
      
      updatedData();
      closeModal();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:w-full max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
            <DialogDescription>
              Preencha as informações da foram de pagamento aqui, quando estiver pronto, clique em salvar.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={(e) => editPaymentMethods(e)}>
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
                  placeholder="Digite a descricão da forma de pagamento..."
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

export default ModalEditPayments;