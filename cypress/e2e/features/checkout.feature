Feature: Checkout

  Scenario: Selesaikan checkout dengan data valid
    Given user sudah menambahkan produk ke keranjang
    When user mengisi informasi checkout
    Then checkout berhasil
