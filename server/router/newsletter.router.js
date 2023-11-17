const express = require("express")
const NewsletterControllers = require("../controllers/newsletter.controllers")
const md_auth = require("../middlewares/authenticated")

const api = express.Router()

api.post("/newsletter", NewsletterControllers.suscribeEmail)
api.get("/newsletter", [md_auth.asureAuth], NewsletterControllers.getEmails)
api.delete("/newsletter/:id", [md_auth.asureAuth], NewsletterControllers.deleteEmail)
module.exports = api