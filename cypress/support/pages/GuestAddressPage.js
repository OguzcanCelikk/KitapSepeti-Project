/**
 * TR: Misafir adres formu sayfasındaki elementlerin tanımlandığı sınıftır.
 * EN: Class defining elements on the guest address form page.
 */
class GuestAddressPage {
    elements = {
        // --- TR: Giriş ve Sayfa Kontrolleri | EN: Login and Page Controls ---
        continueAsGuestBtn: () => cy.contains('button', /Üye Olmadan Devam Et/i),
        addressPageTitle: () => cy.contains(/Adres Bilgileri/i),

        // --- TR: Kişisel Bilgiler | EN: Personal Information ---
        fullNameInput: () => cy.get('#fullname'),
        emailInput: () => cy.get('#order-address-form [name="email"]'), 
        phoneInput: () => cy.get('#mobile_phone'),
        
        // --- TR: Adres Lokasyon Bilgileri (Dropdownlar) | EN: Address Location Info (Dropdowns) ---
        citySelect: () => cy.get('.city-container select'),
        townSelect: () => cy.get('.town-container select'),
        districtSelect: () => cy.get('.district-container select'),

        /**
         * TR: Önemli Alanlar - Adres Başlığı ve TC Kimlik No
         * EN: Important Fields - Address Title and ID Number
         */
        addressTitleInput: () => cy.get('#address_title'), 
        tcNoInput: () => cy.get('#tax_number'), 

        // --- TR: Adres Detayı | EN: Address Detail ---
        addressTextarea: () => cy.get('#order-address-form [name="address"]'),

        // --- TR: Butonlar ve Mesajlar | EN: Buttons and Messages ---
        saveAddressBtn: () => cy.get('button').contains('Adresi Kaydet'),
        errorMessage: () => cy.get('.popover-item.fade-in.inline')
    };
}

export default new GuestAddressPage();