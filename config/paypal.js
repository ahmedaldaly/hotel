const paypal = require('@paypal/checkout-server-sdk');

// تهيئة بيئة PayPal
function paypalClient() {
    let environment = new paypal.core.SandboxEnvironment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_SECRET
    );

    return new paypal.core.PayPalHttpClient(environment);
}

module.exports = paypalClient;
