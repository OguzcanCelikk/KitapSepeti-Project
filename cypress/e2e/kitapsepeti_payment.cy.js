import SearchPage from '../support/pages/SearchPage'; //
import ProductPage from '../support/pages/ProductPage';
import CartPage from '../support/pages/CartPage';
import PaymentPage from '../support/pages/PaymentPage';

describe('User Story 05: Tam Ödeme ve Form Doğrulama Akışı | Full Payment and Form Validation Flow', () => {
    
    // TR: Test için kullanılacak kimlik bilgileri | EN: Credentials for testing
    const credentials = {
        email: 'test@test.com', //// TR: Test email | EN: Test email
        pass: 'wSGYF8gMt2s.Ap'  /// TR: Test password | EN: Test password
    };

    it('Login, Adres, Kargo ve Kart Bilgileri (Pozitif & Negatif) | Login, Address, Cargo and Card Info (Pos & Neg)', () => {
        // --- ADIM 1: Login ve Sepet Süreci | Step 1: Login and Cart Process ---
        cy.visit('/'); //
        SearchPage.searchProduct('roman');
        SearchPage.elements.productTitles().first().click({ force: true });
        ProductPage.elements.addToCartBtn().click({ force: true });
        
        cy.wait(2000); // TR: Sepet animasyonu | EN: Cart animation
        ProductPage.elements.goToCartBtn().click({ force: true });
        CartPage.elements.checkoutBtn().click({ force: true });
        
        // TR: Ödeme aşamasında giriş yap | EN: Login during checkout
        PaymentPage.elements.loginEmail().type(credentials.email, { force: true });
        PaymentPage.elements.loginPassword().type(credentials.pass, { force: true });
        PaymentPage.elements.loginSubmitBtn().click({ force: true });
        
        // --- ADIM 2: Çerez ve Sekme Kontrolü | Step 2: Cookies and Tab Control ---
        cy.wait(4000); 

        // TR: Çerez banner'ını kabul et | EN: Accept cookies banner
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Tümünü Kabul Et")').length > 0) {
                cy.contains('Tümünü Kabul Et').click({ force: true });
            }
        });

        // TR: "Adres Bilgileri" sekmesinin aktifliğini doğrula | EN: Verify "Address Info" tab is active
        cy.get('nav#order-nav a.active')
            .should('contain', 'Adres Bilgileri')
            .and('be.visible');

        // TR: Bir sonraki aşamaya geç | EN: Proceed to the next step
        PaymentPage.elements.proceedToPaymentBtn()
            .scrollIntoView()
            .click({ force: true });
        
        // --- ADIM 3: Kargo ve Kart İşlemleri | Step 3: Cargo and Card Transactions ---
        cy.wait(3000); 
        // TR: Kargo seçimi doğrula | EN: Validate cargo selection
        PaymentPage.elements.pttCargoRadio().check({ force: true }).should('be.checked');
        PaymentPage.elements.creditCardTab().click({ force: true });

        // TR: Pozitif Kart Bilgileri | EN: Positive Card Info
        PaymentPage.elements.cardNameInput().type('Test Kullanıcısı', { force: true });
        PaymentPage.elements.cardNumberInput().type('4506340000000000', { force: true });
        PaymentPage.elements.cardExpiryInput().type('1230', { force: true });
        PaymentPage.elements.cardCvvInput().type('123', { force: true });
        PaymentPage.elements.paymentSubmitBtn().should('not.have.attr', 'disabled');

        // TR: Negatif Kart Bilgileri (Hatalı Numara) | EN: Negative Card Info (Invalid Number)
        PaymentPage.elements.cardNumberInput().clear({ force: true }).type('1111', { force: true }).blur();
        PaymentPage.elements.cardNumberErrorMsg()
            .should('be.visible', { timeout: 10000 })
            .and('have.text', 'Geçersiz bir kart numarası girdiniz');
    });
});