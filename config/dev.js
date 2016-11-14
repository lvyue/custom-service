module.exports = Object.freeze({
    host: "cs.itgcs.wang",
    port: 9627,
    secret: "123qwe!@#",
    redis: {
        host: "192.168.1.113",
        port: 6379,
        db: 4,
        prefix: "cs:",
        ttl: 30 * 60,
        logErrors: true
    },
    cookie: {
        path: "/",
        httpOnly: true,
        secure: false,
        maxAge: 30 * 60 * 1000
    },
    session: {
        name: "CUSTOME_SERVICE_DEV_ID",
        saveUninitialized: true,
        resave: false,
    }
});