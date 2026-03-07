class ProductPage {
    /**
     * TR: Ürün detay sayfasındaki tüm interaktif elementlerin tanımlandığı bölümdür.
     * EN: Section where all interactive elements on the product detail page are defined.
     */
    elements = {
        // TR: AC1 & AC2: Temel Ürün Bilgileri | EN: AC1 & AC2: Basic Product Information
        productTitle: () => cy.get('#product-title'),
        authorName: () => cy.get('#model-title'),
        publisherName: () => cy.get('#brand-title'),
        productPrice: () => cy.get('.product-price'),
        
        // TR: AC3: Ürün Hakkında Bilgiler Bölümü | EN: AC3: About Product Information Section
        infoSectionTitle: () => cy.get('.info-title'), 
        productInfoBoxes: () => cy.get('.book-info-box'), 
        
        // TR: AC4: Sepete Ekle Butonu | EN: AC4: Add to Cart Button
        addToCartBtn: () => cy.get('#addToCartBtn'),

        // TR: AC5: Başarı Pop-up'ı ve İçindeki Elemanlar | EN: AC5: Success Pop-up and Its Elements
        successModal: () => cy.get('#modal-popup-cart'), 
        successMessage: () => cy.contains('span', 'Ürün Başarıyla Sepete Eklendi'),
        goToCartBtn: () => cy.get('#cart-popup-go-cart'),

        // TR: AC6: Sağ Üstteki Sepet Sayacı İkonu | EN: AC6: Cart Counter Icon at Top Right
        cartCountBadge: () => cy.get('.cart-soft-count')
    };
}

export default new ProductPage(); //