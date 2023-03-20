import * as React from "react";
import { useState } from "react";

import DatePicker from "react-datepicker";

import ArrowSVG from "../../ArrowSVG";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/index.css";
interface IDatePickerRangeProps {
  initialDate: Date;
  hidePastDates?: boolean;
  handleChange: (startDate: Date | null, endDate: Date | null) => void;
  startDateError?: string;
  endDateError?: string;
}

const DatePickerRange: React.FunctionComponent<IDatePickerRangeProps> = ({
  initialDate,
  hidePastDates = false,
  handleChange,
  startDateError,
  endDateError,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [yearPickerOpen, setYearPickerOpen] = useState(false);
  const [monthPickerOpen, setMonthPickerOpen] = useState(false);
  const today = new Date();

  const handleDateChange = (dates: (Date | null)[]) => {
    const [start, end] = dates;
    if (!start) return;
    if (hidePastDates && start.getTime() < today.getTime()) {
      setStartDate(today);
      setEndDate(end);
      setMonthPickerOpen(false);
      setYearPickerOpen(false);
      return;
    }
    // if the monthpicker is open, close it
    if (monthPickerOpen) {
      setMonthPickerOpen(false);
      setYearPickerOpen(false);
      return;
    }
    // if the yearpicker is open, close it and open the monthpicker
    if (yearPickerOpen) {
      setYearPickerOpen(false);
      setMonthPickerOpen(true);
      return;
    }
    setStartDate(start);
    setEndDate(end);
    handleChange(null, null);
  };

  const handleTodayClick = () => {
    setStartDate(today);
    setEndDate(null);
    setMonthPickerOpen(false);
    setYearPickerOpen(false);
  };
  const handleClearClick = () => {
    setStartDate(null);
    setEndDate(null);
    setMonthPickerOpen(false);
    setYearPickerOpen(false);
    handleChange(null, null);
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

  React.useEffect(() => {
    if (!startDate) {
      handleChange(null, null);
      return;
    }
    //set start date time to 00:00:00
    startDate.setHours(0, 0, 0, 0);
    //set end date time to 23:59:59
    if (!endDate) {
      handleChange(startDate, null);
      return;
    }
    endDate.setHours(23, 59, 59, 999);
    handleChange(startDate, endDate);
  }, [startDate, endDate]);

  return (
    <section className="flex relative">
      <span
        className={`absolute -top-6 ${
          startDateError || endDateError ? "text-alertRed" : ""
        }`}
      >
        {startDateError || endDateError ? "Choose a Date" : ""}
      </span>

      <div
        className={`flex flex-col justify-between h-[fit] min-h-[425px] min-w-[350px] shadow-md border-2 rounded-md ${
          startDateError || endDateError ? "border-alertRed" : ""
        }`}
      >
        <DatePicker
          openToDate={initialDate}
          minDate={hidePastDates ? today : undefined}
          showYearPicker={yearPickerOpen}
          showMonthYearPicker={monthPickerOpen}
          startDate={startDate}
          selected={startDate}
          onChange={handleDateChange}
          selectsRange
          inline
          useWeekdaysShort // use three letter weekday lables
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            increaseYear,
            decreaseYear,
          }) => (
            <div className="flex justify-between m-auto pb-2 pt-4 w-full">
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
        <div className="w-full flex justify-around gap-4 mb-3">
          <button
            type="button"
            className="grow bg-[#1A56DB] text-white rounded-md ml-4 py-2"
            onClick={() => handleTodayClick()}
          >
            Today
          </button>
          <button
            type="button"
            className="grow border-2 rounded-md mr-4 py-2 border-secondaryBg disabled:bg-dtOffWhite disabled:text-disabled"
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

export default DatePickerRange;
