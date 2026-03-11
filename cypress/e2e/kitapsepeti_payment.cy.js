import SearchPage from '../support/pages/SearchPage';
import ProductPage from '../support/pages/ProductPage';
import CartPage from '../support/pages/CartPage';
import PaymentPage from '../support/pages/PaymentPage';

/**
 * TR: Uygulama kodundan kaynaklanan hataların testi durdurmasını engeller.
 * EN: Prevents uncaught exceptions from application code from failing the tests.
 */
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('User Story 05: Tam Ödeme ve Form Doğrulama Akışı | Full Payment and Form Validation Flow', () => {
    
    // TR: Test için kullanılan kimlik bilgileri | EN: Credentials for testing
    const credentials = {
        email: 'test@test.com',
        pass: 'wSGYF8gMt2s.Ap'
    };

    it('Login, Adres, Kargo ve Kart Bilgileri (Pozitif & Negatif) | Login, Address, Cargo and Card Info (Pos & Neg)', () => {
        
        /**
         * TR: Akıllı Ziyaret ve Sepet Süreci.
         * EN: Smart Visit and Cart Process.
         */
        cy.visit('/', { 
            timeout: 120000,
            onBeforeLoad(win) {
                Object.defineProperty(win, 'google_trackConversion', { value: () => {} });
            }
        });

        SearchPage.searchProduct('roman');
        SearchPage.elements.productTitles().first().click({ force: true });
        ProductPage.elements.addToCartBtn().click({ force: true });
        
        // TR: Sepet animasyonu ve yönlendirme | EN: Cart animation and redirection
        cy.wait(2000); 
        ProductPage.elements.goToCartBtn().click({ force: true });
        CartPage.elements.checkoutBtn().click({ force: true });
        
        /**
         * TR: Giriş Süreci: Ödeme aşamasında kullanıcı girişi yapılır.
         * EN: Login Process: User logs in during the checkout phase.
         */
        PaymentPage.elements.loginEmail().type(credentials.email, { force: true });
        PaymentPage.elements.loginPassword().type(credentials.pass, { force: true });
        PaymentPage.elements.loginSubmitBtn().click({ force: true });
        
        // TR: Giriş sonrası sayfa yüklenmesi için tolerans | EN: Tolerance for page load after login
        cy.wait(4000); 

        /**
         * TR: Çerez Banner ve Sekme Kontrolü.
         * EN: Cookie Banner and Tab Validation.
         */
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Tümünü Kabul Et")').length > 0) {
                cy.contains('Tümünü Kabul Et').click({ force: true });
            }
        });

        // TR: "Adres Bilgileri" sekmesinin aktifliğini doğrula | EN: Verify "Address Info" tab is active
        cy.get('nav#order-nav a.active')
            .should('contain', 'Adres Bilgileri')
            .and('be.visible');

        // TR: Bir sonraki aşamaya geç (Kargo/Ödeme) | EN: Proceed to the next step (Cargo/Payment)
        PaymentPage.elements.proceedToPaymentBtn()
            .scrollIntoView()
            .click({ force: true });
        
        /**
         * TR: Kargo ve Kart İşlemleri: Pozitif ve Negatif senaryolar.
         * EN: Cargo and Card Transactions: Positive and Negative scenarios.
         */
        cy.wait(3000); 
        
        // TR: Kargo seçimi doğrula | EN: Validate cargo selection
        PaymentPage.elements.pttCargoRadio().check({ force: true }).should('be.checked');
        PaymentPage.elements.creditCardTab().click({ force: true });

        /**
         * TR: Pozitif Senaryo - Kart Bilgileri girişi.
         * EN: Positive Scenario - Entering Card Information.
         */
        PaymentPage.elements.cardNameInput().type('Test Kullanıcısı', { force: true });
        PaymentPage.elements.cardNumberInput().type('4506340000000000', { force: true });
        PaymentPage.elements.cardExpiryInput().type('1230', { force: true });
        PaymentPage.elements.cardCvvInput().type('123', { force: true });
        
        // TR: Ödeme butonunun aktif olduğunu doğrula | EN: Verify payment button is active
        PaymentPage.elements.paymentSubmitBtn().should('not.have.attr', 'disabled');

        /**
         * TR: Negatif Senaryo - Hatalı kart numarası kontrolü.
         * EN: Negative Scenario - Invalid card number validation.
         */
        PaymentPage.elements.cardNumberInput().clear({ force: true }).type('1111', { force: true }).blur();
        PaymentPage.elements.cardNumberErrorMsg()
            .should('be.visible', { timeout: 10000 })
            .and('have.text', 'Geçersiz bir kart numarası girdiniz');
    });
});