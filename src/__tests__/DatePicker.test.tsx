import { render, screen } from "@testing-library/react";
import DatePickerComponent from "../DatePickerComponent";
import { fireEvent } from "@testing-library/dom";

describe("Date Picker Component Rendering", () => {
  const today = new Date();

  test("Date picker renders with no passed props", async () => {
    const { container } = render(<DatePickerComponent />);
    expect(container).toBeTruthy();
  });

  test("Date picker opens at past date with initialDate={new Date('1993-02-03')}", async () => {
    render(<DatePickerComponent initialDate={new Date("1993-02-03")} />);
    const monthYear = screen.queryByTestId("datepicker-monthyear");
    if (!monthYear) {
      throw new Error("monthYear is null");
    }
    expect(monthYear.innerHTML).toMatch(/February 1993/);
  });

  test("Date picker opens at current date with initialDate={new Date()}", async () => {
    render(<DatePickerComponent initialDate={today} />);
    const monthYear = screen.queryByTestId("datepicker-monthyear");
    if (!monthYear) {
      throw new Error("monthYear is null");
    }
    expect(monthYear.innerHTML).toMatch(
      today.toLocaleString("default", { month: "long" }) +
        " " +
        today.getFullYear()
    );
  });

  test("Date picker opens at future date with initialDate={new Date('2044-12-25')}", async () => {
    render(<DatePickerComponent initialDate={new Date("2044-12-25")} />);
    const monthYear = screen.queryByTestId("datepicker-monthyear");
    if (!monthYear) {
      throw new Error("monthYear is null");
    }
    expect(monthYear.innerHTML).toMatch(/December 2044/);
  });

  test("Date picker renders with range", async () => {
    render(<DatePickerComponent isRange={true} />);
    const date_display = screen.queryByTestId("datepicker-date_display");
    if (!date_display) {
      throw new Error("date_display is null");
    }
    expect(date_display.innerHTML).toMatch(/Select a Date Range.../);
  });

  test("Date picker renders with range and initial date", async () => {
    render(<DatePickerComponent isRange={true} initialDate={new Date()} />);
    const date_display = screen.queryByTestId("datepicker-date_display");
    if (!date_display) {
      throw new Error("date_display is null");
    }
    expect(date_display.innerHTML).toMatch(/Select a Date Range.../);
  });
});

describe("Date Picker Choosing Dates is Correct", () => {
  const today = new Date();

  test("Select yesterday in single date picker", async () => {
    const { container } = render(
      <DatePickerComponent
        initialDate={new Date("2023-03-14")}
        hidePastDates={false}
      />
    );
    const button = container.getElementsByClassName(
      "react-datepicker__day--013"
    )[0];
    fireEvent.click(button);
    const date_display = screen.queryByTestId("datepicker-date_display");
    if (!date_display) {
      throw new Error("date_display is null");
    }
    expect(date_display.innerHTML).toMatch(/March 13th, 2023/);
  });

  test("Select tomorrow in single date picker", async () => {
    const { container } = render(
      <DatePickerComponent
        initialDate={new Date("2023-03-14")}
        hidePastDates={false}
      />
    );
    const button = container.getElementsByClassName(
      "react-datepicker__day--015"
    )[0];
    fireEvent.click(button);
    const date_display = screen.queryByTestId("datepicker-date_display");
    if (!date_display) {
      throw new Error("date_display is null");
    }
    expect(date_display.innerHTML).toMatch(/March 15th, 2023/);
  });

  test("Select today in single date picker", async () => {
    const { container } = render(
      <DatePickerComponent
        initialDate={new Date("2023-03-14")}
        hidePastDates={false}
      />
    );
    const button = container.getElementsByClassName(
      "react-datepicker__day--014"
    )[0];
    fireEvent.click(button);
    const date_display = screen.queryByTestId("datepicker-date_display");
    if (!date_display) {
      throw new Error("startDate is null");
    }
    expect(date_display.innerHTML).toMatch(/March 14th, 2023/);
  });

  test("Select yesterday, then today in single date picker", async () => {
    const { container } = render(
      <DatePickerComponent
        initialDate={new Date("2023-03-14")}
        hidePastDates={false}
      />
    );
    const yesterday = container.getElementsByClassName(
      "react-datepicker__day--013"
    )[0];
    const today = container.getElementsByClassName(
      "react-datepicker__day--014"
    )[0];
    fireEvent.click(yesterday);
    const date_display = screen.queryByTestId("datepicker-date_display");
    if (!date_display) {
      throw new Error("date_display is null");
    }
    expect(date_display.innerHTML).toMatch(/March 13th, 2023/);
    fireEvent.click(today);
    expect(date_display.innerHTML).toMatch(/March 14th, 2023/);
  });

  test("Select today, then yesterday in single date picker", async () => {
    const { container } = render(
      <DatePickerComponent
        initialDate={new Date("2023-03-14")}
        hidePastDates={false}
      />
    );
    const yesterday = container.getElementsByClassName(
      "react-datepicker__day--013"
    )[0];
    const today = container.getElementsByClassName(
      "react-datepicker__day--014"
    )[0];
    fireEvent.click(today);
    const date_display = screen.queryByTestId("datepicker-date_display");
    if (!date_display) {
      throw new Error("date_display is null");
    }
    expect(date_display.innerHTML).toMatch(/March 14th, 2023/);
    fireEvent.click(yesterday);
    expect(date_display.innerHTML).toMatch(/March 13th, 2023/);
  });
});

describe("Date Picker Year and Month Selection", () => {
  test("Select year 2023", async () => {
    const { container } = render(<DatePickerComponent hidePastDates={false}/>);
    const monthYear = screen.queryByTestId("datepicker-monthyear");
    if (!monthYear) {
      throw new Error("monthYear is null");
    }
    fireEvent.click(monthYear);
    const year = screen.getByText("2023");
    fireEvent.click(year);
    expect(monthYear.innerHTML).toMatch(/March 2023/);
  });
  test("Select year 2023 with hidden past dates", async () => {
    const { container } = render(<DatePickerComponent hidePastDates={true}/>);
    const monthYear = screen.queryByTestId("datepicker-monthyear");
    if (!monthYear) {
      throw new Error("monthYear is null");
    }
    fireEvent.click(monthYear);
    const year = screen.getByText("2023");
    fireEvent.click(year);
    expect(monthYear.innerHTML).toMatch(/March 2023/);
  });
  test("Select year 2024", async () => {
    const { container } = render(<DatePickerComponent hidePastDates={false}/>);
    let monthYear = screen.queryByTestId("datepicker-monthyear");
    if (!monthYear) {
      throw new Error("monthYear is null");
    }
    fireEvent.click(monthYear);
    const year = screen.getByText("2024");
    fireEvent.click(year);
    const month = screen.getByText("Dec");
    fireEvent.click(month);

    monthYear = screen.queryByTestId("datepicker-monthyear");
    if (!monthYear) {
      throw new Error("monthYear is null");
    }
    expect(monthYear.innerHTML).toMatch(/December 2024/);
  });
  test("Select year 2024 with hidden past dates", async () => {
    const { container } = render(<DatePickerComponent hidePastDates={true}/>);
    let monthYear = screen.queryByTestId("datepicker-monthyear");
    if (!monthYear) {
      throw new Error("monthYear is null");
    }
    fireEvent.click(monthYear);
    const year = screen.getByText("2024");
    fireEvent.click(year);
    const month = screen.getByText("Dec");
    fireEvent.click(month);

    monthYear = screen.queryByTestId("datepicker-monthyear");
    if (!monthYear) {
      throw new Error("monthYear is null");
    }
    expect(monthYear.innerHTML).toMatch(/December 2024/);
  });
  test("Select year 2022", async () => {
    const { container } = render(<DatePickerComponent hidePastDates={false}/>);
    let monthYear = screen.queryByTestId("datepicker-monthyear");
    if (!monthYear) {
      throw new Error("monthYear is null");
    }
    fireEvent.click(monthYear);
    const year = screen.getByText("2022");
    fireEvent.click(year);
    const month = screen.getByText("Dec");
    fireEvent.click(month);

    monthYear = screen.queryByTestId("datepicker-monthyear");
    if (!monthYear) {
      throw new Error("monthYear is null");
    }
    expect(monthYear.innerHTML).toMatch(/December 2022/);
  });
  test("Select year 2022 with hidden past dates", async () => {
    const { container } = render(<DatePickerComponent hidePastDates={true}/>);
    let monthYear = screen.queryByTestId("datepicker-monthyear");
    if (!monthYear) {
      throw new Error("monthYear is null");
    }
    fireEvent.click(monthYear);
    const year = screen.getByText("2022");
    fireEvent.click(year);
    expect(monthYear.innerHTML).toMatch(/March 2023/);
  });



  
});
