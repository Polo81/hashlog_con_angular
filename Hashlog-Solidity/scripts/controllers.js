'use strict';

angular.module('hashlogApp',[])

        .controller('HashController', ['$scope', function($scope) {

            $scope.initialize_data_model = function() {
                //INICIALIZACIÓN DEL MODELO: objeto Web3, account, defaultAccount, MyContract, contractinstance
                //alert ("HASHCONTROLLER initialize scope/model");
                //Creamos una instancia de Web3 y podemos establecer una conexión con el cliente Web3 (nodo)
                // que será quien se comunique con la Blockchain. TestRPC nos creará ese cliente en el puerto 8545 (es el por defecto para este emulador)
                $scope.web3 = new Web3();
                $scope.web3.setProvider(new $scope.web3.providers.HttpProvider('http://localhost:8545'));
                $scope.account = $scope.web3.eth.accounts[0];
                $scope.web3.eth.defaultAccount = $scope.account;
                //INSTANCIAMOS EL CONTRATO YA EXISTENTE: HASHLOGCONTRACT.SOL
                // 1) Para ello le metemos primero como parámetro el objeto ABI (es el JSON con toda la información)
                // El ABI se ha genrado en tiempo de compilación del .sol
                $scope.MyContract = $scope.web3.eth.contract([{"constant":false,"inputs":[{"name":"hash","type":"bytes32"}],"name":"hashlog","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"test","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_hash","type":"bytes32"}],"name":"hashloged","type":"event"}]);
                // 2) Termino de obtener la instancia del contrato enviando la dirección del propio contrato
                $scope.contractInstance = $scope.MyContract.at("0x57db1cacfc26db7e2e61d88c597bccad157c8a0a");

                //Pongo en pantalla el balance de la cuenta del usuario y su número de cuenta (address publica del usuario)
                document.getElementById("balance").innerHTML = parseInt($scope.web3.eth.getBalance($scope.account)/1000000000000000)+" Eth" ;
                document.getElementById("cuenta").innerHTML = $scope.account;
            }

            //Función que hashea el texto que metamos en el input por pantalla
            $scope.hash_it = function() {
                //alert ("HASHCONTROLLER hash it");
                document.getElementById("hash_input").value = $scope.web3.sha3($scope.text_to_hash);
            }

            $scope.delete_hash = function() {
                document.getElementById("hash_input").value = '';
            }

            // Aquí llamo al método 'hashlog' del contrato HashLogContract.sol que
            // lo único que hace es activar el evento 'hashloged' (recibirá la dirección publica de la cuenta que
            // quiere registrar ese hash además del propio hash) cuando pulse botón para certificar
            $scope.certify = function() {
                //alert ("HASHCONTROLLER certify");
                var result = $scope.contractInstance.hashlog(document.getElementById("hash_input").value);
                //$scope.web3.sha3(document.getElementById("textoIn").value)
                /*function(err,result, aa) {

                      if (!err) {
                        result = aa;
                      }
                });*/
                console.log("Result of the transaction: " + result);
                $scope.transaction_number = result;
                $scope.gas_usage = '0,7 eth';
                $scope.block_number = '0xEEEEE';
                $scope.block_time = '01-10-2020 UTC';
                //$("#myModal").modal("show");
            }

        }])


;
