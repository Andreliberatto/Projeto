document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get('servico') || localStorage.getItem('selectedService');
    const price = urlParams.get('preco') || localStorage.getItem('servicePrice');
    
    if (service && price) {
        document.getElementById('servico-nome').textContent = getServiceName(service);
        document.getElementById('servico-valor').textContent = `R$ ${parseFloat(price).toFixed(2).replace('.', ',')}`;
    }
    const mp = new MercadoPago('SUA_PUBLIC_KEY', {
        locale: 'pt-BR'
    });
    const paymentMethods = document.querySelectorAll('.payment-method');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
            paymentMethods.forEach(m => m.classList.remove('active'));
            method.classList.add('active');
            
            const paymentType = method.dataset.method;
            document.getElementById('metodo-selecionado').textContent = 
                paymentType === 'pix' ? 'Pix' : 
                paymentType === 'boleto' ? 'Boleto' : 'Cartão de Crédito';
            updatePaymentForm(paymentType);
        });
    });
    updatePaymentForm('pix');
    
    function updatePaymentForm(paymentType) {
        const paymentForm = document.getElementById('payment-form');
        paymentForm.innerHTML = '';
        
        if (paymentType === 'pix') {
            paymentForm.innerHTML = `
                <div style="text-align: center; margin: 20px 0;">
                    <img src="https://http2.mlstatic.com/storage/homes-korriban/assets/images/ecosystem/payment-method/pix.svg" alt="Pix" style="width: 100px; margin-bottom: 20px;">
                    <p style="margin-bottom: 20px;">Pagamento instantâneo - aprovado em segundos</p>
                    <button id="generate-pix" style="background: var(--verde-primario); color: white; border: none; padding: 12px 25px; border-radius: 5px; font-weight: bold; cursor: pointer; transition: all 0.3s;">
                        Gerar QR Code Pix
                    </button>
                </div>
            `;
            
            document.getElementById('generate-pix').addEventListener('click', function() {
                this.textContent = 'Processando...';
                setTimeout(() => {
                    paymentForm.innerHTML = `
                        <div style="text-align: center; padding: 20px; background: #f0f8ff; border-radius: 8px;">
                            <h4 style="margin-bottom: 15px; color: var(--verde-primario);">Pagamento via Pix</h4>
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PIX1234567890" alt="QR Code Pix" style="margin-bottom: 15px;">
                            <p style="margin-bottom: 10px; font-weight: bold;">Valor: R$ ${document.getElementById('servico-valor').textContent.split('R$ ')[1]}</p>
                            <p style="margin-bottom: 15px;">Ou copie o código abaixo:</p>
                            <div style="background: white; padding: 10px; border-radius: 5px; border: 1px dashed #ccc; margin-bottom: 15px; word-break: break-all;">
                                00020126580014BR.GOV.BCB.PIX0136123e4567-e12b-12d1-a456-4266554400005204000053039865405${document.getElementById('servico-valor').textContent.split('R$ ')[1].replace(',', '')}5802BR5913MEI SIMPLES6008BRASILIA62070503***6304A1F2
                            </div>
                            <p style="color: #666; font-size: 0.9rem;">O código Pix é válido por 30 minutos</p>
                        </div>
                    `;
                }, 1000);
            });
        } 
        else if (paymentType === 'boleto') {
            paymentForm.innerHTML = `
                <div style="margin: 20px 0;">
                    <p style="margin-bottom: 20px;">O boleto será gerado após a confirmação do pedido e pode levar até 3 horas para ser compensado.</p>
                    <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #eee;">
                        <p style="margin-bottom: 15px;"><strong>Vencimento:</strong> 3 dias úteis</p>
                        <p style="margin-bottom: 15px;"><strong>Valor:</strong> R$ ${document.getElementById('servico-valor').textContent.split('R$ ')[1]}</p>
                        <button id="generate-boleto" style="background: var(--verde-primario); color: white; border: none; padding: 12px 25px; border-radius: 5px; font-weight: bold; cursor: pointer; transition: all 0.3s; width: 100%;">
                            Gerar Boleto
                        </button>
                    </div>
                </div>
            `;
        }
        else {
            mp.bricks().create("cardPayment", "payment-form", {
                initialization: {
                    amount: parseFloat(document.getElementById('servico-valor').textContent.replace('R$ ', '').replace(',', '')),
                },
                customization: {
                    paymentMethods: {
                        creditCard: 'all',
                        debitCard: 'all',
                        ticket: false,
                        bankTransfer: false,
                        atm: false
                    },
                    visual: {
                        style: {
                            theme: 'bootstrap' 
                        }
                    }
                }
            });
        }
    }
    
    function getServiceName(serviceKey) {
        const services = {
            'abertura': 'Abertura de CNPJ',
            'baixa': 'Baixa de CNPJ',
            'regularizacao': 'Regularização de Débitos',
            'alteracao': 'Alteração Cadastral'
        };
        return services[serviceKey] || 'Serviço Contábil';
    }
});