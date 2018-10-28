# MyFirstScraper

MyFirstScraper is a web app that uses **Axios** and **Cheerios** to scrape a website for articles. Using this we place the scraped data into a database using **Mongoose**, while using **express** and **express handlebars** to execute POST and GET requests to send and recieve data from our DOM, and initiate Mongoose functions to add, delete, and modify our collections.

## Instructions

Depending on whether you are using the deployed heroku app or trying to run the app locally, your root page may or may not display any articles.

If you do not see any articles at the root directory page then we must scrape MassivelyOP.com for some articles. To do so just add **_/scrape_** to the end of your URL and wait to see **"Scrape Complete"** on your web page at the top right.

After this we can go back to our root directory and see that our page is now filled with 20 articles from MassivelyOP.com.

From here you can hit the comment button for any of the articles. Doing so will route you to a seperate article page where you can leave and delete comments. The comments you make for an article will perisist for that individual article ONLY. Delete comments by hitting the X button at the top left corner of a comment.

## Heroku

https://still-depths-11012.herokuapp.com/
