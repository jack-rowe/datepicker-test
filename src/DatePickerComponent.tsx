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

interface IDatePickerComponentProps {
  isRange?: boolean;
  initialDate?: Date;
  hidePastDates?: boolean;
  isJustCalendar?: boolean;
}

const DatePickerComponent: React.FunctionComponent<
  IDatePickerComponentProps
> = ({
  isRange = false,
  initialDate = new Date(),
  hidePastDates = true,
  isJustCalendar = false,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [yearPickerOpen, setYearPickerOpen] = useState(false);
  const [monthPickerOpen, setMonthPickerOpen] = useState(false);
  const today = new Date();

  const onChange = (dates: [Date, Date] | Date) => {
    // if the date is in the past and hidePastDates is true, set the date to today
    if (
      dates instanceof Date &&
      dates.getTime() < today.getTime() &&
      hidePastDates
    ) {
      setStartDate(today);
      setEndDate(null);
      setStartTime(null);
      setEndTime(null);
      setMonthPickerOpen(false);
      setYearPickerOpen(false);
      return;
    }
    // if the monthpicker is open, close it 
    if (monthPickerOpen) {
      setMonthPickerOpen(false);
      setYearPickerOpen(false);
    }
    // if the yearpicker is open, close it and open the monthpicker
    if (yearPickerOpen) {
      setYearPickerOpen(false);
      setMonthPickerOpen(true);
    }
    // if 
    if ((yearPickerOpen || monthPickerOpen) && isRange) {
      setStartDate(null);
      setEndDate(null);
      return;
    }
    if (isRange === false) {
      setStartDate(dates as Date);
      setEndDate(dates as Date);
      return;
    }
    const [start, end] = dates as Date[];
    setStartDate(start);
    setEndDate(end);
  };

  const handleTodayClick = () => {
    setStartDate(today);
    setEndDate(null);
    setStartTime(null);
    setEndTime(null);
    setMonthPickerOpen(false);
    setYearPickerOpen(false);
  };
  const handleClearClick = () => {
    setStartDate(null);
    setEndDate(null);
    setStartTime(null);
    setEndTime(null);
    setMonthPickerOpen(false);
    setYearPickerOpen(false);
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
    // other styles in styles.css file Path: src\styles.css
    <section className="flex">
      <div className="flex flex-col justify-between border-2 rounded-md w-1/2 h-[fit] min-h-[400px] min-w-[350px] shadow-md ">
        <DatePicker
          openToDate={initialDate}
          minDate={hidePastDates ? today : undefined}
          showYearPicker={yearPickerOpen}
          showMonthYearPicker={monthPickerOpen}
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            increaseYear,
            decreaseYear,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
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
          startDate={startDate}
          selected={startDate}
          endDate={endDate}
          onChange={onChange}
          inline
          useWeekdaysShort // use three letter weekday lables
          selectsRange={isRange}
        />
        <div className="w-full flex justify-around gap-4 mb-4">
          <button
            className="grow bg-[#1A56DB] text-white rounded-md ml-4 py-2"
            onClick={() => handleTodayClick()}
          >
            Today
          </button>
          <button
            className="grow border-2 rounded-md mr-4 py-2 disabled:bg-slate-200 disabled:text-slate-400"
            onClick={() => handleClearClick()}
            disabled={!(startDate || endDate)}
          >
            Clear
          </button>
        </div>
      </div>
      {!isJustCalendar && (
        <div className="flex flex-col justify-start gap-4 pt-4 items-center w-[375px] relative">
          {isRange ? (
            <div
              className="text-lg font-semibold mb-4 text-[#707070]"
              data-testid="datepicker-date_display"
            >
              {`${startDate ? formatDate(startDate) + " - " : "Select a Date Range..."}${
                endDate ? formatDate(endDate) : ""
              }`}
            </div>
          ) : (
            <div
              className="text-2xl font-semibold mb-4 text-[#707070]"
              data-testid="datepicker-date_display"
            >
              {`${startDate ? formatDate(startDate) : "Select a Date..."}`}
            </div>
          )}
          <Listbox
            value={startTime}
            onChange={setStartTime}
            disabled={startDate === null}
          >
            {({ open }) => (
              <div>
                <Listbox.Label className="block text-sm font-medium text-gray-700 w-[150px]">
                  Start Time
                </Listbox.Label>
                <div className="mt-1 relative w-[150px]">
                  <Listbox.Button className="relative w-full bg-white border-2 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer disabled:cursor-default focus:outline-none focus:ring-1 focus:ring-[#1A56DB] focus:border-[#1A56DB] sm:text-sm flex items-center justify-start">
                    <span className="flex items-center -ml-1 pr-2 pointer-events-none">
                      <ClockSVG className="scale-120" />
                    </span>
                    <span className={`block w-fit ${startTime ? "" : "text-gray-400"}`}>
                      {startTime ? startTime : "Select..."}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronSVG
                        className={`h-5 w-5 text-gray-400 transition-all ${
                          open ? "" : "rotate-180"
                        }`}
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={React.Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options
                      static
                      className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm custom-scrollbar"
                    >
                      {getTimes(startDate, hidePastDates).map((time) => (
                        <Listbox.Option
                          key={time + "start"}
                          className={({ active }) =>
                            `${
                              active
                                ? "text-white bg-[#1A56DB]"
                                : "text-gray-900"
                            }  
                              cursor-default select-none relative py-2 pl-3 pr-9`
                          }
                          value={time}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <span
                                  className={`${
                                    selected ? "font-medium" : "font-normal"
                                  } block truncate`}
                                >
                                  {time}
                                </span>
                              </div>

                              {selected ? (
                                <span
                                  className={`${
                                    active ? "text-white" : "text-[#1A56DB]"
                                  }
                                    absolute inset-y-0 right-0 flex items-center pr-4`}
                                ></span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </div>
            )}
          </Listbox>

          <Listbox
            value={endTime}
            onChange={setEndTime}
            disabled={isRange ? endDate === null : startDate === null}
          >
            {({ open }) => (
              <div>
                <Listbox.Label className="block text-sm font-medium text-gray-700 w-[150px]">
                  End Time
                </Listbox.Label>
                <div className="mt-1 relative w-[150px]">
                  <Listbox.Button className="relative w-full bg-white border-2 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer disabled:cursor-default focus:outline-none focus:ring-1 focus:ring-[#1A56DB] focus:border-[#1A56DB] sm:text-sm flex items-center justify-start">
                    <span className="flex items-center -ml-1 pr-2 pointer-events-none">
                      <ClockSVG className="scale-120" />
                    </span>
                    <span className={`block w-fit ${endTime ? "" : "text-gray-400"}`}>
                      {endTime ? endTime : "Select..."}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronSVG
                        className={`h-5 w-5 text-gray-400 transition-all ${
                          open ? "" : "rotate-180"
                        }`}
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={React.Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options
                      static
                      className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm custom-scrollbar"
                    >
                      {getTimes(isRange ? endDate : startDate, hidePastDates).map((time) => (
                        <Listbox.Option
                          key={time + "end"}
                          className={({ active }) =>
                            `${
                              active
                                ? "text-white bg-[#1A56DB]"
                                : "text-gray-900"
                            }  
                              cursor-default select-none relative py-2 pl-3 pr-9`
                          }
                          value={time}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <span
                                  className={`${
                                    selected ? "font-medium" : "font-normal"
                                  } block truncate`}
                                >
                                  {time}
                                </span>
                              </div>

                              {selected ? (
                                <span
                                  className={`${
                                    active ? "text-white" : "text-[#1A56DB]"
                                  }
                                    absolute inset-y-0 right-0 flex items-center pr-4`}
                                ></span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </div>
            )}
          </Listbox>
        </div>
      )}
    </section>
  );
};

export default DatePickerComponent;
