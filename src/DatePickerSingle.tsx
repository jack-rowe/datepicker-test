import * as React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { Listbox, Transition } from "@headlessui/react";

import "react-datepicker/dist/react-datepicker.css";
import ArrowSVG from "./ArrowSVG";
import ChevronSVG from "./ChevronSVG";
import ClockSVG from "./ClockSVG";
import "./styles.css";
import { getTimes, formatDate } from "./utils";
import { useField } from "formik";

interface IDatePickerSingleProps {
  initialDate: Date;
  hidePastDates?: boolean;
  onChange: (e: any) => void;
}

const DatePickerSingle: React.FunctionComponent<IDatePickerSingleProps> = ({
  initialDate,
  hidePastDates = false,
  onChange,
}) => {
  const [a, b, startDateFieldHelpers] = useField("startDate");
  const [startDate, setStartDate] = useState<Date | null>(initialDate);
  const [yearPickerOpen, setYearPickerOpen] = useState(false);
  const [monthPickerOpen, setMonthPickerOpen] = useState(false);
  const today = new Date();

  const handleDateChange = (dates: Date) => {
    // if the date is in the past and hidePastDates is true, set the date to today
    if (dates.getTime() < today.getTime() && hidePastDates) {
      setStartDate(today);
      setMonthPickerOpen(false);
      setYearPickerOpen(false);
      onChange(today);
      return;
    }
    // if the monthpicker is open, close it
    if (monthPickerOpen) {
      setMonthPickerOpen(false);
      setYearPickerOpen(false);
      return
    }
    // if the yearpicker is open, close it and open the monthpicker
    if (yearPickerOpen) {
      setYearPickerOpen(false);
      setMonthPickerOpen(true);
      return
    }
    setStartDate(dates as Date);
    onChange(dates);
  };
  const handleTodayClick = () => {
    setStartDate(today);
    setMonthPickerOpen(false);
    setYearPickerOpen(false);
    onChange(today);
  };
  const handleClearClick = () => {
    setStartDate(null);
    setMonthPickerOpen(false);
    setYearPickerOpen(false);
    onChange(null);
  };
  const handleLeftArrowClick = (
    decreaseMonth: () => void,
    decreaseYear: () => void
  ) => {
    if (yearPickerOpen) {
      decreaseYear();
    } else {
      decreaseMonth();
    }
  };
  const handleRightArrowClick = (
    increaseMonth: { (): void; (): void },
    increaseYear: { (): void; (): void }
  ) => {
    if (yearPickerOpen) {
      increaseYear();
    } else {
      increaseMonth();
    }
  };

  return (
    <section className="flex">
      <div className="flex flex-col justify-between border-2 rounded-md w-1/2 h-[fit] min-h-[400px] min-w-[350px] shadow-md ">
        <DatePicker
          openToDate={initialDate}
          minDate={hidePastDates ? today : undefined}
          showYearPicker={yearPickerOpen}
          showMonthYearPicker={monthPickerOpen}
          startDate={startDate}
          selected={startDate}
          onChange={handleDateChange}
          inline
          useWeekdaysShort // use three letter weekday lables
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            increaseYear,
            decreaseYear,
          }) => (
            <div className="flex justify-between m-auto py-4 w-full">
              <ArrowSVG
                className="h-6 w-6 cursor-pointer"
                onClick={() =>
                  handleLeftArrowClick(decreaseMonth, decreaseYear)
                }
              />
              <div>
                <span
                  data-testid="datepicker-monthyear"
                  className="font-semibold text-base cursor-pointer select-none"
                  onClick={() => setYearPickerOpen(!yearPickerOpen)}
                >
                  {date.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <ArrowSVG
                className="rotate-180 h-6 w-6 cursor-pointer"
                onClick={() =>
                  handleRightArrowClick(increaseMonth, increaseYear)
                }
              />
            </div>
          )}
        />
        <div className="w-full flex justify-around gap-4 mb-4">
          <button
            type="button"
            className="grow bg-[#1A56DB] text-white rounded-md ml-4 py-2"
            onClick={() => handleTodayClick()}
          >
            Today
          </button>
          <button
            type="button"
            className="grow border-2 rounded-md mr-4 py-2 disabled:bg-slate-200 disabled:text-slate-400"
            onClick={() => handleClearClick()}
            disabled={!startDate}
          >
            Clear
          </button>
        </div>
      </div>
    </section>
  );
};

export default DatePickerSingle;
