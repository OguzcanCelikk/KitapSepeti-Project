import SearchPage from '../support/pages/SearchPage'; //
import ProductPage from '../support/pages/ProductPage';

describe('User Story 03: Ürün Detay Sayfası ve Sepet Süreçleri | Product Detail Page and Cart Processes', () => {
    
    /**
     * TR: Her testten önce ana sayfa ziyaret edilir.
     * EN: Visit the home page before each test.
     */
    beforeEach(() => {
        cy.visit('/'); //
        cy.wait(2000);
    });

    /**
     * TR: AC1 - AC3: Ürün detay sayfasındaki başlık, yazar ve teknik bilgilerin doğruluğunu kontrol eder.
     * EN: AC1 - AC3: Validates the accuracy of title, author, and technical info on the product detail page.
     */
    it('AC1 - AC3: Detay Sayfası ve Bilgi Doğruluğu | Detail Page and Info Accuracy', () => {
        SearchPage.searchProduct('roman');
        SearchPage.elements.productTitles().first().click({ force: true });
        
        // TR: Başlık ve yazar görünürlüğü | EN: Visibility of title and author
        ProductPage.elements.productTitle().should('be.visible');
        ProductPage.elements.authorName().should('be.visible');

        // TR: Bilgi bölümüne kaydır ve içeriği doğrula | EN: Scroll to info section and verify content
        ProductPage.elements.infoSectionTitle()
            .scrollIntoView() 
            .should('be.visible')
            .and('contain', 'Hakkında Bilgiler');

        // TR: Teknik detay kutularını kontrol et | EN: Check technical detail boxes
        ProductPage.elements.productInfoBoxes()
            .should('have.length.at.least', 1)
            .and('contain', 'Türü'); 
    });

    /**
     * TR: AC4 - AC6: Sepete ekleme işlemi, onay mesajı ve sepet sayacının artışını doğrular.
     * EN: AC4 - AC6: Validates adding to cart, success message, and cart badge increment.
     */
    it('AC4 - AC6: Sepete Ekleme ve Sayaç Kontrolü | Add to Cart and Counter Validation', () => {
        SearchPage.searchProduct('roman');
        SearchPage.elements.productTitles().first().click({ force: true });
        cy.wait(2000);

        // TR: Sepete ekle butonuna tıkla | EN: Click add to cart button
        ProductPage.elements.addToCartBtn().should('exist').click({ force: true });

        // TR: Başarı mesajı ve pop-up kontrolü | EN: Success message and pop-up validation
        ProductPage.elements.successModal().should('exist'); 
        ProductPage.elements.successMessage().should('exist').and('contain', 'Ürün Başarıyla Sepete Eklendi');
        ProductPage.elements.goToCartBtn().should('exist');

        // TR: Sepet sayacı kontrolü (Sayfa yenilendikten sonra) | EN: Cart badge check (After reload)
        cy.reload(); 
        ProductPage.elements.cartCountBadge().should('not.have.text', '0').and('contain', '1');
    });
});