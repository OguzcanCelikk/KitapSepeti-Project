import SearchPage from '../support/pages/SearchPage';
import ProductPage from '../support/pages/ProductPage';
import CartPage from '../support/pages/CartPage';
import PaymentPage from '../support/pages/PaymentPage';

describe('User Story 05: Tam Ödeme ve Form Doğrulama Akışı', () => {
    
    const credentials = {
        email: 'celik.oguzcan@hotmail.com',
        pass: 'wSGYF8gMt2s.Ap'
    };

    it('Login, Adres, Kargo ve Kart Bilgileri (Pozitif & Negatif Test)', () => {
        // --- ADIM 1: Login ve Sepet Süreci ---
        cy.visit('/');
        SearchPage.searchProduct('roman');
        SearchPage.elements.productTitles().first().click({ force: true });
        ProductPage.elements.addToCartBtn().click({ force: true });
        
        cy.wait(2000);
        ProductPage.elements.goToCartBtn().click({ force: true });
        CartPage.elements.checkoutBtn().click({ force: true });
        
        PaymentPage.elements.loginEmail().type(credentials.email, { force: true });
        PaymentPage.elements.loginPassword().type(credentials.pass, { force: true });
        PaymentPage.elements.loginSubmitBtn().click({ force: true });
        
        // --- ADIM 2: Çerez ve Sekme Kontrolü ---
        cy.wait(4000); // Sayfanın ve çerez uyarısının gelmesi için bekle

        // 1. Çerez engelini aş (Görseldeki turuncu buton)
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Tümünü Kabul Et")').length > 0) {
                cy.contains('Tümünü Kabul Et').click({ force: true });
            }
        });

        // 2. Navigasyon Çubuğundaki "Adres Bilgileri" Sekmesini Doğrula
        // Görseldeki HTML yapısına göre: "active" class'ına sahip ve "Adres Bilgileri" içeren element.
        cy.get('nav#order-nav a.active')
            .should('contain', 'Adres Bilgileri')
            .and('be.visible');

        // 3. "Ödeme Aşamasına Geç" Butonuna Tıkla
        // Terminal modunda stabilite için önce scroll, sonra zorlayarak tıkla.
        PaymentPage.elements.proceedToPaymentBtn()
            .scrollIntoView()
            .click({ force: true });
        
        // --- ADIM 3: Kargo ve Kart İşlemleri ---
        cy.wait(3000); 
        PaymentPage.elements.pttCargoRadio().check({ force: true }).should('be.checked');
        PaymentPage.elements.creditCardTab().click({ force: true });

        // Kart Bilgileri (Pozitif)
        PaymentPage.elements.cardNameInput().type('Test Kullanıcısı', { force: true });
        PaymentPage.elements.cardNumberInput().type('4506340000000000', { force: true });
        PaymentPage.elements.cardExpiryInput().type('1230', { force: true });
        PaymentPage.elements.cardCvvInput().type('123', { force: true });
        PaymentPage.elements.paymentSubmitBtn().should('not.have.attr', 'disabled');

        // Kart Bilgileri (Negatif)
        PaymentPage.elements.cardNumberInput().clear({ force: true }).type('1111', { force: true }).blur();
            PaymentPage.elements.cardNumberErrorMsg().should('be.visible', { timeout: 10000 }).and('have.text', 'Geçersiz bir kart numarası girdiniz');
    });
});