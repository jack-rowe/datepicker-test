import { render, screen } from "@testing-library/react";
import DatePickerSingle from "../DatePicker/DatePickerSingleForm/DatePickerSingle";
import { fireEvent } from "@testing-library/dom";

describe("Date Picker Component Rendering", () => {
  const today = new Date();

  test("Date picker renders with todays date", async () => {
    render(<DatePickerSingle initialDate={today} handleChange={() => null} />);
    //get by test id and check if it is in the document
    const pickerDate = screen.queryByTestId("datepicker-monthyear");
    if (!pickerDate) {
      throw new Error("pickerDate is null");
    }
    expect(pickerDate.innerHTML).toEqual(`${today.toLocaleString("default", { month: "long" })} ${today.getFullYear()}`);
  });

  test("Date picker renders with past date 1993-02-02", async () => {
    render(<DatePickerSingle initialDate={new Date("1993-02-02")} handleChange={() => null} />);
    const pickerDate = screen.queryByTestId("datepicker-monthyear");
    if (!pickerDate) {
      throw new Error("pickerDate is null");
    }
    expect(pickerDate.innerHTML).toEqual("February 1993");
  });

  test("Date picker renders with future date 2044-12-25", async () => {
    render(<DatePickerSingle initialDate={new Date("2044-12-25")} handleChange={() => null} />);
    const pickerDate = screen.queryByTestId("datepicker-monthyear");
    if (!pickerDate) {
      throw new Error("pickerDate is null");
    }
    expect(pickerDate.innerHTML).toEqual("December 2044");
  });
});

describe("Date Picker Component Functionality", () => {
  test("Date picker opens year picker when clicked", async () => {
    const {container} = render(<DatePickerSingle initialDate={new Date()} handleChange={() => null} />);
    const pickerDate = screen.queryByTestId("datepicker-monthyear");
    if (!pickerDate) {
      throw new Error("pickerDate is null");
    }
    fireEvent.click(pickerDate);
    expect(container.querySelector(".react-datepicker__year-wrapper")).toBeTruthy();
  })

  test("Month picker is opened after year is selected", async () => {
    const {container} = render(<DatePickerSingle initialDate={new Date()} handleChange={() => null} />);
    const pickerDate = screen.queryByTestId("datepicker-monthyear");
    if (!pickerDate) {
      throw new Error("pickerDate is null");
    }
    fireEvent.click(pickerDate);
    const year = container.querySelector(".react-datepicker__year-text");
    if (!year) {
      throw new Error("year is null");
    }
    fireEvent.click(year);
    expect(container.querySelector(".react-datepicker__month-wrapper")).toBeTruthy();
  })

});