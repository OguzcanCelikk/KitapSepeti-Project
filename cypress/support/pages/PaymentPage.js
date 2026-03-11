class PaymentPage {
    /**
     * TR: Ödeme ve kargo sayfasındaki tüm interaktif elementlerin tanımlandığı bölümdür.
     * EN: Section where all interactive elements on the payment and cargo page are defined.
     */
    elements = {
        // TR: Giriş Alanları (Ödeme Öncesi) | EN: Login Fields (Pre-payment)
        loginEmail: () => cy.get('#login-form-131 [name="email"]'),
        loginPassword: () => cy.get('#login-form-131 [name="password"]'),
        loginSubmitBtn: () => cy.get('#ug-submit-btn'),

        // TR: Adres Sayfasından Ödeme Sayfasına Geçiş | EN: Transition from Address to Payment
        proceedToPaymentBtn: () => cy.contains('button', 'Ödeme Adımına Geç', { timeout: 10000 }),

        // TR: Kargo Seçenekleri | EN: Cargo Options
        pttCargoRadio: () => cy.get('#cargo-item-input-1'),
        hepsijetCargoRadio: () => cy.get('#cargo-item-input-2'),

        // TR: Ödeme Sekmeleri | EN: Payment Tabs
        iyzicoTab: () => cy.get('#iyz-tab-payWithIyzico'),
        creditCardTab: () => cy.get('#iyz-tab-credit-card'),

        // TR: Kredi Kartı Formu | EN: Credit Card Form
        cardNameInput: () => cy.get('#ccname'),
        cardNumberInput: () => cy.get('#ccnumber'),
        cardExpiryInput: () => cy.get('#ccexp'),
        cardCvvInput: () => cy.get('#cccvc'),

        // TR: Final İşlemler ve Doğrulama | EN: Final Actions and Validation
        paymentSubmitBtn: () => cy.get('#iyz-payment-button'),
        cardNumberErrorMsg: () => cy.contains('Geçersiz bir kart numarası girdiniz'),
        
        // TR: Sipariş Özeti Kontrolleri | EN: Order Summary Controls
        orderSummaryBox: () => cy.get('#order-summary'),
        
        grandTotalOnPayment: () => cy.get('#order-summary').contains('Genel Toplam').parent()
    };
}

export default new PaymentPage(); //