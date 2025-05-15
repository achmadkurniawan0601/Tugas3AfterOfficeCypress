describe("E2E OrangeHRM Flow", () => {
  const adminUsername = "Admin";
  const adminPassword = "admin123";

  const newEmployeeFirstName = "Achmad";
  const newEmployeeLastName = "Kurniawan";
  const newEmployeeFirstNameB = "Ranga";
  const newEmployeeLastNameB = "Akunuri";
  const newUsername = "testuser16";
  const newPassword = "Password123!";

  beforeEach(() => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
  });

  it.skip("1. Admin adds new employee and creates login account", () => {
    // Login as Admin
    cy.get('input[name="username"]').type(adminUsername);
    cy.get('input[name="password"]').type(adminPassword);
    cy.get('button[type="submit"]').click();
    cy.contains("Dashboard").should("exist");

    // Add Employee
    cy.contains("PIM").click();
    cy.contains("Add").click();
    cy.get('input[name="firstName"]').type(newEmployeeFirstName);
    cy.get('input[name="lastName"]').type(newEmployeeLastName);
    cy.get('button[type="submit"]').click();
    cy.contains("Personal Details").should("exist");
    cy.screenshot("1_add_employee_positive");

    // Create Login for Employee
    cy.contains("Admin").click();
    cy.contains("Add").click();

    // Pilih User Role: ESS
    cy.get(".oxd-select-text--after").eq(0).click();
    cy.get(".oxd-select-dropdown").contains("ESS").click();
    cy.get(".oxd-select-text").eq(1).click(); // Pastikan .eq(1) adalah index dari dropdown 'Status'

    // Pilih opsi "Disabled"
    cy.get(".oxd-select-dropdown").contains("Disabled").click();

    // Input nama employee via autocomplete
    cy.get('input[placeholder="Type for hints..."]').type(
      `${newEmployeeFirstName} ${newEmployeeLastName}`,
      { delay: 100, force: true }
    );
    cy.wait(2000);
    cy.get(".oxd-autocomplete-option").first().click({ force: true });

    // Isi username dan password
    cy.get(".oxd-input").eq(1).type(newUsername); // Username
    cy.get('input[type="password"]').eq(0).type(newPassword); // Password
    cy.get('input[type="password"]').eq(1).type(newPassword); // Confirm Password

    // Submit
    cy.get('button[type="submit"]').click();

    // Assertion
    cy.contains("Successfully Saved").should("exist");
    cy.screenshot("2_create_user_positive");

    // Negative Case: Create user with same username
    cy.contains("Add").click();
    cy.get(".oxd-select-text--after").eq(0).click();
    cy.get(":nth-child(2) > .oxd-input").type("achmad kurniawan");
    cy.contains("ESS").click();

    cy.get('input[placeholder="Type for hints..."]').type(
      `${newEmployeeFirstName} ${newEmployeeLastName}`,
      { delay: 100, force: true }
    );
    cy.wait(2000).type("{downarrow}{enter}");
    cy.get(".oxd-input").eq(1).type(newUsername);
    cy.get('input[type="password"]').eq(0).type(newPassword);
    cy.get('input[type="password"]').eq(1).type(newPassword);
    cy.get('button[type="submit"]').click();

    cy.contains("Already exists").should("exist");
    cy.screenshot("3_create_user_negative");
  });

  it.skip("2. Admin adds leave entitlement to new employee", () => {
    // Login Admin
    cy.get('input[name="username"]').type(adminUsername);
    cy.get('input[name="password"]').type(adminPassword);
    cy.get('button[type="submit"]').click();
    cy.contains("Dashboard").should("exist");

    // Add Entitlement
    cy.contains("Leave").click();
    cy.contains("Entitlements").click();
    cy.contains("Add Entitlements").click();

    // Input nama karyawan
    cy.get('input[placeholder="Type for hints..."]').type(
      `${newEmployeeFirstNameB} ${newEmployeeLastNameB}`,
      { delay: 100, force: true }
    );
    cy.wait(2000);
    cy.get(".oxd-autocomplete-option").first().click({ force: true });

    // Pilih Leave Type
    cy.get(".oxd-select-text--after").eq(0).click();
    cy.get(".oxd-select-dropdown").contains("CAN - FMLA").click();

    // Input jumlah hari
    cy.get(".oxd-input").eq(1).type("5");

    // Submit form
    cy.get('button[type="submit"]').click();

    // Assertion
    cy.contains("Confirm").click();
    cy.contains("Leave Entitlements").should("exist");
    cy.screenshot("4_entitlement_positive");

    // Negative Case: No days entered
    cy.contains("Add Entitlements").click();
    cy.get('input[placeholder="Type for hints..."]').type(
      `${newEmployeeFirstName} ${newEmployeeLastName}`
    );
    cy.wait(2000).type("{downarrow}{enter}");
    cy.get('button[type="submit"]').click();
    cy.contains("Required").should("exist");
    cy.screenshot("5_entitlement_negative");
  });

  it.only("3. Employee request leave and admin approves it", () => {
    // Login as employee
    cy.get('input[name="username"]').type(newUsername);
    cy.get('input[name="password"]').type(newPassword);
    cy.get('button[type="submit"]').click();
    cy.contains("Dashboard").should("exist");

    // Apply Leave
    cy.contains("Leave").click();
    cy.contains("Apply").click();
    cy.get(".oxd-select-text--after").eq(0).click();
    cy.contains("Annual Leave").click();

    cy.get('input[placeholder="yyyy-mm-dd"]').eq(0).type("2024-12-25");
    cy.get('input[placeholder="yyyy-mm-dd"]').eq(1).type("2024-12-25");
    cy.get('button[type="submit"]').click();
    cy.contains("Successfully Submitted").should("exist");
    cy.screenshot("6_leave_request_positive");

    // Logout
    cy.get(".oxd-userdropdown-name").click();
    cy.contains("Logout").click();

    // Admin login and approve
    cy.get('input[name="username"]').type(adminUsername);
    cy.get('input[name="password"]').type(adminPassword);
    cy.get('button[type="submit"]').click();
    cy.contains("Dashboard").should("exist");

    cy.contains("Leave").click();
    cy.contains("Leave List").click();
    cy.get('input[placeholder="Type for hints..."]').type(
      `${newEmployeeFirstName} ${newEmployeeLastName}`
    );
    cy.wait(2000).type("{downarrow}{enter}");
    cy.get('button[type="submit"]').click();

    cy.wait(2000);
    cy.get("i.oxd-icon.bi-check").first().click();
    cy.contains("Approve").click();
    cy.contains("Approved").should("exist");
    cy.screenshot("7_approve_leave");

    // Logout and check as employee
    cy.get(".oxd-userdropdown-name").click();
    cy.contains("Logout").click();
    cy.get('input[name="username"]').type(newUsername);
    cy.get('input[name="password"]').type(newPassword);
    cy.get('button[type="submit"]').click();

    cy.contains("Leave").click();
    cy.contains("My Leave").click();
    cy.contains("Approved").should("exist");
    cy.screenshot("8_check_approved");
  });
});
