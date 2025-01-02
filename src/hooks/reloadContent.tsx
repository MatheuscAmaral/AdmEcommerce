'use client'

import React, { createContext, useState } from "react";

interface ReloadContextProps {
  file: File | null
  updatedFile: (file: File) => void
  updatedData: () => void
  data: boolean
}

interface ChildrenProps {
  children: React.ReactNode
}

export const ReloadContext = createContext({} as ReloadContextProps);

const ReloadProvider = ({ children }: ChildrenProps) => {
  const [data, setData] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const updatedData = () => {
    setData(!data);
  }

  const updatedFile = (file: File) => {
    setFile(file);
  }

  return(
    <ReloadContext.Provider value={{ updatedData, data, file, updatedFile }}> 
      {children}
    </ReloadContext.Provider>
  )
}

export default ReloadProvider;