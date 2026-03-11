import "allure-cypress";
// Uygulama tarafındaki (site kaynaklı) hataların testi bozmasını engeller
Cypress.on('uncaught:exception', (err, runnable) => {
    // google_trackConversion hatasını veya diğer uygulama hatalarını görmezden gel
    return false;
});