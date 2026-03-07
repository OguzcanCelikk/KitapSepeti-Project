class GuestAddressPage {
    /**
     * TR: Misafir adres formu sayfasındaki tüm interaktif elementlerin tanımlandığı bölümdür.
     * EN: Section where all interactive elements on the guest address form page are defined.
     */
    elements = {
        // TR: Giriş ve Başlık Kontrolleri | EN: Login and Title Controls
        continueAsGuestBtn: () => cy.contains('button', /Üye Olmadan Devam Et/i),
        addressPageTitle: () => cy.contains(/Adres Bilgileri/i),

        // TR: AC4: Kişisel Bilgi Girişleri | EN: AC4: Personal Info Inputs
        fullNameInput: () => cy.get('#fullname'),
        emailInput: () => cy.get('#order-address-form [name="email"]'), 
        phoneInput: () => cy.get('#mobile_phone'),
        
        // TR: Lokasyon Seçimleri (Dropdown) | EN: Location Selections (Dropdowns)
        citySelect: () => cy.get('.city-container select'),
        townSelect: () => cy.get('.town-container select'),
        districtSelect: () => cy.get('.district-container select'),
        
        // TR: Detaylı Adres Alanı | EN: Detailed Address Area
        addressTextarea: () => cy.get('#order-address-form [name="address"]'),

        // TR: Form Onay ve Hata Mesajları | EN: Form Submission and Error Messages
        saveAddressBtn: () => cy.get('button').contains('Adresi Kaydet'),
        errorMessage: () => cy.get('.popover-item.fade-in.inline')
    };
}

export default new GuestAddressPage(); //