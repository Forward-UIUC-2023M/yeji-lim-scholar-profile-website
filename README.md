# yejil1617_ForwardData

## Overview
This module is the starting website for FrowardData Scholar Profile. 

## Setup

List the steps needed to install your module's dependencies: 

1. pip (23.2.1)

2. Download MongoDB Compass to view and manipulate database (contact me for URI). Download Postman to view and work with backend API (contact me to share the postman workspace).

It is very important to also include an overall breakdown of your repo's file structure. Let people know what is in each directory and where to look if they need something specific. This will also let users know how your repo needs to structured so that your module can work properly

```
yeji-lim-ForwardData/
    - start_web
        -- client/
            -- src/
                -- components/
                    -- All the components to webpage front end
        -- server/
            -- config/
                -- config.env
                    -- configuration file
                -- db.js
            -- controllers/
                -- controllers for API
            -- middleware/
                -- middlewares
            -- models/
                -- database schemas
            -- routes/
                -- routes for API
            -- utils/
                -- util functions
            -- server.js
```

## Demo video

https://drive.google.com/file/d/1zn4kHzHrFXfSbvki2fGtWu3FaMR0nJJc/view?usp=share_link

## Issues and Future Work

In this section, please list all know issues, limitations, and possible areas for future improvement. For example:

* High false negative rate for document classier. 
* Over 10 min run time for one page text.
* Replace linear text search with a more efficient text indexing library (such as whoosh)
* Include an extra label of "no class" if all confidence scores low. 


## Change log

For future work, integrate backend algorithms so the data displayed on pages are actual scraped datas instead of dummy datas.