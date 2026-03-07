class SearchPage {
    elements = {
        // AC1 & AC2: Arama ve Sonuçlar
        searchBox: () => cy.get('#live-search', { timeout: 20000 }),
        searchBtn: () => cy.get('#live-search-btn'),
        productItems: () => cy.get('.product-item'),
        productTitles: () => cy.get('.product-title'),
        productPrices: () => cy.get('.current-price'),
        productImages: () => cy.get('.image-inner img'),

        // AC3 - AC6: Sıralama ve Sepet
        sortingDropdown: () => cy.get('#sort'),
        addToCartBtn: () => cy.get('.add-to-cart-btn'),

        // AC7: Sol Filtreleme Paneli
        categoryLinks: () => cy.get('[id^="filter-categories-"]'),
        brandCheckboxes: () => cy.get('[data-filter-search*="brand"] input[type="checkbox"]'),
        modelCheckboxes: () => cy.get('[data-filter-search*="model"] input[type="checkbox"]'),
        applyFilterBtn: () => cy.contains('button', 'Seçimi Filtrele'),

        // AC8 & AC9: Menü ve Kaydırma
        topMenuLinks: () => cy.get('#main-menu a[id^="menu-"]').filter(':visible'),
        allProducts: () => cy.get('.product-item')
    };

    searchProduct(name) {
        this.elements.searchBox().should('exist').clear({ force: true }).type(name, { force: true });
        this.elements.searchBtn().click({ force: true });
    }
}
export default new SearchPage();