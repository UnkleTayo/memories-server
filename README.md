## Kora

> Backend repository for Memories (web app).

### Introduction

Memories is a side project i developed for learning purposes following [Js Mastery](https://github.com/adrianhajdin) tutorials. This app is meant to be like a social media app for sharing pictures, where user can upload  pictures with description and tags, like and unlike other users post. This is the backend repository built with Node & MongoDB, deployed on heroku. The [front-end repository](https://github.com/unkletayo/memories-client) is hosted separately.

### Features

While this is not a 100% working  as the app still has  a lot of moving parts, I tried to implement basic CRUD functionalities with OAuth login.

- Email and password authentication
- OAuth Authentication
- Create post
- Like other users post
- Role-based to some features

### Development

Requires Node >=14+ & MongoDB >=4.2

```shell
mkdir <folder>
git clone https://github.com/unkletayo/memories-server.git .
touch .env
yarn install || npm install
yarn dev 
```

I do intend to keep developing this app (adding new features and fixing bugs) as I enjoyed building this one.

### Bug report

If you find any bugs in this app, [open an issue](https://github.com/unkletayo/memories-server/issues/new)
