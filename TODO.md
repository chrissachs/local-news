# TODO
* api endpoint
    * get articles
        * sort by date
        * filter by geo
            * https://stackoverflow.com/questions/1006654/fastest-way-to-find-distance-between-two-lat-long-points
            * http://daynebatten.com/2015/09/latitude-longitude-distance-sql/
* react frontend
    * google map component
    * hover desc, img, link 
* admin tools
    * add/remove subscribed twitter accounts
* docker
    * clean production image
    * run queue on startup
        * make events queue
    * get laravel logs to docker log
* cleaner db scheme (foreign keys, unique names,...)    
    


# Commands
## Subscribe to twitter updates
Listen to new tweets from configured accounts and queue them to handle.
```bash
php artisan consume:twitter
```
## Extract info and entities
To extract and save entities + article info:
```bash
php artisan extract:entities https://www.tagesspiegel.de/berlin/berlin-neukoelln-neue-razzia-gegen-arabischen-clan-in-berlin/22996870.html
```     

# Resources
## Entity extraction
### dandelion
* https://api.dandelion.eu/datatxt/nex/v1?token=06a2cb3c34624b199949bcfd1ed23c87&include=types&url=https://www.tagesspiegel.de/berlin/berlin-mitte-monika-gruetters-humboldt-forum-genau-auf-der-ziellinie/22991762.html
* https://dandelion.eu/docs/api/datatxt/nex/v1/

### wikipedia
* https://en.wikipedia.org/w/api.php?format=json&action=query&redirects=1&titles=Humboldt_Forum&prop=extlinks
     * link to wmflabs geohack
     * https://www.mediawiki.org/wiki/API:Properties/de
     * https://de.wikipedia.org/w/index.php?title=MediaWiki:GeoHack.js&oldid=77284551