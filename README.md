# Sprint Automation Suite

This repository contains a Cucumber + Playwright automation suite for Ixigo-style travel booking flows. It covers end-to-end scenarios across flights, trains, buses, hotels, and visa journeys, along with login setup, screenshots, JSON test data, and HTML/PDF reporting.

## Project Overview

- **Frameworks**: Cucumber.js, Playwright
- **Language**: JavaScript (CommonJS)
- **Reporting**: Cucumber JSON, `multiple-cucumber-html-reporter`, Playwright HTML report, optional PDF export
- **Test domains**: Bus booking, flight booking and tracking, train booking, train search by station, train PNR flow, metro booking, train food ordering, Vande Bharat booking, hotel booking, hotel wishlist/offers, and visa booking

## Repository Structure

- `tests/features/` - Cucumber feature files grouped by domain
- `tests/steps/` - Step definitions
- `tests/pages/` - Page objects and page-level helpers
- `tests/helpers/` - Shared setup helpers such as login hooks
- `JSONFiles/` - Test data used by scenarios
- `setup/` - Setup scripts, including login preparation
- `report.js` - Builds the merged Cucumber HTML report in `test-results/html-report`
- `pdfReport/pdfReport.js` - Generates a PDF from the HTML report
- `test-results/` - Generated execution output, JSON results, HTML report, screenshots, videos, and PDFs

## Requirements

- Node.js installed locally
- npm available in your terminal
- A browser environment supported by Playwright

## Setup

Install dependencies:

```bash
npm install
```

If the suite depends on prepared login state or environment-specific setup, run:

```bash
npm run setup
```

## Running Tests

Run the full Cucumber suite:

```bash
npm test
```

Run domain-specific suites:

```bash
npm run bus
npm run flights
npm run hotels
npm run train
npm run visa
```

## Reports

Generate the merged Cucumber HTML report from JSON output:

```bash
npm run html-report
```

Generate the PDF report from the HTML report:

```bash
npm run pdf-report
```

The generated report files live under `test-results/`, including `test-results/html-report/`. These outputs are generated artifacts and should not be committed.

## Notes

- Feature files are organized by domain, so you can run or maintain suites independently.
- Test data is centralized in `JSONFiles/` to keep scenarios data-driven.
- The Playwright configuration uses an HTML reporter, while `report.js` merges Cucumber JSON files into the richer report in `test-results/html-report`.