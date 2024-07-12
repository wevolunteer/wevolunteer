# Wevolunteer server

We Volunteer è una piattaforma di matchmaking tra volontari e associazioni.

## Setup

1. Install dependencies

   ```bash
   go get
   ```

2. Setup config file config.dev.yml

   Create a `config.dev.yml` file in the root directory of the project and add the following configuration:

   ```yaml
   db_dsn: postgres://postgres:postgres@localhost:5432/wevolunteer
   jwt_secret: "verysecret"
   ```

# Run the dev server

```bash
air
```
