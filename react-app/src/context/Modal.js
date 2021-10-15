import { createContext, useContext } from "react";
import { useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null)

    function toggleModal() {
        setIsOpen(true);
        const body = document.querySelector("body");
        body.style.overflow = "hidden";
    }

    function closeModal() {
        setIsOpen(false);
        const body = document.querySelector("body");
        body.style.overflow = "auto";
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
