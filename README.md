# Screwturn to MediaWiki converter
Convert Screwturn Wiki to MediaWiki

## Requirements
* node.js

## Exporting Screwturn Pages
[Information for exporting Screwturn data](http://www.screwturn.eu/Help.DataMigration.ashx)

## Converting Screwturn Pages
Make sure you have your node modules
```
	npm install
```

Start the conversion
```
	node ./index.js "Screwturn pages directory" "MediaWiki destination directory"
```
*Note*: the MediaWiki destination will be created if it doesn't exist and files will be overwritten if they do exist.

## Importing Pages into MediaWiki
[Importing XML Dumps](http://www.mediawiki.org/wiki/Manual:Importing_XML_dumps)

## Importing Attachemnts into MediaWiki


## Contributing
Contributions are welcome.  Please follow the [style guide](https://github.com/devpaul/javascript).