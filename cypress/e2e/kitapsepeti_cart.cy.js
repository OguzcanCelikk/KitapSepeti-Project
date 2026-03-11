import SearchPage from '../support/pages/SearchPage';
import ProductPage from '../support/pages/ProductPage';
import CartPage from '../support/pages/CartPage';

/**
 * TR: Uygulama kodundan (Google Ads vb.) kaynaklanan hataların testi durdurmasını engeller.
 * EN: Prevents uncaught exceptions from application code (like Google Ads) from failing the tests.
 */
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('User Story 04: Sepet Yönetimi ve Kontrolü | Cart Management and Control', () => {
    
    beforeEach(() => {
        /**
         * TR: Yavaş yüklenen tracker scriptlerini engeller.
         * EN: Blocks slow-loading tracker scripts.
         */
        cy.visit('/', { 
            timeout: 120000, 
            onBeforeLoad(win) {
                Object.defineProperty(win, 'google_trackConversion', { value: () => {} });
            }
        });

        /**
         * TR: Butonların üzerini kapatan banner'ı kabul eder.
         * EN: Accepts the banner that covers buttons.
         */
        cy.get('body').then(($body) => {
            if ($body.find('.cc-nb-okagree').length > 0) {
                cy.get('.cc-nb-okagree').click({ force: true });
            }
        });

        /**
         * TR: 'roman' araması yapar ve ilk ürünü sepete ekler.
         * EN: Searches for 'roman' and adds the first product to cart.
         */
        SearchPage.searchProduct('roman');
        SearchPage.elements.productTitles().first().click({ force: true });
        ProductPage.elements.addToCartBtn().click({ force: true });

        /**
         * TR: Sepete Git: Açılan pop-up üzerinden sepet sayfasına yönlenir.
         * EN: Navigates to the cart page via the success pop-up.
         */
        ProductPage.elements.goToCartBtn()
            .should('exist', { timeout: 15000 }) 
            .click({ force: true });
        
        cy.url().should('include', '/sepet');
    });

    /**
     * TR: AC2 - AC4: Miktar artırıldığında toplam fiyatın değiştiğini doğrular.
     * EN: AC2 - AC4: Validates that the total price changes when quantity is increased.
     */
    it('AC2 - AC4: Miktar Artırma ve Fiyat Güncelleme | Quantity Increase & Price Update', () => {
        CartPage.elements.quantityInput().should('have.value', '1');
        
        CartPage.elements.grandTotal().invoke('text').then((oldPrice) => {
            CartPage.elements.quantityPlusBtn().first().click({ force: true });
            
            // TR: Fiyat güncellemesi için kısa bir bekleme ve doğrulama.
            // EN: Brief wait for price update and validation.
            cy.wait(3000);
            CartPage.elements.grandTotal().invoke('text').should('not.eq', oldPrice);
        });
    });

    /**
     * TR: AC6 & AC7: Sepeti boşaltır ve boş sepet uyarılarını kontrol eder.
     * EN: AC6 & AC7: Clears the cart and checks for empty cart warnings.
     */
    it('AC6 & AC7: Sepeti Temizleme ve Boş Sepet Kontrolü | Clear Cart & Empty State Validation', () => {
        CartPage.elements.clearAllCartBtn().click({ force: true });

        // TR: Boş sepet mesajını 15 saniye içinde bekle.
        // EN: Wait for the empty cart message within 15 seconds.
        CartPage.elements.emptyCartMessage({ timeout: 15000 }).should('be.visible');
        CartPage.elements.continueShoppingBtn().should('be.visible');
    });

    /**
     * TR: AC 8 & AC 10: Misafir olarak satın alma akışını başlatır.
     * EN: AC 8 & AC 10: Initiates the checkout flow as a guest user.
     */
    it('AC 8 & AC 10: Satın Al ve Misafir Akışı | Checkout & Guest Flow', () => {
        CartPage.elements.checkoutBtn().should('exist').click({ force: true });

        CartPage.elements.continueAsGuestBtn()
            .should('exist', { timeout: 10000 })
            .click({ force: true });

        cy.url().should('include', '/order/address');
    });
});