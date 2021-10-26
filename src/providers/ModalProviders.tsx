import { useDisclosure, useBoolean } from "@chakra-ui/react";
import {
  createContext,
  useContext,
  ReactNode,
} from "react";

interface ModalProviderProps {
  children: ReactNode;
}

interface ModalContextData {
    onOpen: () => void;
    onClose: () => void;
    isOpen: boolean;
    canOpenSuccess: boolean;
    setCanOpenSuccess: {
        readonly on: () => void;
        readonly off: () => void;
        readonly toggle: () => void;
    }

}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within an ModalProvider");
  }
  return context;
};

const ModalProvider = ({ children }: ModalProviderProps) => {
    const {isOpen,onClose,onOpen} = useDisclosure()
    const [canOpenSuccess, setCanOpenSuccess] = useBoolean()

  return <ModalContext.Provider value={{isOpen,onClose,onOpen, canOpenSuccess,setCanOpenSuccess}}>{children}</ModalContext.Provider>;
};
export { useModal, ModalProvider };
