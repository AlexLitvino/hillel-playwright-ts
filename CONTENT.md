# 16 Використання DevTools та селекторів елементів у браузері

Selectors priorities:
- Special test attributes (data-testid, data-qa, data-test etc)
- ID
- Class
- Text
- Other attributes

Selectors:
- CSS
- XPath


DevTools F12
Add extension SelectorsHub to GoogleChome

## CSS
h1 - by tag
#aboutSection - by ID
[name="email"] - by attribute
[name*="em"] - include
[name^="em"] - starts with
[name$="em"] - ends with

form * - all indirect child to form
form > * - all direct child

## XPath
//h1
//div[@id="contactsSection"]
//div[contains(@id, "about")]
//button[text()="Sign up"]
//nav//*[@appscrollto="aboutSection"]
(//nav//*)[1]
//div[@class="section about" and @id="aboutSection"]

CSS Selectors Cheat Sheet
https://www.freecodecamp.org/news/css-selectors-cheat-sheet/

Xpath cheatsheet
https://devhints.io/xpath

Game for XPath
https://topswagcode.com/xpath/

Game for CSS
https://flukeout.github.io/


Task on page https://en.wikipedia.org/wiki/Wikimedia_Foundation
```
h1 span span
td.infobox-data.label li
img[srcset]

//h1/span/span
//table//tr//th[contains(text(), "Location")]/following-sibling::td//li
//img[@srcset]
```
