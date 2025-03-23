import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/custom-react-datepicker.css"; // Import custom overrides

type DatePickerProps = {
  // Selected date value as a Date or null
  selected: Date | null;
  // Callback when the date changes
  onChangeDate: (date: Date | null) => void;
  // Optional flag to display a label
  withLabel?: boolean;
  // Optional label text
  label?: string;
  // Optional required flag
  required?: boolean;
  // showTimeSelect?: boolean;
  showTimeSelect?: boolean;
};

export default function DatePicker({
  selected,
  onChangeDate,
  withLabel = false,
  label = "",
  required = false,
  showTimeSelect = true,
}: DatePickerProps) {


  return (
    <div className="w-full max-w-[40rem]">
      <ReactDatePicker
        selected={selected}
        onChange={onChangeDate}
        wrapperClassName="w-full"
        dateFormat="MMMM d, yyyy h:mm aa"
        showYearDropdown // Enables the year dropdown
        scrollableYearDropdown // Makes the year dropdown scrollable
        yearDropdownItemNumber={100} // Set number of years to show
        showTimeInput={showTimeSelect}
        className="w-full px-4 py-3 rounded-full border border-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-customRed focus:border-transparent"
        required={required}
      />
    </div>
  );
}
