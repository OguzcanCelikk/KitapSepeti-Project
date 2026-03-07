class SearchPage {
    /**
     * TR: Arama sonuçları ve filtreleme panelindeki tüm elementlerin tanımlandığı bölümdür.
     * EN: Section where all elements in the search results and filtering panel are defined.
     */
    elements = {
        // TR: AC1 & AC2: Arama ve Sonuçlar | EN: AC1 & AC2: Search and Results
        searchBox: () => cy.get('#live-search', { timeout: 20000 }),
        searchBtn: () => cy.get('#live-search-btn'),
        productItems: () => cy.get('.product-item'),
        productTitles: () => cy.get('.product-title'),
        productPrices: () => cy.get('.current-price'),
        productImages: () => cy.get('.image-inner img'),

        // TR: AC3 - AC6: Sıralama ve Sepet | EN: AC3 - AC6: Sorting and Cart
        sortingDropdown: () => cy.get('#sort'),
        addToCartBtn: () => cy.get('.add-to-cart-btn'),

        // TR: AC7: Sol Filtreleme Paneli | EN: AC7: Left Filtering Panel
        categoryLinks: () => cy.get('[id^="filter-categories-"]'),
        brandCheckboxes: () => cy.get('[data-filter-search*="brand"] input[type="checkbox"]'),
        modelCheckboxes: () => cy.get('[data-filter-search*="model"] input[type="checkbox"]'),
        applyFilterBtn: () => cy.contains('button', 'Seçimi Filtrele'),

        // TR: AC8 & AC9: Menü ve Kaydırma | EN: AC8 & AC9: Menu and Scrolling
        topMenuLinks: () => cy.get('#main-menu a[id^="menu-"]').filter(':visible'),
        allProducts: () => cy.get('.product-item')
    };

    /**
     * TR: Ürün arama işlemini gerçekleştiren yardımcı metot.
     * EN: Helper method that performs the product search operation.
     */
    searchProduct(name) {
        // TR: Önce alanı temizler, sonra metni yazar ve butona tıklar
        // EN: First clears the field, then types the text and clicks the button
        this.elements.searchBox()
            .should('exist')
            .clear({ force: true })
            .type(name, { force: true });
            
        this.elements.searchBtn().click({ force: true });
    }
}

export default new SearchPage(); //