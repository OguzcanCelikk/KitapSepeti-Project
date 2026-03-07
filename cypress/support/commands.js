/**
 * TR: 'login' adında global bir Cypress komutu tanımlar. 
 * EN: Defines a global Cypress command named 'login'.
 * * TR: Bu komut, Page Object Model (POM) kullanmadan hızlıca giriş yapmanı sağlar.
 * EN: This command allows you to log in quickly without using Page Object Model (POM).
 */
Cypress.Commands.add('login', (email, password) => {
    
    // TR: E-posta alanını doğrula ve veriyi yaz | EN: Validate email field and type data
    cy.get('#user_email')
        .should('be.visible')
        .clear()
        .type(email);

    // TR: Şifre alanını doğrula ve veriyi yaz | EN: Validate password field and type data
    cy.get('#user_password')
        .should('be.visible')
        .clear()
        .type(password);

    // TR: 'Log in' metnini içeren butona tıkla | EN: Click the button containing 'Log in' text
    cy.contains('Log in').click(); 
});