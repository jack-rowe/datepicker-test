import * as React from "react";
import { useState } from "react";

import DatePicker from "react-datepicker";

import ArrowSVG from "../ArrowSVG";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/index.css";


interface IDatePickerSingleProps {
  initialDate: Date;
  hidePastDates?: boolean;
  handleChange: (e: any) => void;
}

const DatePickerSingle: React.FunctionComponent<IDatePickerSingleProps> = ({
  initialDate,
  hidePastDates = false,
  handleChange,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(initialDate);
  const [yearPickerOpen, setYearPickerOpen] = useState(false);
  const [monthPickerOpen, setMonthPickerOpen] = useState(false);
  const today = new Date();

  const handleDateChange = (dates: Date) => {
    // if the date is in the past and hidePastDates is true, set the date to today
    if (hidePastDates && dates.getTime() < today.getTime()) {
      setStartDate(today);
      setMonthPickerOpen(false);
      setYearPickerOpen(false);
      handleChange(today);
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
    handleChange(dates);
  };
  const handleTodayClick = () => {
    setStartDate(today);
    setMonthPickerOpen(false);
    setYearPickerOpen(false);
    handleChange(today);
  };
  const handleClearClick = () => {
    setStartDate(null);
    setMonthPickerOpen(false);
    setYearPickerOpen(false);
    handleChange(null);
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
