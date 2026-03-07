class LoginPage {
    /**
     * TR: Giriş panelindeki tüm interaktif elementlerin tanımlandığı bölümdür.
     * EN: Section where all interactive elements in the login panel are defined.
     */
    elements = {
        loginPanelTrigger: () => cy.get('.member-login-btn'), // TR: AC1: Paneli açar | EN: Opens the panel
        emailInput: () => cy.get('#header-email'),           // TR: AC2: E-posta alanı | EN: Email field
        passwordInput: () => cy.get('#header-password'),     // TR: AC2: Şifre alanı | EN: Password field
        loginSubmitBtn: () => cy.get('#login-btn-322'),      // TR: AC2: Giriş butonu | EN: Login button
        rememberMe: () => cy.get('.header-remember'),        // TR: AC2: Beni hatırla | EN: Remember me
        
        // TR: Navigasyon ve Yardımcı Linkler | EN: Navigation and Helper Links
        forgotPasswordBtn: () => cy.contains('a', 'Şifremi Unuttum'), // AC9
        registerBtn: () => cy.contains('a', 'Kayıt Ol'),             // AC2
        errorMessage: () => cy.get('.popover-item'),                  // AC5
        
        // TR: Şifre Sıfırlama Alanları | EN: Password Reset Fields
        forgotEmailInput: () => cy.get('#header-email'),              // AC9  
        sendResetBtn: () => cy.get('#forgot-password-btn-292')        // AC9
    }

    /**
     * TR: Tanımlı ana sayfayı (baseUrl) ziyaret eder.
     * EN: Visits the defined homepage (baseUrl).
     */
    visit() {
        cy.visit('/'); //
    }

    /**
     * TR: E-posta ve şifre ile giriş yapma işlemini otomatize eden yardımcı metot.
     * EN: Helper method to automate the login process with email and password.
     */
    login(email, password) {
        // TR: Önce giriş panelini tetikle | EN: Trigger login panel first
        this.elements.loginPanelTrigger().click({ force: true });
        
        // TR: Veri varsa alanları doldur | EN: Fill fields if data is provided
        if(email) this.elements.emailInput().type(email, { force: true });
        if(password) this.elements.passwordInput().type(password, { force: true });
        
        // TR: Gönder butonuna tıkla | EN: Click submit button
        this.elements.loginSubmitBtn().click({ force: true });
    }
}

export default new LoginPage();