Feature: Cadastrar Pedido

  Scenario: Cadastrar Pedido
    Given A module to create order
    When Call to cadastrarPedidoController
    Then The response should be the new order
