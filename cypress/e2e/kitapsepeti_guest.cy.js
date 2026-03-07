import SearchPage from '../support/pages/SearchPage'; //
import ProductPage from '../support/pages/ProductPage';
import GuestAddressPage from '../support/pages/GuestAddressPage';

describe('User Story 06: Misafir Olarak Satın Alma Akışı | Guest Checkout Flow', () => {

    it('AC1-AC6: Misafir Girişi ve Adres Formu Doğrulaması | Guest Login & Address Form Validation', () => {
        // --- AC1: Sepete Ekle ve Giriş Sayfasına Yönlendirme | Add to Cart & Redirect ---
        cy.visit('/'); //
        SearchPage.searchProduct('roman');
        SearchPage.elements.productTitles().first().click({ force: true });
        ProductPage.elements.addToCartBtn().click({ force: true });
        cy.wait(2000); 
        ProductPage.elements.goToCartBtn().click({ force: true });
        
        // TR: Sepet onay butonu kontrolü | EN: Validate checkout button in cart
        cy.get('#cart-buy-btn').should('exist', { timeout: 10000 }).click({ force: true });
        cy.url().should('include', '/siparis-uye-giris');

        // --- AC2: Misafir Seçeneği | Continue as Guest ---
        // TR: Üye olmadan devam et butonuna tıkla | EN: Click continue as guest button
        GuestAddressPage.elements.continueAsGuestBtn()
            .should('exist', { timeout: 10000 })
            .click({ force: true });

        // --- AC3: Adres Formu Sayfası | Address Form Page ---
        // TR: Adres sayfası URL ve başlık doğrulaması | EN: Validate address page URL and title
        cy.url({ timeout: 15000 }).should('include', '/order/address');
        GuestAddressPage.elements.addressPageTitle().should('be.visible', { timeout: 10000 });

        // --- AC5: Negatif Test (Boş Form Doğrulaması) | Negative Test (Empty Form) ---
        // TR: Form boşken hata mesajlarını kontrol et | EN: Verify error messages on empty form submission
        GuestAddressPage.elements.saveAddressBtn().click({ force: true });
        GuestAddressPage.elements.errorMessage()
            .should('be.visible')
            .and('contain', 'Lütfen bu alanı doldurunuz');

        // --- AC4 & AC6: Başarılı Form Doldurma | Positive Form Completion ---
        // TR: İsim ve E-posta girişi | EN: Enter Name and Email
        GuestAddressPage.elements.fullNameInput().type('Test Misafir', { force: true });
        GuestAddressPage.elements.emailInput().clear({ force: true }).type('testguest@mail.com', { force: true });

        // TR: Bağımlı Dropdown yönetimi (Şehir > İlçe > Mahalle)
        // EN: Handling Dependent Dropdowns (City > Town > District)
        GuestAddressPage.elements.citySelect().select('İstanbul', { force: true });
        cy.wait(2000); // TR: İlçelerin yüklenmesini bekle | EN: Wait for towns to load via API

        GuestAddressPage.elements.townSelect().select('Kadıköy', { force: true });
        cy.wait(2000); // TR: Mahallelerin yüklenmesini bekle | EN: Wait for districts to load

        GuestAddressPage.elements.districtSelect().select('ERENKÖY MAH', { force: true });

        // TR: Adres ve Telefon girişi | EN: Enter Address and Phone
        GuestAddressPage.elements.addressTextarea().type('Test Mah. Deneme Sok. No:1', { force: true });
        GuestAddressPage.elements.phoneInput().type('5554443322', { force: true });

        // --- AC6: Başarılı Form Gönderimi | Successful Submission ---
        // TR: Formu onayla ve ödeme sayfasına geçişi doğrula | EN: Save address and verify redirect to payment
        GuestAddressPage.elements.saveAddressBtn().click({ force: true });
        cy.url({ timeout: 15000 }).should('include', '/order/payment');
    });
});