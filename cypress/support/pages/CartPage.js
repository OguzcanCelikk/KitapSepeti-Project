class CartPage {
    /**
     * TR: Sepet sayfasındaki tüm interaktif elementlerin tanımlandığı bölümdür.
     * EN: Section where all interactive elements on the cart page are defined.
     */
    elements = {
        // TR: AC4: Miktar Kontrolleri | EN: AC4: Quantity Controls
        quantityPlusBtn: () => cy.get('[id^="qty-plus"]'), 
        quantityMinusBtn: () => cy.get('[id^="qty-minus"]'),
        
        // TR: Input alanını yakalayan kritik seçici | EN: Critical selector capturing the input field
        quantityInput: () => cy.get('input[id^="qty"]'), 

        // TR: AC5 & AC6: Silme İşlemleri | EN: AC5 & AC6: Deletion Operations
        removeSingleItemBtn: () => cy.get('.cart-item-delete'), 
        clearAllCartBtn: () => cy.get('[id^="clear-cart-btn-"]'),

        // TR: AC3: Fiyat ve Toplamlar | EN: AC3: Price and Totals
        priceContainer: () => cy.get('#cart-price-container'),
        grandTotal: () => cy.get('#cart-price-container .fw-bold .text-right'),

        // TR: AC7 & AC8: Durum Kontrolleri | EN: AC7 & AC8: Status Controls
        emptyCartMessage: () => cy.contains(/Sepetinizde ürün bulunmamaktadır/i),
        continueShoppingBtn: () => cy.contains('Alışverişe Devam Et'),
        checkoutBtn: () => cy.get('#cart-buy-btn'),
        
        // TR: Misafir girişi için buton | EN: Button for guest checkout
        continueAsGuestBtn: () => cy.contains('button', 'Üye Olmadan Devam Et')
    };
}

export default new CartPage(); //