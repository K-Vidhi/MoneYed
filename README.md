# MoneYed

MoneYed is a browser-based financial utility website. It combines a landing page, financial-market embeds, and interactive calculators for loan repayments and investment growth. The included implementation is a static HTML/CSS/JavaScript project; it does not contain a server-side application, database, build system, or package manager configuration.

> **Project note:** This README describes the source code in the supplied project archive. The interface contains navigation and chart placeholders for several financial products, but the calculator-selection logic currently activates only the EMI, Future Value, and Fixed Deposit calculators.

## Contents

- [Features](#features)
- [Calculators](#calculators)
- [How the calculations work](#how-the-calculations-work)
- [Project structure](#project-structure)
- [Technology stack](#technology-stack)
- [Run locally](#run-locally)
- [How to use the website](#how-to-use-the-website)
- [Reports and schedules](#reports-and-schedules)
- [Customization](#customization)
- [Current implementation notes and limitations](#current-implementation-notes-and-limitations)
- [Troubleshooting](#troubleshooting)
- [Disclaimer](#disclaimer)

## Features

- Responsive single-page financial-services landing page.
- Navigation to Home, Calculators, Zero-cost Services, Market, Bank Rates, and Contact sections.
- Interactive calculator inputs with paired number fields and range sliders.
- Live calculation summaries and doughnut-chart visualizations.
- Detailed schedules for supported calculators.
- Browser print flow and PDF export support for generated reports.
- TradingView widgets embedded in the market/rates content.
- Animated headline text, loading overlay, navigation scroll effect, and responsive layout.

## Calculators

### 1. EMI Calculator

Estimates the fixed monthly installment for a loan.

Inputs:
- Loan principal
- Annual interest rate (percentage)
- Loan tenure (years)

Outputs:
- Monthly EMI
- Total interest payable
- Total payment (principal + interest)

The calculator also provides a month-by-month amortization schedule showing opening balance, installment, interest, principal repaid, and closing balance.

### 2. Future Value Calculator

The interface labels the input as **Required Balance**. The calculation works backwards from the desired future amount to estimate the lump-sum amount that would need to be invested today.

Inputs:
- Required future balance
- Annual interest rate (percentage)
- Investment tenure (years)

Outputs:
- Estimated initial deposit
- Estimated return
- Future value / required balance

A yearly interest schedule can be generated.

### 3. Fixed Deposit (FD) Calculator

Estimates the maturity value of a one-time fixed deposit using quarterly compounding.

Inputs:
- Deposit amount
- Annual interest rate (percentage)
- Investment tenure (years)

Outputs:
- Deposit amount (principal)
- Estimated interest
- Maturity value

The report includes a quarter-by-quarter schedule with opening balance, interest earned, and closing balance.

### Other calculator sections present in the markup

The HTML includes chart/result containers for Annuity, SIP, RD, and SWP calculators. However, the current `addUtilityCalc()` selection handler in `js/custom.js` has cases only for EMI, Future Value, and FD. These additional calculator sections should therefore be considered incomplete/unavailable in this version, rather than fully implemented features.

## How the calculations work

The following formulas are implemented in `js/custom.js`.

### EMI

Let:
- `P` = loan principal
- `r` = monthly interest rate as a decimal (`annual rate / 1200`)
- `n` = number of monthly installments (`years × 12`)

```text
EMI = P × r / (1 - (1 + r)^(-n))
```

The code rounds the EMI to the nearest whole currency unit. Total payment is calculated as `EMI × n`, and total interest is `total payment - principal`.

### Future Value (reverse calculation)

The code calculates the initial deposit required to reach a target amount:

```text
Initial deposit = Target future value / (1 + annual rate / 1200)^(years × 12)
```

This treats the annual rate as a nominal rate divided into monthly periods. The result is rounded to a whole currency unit.

### Fixed Deposit

The FD calculator uses quarterly compounding:

```text
Maturity value = P × (1 + annual rate / (100 × 4))^(4 × years)
```

Where `P` is the deposit principal and the annual rate is entered as a percentage. The maturity value is rounded to a whole currency unit. The schedule applies one quarter of the annual nominal rate to the opening balance each quarter.

**Important:** These are illustrative estimates. Actual bank products may use different compounding conventions, day-count rules, payout options, tax treatment, rate tiers, or premature-withdrawal rules.

## Project structure

```text
MoneYed - with FD Calculator/
├── index.html                  # Main single-page website and calculator markup
├── 404.html                    # Not-found page
├── .gitignore
├── css/
│   ├── style.css               # Project-specific layout, theme, and responsive styles
│   ├── plugins.css             # Third-party/plugin styles
│   ├── bootstrap.min.css       # Bootstrap styles
│   ├── font-awesome.min.css    # Icon font styles
│   └── jquery-ui.css           # jQuery UI styles (including slider styling)
├── js/
│   ├── custom.js               # Calculation logic, schedules, navigation, UI behavior
│   ├── forms.js                # Dynamically generated calculator forms
│   ├── custom-morris.js        # Morris doughnut chart initialization
│   ├── jquery-min.js           # jQuery
│   ├── jquery-ui.js            # jQuery UI
│   ├── jquery.ui.touch-punch.min.js
│   ├── bootstrap.min.js        # Bootstrap JavaScript
│   ├── popper.min.js
│   ├── owl.carousel.min.js     # Carousel behavior
│   ├── plugins.js              # Theme/plugin behavior
│   ├── smoothscroll.js
│   ├── raphael-min.js           # Morris chart dependency
│   └── morris.min.js            # Chart library
└── images/
    ├── banner.svg
    ├── header-bg.svg
    ├── logo*.png
    ├── faviconMoneYed.png
    ├── loader.svg
    ├── card-bg.png
    └── services/                # Service illustration assets
```

### Important source files

| File | Responsibility |
|---|---|
| `index.html` | Page sections, navigation, calculator result/chart containers, report area, market embeds, and script/style references |
| `js/forms.js` | Builds the EMI, Future Value, and FD forms and their result panels |
| `js/custom.js` | Synchronizes inputs/sliders, calculates results, updates charts, builds schedules, and handles calculator selection |
| `js/custom-morris.js` | Creates Morris doughnut charts for the calculator sections |
| `css/style.css` | Brand styling, calculator layout, sliders, sections, and responsive breakpoints |

## Technology stack

- **HTML5** — page structure and calculator/report containers.
- **CSS3** — custom styling and responsive presentation.
- **JavaScript (vanilla)** — calculator formulas, DOM updates, schedules, and interactions.
- **jQuery** — DOM/event utilities used by the theme and calculator code.
- **Bootstrap** — grid system, responsive navigation, and utility classes.
- **jQuery UI** — UI styling and slider-related support.
- **Morris.js + Raphael** — doughnut charts.
- **Owl Carousel** — carousel behavior.
- **Font Awesome** — interface icons.
- **TradingView embeds** — market/rate widgets.
- **html2pdf.js** — client-side PDF export.

There is no `package.json`, npm build script, or backend configuration in the supplied archive. The JavaScript and CSS dependencies are primarily included in the repository, while some resources are loaded from external CDNs/services.

## Run locally

No compilation or dependency installation is required for the current static version.

### Option A: Open the HTML file

1. Extract the ZIP archive.
2. Open the `MoneYed - with FD Calculator` folder.
3. Open `index.html` in a modern browser.

Some browser features and external embeds may behave more consistently when served over HTTP rather than opened using a `file://` URL.

### Option B: Start a local web server

If Python is installed, open a terminal in the project directory and run:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

Stop the server with `Ctrl+C`.

You can also use the Live Server extension in Visual Studio Code, serving the project root.

## How to use the website

1. Open the website in a browser.
2. Navigate to the **Calculators** section.
3. Select **EMI Calculator**, **Future Value Calculator**, or **FD Calculator**.
4. Enter values directly or adjust the range sliders.
5. Review the updated result cards and doughnut chart.
6. Select the schedule/report action to generate a detailed breakdown.
7. Use **Download as PDF** or **Print PDF** in the report section.

The calculator form and result area are inserted dynamically when a supported calculator is selected.

## Reports and schedules

The report area is initially hidden and is populated when a schedule is requested.

- **EMI:** monthly amortization table.
- **Future Value:** yearly compound-growth table.
- **FD:** quarterly compound-interest table.

The report view includes a summary table and a detailed schedule. The print action opens a separate browser window and invokes the browser's print dialog. The download action uses the externally loaded `html2pdf.js` library.

For reliable PDF export, allow the external PDF library to load and ensure the browser does not block the new window used by printing.

## Customization

### Change calculator defaults and ranges

Edit the form templates in `js/forms.js`. Each calculator form defines:
- Default values
- Minimum and maximum values
- Slider increments
- Input event handlers

Keep the number input and range input values, limits, and steps aligned.

### Change formulas or compounding behavior

Edit the relevant calculation functions in `js/custom.js`:
- `calculateEMI()` and `updateEMIData()` for EMI.
- `initialFutureValue()` and `updateFutureData()` for the reverse future-value calculation.
- `fdMaturityValue()` and `updateFdData()` for fixed deposits.

If you change the FD compounding frequency, update both the maturity calculation and `fdStatement()` so that the displayed result and schedule remain consistent.

### Change appearance

- Main theme, layout, sliders, and responsive styles: `css/style.css`
- Page content and section structure: `index.html`
- Logos, illustrations, and other graphics: `images/`

### Change chart presentation

Chart setup and initial placeholder data are in `js/custom-morris.js`. Live calculator updates call each chart object's `setData()` method from `js/custom.js`.

## Current implementation notes and limitations

The following details are important when extending or deploying this project:

1. **Only three calculators are wired into the selector.** EMI, Future Value, and FD are the supported selection paths. Annuity, SIP, RD, and SWP have markup/chart placeholders but no corresponding selection cases in the current `addUtilityCalc()` implementation.
2. **Currency display is hard-coded as `$`.** The forms and report summaries display a dollar sign. Change the labels/formatting if the intended currency is INR or another currency. The calculations themselves operate on numeric values and do not perform currency conversion.
3. **No backend or persistent storage is included.** Calculations run in the browser. The archive contains no database, authentication, server API, or user account system.
4. **Market data depends on third-party embeds.** TradingView content requires an internet connection and is controlled by the external provider.
5. **Some dependencies are loaded externally.** Google Fonts, Font Awesome CDN resources, TradingView widgets, and html2pdf.js require network access. Availability may vary with connectivity, browser settings, or provider changes.
6. **Financial calculations are estimates.** The formulas do not model every bank-specific rule, tax, fee, or product condition.
7. **Input validation should be strengthened before production use.** The current form templates set HTML minimum/maximum values, but robust validation should also check empty, non-finite, zero, negative, and out-of-range values in JavaScript before calculating.
8. **Rounding and schedules may differ slightly.** Summary values are rounded in places, while schedule rows use two decimal places. EMI schedules also use a rounded monthly EMI, so the final balance can be affected by rounding.
9. **Accessibility improvements are recommended.** Calculator selection cards use clickable containers; keyboard interaction, explicit button semantics, and additional accessible labels would improve usability.
10. **The contact workflow should be verified before launch.** Test the form end-to-end in the intended hosting environment and confirm how submissions are delivered; the supplied project does not include a server-side mail service.

## Troubleshooting

- **The page looks unstyled:** Confirm that the `css/` directory is next to `index.html` and that the relative paths have not changed.
- **Calculator does not open:** Check the browser console for JavaScript errors and confirm that `js/forms.js` and `js/custom.js` loaded successfully.
- **Chart is blank:** Check that Raphael and Morris.js load before `custom-morris.js`, and that the chart container exists in the page.
- **Market widgets are blank:** Check internet access and whether the TradingView embed scripts are being blocked.
- **PDF download does not work:** Check that the html2pdf.js CDN resource loaded and that the browser allows the action.
- **Print window is blocked:** Allow pop-ups for the local site and try the print action again.

## Disclaimer

MoneYed is an educational calculation utility and should not be treated as financial, tax, or investment advice. Results are estimates based on the assumptions and formulas implemented in this project. Verify rates, compounding conventions, fees, taxes, and product terms with the relevant financial institution before making a financial decision.
