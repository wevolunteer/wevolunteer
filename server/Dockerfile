FROM golang:1.22.2 AS builder

WORKDIR /app

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN go build -o wevolunteer cmd/cli/main.go


FROM debian:12-slim

RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && rm -rf /var/lib/apt/lists/*

RUN adduser --disabled-password --gecos "" wevolunteer

WORKDIR /srv

COPY --from=builder /app/wevolunteer .
COPY data/ /srv/data/

RUN chown -R wevolunteer:wevolunteer /srv

USER wevolunteer

EXPOSE 3000

CMD ["/srv/wevolunteer"]