## RSSU Helper user script

### Step-by-step dev guide (violentmonkey):

1. Run `npm i` to install project dependencies.
2. Run `npm run build-watch` to compile the project. This will also run http-server that will serve compiled files over http.
3. Go to http://127.0.0.1:44000/rssu-helper.user.js, which will open a violentmonkey script installation screen.\
   Activate the "Track local file before this window is closed" option and confirm script installation.
4. Now, the project will be automatically recompiled & reloaded by violentmonkey as long as the script installation tab stays open.
5. Go to the page you're testing the script on and refresh it to see the updated script running.

Please note that some changes outside of the /src folder will not take effect, until you redo the steps 2 to 5.

### Full tampermonkey dev guide might be added later, but the basic principle is described [here](https://stackoverflow.com/a/55568502)
