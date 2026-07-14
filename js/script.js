document.addEventListener('DOMContentLoaded', () => {
    // Dados e elementos principais
    const products = [
        { id: 1, name: "Picanha Bovina (1.2kg)", price: 89.90 },
        { id: 2, name: "Linguiça Toscana (1kg)", price: 25.50 },
        { id: 3, name: "Pão de Alho (400g)", price: 15.00 },
        { id: 4, name: "Fraldinha (1kg)", price: 59.90 },
        { id: 5, name: "Costela Suína BBQ (800g)", price: 49.90 },
        { id: 6, name: "Coxa de Frango (1kg)", price: 19.90 }
    ];
    const productImages = {
        1: 'img/picanha_bovina.png',
        2: 'img/linguica_toscana.webp',
        3: 'img/pao_alho.png',
        4: 'img/fraldinha.jpg',
        5: 'img/costela_suina.webp',
        6: 'img/coxa.jpg'
    };
    const availableTimes = ["14:00", "14:30", "15:00", "15:30", "16:00", "17:00", "17:30"];
    let cart = [], selectedDate = null, selectedTime = null, orderId = null;
    // Elementos
    const el = {
        productList: document.getElementById('product-list'),
        confirmCartBtn: document.getElementById('confirm-cart-btn'),
        orderSummaryList: document.getElementById('order-summary-list'),
        dateSelectionContainer: document.getElementById('date-selection'),
        timeSlotsContainer: document.getElementById('time-slots'),
        confirmButton: document.getElementById('confirm-button'),
        schedulingSection: document.getElementById('scheduling-section'),
        confirmationSection: document.getElementById('confirmation-section'),
        timeTitle: document.getElementById('time-title'),
        qrCodeContainer: document.getElementById('qr-code'),
        selectedDateTimeSpan: document.getElementById('selected-date-time'),
        productSelectionSection: document.getElementById('product-selection-section')
    };

    // Renderiza lista de produtos
    function renderProductList() {
        el.productList.innerHTML = '';
        products.forEach(product => {
            const col = document.createElement('div');
            col.className = 'col-md-6 mb-3';
            col.innerHTML = `
                <div class="card product-card">
                    <img src="${productImages[product.id]}" alt="${product.name}" class="card-img-top">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text fw-bold">R$ ${product.price.toFixed(2)}</p>
                        <button class="btn btn-outline-primary add-to-cart-btn" data-id="${product.id}">Adicionar ao carrinho</button>
                    </div>
                </div>
            `;
            el.productList.appendChild(col);
        });
    }

    // Atualiza botão de confirmação do carrinho
    function updateConfirmCartBtn() {
        el.confirmCartBtn.disabled = cart.length === 0;
    }

    // Adiciona produto ao carrinho
    el.productList.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const id = +e.target.dataset.id;
            const product = products.find(p => p.id === id);
            if (product && !cart.some(p => p.id === id)) {
                cart.push(product);
                e.target.textContent = 'Adicionado';
                e.target.disabled = true;
                updateConfirmCartBtn();
            }
        }
    });

    // Confirmação do carrinho
    el.confirmCartBtn.addEventListener('click', () => {
        orderId = 'SW' + Math.floor(Math.random() * 90000 + 10000);
        el.orderSummaryList.innerHTML = '';
        let total = cart.reduce((sum, item) => sum + item.price, 0);
        cart.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between';
            li.innerHTML = `${item.name} <span>R$ ${item.price.toFixed(2)}</span>`;
            el.orderSummaryList.appendChild(li);
        });
        const totalLi = document.createElement('li');
        totalLi.className = 'list-group-item d-flex justify-content-between fw-bold total-line';
        totalLi.innerHTML = `Total: <span>R$ ${total.toFixed(2)}</span>`;
        el.orderSummaryList.appendChild(totalLi);
        el.productSelectionSection.classList.add('d-none');
        el.schedulingSection.classList.remove('d-none');
        generateDateOptions();
    });

    // Gera opções de datas
    function generateDateOptions() {
        el.dateSelectionContainer.innerHTML = '';
        const today = new Date();
        for (let i = 0; i < 5; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const dateButton = document.createElement('div');
            dateButton.classList.add('date-option');
            dateButton.textContent = `${day}/${month}`;
            dateButton.dataset.value = date.toISOString().split('T')[0];
            el.dateSelectionContainer.appendChild(dateButton);
        }
    }

    function handleDateClick(e) {
        if (!e.target.classList.contains('date-option')) return;
        el.dateSelectionContainer.querySelectorAll('.date-option').forEach(btn => btn.classList.remove('selected'));
        e.target.classList.add('selected');
        selectedDate = e.target.dataset.value;
        el.timeTitle.classList.remove('d-none');
        populateTimeSlots();
        selectedTime = null;
        updateConfirmButtonState();
    }

    function populateTimeSlots() {
        el.timeSlotsContainer.innerHTML = '';
        availableTimes.forEach(time => {
            const timeButton = document.createElement('div');
            timeButton.classList.add('time-slot');
            timeButton.textContent = time;
            timeButton.dataset.value = time;
            el.timeSlotsContainer.appendChild(timeButton);
        });
    }

    function handleTimeClick(e) {
        if (!e.target.classList.contains('time-slot')) return;
        el.timeSlotsContainer.querySelectorAll('.time-slot').forEach(btn => btn.classList.remove('selected'));
        e.target.classList.add('selected');
        selectedTime = e.target.dataset.value;
        updateConfirmButtonState();
    }

    function updateConfirmButtonState() {
        el.confirmButton.disabled = !(selectedDate && selectedTime);
    }

    function showConfirmation() {
        el.schedulingSection.classList.add('d-none');
        document.getElementById('installment-section').classList.remove('d-none');
        window.scrollTo(0, 0);
    }

    // Nova etapa: seleção de parcelamento
    const installmentSection = document.getElementById('installment-section');
    const installmentOptions = document.getElementById('installment-options');
    const installmentInfo = document.getElementById('installment-info');
    const confirmInstallmentBtn = document.getElementById('confirm-installment-btn');

    let selectedInstallment = null;

    if (installmentOptions) {
        installmentOptions.addEventListener('click', (e) => {
            if (e.target.classList.contains('installment-btn')) {
                installmentOptions.querySelectorAll('.installment-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                selectedInstallment = parseInt(e.target.dataset.parc);
                confirmInstallmentBtn.disabled = false;
                // Calcular valores
                let total = cart.reduce((sum, item) => sum + item.price, 0);
                let parcela = 0, totalFinal = total;
                if (selectedInstallment <= 3) {
                    parcela = total / selectedInstallment;
                    installmentInfo.innerHTML = `Parcelamento em <strong>${selectedInstallment}x</strong> sem juros de <strong>R$ ${parcela.toFixed(2)}</strong> por parcela.`;
                    installmentInfo.className = 'text-success mb-3';
                } else {
                    // Juros de 3% ao mês por parcela acima de 3x
                    let juros = 0.03;
                    let n = selectedInstallment;
                    // Fórmula de parcela fixa: P = V * (j*(1+j)^n)/((1+j)^n-1)
                    let j = juros;
                    parcela = total * (j * Math.pow(1 + j, n)) / (Math.pow(1 + j, n) - 1);
                    totalFinal = parcela * n;
                    installmentInfo.innerHTML = `Parcelamento em <strong>${selectedInstallment}x</strong> com juros de <strong>R$ ${parcela.toFixed(2)}</strong> por parcela.<br><span class='small text-muted'>Total com juros: R$ ${totalFinal.toFixed(2)}</span>`;
                    installmentInfo.className = 'text-warning mb-3';
                }
            }
        });
        confirmInstallmentBtn.addEventListener('click', () => {
            installmentSection.classList.add('d-none');
            el.confirmationSection.classList.remove('d-none');
            const [year, month, day] = selectedDate.split('-');
            const formattedDate = `${day}/${month}/${year}`;
            el.selectedDateTimeSpan.textContent = `${formattedDate} às ${selectedTime}`;
            const qrData = JSON.stringify({ orderId, pickupTime: `${selectedDate}T${selectedTime}`, installment: selectedInstallment });
            const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
            el.qrCodeContainer.innerHTML = '';
            const qrCodeImage = document.createElement('img');
            qrCodeImage.src = qrCodeUrl;
            qrCodeImage.alt = 'QR Code para retirada do pedido';
            el.qrCodeContainer.appendChild(qrCodeImage);
            window.scrollTo(0, 0);
        });
    }

    // Eventos
    el.dateSelectionContainer.addEventListener('click', handleDateClick);
    el.timeSlotsContainer.addEventListener('click', handleTimeClick);
    el.confirmButton.addEventListener('click', showConfirmation);

    // Inicialização
    renderProductList();
    updateConfirmCartBtn();
});