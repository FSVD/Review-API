# Review Multiservice System

Multiservice system for places review management based on GraphQL & RESTful APIs.<br>
Manage Places, users and reviews.<br>

## Key features:
Multiservice, Clustering (Multiprocess), Subscriptions, Service configuration manager.

## Built With:
Node JS<br>
Express<br>
GraphQL<br>
Bookshelf ORM<br>
MySQL<br>

## Installing:
1) Create a new schema in your MySQL DDBB named "review".
2) Install Knex dependency in global mode via npm in order to access to Knex cli > npm install -g knex.<br>
3) Create a .env file in the project root folder with variables listed in the next section and change values with your db user and pwd.
4) Install project dependencies > "npm install".
5) Run project > "npm start".
6) GraphQL API access point: Open yuor web browser and go to "http://localhost:4001/graphiql"
7) RESTful API access point: Open yuor web browser and go to "http://localhost:4002" 

## Environment variables
Options: development | staging | production<br>
NODE_ENV=development

List of processes and ports - Each value Must be comma separated without space<br>
PROCESSES = GraphQL-api,REST-api<br>
PORTS= 4001,4002<br>

DEVELOPMENT_DB_NAME=review<br>
DEVELOPMENT_DB_USER={ your database user }<br>
DEVELOPMENT_DB_PASSWORD={ your database password }<br>

STAGING_DB_NAME=review
STAGING_DB_USER={ your database user }<br>
STAGING_DB_PASSWORD={ your database password }<br>

PRODUCTION_DB_NAME=review
PRODUCTION_DB_USER={ your database user }<br>
PRODUCTION_DB_PASSWORD={ your database password }<br>

## Mock data
Use "Review-API-Mocks.sql" file to populate your database.

## GraphQL query example
```
{
  reviews {
    subject {
      id
    }
    title
    content
    reviewRatingCriterionsValues {
      ratingCriterion {
        name
      }
      value
    }
    author {
      fullName
    }
  }
}
```