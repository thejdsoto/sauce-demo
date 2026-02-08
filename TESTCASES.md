# SauceDemo – Test Cases

## Purpose
This document outlines the test cases identified for the SauceDemo application.  
The intent is to demonstrate **risk-based test design**, clear prioritization, and thoughtful selection of scenarios suitable for automation versus manual or exploratory testing.

Not all test cases listed here are automated. Automation focuses on high-value, high-risk flows that provide the greatest confidence in system quality.

---

## Legend
- **Priority**
  - **P0** – Critical / Business-blocking
  - **P1** – High
  - **P2** – Medium / Low
- **Type**
  - **Automated** – Covered by Playwright tests
  - **Manual** – Validated manually or via exploratory testing

---

## 1. Authentication

### TC-AUTH-001: Login with valid credentials
- **Priority:** P0  
- **Type:** Automated  

**Preconditions**
- Standard user account exists

**Steps**
1. Navigate to login page
2. Enter valid username and password
3. Click Login

**Expected Result**
- User is redirected to the Products page
- Product list is visible

**Notes**
- Entry point to all application functionality

---

### TC-AUTH-002: Login with invalid credentials
- **Priority:** P0  
- **Type:** Automated  

**Steps**
1. Enter invalid username or password
2. Click Login

**Expected Result**
- Error message is displayed
- User remains on login page

---

### TC-AUTH-003: Login with locked-out user
- **Priority:** P1  
- **Type:** Automated  

**Steps**
1. Login using locked-out credentials

**Expected Result**
- Login is blocked
- Appropriate error message is shown

---

### TC-AUTH-004: Login with empty credentials
- **Priority:** P1  
- **Type:** Manual  

**Expected Result**
- Validation error is displayed

---

### TC-AUTH-005: Logout clears user session
- **Priority:** P0  
- **Type:** Automated  

**Steps**
1. Login successfully
2. Logout from the application
3. Attempt to access a protected page via direct URL

**Expected Result**
- User is redirected to the login page

---

## 2. Product Listing

### TC-PROD-001: Products load successfully after login
- **Priority:** P0  
- **Type:** Automated  

**Expected Result**
- Product inventory page loads
- At least one product is displayed

---

### TC-PROD-002: Product details are visible
- **Priority:** P1  
- **Type:** Manual  

**Expected Result**
- Each product displays name, price, and image

---

### TC-PROD-003: Sort products by price (low to high)
- **Priority:** P2  
- **Type:** Manual  

**Expected Result**
- Products are sorted correctly by price

**Reason Not Automated**
- Low business risk
- High dependency on UI rendering

---

## 3. Cart Management

### TC-CART-001: Add a single product to cart
- **Priority:** P0  
- **Type:** Automated  

**Steps**
1. Add one product to the cart
2. Navigate to cart page

**Expected Result**
- Product appears in cart
- Cart badge count updates correctly

---

### TC-CART-002: Add multiple products to cart
- **Priority:** P1  
- **Type:** Automated  

**Expected Result**
- All added products appear in cart
- Cart count reflects total items added

---

### TC-CART-003: Remove product from cart
- **Priority:** P1  
- **Type:** Automated  

**Expected Result**
- Product is removed from cart
- Cart count updates accordingly

---

### TC-CART-004: Cart state persists across navigation
- **Priority:** P1  
- **Type:** Manual  

**Expected Result**
- Cart contents remain intact when navigating between pages

---

## 4. Checkout

### TC-CHK-001: Complete checkout successfully (Happy Path)
- **Priority:** P0  
- **Type:** Automated  

**Steps**
1. Add item to cart
2. Proceed to checkout
3. Enter valid customer information
4. Complete checkout

**Expected Result**
- Order completes successfully
- Confirmation page is displayed

---

### TC-CHK-002: Checkout with missing required fields
- **Priority:** P0  
- **Type:** Automated  

**Steps**
1. Start checkout
2. Leave one or more required fields empty
3. Attempt to continue

**Expected Result**
- Validation error is shown
- User cannot proceed

---

### TC-CHK-003: Validate order total calculation
- **Priority:** P0  
- **Type:** Automated  

**Expected Result**
- Displayed total equals item total plus tax

**Risk**
- Pricing accuracy and customer trust

---

### TC-CHK-004: Cancel checkout and return to cart
- **Priority:** P1  
- **Type:** Manual  

**Expected Result**
- User is returned to cart page
- Cart contents remain unchanged

---

## 5. Session & Navigation

### TC-SESSION-001: Refresh page during checkout
- **Priority:** P2  
- **Type:** Manual  

**Expected Result**
- Application handles refresh gracefully without breaking flow

---

### TC-SESSION-002: Access protected pages without login
- **Priority:** P1  
- **Type:** Manual  

**Expected Result**
- User is redirected to login page

---

## 6. Out of Scope / Non-Functional

The following areas are intentionally not covered by this test suite:

- Visual/UI styling validation
- Performance or load testing
- Accessibility testing
- Cross-browser compatibility

**Reason**
These areas are better validated using specialized tools and are outside the scope of functional regression coverage for this assessment.

---

## Automation Coverage Summary

### Automated
- Authentication (valid, invalid, locked users)
- Add to cart
- Cart management
- Checkout happy path
- Checkout validation
- Order confirmation
- Logout/session handling

### Manual / Exploratory
- Product sorting
- UI rendering
- Navigation edge cases
- Refresh and back-button behavior

---

## Notes
This test case set prioritizes **business value, maintainability, and clarity**, aligning with real-world quality engineering practices rather than exhaustive UI validation.
