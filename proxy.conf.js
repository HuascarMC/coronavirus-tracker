const PROXY_CONFIG = [
    {
        context: ["/", "/covid/trend", "/covid/report", "/covid/pomber"],
        target: "http://localhost:3000",
        secure: false
    }
];

module.exports = PROXY_CONFIG;
