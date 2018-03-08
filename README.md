# Simple API Server
Simple NodeJS and mongoDB API Server.

This api can handle for now:

* User login with email, google and facebook.
* User register with email, google and facebook.
* Access to your user information /user/me
* Access user info for specified id /user/:id
* Editable user info. You can set the editable fields by editing controllers/user/info/edit/schema
* Change user password if user is registered by email
* JWT for authentication with middleware to autorize user.
* Powerfull error handler with error-codes
* Json response parser
