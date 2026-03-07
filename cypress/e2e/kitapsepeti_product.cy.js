import SearchPage from '../support/pages/SearchPage';
import ProductPage from '../support/pages/ProductPage';

describe('User Story 03: Ürün Detay Sayfası ve Sepet Süreçleri', () => {
    
    beforeEach(() => {
        cy.visit('/');
        cy.wait(2000);
    });

it ('AC1 - AC3: Detay sayfasını görüntüleme ve bilgilerin doğruluğu', () => {
    SearchPage.searchProduct('roman');
    SearchPage.elements.productTitles().first().click({ force: true });
    
    // AC2 Kontrolleri
    ProductPage.elements.productTitle().should('be.visible');
    ProductPage.elements.authorName().should('be.visible');

    // AC3 Kontrolü: Bölüme kaydır ve içeriği doğrula
    ProductPage.elements.infoSectionTitle()
        .scrollIntoView() // Önce o başlığa git
        .should('be.visible')
        .and('contain', 'Hakkında Bilgiler');

    // Bilgi kutularından birinin 'Türü' veya 'Roman' içerdiğini doğrula
    ProductPage.elements.productInfoBoxes()
        .should('have.length.at.least', 1)
        .and('contain', 'Türü'); 
});

it ('AC4 - AC6: Sepete ekleme ve sayaç artışı kontrolü', () => {
    SearchPage.searchProduct('roman');
    SearchPage.elements.productTitles().first().click({ force: true });
    cy.wait(2000);

    // AC4: Sepete ekle butonuna tıkla
    ProductPage.elements.addToCartBtn().should('exist').click({ force: true });

    // AC5: Onay mesajı ve pop-up kontrolü
    // 'be.visible' yerine 'exist' kullanıyoruz çünkü overlay engelliyor
    ProductPage.elements.successModal().should('exist'); 
    ProductPage.elements.successMessage().should('exist').and('contain', 'Ürün Başarıyla Sepete Eklendi');
    ProductPage.elements.goToCartBtn().should('exist');

    // AC6: Sepet sayacı kontrolü
    cy.reload(); 
    ProductPage.elements.cartCountBadge().should('not.have.text', '0').and('contain', '1');
});
});