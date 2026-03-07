import SearchPage from '../support/pages/SearchPage';
import ProductPage from '../support/pages/ProductPage';
import GuestAddressPage from '../support/pages/GuestAddressPage';

describe('User Story 06: Misafir Olarak Satın Alma Akışı', () => {

    it('AC1-AC6: Misafir Girişi ve Adres Formu Doğrulaması', () => {
        // --- AC1: Sepete Ekle ve Giriş Sayfasına Yönlendirme ---
        cy.visit('/');
        SearchPage.searchProduct('roman');
        SearchPage.elements.productTitles().first().click({ force: true });
        ProductPage.elements.addToCartBtn().click({ force: true });
        cy.wait(2000); 
        ProductPage.elements.goToCartBtn().click({ force: true });
        cy.get('#cart-buy-btn')
    .should('exist', { timeout: 10000 })
    .click({ force: true });

cy.url().should('include', '/siparis-uye-giris');


        // --- AC2: Misafir Seçeneği ---
GuestAddressPage.elements.continueAsGuestBtn().click({ force: true })
    .should('exist', { timeout: 10000 }) // Sayfanın yüklenmesi için zaman
    .click({ force: true });
    

        // --- AC3: Adres Formu Sayfası ---
        cy.url({ timeout: 15000 }).should('include', '/order/address');
// Başlığın görünmesi için Cypress'a 10 saniye ek süre
GuestAddressPage.elements.addressPageTitle()
    .should('be.visible', { timeout: 10000 });

// --- AC5: Negatif Test (Boş Form Doğrulaması) ---
// Form boşken kaydet diyoruz
GuestAddressPage.elements.saveAddressBtn().click({ force: true });

// Kırmızı popover hata mesajının çıktığını doğrula
GuestAddressPage.elements.errorMessage()
    .should('be.visible')
    .and('contain', 'Lütfen bu alanı doldurunuz');

// --- AC4 & AC6: Başarılı Form Doldurma ---
GuestAddressPage.elements.fullNameInput().type('Test Misafir', { force: true });
GuestAddressPage.elements.emailInput()
    .clear({ force: true })
    .type('testguest@mail.com', { force: true });

// --- KRİTİK ADIM: Dropdown ----
// Şehir seçildikten sonra ilçenin yüklenmesi için kısa bir bekle
GuestAddressPage.elements.citySelect().select('İstanbul', { force: true });
cy.wait(2000); // API'den ilçelerin gelmesini bekliyoruz

GuestAddressPage.elements.townSelect().select('Kadıköy', { force: true });
cy.wait(2000); // API'den mahallelerin gelmesini bekliyoruz

GuestAddressPage.elements.districtSelect().select('ERENKÖY MAH', { force: true });

// Adres ve Telefon girişi
GuestAddressPage.elements.addressTextarea().type('Test Mahallesi, Deneme Sokak No:1 Daire:2', { force: true });
GuestAddressPage.elements.phoneInput().type('5554443322', { force: true });

// --- AC6: Başarılı Form Gönderimi ve Ödeme Sayfasına Geçiş ---
GuestAddressPage.elements.saveAddressBtn().click({ force: true });

// Ödeme sayfasına ulaştığımızı doğrula
cy.url({ timeout: 15000 }).should('include', '/order/payment');
    });
});