# rave-react-express

This is a project to test the use of flutterwave's api for visa card and Zambia's MTN mobile-money payments.
The project is built with react and express.

## how to get started

### step 1
clone the repository and run `npm install` in the root directory and the client folder.

### step 2
you would need test api keys. To get them follow the link [here.](https://developer.flutterwave.com/docs/api-keys)
Once you are done signing up you will be greeted with a dashboard.
The test api keys should be in ["settings" then "api"](https://developer.flutterwave.com/changelog/how-to-get-your-staging-keys-from-the-rave-sandbox-environment).
Copy the "Public Key" and "Secret Key" and add them to your .env file.
You will also need to include the rave charge test endpoint `https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/charge` to your .env file.

### step 3

Now that everything is set up, you can run `npm run dev` in the root directory to start the server and application. The react app runs on port 3000 and server on port 5000. File changes reloads the application.

To test visa card payments, try the "Test VisaCard 3D-Secure Authentication" card under [test cards](https://developer.flutterwave.com/docs/test-cards)
At the moment, the MTN mobile-money payment does not work in the test environment but works when live.


## let's go live!
You will need to create an account with [flutterwave](https://rave.flutterwave.com/signup).
Similar to the flutterwave rave sandbox, the api keys will be found in "settings" then "api".
Copy the "Public Key" and "Secret Key" and add them to your .env file.
You will also need to include the rave charge live endpoint `https://api.ravepay.co/flwv3-pug/getpaidx/api/charge` to your .env file.

That is all! You can now receive real payments for visa card and Zambia's MTN Mobile Money. You can learn more on the flutterwave rave platform [here](https://developer.flutterwave.com/docs)
