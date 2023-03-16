import * as React from "react";
import { useState } from "react";

import DatePicker from "react-datepicker";

import ArrowSVG from "../ArrowSVG";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/index.css";
import { Listbox, Transition } from "@headlessui/react";
import ClockSVG from "../ClockSVG";
import ChevronSVG from "../ChevronSVG";
import { formatDate, getTimes } from "../utils";
import { Time } from "../types";

interface IDatePickerSingleTimeProps {
  initialDate: Date;
  hidePastDates?: boolean;
  handleChange: (
    startDate: Date | null,
    endDate: Date | null,
  ) => void;
}

const DatePickerSingleTime: React.FunctionComponent<
  IDatePickerSingleTimeProps
> = ({
  initialDate,
  hidePastDates = false,
  handleChange,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(initialDate);
  const [startTime, setStartTime] = useState<Time | null>(null);
  const [endTime, setEndTime] = useState<Time | null>(null);

  const [yearPickerOpen, setYearPickerOpen] = useState(false);
  const [monthPickerOpen, setMonthPickerOpen] = useState(false);
  const today = new Date();

  const handleDateChange = (dates: Date) => {
    // if the date is in the past and hidePastDates is true, set the date to today
    if (hidePastDates && dates.getTime() < today.getTime()) {
      setStartDate(today);
      setEndTime(null);
      setStartTime(null);
      setMonthPickerOpen(false);
      setYearPickerOpen(false);
      return;
    }
    // if the monthpicker is open, close it
    if (monthPickerOpen) {
      setMonthPickerOpen(false);
      setYearPickerOpen(false);
      setEndTime(null);
      setStartTime(null);
      return;
    }
    // if the yearpicker is open, close it and open the monthpicker
    if (yearPickerOpen) {
      setYearPickerOpen(false);
      setMonthPickerOpen(true);
      setEndTime(null);
      setStartTime(null);
      return;
    }
    setStartDate(dates as Date);
    setEndTime(null);
    setStartTime(null);
  };
  const handleTodayClick = () => {
    setStartDate(today);
    setEndTime(null);
    setStartTime(null);
    setMonthPickerOpen(false);
    setYearPickerOpen(false);
  };
  const handleClearClick = () => {
    setStartDate(null);
    setEndTime(null);
    setStartTime(null);
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

  React.useEffect(() => {
    if (!startDate || !startTime || !endTime) {
      return;
    }
    const endDateCalculated: Date = new Date(startDate);
    endDateCalculated.setHours(endTime.hour)
    endDateCalculated.setMinutes(endTime.minute)
    
    startDate.setHours(startTime.hour)
    startDate.setMinutes(startTime.minute)
    handleChange(startDate, endDateCalculated);
  }, [startDate, startTime, endTime]);

  return (
    <section className="flex">
      <div className="flex flex-col justify-between border-2 rounded-md w-1/2 h-[fit] min-h-[425px] min-w-[350px] shadow-md ">
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

      <div className="flex flex-col justify-start gap-4 pt-4 items-center w-[375px] relative">
        <div
          className="text-2xl font-semibold mb-4 text-[#707070]"
          data-testid="datepicker-date_display"
        >
          {`${startDate ? formatDate(startDate) : "Select a Date..."}`}
        </div>
        <Listbox
          value={startTime}
          onChange={(value) => {
            setStartTime(value);
          }}
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
                  <span
                    className={`block w-fit ${
                      startTime ? "" : "text-gray-400"
                    }`}
                  >
                    {startTime?.timeString ? startTime.timeString : "Select..."}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronSVG
                      className={`h-5 w-5 text-gray-400 transition-all ease-in ${
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
                        key={time.timeString + "start"}
                        className={({ active }) =>
                          `${
                            active ? "text-white bg-[#1A56DB]" : "text-gray-900"
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
                                {time.timeString}
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
          onChange={(value) => {
            setEndTime(value);
          }}
          disabled={startDate === null}
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
                  <span
                    className={`block w-fit ${endTime ? "" : "text-gray-400"}`}
                  >
                    {endTime?.timeString ? endTime.timeString : "Select..."}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronSVG
                      className={`h-5 w-5 text-gray-400 transition-all ease-in ${
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
                        key={time.timeString + "end"}
                        className={({ active }) =>
                          `${
                            active ? "text-white bg-[#1A56DB]" : "text-gray-900"
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
                                {time.timeString}
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
    </section>
  );
};

export default DatePickerSingleTime;