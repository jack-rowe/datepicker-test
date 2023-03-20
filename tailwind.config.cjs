/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        //states
        disabled: "#707070",

        //main
        primary: "#002955",
        secondary: "#001F41",
        tertiary: "#2D4763",
        quaternary: "#41668E",
        primaryButton: "#373FEC",
        secondaryButton: "#163291",
        hoverState: "#E1E2FC",
        navShadow: "#0000082",
        alerts: "#EC321F",
        organization: "#2FA36F",
        primaryText: "#707070",
        secondaryText: "#9A9A9A",
        primaryBg: "#F2F2F2",
        secondaryBg: "#D3D5DB",
        dtOffWhite: "#F2F2F2",
        alertRed: "#EC321F",
        inputBg: "#001730",
        profileBg: "#FAFAFA",
        profileFollowerBg: "#E9EAED",
        tertiaryBlue: "#2D4763",

        // alerts
        actionItemBg: "#EEEFFF",
        actionItemBgHover: "#e1e2fc",

        // applications
        appHover: "#f3f9ff",
        appBorder: "#dcdcdc",
        //links
        link: "#3641f1",
        linkHover: "#e1e2fc",
        //comment
        commentSectionBg: "#516d8b",
        commentBg: "#d6d7f1",
        // roles
        physician: "#3641f1",
        orgUser: "#00a471",
        dtAdmin: "#00a471",
        DA: "#2FA36F", //admin
        PU: "#373FEC", //physiscian user
        OU: "#2FA36F", //org user

        //icons
        iconBg: "#D3D5DB",
        iconBGHover: "#8490A5",
        iconFill: "#707070",
        //borders
        primaryBorder: "#707070",
        secondaryBorder: "#D3D5DB",
        // modals
        modalBg: "#F3F3F3",

        // fields
        emptyFiledLabel: "#373FEC",

        // inputs:
        searchInput: "#D3D5DB",
        searchText: "#2E2E2E",

        // breadcrumbs
        breadCrumbs: "#9CA3AF",

        //messages
        messagesTabHover: "#E0DFDF",
        messagesTabInactive: "#E0DFDF",
        userPlaceholderBackground: "#454E67",
        messagesSearchIcon: "#5C5C5C",
        messagesPlaceholderBackground: "#454E67",
        messagesBubbleSelf: "#878CF4",
        messagesBubbleOther: "#F2F2F2",
        iconSVGFill: "#A5ACBB",

        //search
        searchButtonBg: "#979FAF",
      },
      dropShadow: {
        searchDropdown: "0px 2px 5px rgba(0, 0, 0, 0.25)",
      },
      boxShadow: {
        nav: "0px 5px 15px #00000082",
        profile: "0px 0px 10px #00000059",
        dropdownMenu: "0px 2px 5px 0px rgba(0, 0, 0, 0.25)",
      },
      fontSize: {
        navButton: "10px",
      },
      fontWeight: {
        navButton: 600,
      },
      fontFamily: {
        opensans: ['"Open Sans"'],
      },
      height: {
        navHeight: "92px",
      },
    },
  },
  plugins: [],
};
