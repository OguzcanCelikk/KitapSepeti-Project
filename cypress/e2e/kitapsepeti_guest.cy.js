import SearchPage from '../support/pages/SearchPage';
import ProductPage from '../support/pages/ProductPage';
import GuestAddressPage from '../support/pages/GuestAddressPage';

/**
 * TR: Uygulama kodundan kaynaklanan hataların testi durdurmasını engeller.
 * EN: Prevents uncaught exceptions from application code from failing the tests.
 */
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('User Story 06: Misafir Olarak Satın Alma Akışı | Guest Checkout Flow', () => {

    beforeEach(() => {
        /**
         * TR: Sayfayı ziyaret et ve tracker scriptlerini engelle.
         * EN: Visit the page and block slow tracker scripts.
         */
        cy.visit('/', { 
            timeout: 120000,
            onBeforeLoad(win) {
                Object.defineProperty(win, 'google_trackConversion', { value: () => {} });
            }
        });

        /**
         * TR: Pop-up ve Çerezleri temizle (Varsa kapatır, yoksa hata vermez).
         * EN: Clear pop-ups and cookies (Closes if present, ignores if not).
         */
        cy.get('body').then(($body) => {
            if ($body.find('.cc-nb-okagree').length > 0) {
                cy.get('.cc-nb-okagree').click({ force: true });
            }
            if ($body.find('#t-modal-close-1').length > 0) {
                cy.get('#t-modal-close-1').click({ force: true });
            }
        });
    });

    it('AC1-AC6: Misafir Girişi ve Adres Formu Doğrulaması | Guest Login and Address Form Validation', () => {
        /**
         * TR: Ürünü Sepete Ekle.
         * EN: Add Product to Cart.
         */
        SearchPage.searchProduct('roman');
        SearchPage.elements.productTitles().first().click({ force: true });
        ProductPage.elements.addToCartBtn().click({ force: true });
        
        // TR: Animasyon ve sepet yönlendirmesi | EN: Animation and cart redirection
        cy.wait(2000); 
        ProductPage.elements.goToCartBtn().click({ force: true });
        
        // TR: Sepeti onayla | EN: Confirm cart
        cy.get('#cart-buy-btn').should('exist').click({ force: true });
        cy.url().should('include', '/siparis-uye-giris');

        /**
         * TR: Misafir Girişi: Üye olmadan devam et seçeneği.
         * EN: Guest Login: Continue without membership option.
         */
        GuestAddressPage.elements.continueAsGuestBtn().click({ force: true });
        cy.url({ timeout: 15000 }).should('include', '/order/address');

        /**
         * TR: Formu Doldur: Kişisel ve iletişim bilgileri.
         * EN: Fill out the Form: Personal and contact information.
         */
        GuestAddressPage.elements.fullNameInput().type('Test Misafir', { force: true });
        GuestAddressPage.elements.emailInput().clear({ force: true }).type('testguest@mail.com', { force: true });

        // TR: Şehir/İlçe/Mahalle (Dinamik yükleme için beklemeli)
        // EN: City/Town/District (With waits for dynamic loading)
        GuestAddressPage.elements.citySelect().select('İstanbul', { force: true });
        cy.wait(2000); 
        GuestAddressPage.elements.townSelect().select('Kadıköy', { force: true });
        cy.wait(2000); 
        GuestAddressPage.elements.districtSelect().select('ERENKÖY MAH', { force: true });

        /**
         * TR: Adres Başlığı Kontrolü - Varsa doldurur.
         * EN: Address Title Check - Fills if present.
         */
        cy.get('body').then(($body) => {
            if ($body.find('#address_title').length > 0) {
                cy.get('#address_title').type('Evim', { force: true });
            }
        });

        /**
         * TR: Adres Detayı (30 karakter kuralı doğrulaması).
         * EN: Address Detail (30-character rule validation).
         */
        GuestAddressPage.elements.addressTextarea()
            .type('Test Mahallesi Deneme Sokak No:1 Kadıköy İstanbul / Adres kısıtlamasını geçmek için yazılan uzun adres metni.', { force: true });
        
        GuestAddressPage.elements.phoneInput().type('5554443322', { force: true });

        /**
         * TR: Kaydet ve Ödemeye Geç.
         * EN: Save and Proceed to Payment.
         */
        GuestAddressPage.elements.saveAddressBtn().click({ force: true });
        
        /**
         * TR: Final Kontrolü - Ödeme sayfasına yönlendirme.
         * EN: Final Validation - Redirection to the payment page.
         */
        cy.url({ timeout: 15000 }).should('include', '/order/payment');
    });
});