# Back

Use PHP 8.2

Copy `.env.example` to `.env` and enjoy it.

Launch migrations (by default use sqlite database)

```
./artisan migrate
```

And create user (because frontend need to auth):

```
./artisan app:register-user {username} {password}
```

For testing login endpoint use that url:  
`{{ _.baseUrl }}/api/login`

With JSON Body:
```
{
	"username": "your_username",
	"password": "your_password"
}
```

Environment example for Insomnia:

```
{
    "baseUrl": "http://back.local.dimti.ru"
}
```

# Front

NodeJS: `lts/hydrogen`

Install packages: `pnpm install`

Use `pnpm run postinstall` for generate base types

And use `pnpm run dev` and default address <http://front.local.dimti.ru:30412>
(DNS ready to localhost)
