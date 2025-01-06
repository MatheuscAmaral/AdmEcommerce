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
import { IProducts } from "@/interfaces/IProducts";
import FileUpload from "../fileUpload";
import api from "../../../../api"

interface ModalEditProductsProps {
  isOpen: boolean;
  onClose: () => void;
  row: IProducts
}

const ModalEditProducts: React.FC<ModalEditProductsProps> = ({isOpen, onClose, row }) => {
  const { updatedData, file: updatedFile } = useContext(ReloadContext);
  const [link, setLink] = useState(row.image || "");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(updatedFile || null);
  const [title, setTitle] = useState(row.title || "");
  const [price, setPrice] = useState<number | string>(row.price || "");
  const [size, setSize] = useState<number | string>(row.size || "");
  const [category, setCategory] = useState(row.category || "");
  const [flavor, setFlavor] = useState(row.flavor || "");
  const [stock, setStock] = useState(row.stock || "");
  const [typePack, setTypePack] = useState(String(row.type_pack) || "");
  const [status, setStatus] = useState(String(row.status) || "");

  useEffect(() => {
   if (isOpen) {
    setLink(row.image || "");
    setTitle(row.title || "");
    setPrice(row.price || "");
    setSize(row.size || "");
    setCategory(row.category || "");
    setFlavor(row.flavor || "");
    setStock(row.stock || "");
    setTypePack(String(row.type_pack) || "");
    setStatus(String(row.status) || "");
   }
  }, [isOpen])

  useEffect(() => {
    if (updatedFile) {
      setFile(updatedFile);
    }
  }, [updatedFile])

  const closeModal = () => {
    const closeButton = document.getElementById("close");
     
    if (closeButton) {
      closeButton.click();
    }
    
    setLink("");
    setTitle("");
    setPrice("");
    setStock("");
    setFile(null);
    setSize("");
    setCategory("");
    setFlavor("");
    setTypePack("");
    setStatus("");
  }

  const editProduct = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let verifyIfSaveImage;

      if (file) {
       verifyIfSaveImage = await saveImage();
      }

      const data = {
          image: verifyIfSaveImage || link,
          title: title,
          price: price,
          size: size,
          category: category,
          flavor: flavor,
          stock: Number(stock),
          type_pack: typePack,
          status: Number(status)
      }
      
      await api.put(`/products/${row.product_id}`, data);
      closeModal();
      updatedData();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const saveImage = async () => {
    if (!file) {

      setError(true);
      return "error"; 
    }
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const response = await api.post("/upload",
        formData,
      );
      
      setError(false);
      return response.data.url; 
    } catch (error: any) {
      if (error.response.data.error != "Token inválido!") {
        setError(true);
      }
      return "error";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:w-full max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
            <DialogDescription>
              Preencha as informações do produto aqui, quando estiver pronto, clique em salvar.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={(e) => editProduct(e)}>
            <section className="flex flex-col gap-6 py-4 pb-10 justify-start w-full overflow-y-auto relative" style={{ maxHeight: "600px" }}>
              <FileUpload row={row} error={error} />

              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="description">
                  Descrição:
                </Label>

                <Input
                  id="description"
                  type="text"
                  value={title != "" ? title : title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="col-span-3 max-w-full"
                  placeholder="Digite a descrição do produto..."
                  required
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="price">
                  Preço:
                </Label>

                <Input
                  id="price"
                  type="number"
                  value={price != "" ? price : price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="col-span-3 max-w-full"
                  placeholder="Digite o preço do produto..."
                  required
                  />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="size">
                  Tamanho:
                </Label>

                <Input
                  id="size"
                  type="number"
                  value={size != "" ? size : size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="col-span-3 max-w-full"
                  placeholder="Digite o tamanho do produto..."
                  required
                  />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="category">
                  Categoria:
                </Label>

                <Select
                  onValueChange={(e) => setCategory(e)} 
                  value={category != "" ? category : ""}
                  defaultValue={category}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Whey</SelectItem>
                    <SelectItem value="2">Creatina</SelectItem>
                    <SelectItem value="3">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="size">
                  Estoque:
                </Label>

                <Input
                  id="stock"
                  type="number"
                  value={stock != "" ? stock : stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="col-span-3 max-w-full"
                  placeholder="Digite o estoque do produto..."
                  required
                  />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="flavor">
                  Sabor:
                </Label>

                <Select
                  onValueChange={(e) => setFlavor(e)} 
                  value={flavor != "" ? flavor : ""}
                  defaultValue={flavor}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o sabor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Chocolate">Chocolate</SelectItem>
                    <SelectItem value="Morango">Morango</SelectItem>
                    <SelectItem value="Baunilha">Baunilha</SelectItem>
                    <SelectItem value="Cookie's cream">Cookie's cream</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="type_pack">
                  Tipo:
                </Label>

                <Select 
                  onValueChange={(e) => setTypePack(e)}
                  value={typePack != "" ? typePack : ""}
                  defaultValue={typePack}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pote">Pote</SelectItem>
                    <SelectItem value="Caixa">Caixa</SelectItem>
                    <SelectItem value="Pacote">Pacote</SelectItem>
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
            <Button type="submit" className="bg-secondaryColor text-white hover:bg-secondaryColor">
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

export default ModalEditProducts;