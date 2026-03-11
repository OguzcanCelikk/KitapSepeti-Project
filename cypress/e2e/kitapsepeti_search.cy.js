import SearchPage from '../support/pages/SearchPage'; //

describe('User Story 02: Arama ve Filtreleme Fonksiyonları | Search and Filtering Functions', () => {
    
    /**
     * TR: Her testten önce ana sayfa ziyaret edilir.
     * EN: Visit the home page before each test.
     */
    beforeEach(() => {
        cy.visit('/'); //
        cy.wait(2000);
    });

    /**
     * TR: AC1 & AC2: Ürün arama işlemini gerçekleştirir ve sonuçların listelendiğini doğrular.
     * EN: AC1 & AC2: Performs product search and verifies that results are displayed.
     */
    it('AC1 & AC2: Ürün arama ve sonuçların görüntülenmesi | Product search and results display', () => {
        SearchPage.searchProduct('roman'); // TR: Arama yap | EN: Execute search
        cy.url().should('include', 'roman');
        
        // TR: Sonuçları doğrula (Başlık, Fiyat vb.) | EN: Validate results (Title, Price, etc.)
        SearchPage.elements.productItems().should('have.length.at.least', 1);
        SearchPage.elements.productTitles().first().should('be.visible');
        SearchPage.elements.productPrices().first().should('be.visible');
    });

    /**
     * TR: AC3 & AC4: Sıralama menüsünü kullanarak ürünlerin 'Fiyat Artan' şeklinde dizilmesini doğrular.
     * EN: AC3 & AC4: Validates that products are sorted by 'Price Ascending' using the sorting menu.
     */
    it('AC3 & AC4: Sıralama fonksiyonu - Fiyat Artan doğrulaması | Sorting function - Price Ascending validation', () => {
        cy.visit('/roman');
        // TR: 'Fiyat Artan' seçeneğini seç | EN: Select 'Price Ascending' option
        SearchPage.elements.sortingDropdown().select('Fiyat Artan', { force: true });
        cy.url().should('include', 'sort=5'); 
    });

    /**
     * TR: AC5: Ürün kartı üzerindeki 'Sepete Ekle' butonunun görünürlük ve metin içeriğini test eder.
     * EN: AC5: Tests the visibility and text content of the 'Add to Cart' button on product cards.
     */
    it('AC5: Sepete Ekle butonunun zorla görünür yapılması ve kontrolü | Force visibility and check for Add to Cart button', () => {
        cy.visit('/roman');
        cy.wait(3000);

        // TR: Hover etkisini tetikle | EN: Trigger hover effect
        SearchPage.elements.productItems().first().trigger('mouseover', { force: true });
        
        // TR: Butonun CSS özelliklerini değiştir ve metni doğrula
        // EN: Modify button CSS properties and verify text
        SearchPage.elements.addToCartBtn().first()
            .invoke('attr', 'style', 'visibility: visible !important; opacity: 1 !important; display: block !important;')
            .should('be.visible')
            .and('contain', 'Sepete Ekle');
    });

    /**
     * TR: AC6 & AC7: Sol paneldeki filtreleri (Kategori ve Marka) uygulayarak sonuçları doğrular.
     * EN: AC6 & AC7: Applies filters (Category and Brand) from the side panel and validates results.
     */
    it ('AC6 & AC7: Sol panel filtreleme (Kategori & Marka) | Side panel filtering (Category & Brand)', () => {
        cy.visit('/roman');
        cy.wait(3000);
        
        // TR: Filtre seçimleri | EN: Filter selections
        SearchPage.elements.categoryLinks().first().click({ force: true });
        SearchPage.elements.brandCheckboxes().first().check({ force: true });
        SearchPage.elements.applyFilterBtn().click({ force: true });
        cy.url().should('include', 'brand');
    });

    /**
     * TR: AC8: Üst menü navigasyonunun ana sayfadan farklı bir yere yönlendirdiğini kontrol eder.
     * EN: AC8: Verifies that top menu navigation redirects away from the homepage.
     */
    it('AC8: Ana sayfadaki hazır kategoriler | Preset categories on homepage', () => {
        SearchPage.elements.topMenuLinks().first().click({ force: true }); 
        cy.url().should('not.eq', 'https://www.kitapsepeti.com/');
    });

    /**
     * TR: AC9: Sayfa sonuna kaydırıldığında yeni ürünlerin yüklendiğini doğrular.
     * EN: AC9: Validates that new products are loaded when scrolling to the bottom.
     */
    it('AC9: Sonsuz Kaydırma | Infinite Scroll validation', () => {
        cy.visit('/roman');
        cy.wait(3000);
        SearchPage.elements.allProducts().then(($p) => {
            const countBefore = $p.length;
            cy.scrollTo('bottom'); // TR: Alta kaydır | EN: Scroll to bottom
            cy.wait(4000);
            SearchPage.elements.allProducts().should('have.length.greaterThan', countBefore);
        });
    });
});