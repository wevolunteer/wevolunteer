FROM golang:1.22.2 AS builder

WORKDIR /app

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN go build -o wevolunteer cmd/cli/main.go


FROM debian:slim

RUN apk --no-cache add ca-certificates libc6-compat

RUN adduser -D wevolunteer

WORKDIR /srv

COPY --from=builder /app/wevolunteer .

RUN chown -R wevolunteer:wevolunteer /srv

USER wevolunteer

EXPOSE 3000

CMD ["/srv/wevolunteer"]