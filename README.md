# Activity Tracker

A simple tool to log application, file and project (not yet, but coming soon) usage. Only runs on OS X currently, will work on adding Windows and Linux support, probably via Python (pull requests welcome).

The client is a simple AppleScript that gets app and window title information from the OS (by default it polls every second, but only calls the server if the application and window title have changed since the last call)

The server is a Node.js app that receives the app and window title data and appends it to a log file. Some basic intelligence will later be added to either the server, or the dashboard GUI, to pull information out of the window title, such as the project name, programming lanuage used, etc.

The dashboard GUI is on its way.

## Installation

### OS X 10.11 (Untested in prior versions of OS X, YMMV)

- Install [node.js](https://nodejs.org/en/download/package-manager/#osx) version 5.12.0+
- Open Terminal (/Applications/Utilities/Terminal.app)
- Run `cd 'PATH_TO_REPO/src/client/osx'`
	- Replace `PATH_TO_REPO` with the actual path where you cloned this repo to on your local system
- Run `npm install`
- Wait...
- Run `npm run start:osx`
- To get file and project logging to work, you'll need to give "Terminal" [access for assistive devices](https://support.apple.com/en-za/HT202866), by: opening System Preferences > "Security & Privacy" > "Privacy" tab
    - Click the little lock icon in the bottom left corner
    - Type in your password
    - In the right hand side panel you should see a list of applications
    - Find "Terminal" and select the checkbox 
    
![Terminal - access for assistive devices - 1](https://github.com/barryels/activity-tracker/raw/master/docs/osx/installation/terminal-eada/1.png)

![Terminal - access for assistive devices - 2](https://github.com/barryels/activity-tracker/raw/master/docs/osx/installation/terminal-eada/2.png)

![Terminal - access for assistive devices - 3](https://github.com/barryels/activity-tracker/raw/master/docs/osx/installation/terminal-eada/3.png)
    
- Go to `PATH_TO_REPO/data/` and you'll see a newly created text file with all your logs :)


### Linux

[TODO]


### Windows

[TODO]



## Architecture (v1.x)

    +----------+
    |  Client  |  // integrate with host to get current application name and window title and call into logger
    +-----+----+
          |
          | // log data (calls made via HTTP API)
          |
    +-----V----+
    |  Logger  |  // check user config to decide what to log
    +-----+----+
          |
          | // save data (calls made via webhooks)
          |
  +-------V-------+
  |  Persistence  | // Store logs to disk / db / etc. User swappable layer.
  +-------A-------+
          |
          | (read data)
          |
    +-----+------+
    |  Reporter  |
    +------------+


## Tracking

### File Types


| Application           |  OS X  |  Win  | Linux |
| :---                  | :---:  | :---: | :---: |
| IntelliJ IDEA         | x      | -     | -     |


### Project Names

| Service               |  OS X  |  Win  | Linux |
| :---                  | :---:  | :---: | :---: |
| git                   | -      | -     | -     |
| node (package.json)   | -      | -     | -     |
| php (composer.json)   | -      | -     | -     |
| bower (bower.json)    | -      | -     | -     |



## TODO

- Add support for getting project name from window title, by:
  - Searching up the file system tree from the active file until it finds, either:
    - A `.git` dir, then reading the `description` file, if empty, then the parent directory name where the `.git` dir resides
    - A `package.json` file, reading the `name` property, if empty, then the parent directory name
    - A `composer.json` file, reading the `name` property, if empty, then the parent directory name
    - A `bower.json` file, reading the `name` property, if empty, then the parent directory name
- Add config file support
- Build a dashboard GUI with nice graphs, filters etc. e.g. Programming language breakdown, app usage, etc.
- Add support for Windows and Linux
- Prevent logging of private browsing in Chrome, Safari & Firefox
