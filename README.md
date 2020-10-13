# Swach-Backend

## ORG Routes
/org

- /login
Needs email and password
- /register
Needs Name, Email, Phone, Pwd, Confirm Pwds

## USER Routes
/user

- /login
- /register

# DB

User : { name, email, pwd, phone } + maybe more info
Post ; { image, desc, by(user) , location , time , cleanedOn , cleanedBy (org) }
Org : { name , [location] , email , mobile , moreWaysToContact/website , pwd }
