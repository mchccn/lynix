module.exports = {
    future: {
        webpack5: true,
    },
    assetPrefix: process.env.NODE_ENV === "production" ? "/lynix/" : "",
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
};
