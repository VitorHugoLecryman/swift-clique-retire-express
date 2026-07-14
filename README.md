# 🛒 Swift - Clique e Retire Express

> Solução de agendamento e otimização para a jornada O2O (Online-to-Offline) da Swift, desenvolvida como Challenge acadêmico para a FIAP.

---

## 📝 O Problema

Durante a análise da jornada de compra dos clientes da Swift, identificamos três principais barreiras na modalidade de retirada em loja física:
* **Incerteza na Retirada:** Filas inesperadas e tempo de espera na loja, que prejudicam a agilidade da compra online.
* **Checkout Desconectado:** O processo de finalização de compra online não oferece controle ao cliente sobre quando e como a retirada do produto ocorrerá.
* **Falta de Conveniência:** Clientes com restrição de tempo desistem da compra por preocupação com a demora no atendimento presencial.

---

## 💡 A Solução: Clique e Retire Express

O **Clique e Retire Express** é uma funcionalidade integrada ao checkout que permite ao cliente agendar um horário exato para a retirada do seu pedido. 
1. **Agendamento:** Após o pagamento, o cliente seleciona um intervalo de horário disponível na unidade escolhida.
2. **QR Code de Liberação:** O sistema gera um QR Code exclusivo para o pedido.
3. **Retirada Instantânea:** Na loja física, o cliente realiza a leitura do código em um terminal de autoatendimento para liberar o pedido imediatamente, eliminando filas e a necessidade de passar pelo caixa.

---

## 🖥️ Demonstração do Protótipo

Como o projeto foi desenvolvido com tecnologias web nativas, é possível testar a interface do protótipo diretamente no navegador.

👉 **[Clique aqui para acessar o protótipo online](https://vitorhugolecryman.github.io/swift-clique-retire-express/)**

*Nota: A documentação completa, incluindo a pesquisa e a apresentação do projeto, está disponível no arquivo `Sprint_Switft.pdf` na raiz deste repositório.*

![Interface do Protótipo](./assets/preview-web.png)

---

## 🏗️ Arquitetura e Modelagem de Dados

Para viabilizar o agendamento de forma escalável e integrada às lojas físicas, foi modelada uma base de dados relacional que conecta Clientes, Pedidos, Lojas e Disponibilidade de Horários (Slots).

![Modelo Entidade-Relacionamento](./assets/diagrama-base-dados.png)

### Principais Entidades:
* **CLIENTE:** Registro e credenciais dos usuários.
* **PEDIDO:** Registro das compras realizadas no e-commerce.
* **SLOT_HORARIO:** Controle de vagas disponíveis por horário em cada unidade física da Swift.
* **LOJA:** Unidades físicas integradas ao sistema de retirada rápida.
* **AGENDAMENTO:** Entidade que relaciona o Pedido à vaga de horário e gera o QR Code único.

---

## 🛠️ Tecnologias Utilizadas

O protótipo responsivo foi desenvolvido utilizando:
* **HTML5** & **CSS3** (Estrutura e Estilização)
* **Bootstrap 5** (Responsividade e componentes visuais)
* **JavaScript** (Lógica do simulador de agendamento e geração do QR Code)
* **dbdiagram.io** (Modelagem de dados)

---

## 👥 Equipe (FIAP - 2º Semestre)
* **Vitor Hugo Dantas Tavares** - RM: 559349