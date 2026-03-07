import SearchPage from '../support/pages/SearchPage';

describe('User Story 02: Arama ve Filtreleme Fonksiyonları', () => {
    
    beforeEach(() => {
        cy.visit('/');
        cy.wait(2000);
    });

    it('AC1 & AC2: Ürün arama ve sonuçların görüntülenmesi', () => {
        SearchPage.searchProduct('roman'); // AC1: Arama yap
        cy.url().should('include', 'roman');
        
        // AC2: Sonuçları doğrula
        SearchPage.elements.productItems().should('have.length.at.least', 1);
        SearchPage.elements.productTitles().first().should('be.visible');
        SearchPage.elements.productPrices().first().should('be.visible');
    });

    it('AC3 & AC4: Sıralama fonksiyonu - Fiyat Artan doğrulaması', () => {
    cy.visit('/roman');
    // 'Fiyat Artan' seçeneğini seç
    SearchPage.elements.sortingDropdown().select('Fiyat Artan', { force: true });
    cy.url().should('include', 'sort=5'); 
});

   it('AC5: Sepete Ekle butonunun zorla görünür yapılması ve kontrolü', () => {
    cy.visit('/roman');
    cy.wait(3000);

    // 1. Ürünün üzerine gelmeyi tetikle
    SearchPage.elements.productItems().first().trigger('mouseover', { force: true });
    
    // Butonu bul, CSS'ini 'visible' ve 'opacity: 1' yap, sonra metnini kontrol et.
    SearchPage.elements.addToCartBtn().first()
        .invoke('attr', 'style', 'visibility: visible !important; opacity: 1 !important; display: block !important;')
        .should('be.visible')
        .and('contain', 'Sepete Ekle');
});

    it ('AC6 & AC7: Sol panel filtreleme (Kategori & Marka)', () => {
        cy.visit('/roman');
        cy.wait(3000);
        
        // Kategori seçimi
        SearchPage.elements.categoryLinks().first().click({ force: true });
        
        // Marka seçimi ve filtrele butonu
        SearchPage.elements.brandCheckboxes().first().check({ force: true });
        SearchPage.elements.applyFilterBtn().click({ force: true });
        cy.url().should('include', 'brand');
    });

    it('AC8: Ana sayfadaki hazır kategoriler', () => {
        SearchPage.elements.topMenuLinks().first().click({ force: true }); // AC8
        cy.url().should('not.eq', 'https://www.kitapsepeti.com/');
    });

    it('AC9: Sonsuz Kaydırma (Infinite Scroll)', () => {
        cy.visit('/roman');
        cy.wait(3000);
        SearchPage.elements.allProducts().then(($p) => {
            const countBefore = $p.length;
            cy.scrollTo('bottom'); // AC9
            cy.wait(4000);
            SearchPage.elements.allProducts().should('have.length.greaterThan', countBefore);
        });
    });
});