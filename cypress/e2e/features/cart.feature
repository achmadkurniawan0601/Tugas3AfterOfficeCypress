Feature: Shopping Cart

  Scenario: Tambah produk ke cart
    Given user sudah login
    When user menambahkan produk pertama ke keranjang
    Then produk muncul di keranjang
