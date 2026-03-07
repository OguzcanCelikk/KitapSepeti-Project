import SearchPage from '../support/pages/SearchPage'; //
import ProductPage from '../support/pages/ProductPage';
import CartPage from '../support/pages/CartPage';

describe('User Story 04: Sepet Yönetimi ve Kontrolü | Cart Management and Control', () => {
    
    /**
     * TR: Her testten önce sepete 'roman' kategorisinden bir ürün eklenir ve sepet sayfasına gidilir.
     * EN: Before each test, a product from the 'roman' category is added to the cart, and the user navigates to the cart page.
     */
    beforeEach(() => {
        cy.visit('/'); //
        SearchPage.searchProduct('roman');
        SearchPage.elements.productTitles().first().click({ force: true });
        ProductPage.elements.addToCartBtn().click({ force: true });
        cy.wait(2000); // TR: Animasyon bekleme | EN: Wait for animation
        ProductPage.elements.goToCartBtn().click({ force: true }); // AC1
    });

    /**
     * TR: Ürün miktarının artırılması ve toplam fiyatın dinamik olarak güncellenmesini doğrular.
     * EN: Validates increasing product quantity and ensures the total price updates dynamically.
     */
    it('AC2 - AC4: Miktar Artırma ve Fiyat Güncelleme | Quantity Increase & Price Update', () => {
        // TR: Varsayılan miktarın 1 olduğunu doğrula | EN: Verify default quantity is 1
        CartPage.elements.quantityInput().should('have.value', '1');
        
        // TR: Eski fiyatı al ve artış sonrası değiştiğini kontrol et 
        // EN: Capture old price and verify it changes after increment
        CartPage.elements.grandTotal().invoke('text').then((oldPrice) => {
            CartPage.elements.quantityPlusBtn().first().click({ force: true });
            cy.wait(3000); // TR: Hesaplama süresi | EN: Calculation time
            
            CartPage.elements.grandTotal().invoke('text').should('not.eq', oldPrice); // AC4
        });
    });

    /**
     * TR: Sepetteki tüm ürünleri siler ve boş sepet uyarı mesajını kontrol eder.
     * EN: Clears all items from the cart and verifies the empty cart warning message.
     */
    it('AC6 & AC7: Sepeti Temizleme ve Boş Sepet Kontrolü | Clear Cart & Empty State Validation', () => {
        CartPage.elements.clearAllCartBtn().click({ force: true }); // AC6

        // TR: Boş sepet mesajının görünürlüğünü doğrula | EN: Verify visibility of empty cart message
        CartPage.elements.emptyCartMessage({ timeout: 15000 }).should('be.visible');
        CartPage.elements.continueShoppingBtn().should('be.visible'); // AC7
    });

    /**
     * TR: Satın alma sürecini başlatır ve misafir kullanıcı olarak adres sayfasına yönlenmeyi doğrular.
     * EN: Initiates checkout and validates redirection to the address page as a guest user.
     */
    it('AC 8 & AC 10: Satın Al ve Misafir Akışı | Checkout & Guest Flow', () => {
        // TR: Satın Al butonuna tıkla (Çerez banner engelini aşmak için force kullanılır)
        // EN: Click Checkout button (Using force to bypass cookie banner overlays)
        CartPage.elements.checkoutBtn().should('exist').click({ force: true });

        // TR: Üye olmadan devam et seçeneğini kullan | EN: Select 'Continue as Guest'
        CartPage.elements.continueAsGuestBtn().should('exist').click({ force: true });

        // TR: Adres sayfası URL kontrolü | EN: Address page URL validation
        cy.url().should('include', '/order/address');
    });
});