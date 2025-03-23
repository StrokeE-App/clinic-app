"use client";

import { useEffect, useState } from "react";
import DatePicker from "./DatePicker";

interface HourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (date:Date | null) => void;
  // setDate: (date: Date) => void;
  title: string;
}

export default function HourModal({
  isOpen,
  onClose,
  onConfirm,
  // setDate,
  title,
}: HourModalProps) {
  //Obtener la fecha actual
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState<Date | null>(today);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(selectedDate);
  }

  // // Handle date picker change
  // const handleDateChange = (date: Date) => {
  //   setDate(date.toISOString().split("T")[0]);
  // };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative bg-white rounded-lg w-[90%] max-w-sm p-6 shadow-lg"
        role="dialog"
        aria-modal="true"
      >
        <div className="text-center space-y-6">
          <h2 className="text-lg font-medium">{title}</h2>
          <form onSubmit={handleSubmit} >
            <DatePicker
              showTimeSelect
              selected={selectedDate}
              onChangeDate={(date: Date | null) => setSelectedDate(date)}
            />

            <br />

            <div className="flex gap-4 justify-center">
              <button
                className="px-8 py-2 rounded-md bg-customGreen text-customBlack font-bold hover:bg-green-200 transition-colors"
                type="submit"
              >
                Si
              </button>
              <button
                onClick={onClose}
                className="px-8 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-50 transition-colors"
              >
                No
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
