"use client";

import React, { useState } from "react";
import Button from "./Button";
import HourModal from "./HourModal";
import apiClient from "@/api/apiClient";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export type ConfirmStrokeComponentProps = {
  emergencyId: string;
};

export default function ConfirmStrokeComponent({
  emergencyId,
}: ConfirmStrokeComponentProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState(""); // Estado para el título dinámico

  const handleConfirm = async (date: Date | null) => {
    if (date) {
      const loadingToast = toast.loading("Registrando datos...");
      try {
        await apiClient.post(`/healthCenter/attended-patient`, {
          emergencyId: emergencyId,
          attendedDate: date,
        });
        toast.success("Datos registrados correctamente", { id: loadingToast });
        setIsModalOpen(false);
        router.push("/dashboard");
      } catch {
			toast.error('Se produjo un error al registrar los datos, por favor intente más tarde', {id: loadingToast});
      }
    }
    setIsModalOpen(false);
  };

  const openModal = (title: string) => {
    setModalTitle(title); // Establece el título dinámico
    setIsModalOpen(true); // Abre el modal
  };
  return (
    <div className="w-10/12 max-w-md mx-auto flex flex-col space-y-4 mb-5">
      {/* <Button
        title="Confirmar Stroke"
        onClick={() => openModal("¿Estás seguro que quieres confirmar el stroke?", "confirm")}
        color="red"
      /> */}
      <Button
        title="Atendido"
        onClick={() => openModal("¿El paciente ya fue atendido?")}
        color="green"
      />
      {/* <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title={modalTitle} // Pasamos el título dinámico
      /> */}
      <HourModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title={modalTitle} // Pasamos el título dinámico
      />
    </div>
  );
}
