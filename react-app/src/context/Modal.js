import { createContext, useContext } from "react";
import { useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null)

    function toggleModal() {
        setIsOpen(() => !isOpen);
      }
    
    function closeModal() {
        setIsOpen(false);
    }

    return (
        <ModalContext.Provider
            value={{
                isOpen,
                setIsOpen,
                toggleModal,
                closeModal,
                modalContent,
                setModalContent
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => useContext(ModalContext)
