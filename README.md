# SauceDemo Automated Test Suite

## Overview
This project contains an automated test suite for the SauceDemo application, designed as part of a Quality Test Engineer assessment.  
The goal of this suite is not to maximize test count, but to demonstrate thoughtful test design, prioritization, and maintainability.

The test coverage focuses on business-critical user flows that provide the highest confidence in application quality.

---

## Test Strategy & Prioritization

The automation strategy is based on **risk and business impact**:

### Automated (High Value)
- Authentication (valid, invalid, locked user)
- Add to cart
- Checkout happy path (end-to-end)
- Checkout validation
- Price and order confirmation
- Logout / session handling

These flows represent the core e-commerce journey and are the most valuable to protect against regression.

### Manual / Exploratory
- Product sorting
- UI presentation
- Navigation edge cases (refresh, back button)
- Non-functional testing (performance, accessibility)

These areas are lower risk or better validated using specialized tools.

---

## Architecture Overview

The test suite follows a **Page Object Model (POM)** design:
tests/ -> Test specifications (intent-focused)
pages/ -> Page Objects (UI interactions only)
fixtures/ -> Test data
utils/ -> Shared helpers

### Design Principles
- Specs describe *WHAT* is being tested
- Page Objects handle *HOW* the UI is interacted with the test
- Assertions live only in test files
- Selectors are centralized for maintainability
- Test data is externalized

---

### Reporting & Debugging

The suite uses Playwright’s built-in HTML reporter with:
- Screenshots on failure
- Video recordings on failure
- Traces on first retry

After a test run, open the report using:
```bash
npx playwright show-report
```

### How to Run the tests
##### Prerequisites
- Node.js 18+
- npm

##### Install Dependencies
```bash
npm install
```

##### Install Playwright browsers
```bash
npx playwright install
```

##### Run tests
```bash
npx playwright test
```

### CI/CD Readiness
This repository CI-ready and can be integrated into pipelines such as GitHub Actions.
Retries, reporters, and headless execution are already configured for CI environments.