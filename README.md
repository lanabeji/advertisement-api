# Advertisement API

API to communicate advertising meta data to a company. It allows the creation of ads, updates, deletes and fetch all the existing ads with filters.

## Technologies

- NodeJS
- Express
- Typescript
- Docker
- PostgreSQL

## Running the application

1. Clone the repository:
```
git clone https://github.com/lnbello10/advertisement-api.git
```
2. Open the project and execute in the terminal:
```
npm i
```
This will install all modules and dependencies needed to run the project
3. Then, execute:
```
docker run --name pgads -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=advertisement -p 5432:5432 -d postgres:9.6.6-alpine
```
This command is for creating a local postgres database
4. Execute in a terminal to start application:
```
npm run start
```
5. To check if the API is running, execute:
```
curl --location --request GET 'http://localhost:3000/'
```
It should return a string: 'Alive and running'

## API Endpoints

### To check the status of the project
- GET /
```
curl --location --request GET 'http://localhost:3000/'
```

*Response*

```
Alive and running
```

### To fetch all existing ads
- GET /ads
```
curl --location --request GET 'http://localhost:3000/ads'
```
It can also include three filters (query params):

1. Category:
```
curl --location --request GET 'http://localhost:3000/ads?category=Dating'
```
The value will match ads with the exact value of the filter, is case sensitive.

2. Start date
```
curl --location --request GET 'http://localhost:3000/ads?start_date=2019-01-01,2050-10-10'
```
The value is a range of dates, it should contain two dates separated by a comma. If a date is missing, the filter won't be applied.

3. End date
```
curl --location --request GET 'http://localhost:3000/ads?end_date=2019-02-02,2050-02-02'
```
The value is a range of dates, it should contain two dates separated by a comma. If a date is missing, the filter won't be applied.

However, the endpoint can be called using the three filters and will return the a list of ads that match all of them.
```
curl --location --request GET 'http://localhost:3000/ads?category=Dating&start_date=2019-01-01,2050-10-10&end_date=2019-02-02,2050-02-02'
```

*Response*

´´´
[
    {
        "id": 1,
        "offerMessage": "Test 3",
        "url": "https://www.facebook.com",
        "startDate": "2019-10-10T00:00:00.000Z",
        "endDate": "2020-10-10T00:00:00.000Z",
        "category": "Social"
    }
]
´´´

### To fetch an ad by id
- GET /ads/:id
```
curl --location --request GET 'http://localhost:3000/ads/1'
```
It will return the ad with the given id or a Not Found error if the ad with the id doesn't exist.

*Response*

```
{
    "id": 1,
    "offerMessage": "Test 3",
    "url": "https://www.facebook.com",
    "startDate": "2019-10-10T00:00:00.000Z",
    "endDate": "2020-10-10T00:00:00.000Z",
    "category": "Social"
}
```

### To create a new ad
- POST /ads
```
curl --location --request POST 'http://localhost:3000/ads' \
--header 'Content-Type: application/json' \
--data-raw '{
    "offerMessage": "Test 1",
    "url": "https://www.facebook.com",
    "startDate": "2018-10-10",
    "endDate": "2035-10-10",
    "category": "Social"
}'
```
The body of the request should have all these fields:
1. Offer message
2. Url
3. Start date
4. End date
5. Category
If the body doesn't have those fields, the request will fail.

*Response*

```
{
    "offerMessage": "Test 1",
    "url": "https://www.facebook.com",
    "startDate": "2018-10-10",
    "endDate": "2035-10-10",
    "category": "Social",
    "id": 8
}
```

### To modify an existing ad
- PUT /ads/:id
```
curl --location --request PUT 'http://localhost:3000/ads/2' \
--header 'Content-Type: application/json' \
--data-raw '{
    "offerMessage": "Modify 2",
    "url": "https://www.google.com",
    "category": "Comms"
}'
```
The body of the request should have *only the fields that are going to be modified*, the rest of the fields won't change.
If there is not an ad with the given id, it sends an error message.

*Response*

```
{
    "id": 2,
    "offerMessage": "Modify 2",
    "url": "https://www.google.com",
    "startDate": "2018-10-10T00:00:00.000Z",
    "endDate": "2035-10-10T00:00:00.000Z",
    "category": "Comms"
}
```

### To delete an existing ad
- DELETE /ads/:id
```
curl --location --request DELETE 'http://localhost:3000/ads/2'
```
It deletes the ad with the given id, or returns an error message if there is not ad with the id.

*Response*
```
{
    "offerMessage": "Test 1",
    "url": "https://www.facebook.com",
    "startDate": "2018-10-10T00:00:00.000Z",
    "endDate": "2035-10-10T00:00:00.000Z",
    "category": "Dating"
}
```

Note: A Postman collection is included in this project for ease of use: ads-api.postman_collection.json