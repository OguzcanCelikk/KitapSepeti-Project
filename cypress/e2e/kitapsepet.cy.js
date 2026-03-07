import LoginPage from '../support/pages/Loginpage' //

describe('Kitapsepeti US01: Kullanıcı Girişi Tüm Senaryolar | User Login All Scenarios', () => {
    
    /**
     * TR: Her testten önce siteye gidilir ve engelleyici katmanlar (çerez vb.) gizlenir.
     * EN: Before each test, visit the site and hide interstitial overlays (cookies, etc.).
     */
    beforeEach(() => {
        LoginPage.visit(); //
        cy.get('body').then(($body) => {
            if ($body.find('.ccp---nb-interstitial-overlay').length > 0) {
                cy.get('.ccp---nb-interstitial-overlay').invoke('css', 'display', 'none');
            }
        });
    });

    /**
     * TR: AC1 & AC2: Giriş panelindeki tüm UI elemanlarının varlığını doğrular.
     * EN: AC1 & AC2: Verifies the existence of all UI elements in the login panel.
     */
    it('AC1 & AC2: UI Elemanlarının Kontrolü | UI Elements Validation', () => {
        LoginPage.elements.loginPanelTrigger().click({ force: true });
        LoginPage.elements.emailInput().should('exist');
        LoginPage.elements.passwordInput().should('exist');
        LoginPage.elements.loginSubmitBtn().should('exist');
        LoginPage.elements.forgotPasswordBtn().should('exist');
        LoginPage.elements.registerBtn().should('exist');
    });

    /**
     * TR: AC3 & AC4: Geçerli bilgilerle başarılı giriş ve profil doğrulaması.
     * EN: AC3 & AC4: Successful login with valid credentials and profile verification.
     */
    it('AC3 & AC4: Başarılı Giriş (Pozitif) | Successful Login (Positive)', () => {
        LoginPage.login('celik.oguzcan@hotmail.com', 'wSGYF8gMt2s.Ap');
        // TR: Hesap başlığının görünür olmasını bekle | EN: Wait for account header visibility
        cy.get('#header-account', { timeout: 15000 }).should('be.visible');
        cy.visit("/uye-girisi-sayfasi");
        cy.url({ timeout: 10000 }).should('include', '/uye-girisi-sayfasi'); 
    });

    /**
     * TR: AC5, AC6, AC7: Hatalı, geçersiz ve boş verilerle negatif giriş denemeleri.
     * EN: AC5, AC6, AC7: Negative login attempts with incorrect, invalid, and empty data.
     */
    it('AC5, AC6, AC7: Negatif Giriş Senaryoları | Negative Login Scenarios', () => {
        const scenarios = [
            { email: 'yanlis@mail.com', pass: '123', desc: 'AC5: Wrong Info' },
            { email: 'hatali_format', pass: '123', desc: 'AC6: Invalid Format' },
            { email: ' ', pass: ' ', desc: 'AC7: Empty Fields' }
        ];

        scenarios.forEach(sc => {
            LoginPage.login(sc.email, sc.pass);
            LoginPage.elements.errorMessage().should('exist')
                .and('contain', 'Giriş bilgileriniz hatalı.'); 
            cy.reload();
        });
    });

    /**
     * TR: AC8: Güvenlik duvarı engeline takılmamak için bu test pas geçilmiştir.
     * EN: AC8: This test is skipped to avoid production firewall IP blocking.
     */
    it.skip ('AC8: Kısıtlama Testi (Brute Force) | Rate Limiting Test', () => {
        Cypress._.times(12, () => {
            LoginPage.login('hacker@test.com', 'yanlis');
            cy.wait(1000)
        });
        cy.contains(/Çok fazla istek/i, { timeout: 20000 }).should('exist');
    });

    /**
     * TR: AC9: Şifre hatırlatma sayfasının ve gerekli alanların kontrolü.
     * EN: AC9: Validation of the password reminder page and required fields.
     */
    it('AC9: Şifremi Unuttum Akışı | Forgot Password Flow', () => {
        LoginPage.elements.loginPanelTrigger().click({ force: true });
        cy.contains('Şifremi Unuttum').click({ force: true });
        cy.url().should('include', 'uye-sifre-hatirlat'); 
        
        LoginPage.elements.forgotEmailInput().should('exist');
        LoginPage.elements.sendResetBtn().should('exist');
    });
});