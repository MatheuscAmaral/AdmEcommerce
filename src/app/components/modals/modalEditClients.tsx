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
import { IClients } from "@/interfaces/IClients";
import api from "../../../../api"

interface ModalEditClientsProps {
  isOpen: boolean;
  onClose: () => void;
  row: IClients
}

const ModalEditClients: React.FC<ModalEditClientsProps> = ({isOpen, onClose, row }) => {
  const [name, setName] = useState(row.name || "");
  const [mail, setMail] = useState(row.email || "");
  const [cpf, setCpf] = useState(row.cpf || "");
  const [status, setStatus] = useState(String(row.status) || "");
  const [loading, setLoading] = useState(false);
  const { updatedData } = useContext(ReloadContext);

  useEffect(() => {
   if (isOpen) {
    setName(row.name || "");
    setMail(row.email || "");
    setCpf(row.cpf || "");
    setStatus(String(row.status) || "");
   }
  }, [isOpen])


  const closeModal = () => {
    const closeButton = document.getElementById("close");
     
    if (closeButton) {
      closeButton.click();
    }
   
    setName("");
    setMail("");
    setCpf("");
    setStatus("");
  }

  const editClient = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        name: name,
        email: mail,
        cpf: cpf,
        status: Number(status)
      }

      await api.put(`/users/${row.id}`, data);
      
      updatedData();
      closeModal();
    } catch (error) {
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
              Preencha as informações do cliente aqui, quando estiver pronto, clique em salvar.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={(e) => editClient(e)}>
            <section className="flex flex-col gap-6 py-4 pb-10 justify-start w-full overflow-y-auto relative" style={{ maxHeight: "600px" }}>
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="name">
                  Nome:
                </Label>

                <Input
                  id="name"
                  type="text"
                  value={name != "" ? name : name}
                  onChange={(e) => setName(e.target.value)}
                  className="col-span-3 max-w-full"
                  placeholder="Digite o nome do cliente..."
                  required
                />
              </div>
              
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="mail">
                  E-mail:
                </Label>

                <Input
                  id="mail"
                  type="text"
                  value={mail != "" ? mail : mail}
                  onChange={(e) => setMail(e.target.value)}
                  className="col-span-3 max-w-full"
                  placeholder="Digite o e-mail do cliente..."
                  required
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="cpf">
                  Cpf:
                </Label>

                <Input
                  id="cpf"
                  type="text"
                  value={cpf != "" ? cpf : cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className="col-span-3 max-w-full"
                  placeholder="Digite o cpf do cliente..."
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

export default ModalEditClients;