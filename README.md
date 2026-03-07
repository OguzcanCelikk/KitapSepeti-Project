### $\color{red}{\text{Kitapsepeti Automation Project (POM)}}$
Bu proje, kitapsepeti.com web sitesi için hazırlanmış kapsamlı bir uçtan uca (E2E) test otomasyon çalışmasıdır. Proje, sürdürülebilirlik için Page Object Model (POM) yapısı kullanılarak inşa edilmiştir.

This project is a comprehensive end-to-end (E2E) test automation work for kitapsepeti.com. It is built using the Page Object Model (POM) structure for maintainability.

### $\color{red}{\text{Technologies | Teknolojiler}}$
Cypress 15.9.0: Core Automation Framework.

JavaScript: Programming Language.

Allure Reporting: Professional test reporting.

Page Object Model (POM): Design Pattern.

### $\color{red}{\text{Project Structure | Proje Yapısı}}$
Proje, her sayfa için ayrı sınıflar barındıran düzenli bir klasör yapısına sahiptir:

cypress/e2e/: Test scenarios (US01 - US06).

cypress/support/pages/: Page Object classes (Login, Cart, Payment, etc.).

cypress.config.js: Global configurations and Allure setup.

### $\color{red}{\text{Installation and Usage | Kurulum ve Kullanım}}$
1. Clone the project | Projeyi Klonlayın
```bash
git clone https://github.com/OguzcanCelikk/KitapSepeti-Project.git
cd KitapSepeti-Project
```
2. Install Dependencies | Bağımlılıkları Yükleyin
```Bash
npm install
```
3. Run Tests | Testleri Çalıştırın
Cypress UI Mode:

```Bash
npx cypress open
```
Terminal (Headless) Mode:

```Bash
npx cypress run
```
### $\color{red}{\text{Test Scenarios | Test Senaryoları}}$
US01: Login functionality (Positive/Negative) | Giriş fonksiyonları.

US02: Search & Filtering | Arama ve filtreleme.

US03: Product Details & Adding to Cart | Ürün detayları ve sepete ekleme.

US04: Cart Management | Sepet yönetimi ve miktar kontrolü.

US05: Full Checkout & Payment Validation | Tam ödeme ve kart doğrulama.

US06: Guest Checkout Flow | Misafir kullanıcı alışveriş akışı.
