class PaymentPage {
    elements = {
        // Login Alanları
        loginEmail: () => cy.get('#login-form-131 [name="email"]'),
        loginPassword: () => cy.get('#login-form-131 [name="password"]'),
        loginSubmitBtn: () => cy.get('#ug-submit-btn'),

        // Adres Sayfasından Ödeme Sayfasına Geçiş Butonu
        proceedToPaymentBtn: () => cy.get('.order-next-btn').first(),

        // Kargo Seçenekleri
        pttCargoRadio: () => cy.get('#cargo-item-input-1'),
        hepsijetCargoRadio: () => cy.get('#cargo-item-input-2'),

        // Ödeme Sekmeleri
        iyzicoTab: () => cy.get('#iyz-tab-payWithIyzico'),
        creditCardTab: () => cy.get('#iyz-tab-credit-card'),

        // Kredi Kartı Formu
        cardNameInput: () => cy.get('#ccname'),
        cardNumberInput: () => cy.get('#ccnumber'),
        cardExpiryInput: () => cy.get('#ccexp'),
        cardCvvInput: () => cy.get('#cccvc'),

        // Final İşlemler
        paymentSubmitBtn: () => cy.get('#iyz-payment-button'),
        cardNumberErrorMsg: () => cy.contains('Geçersiz bir kart numarası girdiniz'),
        
        // Sipariş Özeti
        orderSummaryBox: () => cy.get('#order-summary'), 
        grandTotalOnPayment: () => cy.get('#order-summary').contains('Genel Toplam').parent()
    };
}

export default new PaymentPage();