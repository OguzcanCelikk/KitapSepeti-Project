/**
 * TR: Ürün detay sayfasındaki elementlerin tanımlandığı sınıftır.
 * EN: Class defining elements on the product detail page.
 */
class ProductPage {
    elements = {
        // --- TR: Temel Ürün Bilgileri | EN: Basic Product Information ---
        productTitle: () => cy.get('#product-title'),
        authorName: () => cy.get('#model-title'),
        publisherName: () => cy.get('#brand-title'),
        productPrice: () => cy.get('.product-price'),
        
        // --- TR: Ürün Detayları Bölümü | EN: Product Details Section ---
        infoSectionTitle: () => cy.get('.info-title'), 
        productInfoBoxes: () => cy.get('.book-info-box'), 
        
        // --- TR: Sepete Ekleme İşlemi | EN: Add to Cart Interaction ---
        addToCartBtn: () => cy.get('#addToCartBtn'),

        /**
         * TR: Başarı Pop-up'ı ve İçindeki Elemanlar
         * EN: Success Pop-up and Its Elements
         */
        successModal: () => cy.get('#modal-popup-cart'), 
        successMessage: () => cy.contains('span', 'Ürün Başarıyla Sepete Eklendi'),

        /** * TR: DÜZELTİLEN ALAN - ID bazen geç geldiği için 'Sepete Git' metni üzerinden arıyoruz.
         * EN: REFIXED AREA - Searching via 'Sepete Git' text as ID can be delayed.
         */
        goToCartBtn: () => cy.contains('a', 'Sepete Git', { timeout: 10000 }),

        // --- TR: Global Sepet Sayacı | EN: Global Cart Counter ---
        cartCountBadge: () => cy.get('.cart-soft-count')
    };
}

export default new ProductPage();