Feature: Login

  Scenario: Login sukses dengan kredensial valid
    Given user membuka halaman login
    When user login dengan username "standard_user" dan password "secret_sauce"
    Then user diarahkan ke halaman inventori

  Scenario: Login gagal dengan kredensial salah
    Given user membuka halaman login
    When user login dengan username "invalid_user" dan password "wrong_pass"
    Then user melihat pesan kesalahan
