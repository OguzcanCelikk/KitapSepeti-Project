class CartPage {
    elements = {
        // AC4: Miktar Kontrolleri
        quantityPlusBtn: () => cy.get('[id^="qty-plus"]'), 
        quantityMinusBtn: () => cy.get('[id^="qty-minus"]'),
        // HATAYI ÇÖZEN SATIR:
        quantityInput: () => cy.get('input[id^="qty"]'), 

        // AC5 & AC6: Silme İşlemleri
        removeSingleItemBtn: () => cy.get('.cart-item-delete'), 
        clearAllCartBtn: () => cy.get('[id^="clear-cart-btn-"]'),

        // AC3: Fiyat ve Toplamlar
        priceContainer: () => cy.get('#cart-price-container'),
        grandTotal: () => cy.get('#cart-price-container .fw-bold .text-right'),

        // AC7 & AC8: Durum Kontrolleri
        emptyCartMessage: () => cy.contains(/Sepetinizde ürün bulunmamaktadır/i),
        continueShoppingBtn: () => cy.contains('Alışverişe Devam Et'),
        checkoutBtn: () => cy.get('#cart-buy-btn'),
        continueAsGuestBtn: () => cy.contains('button', 'Üye Olmadan Devam Et')
    };
}
export default new CartPage();