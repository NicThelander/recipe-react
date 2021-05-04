# recipe-react
An Expo React Native mobile app that uses the Spoonacular api. You can find and save recipes for later.

instructions to run:
step 1: go to https://github.com/learningConstantly/recipe-app-server and follow the instructions to set up the express api and ngrok so you can access the database. <br />
step 2: cd into the recipe-react folder and run "npm install", it will run through setting up the required files and will prompt you to install Expo globally, please accept this and if there are any deprecation warnings that's okay. <br />
step 3: type "npm start" and it will boot up the expo-cli and open a browser tab with their ui, you can scan the QR code with the expo app on your phone or use an emulator to get access to the app. <br />

PS: I've included my spoonacular api keys within the file but they only allow for 150 searches a day so you may need to swap from API_KEY1 to one of the others (API_KEY2, API_KEY3) within the recipe-react/src/screens/RecipeScreen.js and recipe-react/src/hooks/useResults.js or create your own account at https://spoonacular.com/food-api/console#Dashboard and include your own api key. <br />

I hope you enjoy it :)
