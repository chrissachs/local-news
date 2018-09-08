# Intro
This is a demo app to show how Laravel and ReactJS can be utilized for runnig an web app.

The app discovers news, tries to localize them, and displays them on a map.

# Demo
TODO



# Run the app locally
## Requirements
 * PHP 7.2
 * MySQL >= 5.7.7
## Config
Copy `.env.dist` to `.env` and add the missing keys for google maps api and dandelion.

## Deploy
This repository comes with a (development) docker-compose.yml, to start it uo execute the following command:
```bash
# install dependencies
composer install
npm install
# build frontend files
npm run dev
# build and run the app
docker-compose up
# make cache dir writeable
ducker-compose exec app chmod -Rf 777 bootstrap/cache
# create the database
ducker-compose exec app php artisan migrate
```
The app should now be running at: http://0.0.0.0:8080/

## Development
### Add articles manually

*Note: all commands need to be executed from the apps context, either by prepending `docker-compose exec app`, or login 
once to the app if you want to run several commands: `docker-compose exec app`bash*

URLs may be added manually, directly through a command line tool:

```bash
# adding a single url
php artisan trigger:url --url=https://www.tagesspiegel.de/berlin/berlin-charlottenburg-buchhandlung-hugendubel-expandiert-im-europa-center/22995324.html\
# adding urls from a file:
php artisan trigger:url --file=/tmp/urls.txt
```

### Automatically discover new articles
As almost every news site has it's own twitter account, the app uses twitter as a unified source of "live" updates for
new articles. 

To start listening to updates from twitter, run:
```bash
php artisan twitter:consume
```
The accounts used can be configured inside [the command ConsumeTwitter.php](app/Console/Commands/ConsumeTwitter.php)

### Entity extraction/localization
Once an article was discovered by the app, events are triggered that start extracting information from the article and
make them available to the frontend. To see which events exist, and what they start see
[EventServiceProvider](app/Providers/EventServiceProvider.php]).

## Frontend
At `resources/assets/js` the React files are located, to build a new version of the frontend files run
```bash
npm run dev
```

# TODO
see the [TODO.md](TODO.md) file for open tasks.
