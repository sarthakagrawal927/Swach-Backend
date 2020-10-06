# Swach-Backend

# Routes

- /org/register
- /register

- /org/login
- /login

- /posts/new
- /posts
- /posts/:id

# DB

User : { name, email, pwd, phone } + maybe more info
Post ; { image, desc, by(user) , location , time , cleanedOn , cleanedBy (org) }
Org : { name , [location] , email , mobile , moreWaysToContact/website , pwd }
