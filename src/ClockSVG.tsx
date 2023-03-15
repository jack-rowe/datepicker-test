import * as React from "react";
const ClockSVG = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={25}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 5.52214V12.8555H17.5M23 12.8555C23 14.3 22.7155 15.7304 22.1627 17.065C21.6099 18.3996 20.7996 19.6122 19.7782 20.6336C18.7567 21.6551 17.5441 22.4653 16.2095 23.0181C14.8749 23.5709 13.4445 23.8555 12 23.8555C10.5555 23.8555 9.12506 23.5709 7.79048 23.0181C6.4559 22.4653 5.24327 21.6551 4.22183 20.6336C3.20038 19.6122 2.39013 18.3996 1.83733 17.065C1.28452 15.7304 1 14.3 1 12.8555C1 9.93809 2.15893 7.14019 4.22183 5.07729C6.28473 3.01439 9.08262 1.85547 12 1.85547C14.9174 1.85547 17.7153 3.01439 19.7782 5.07729C21.8411 7.14019 23 9.93809 23 12.8555Z"
      stroke="#D3D5DB"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ClockSVG;
