# Astrange

### Astrange is a social media app where you can secretly send anyone a message and if he replies, the message shows up in his profile, and you can post any secret or experience you want to share with everyone and communicate through emotions or comments.

## How to try the App

You can try the hosted version here : https://astrange-app.netlify.app.

## How to install it locally
- this project uses node.js so if you don't have it yet, you can install node.js from here first : [Node.js](https://nodejs.org/en/)

- then head to the directory you want to store the app, open the terminal and follow these instructions
```
git clone https://github.com/MomenGharib1/Astrange.
cd astrange
npm install
npm start
```
- open a new terminal

```
cd astrangeServer
npm install
npm start
```
- Now your default browser will open at (http://localhost:3000/) and you wiil see the sign-up page.

![image](https://user-images.githubusercontent.com/94765709/198329279-2e47395c-ad79-4359-814d-686cb6c7a155.png)

## tools used

- React
- express
- node.js
- mongoDB for storing messages, people and posts.
- firebase for storing pics.
- authorization using localStorage (stored in the user's browser)

## Important

unfortunately, if you wanted to try the app in your local machine, you will not have the access to the original database of the app as it uses my personal account, so you should make a mongoDB account and link that account to the project in the server.js file.
