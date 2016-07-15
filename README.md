# Activity Tracker

A simple tool to log application, file and project (not yet, but coming soon) usage.

## Installation

### OSX 10.11 (Untested in prior versions of OSX, YMMV)

- Install [node.js](https://nodejs.org/en/download/package-manager/#osx) version 5.12.0+
- Open Terminal (/Applications/Utilities/Terminal.app)
- Run `cd 'PATH_TO_REPO/src/client/osx'`
	- Replace `PATH_TO_REPO` with the actual path where you cloned this repo to on your local system
- Run `npm run start:osx`
- To get file and project logging to work, you'll need to give "Terminal" [https://support.apple.com/en-za/HT202866](access for assistive devices), by: opening System Preferences > "Security & Privacy" > "Privacy" tab
    - Click the little lock icon in the bottom left corner
    - Type in your password
    - In the right hand side panel you should see a list of applications
    - Find "Terminal" and select the checkbox 
    
![Terminal - access for assistive devices - 1](https://github.com/barryels/activity-tracker/raw/master/doc/osx/installation/terminal-eada/1.png)

![Terminal - access for assistive devices - 2](https://github.com/barryels/activity-tracker/raw/master/doc/osx/installation/terminal-eada/2.png)

![Terminal - access for assistive devices - 3](https://github.com/barryels/activity-tracker/raw/master/doc/osx/installation/terminal-eada/3.png)
    
- Go to `PATH_TO_REPO/src/data/` and you'll see a newly created text file with all your logs :)


## TODO

- Add support for getting project name from window title, by:
  - Searching up the file system tree from the active file until it finds, either:
    - A `.git` dir, then reading the `description` file, if empty, then the parent directory name where the `.git` dir resides
    - A `package.json` file, reading the `name` property, if empty, then the parent directory name
    - A `composer.json` file, reading the `name` property, if empty, then the parent directory name
    - A `bower.json` file, reading the `name` property, if empty, then the parent directory name
- Add config file support
- Build a GUI with nice graphs and stuff
- Add support for Windows and Linux