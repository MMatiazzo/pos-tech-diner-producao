# 📁 PRODUCAO ms

# Micro serviço de produção

<br>
Utilizar a branch principal `master`
<br>
Substituir a váriavel DATABASE_URL com a connection string mongodb
<br>
Executar o comando `npm run start:dev`

## End-point: listar
#### End-point para listar os pedidos cadastrados no ms de produção
### Method: GET
>```
>{{base_url_local}}/producao/listar
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: criar-pedido-producao
#### End-point para criar um novo pedido no ms de produção
### Method: POST
>```
>{{base_url}}/producao/cadastrar
>```
### Body (**raw**)

```json
{
    "id": "663f8cee5f8395e090f3d4da",
    "status": "Recebido",
    "clienteId": "usuarioteste4@email.com.br",
    "produtos": [
        {
            "_id": "663f7f03e8f9dac785e80158",
            "nome": "Whooper",
            "categoria": "Lanche Muito bom",
            "preco": 10,
            "descricao": "Lanche para a maioria",
            "imagens": [],
            "createdAt": "2024-05-11T14:21:55.701Z",
            "updatedAt": "2024-05-11T14:21:55.701Z",
            "__v": 0
        }
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: editar-status-pedido-producao
#### End-point para editar o status de um pedido no ms de produção
### Method: PATCH
>```
>{{base_url}}/producao/editar-status
>```
### Body (**raw**)

```json
{
    "id": "663fc31d8da9cd70e36aa1e3",
    "status": "Listado"
}
```