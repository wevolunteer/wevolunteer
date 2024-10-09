# WeVolunteer Server

This is the server for the WeVolunteer project. It is a RESTful API that provides endpoints for the WeVolunteer client to interact with.

## Requirements

- Go 1.22 or higher
- Docker

## Getting Started

To get started, clone this repository and run

```
$ docker-compose up -d
```

This will start the postgres database

To run the server, run

```
$ go run cmd/main.go
```

To initialized the database with base data, run

```
$ go run cmd/main.go initdata
```

To create a super user, run

```
$ go run cmd/main.go createsuperuser
```

To create a service account token, run

```
$ go run cmd/main.go createserviceaccount <email>
```

email should be the email of the user you want to create a service account for.

## Documentation

Once you start the server, the API documentation will be available at `http://localhost:8080/api/docs`

## License

This project is licensed under the MIT License - see the [LICENSE.txt](/LICENSE.txt) file for details.
