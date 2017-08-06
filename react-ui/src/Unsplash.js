import Unsplash from 'unsplash-js';

// Unsplash initialisation with our app id and secret
const unsplash = new Unsplash({
    applicationId: "79cb373f58703c6c2f82ee7b0681289d556028a88aca21473eaeb2221d8b9f50",
    secret: "6cfa6e7516c6f3664eaf8671b27c6c74f54032f36af2c14d47a47c181b470a75",
    callbackUrl: "https://countin-down.herokuapp.com/"
});

const unsplashUTM = "?utm_source=Countdown%20App&utm_medium=referral&utm_campaign=api-credit";

export default unsplash;
export {
    unsplashUTM
};