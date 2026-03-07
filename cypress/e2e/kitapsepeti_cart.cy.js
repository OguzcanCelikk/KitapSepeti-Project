import SearchPage from '../support/pages/SearchPage';
import ProductPage from '../support/pages/ProductPage';
import CartPage from '../support/pages/CartPage';

describe('User Story 04: Sepet Yönetimi ve Kontrolü', () => {
    
    beforeEach(() => {
        // Her testten önce sepete bir ürün ekle ve sepet sayfasına git
        cy.visit('/');
        SearchPage.searchProduct('roman');
        SearchPage.elements.productTitles().first().click({ force: true });
        ProductPage.elements.addToCartBtn().click({ force: true });
        cy.wait(2000);
        ProductPage.elements.goToCartBtn().click({ force: true }); // AC1
    });

    it('AC2 - AC4: Ürün bilgileri, miktar artırma ve fiyat güncelleme', () => {
        // Ürün bilgilerini doğrula
        CartPage.elements.quantityInput().should('have.value', '1');
        
        // Başlangıç tutarını al
        CartPage.elements.grandTotal().invoke('text').then((oldPrice) => {
            // Miktarı artır (+)
            CartPage.elements.quantityPlusBtn().first().click({ force: true });
            cy.wait(3000); // Fiyatın hesaplanması için süre tanı
            
            // Fiyatın güncellendiğini doğrula (AC4)
            CartPage.elements.grandTotal().invoke('text').should('not.eq', oldPrice);
        });
    });

    it('AC6 & AC7: Sepeti Tamamen Temizleme ve Boş Sepet Mesajı', () => {
        // Sepeti Temizle butonuna bas (AC6)
        CartPage.elements.clearAllCartBtn().click({ force: true });

        // Sayfa yenilendikten sonra boş sepet uyarısını ve devam et butonunu doğrula (AC7)
        CartPage.elements.emptyCartMessage({ timeout: 15000 })
            .should('be.visible');
            
        CartPage.elements.continueShoppingBtn().should('be.visible');
});
it('AC 8 & AC 10: Satın Al süreci ve Adres sayfasına yönlendirme', () => {
    // 1. Sepet sayfasındaki 'Satın Al' butonuna tıkla
    // 'be.visible' yerine 'exist' çünkü çerez banner'ı kapatıyor..
    CartPage.elements.checkoutBtn()
        .should('exist') 
        .click({ force: true }); // Overlay engelini aşmak için 'force: true' kullan

    // 2. Giriş sayfasında 'Üye Olmadan Devam Et' butonuna tıkla
    // Bu aşamada da overlay çıkabilir, 'exist' ve 'force: true' ile devam et
    CartPage.elements.continueAsGuestBtn()
        .should('exist')
        .click({ force: true });

    // 3. Adres sayfasına ulaştığımızı doğrula
    cy.url().should('include', '/order/address');
});
}); 