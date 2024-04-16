# Back

Use PHP 8.2

Copy `.env.example` to `.env` and enjoy it.

Launch migrations (by default use sqlite database)

```
./artisan migrate --force
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
	"local": {
		"username": "your_username",
		"password": "your_password",
		"url": "http://back.local.dimti.ru"
	},
	"prod": {
		"username": "your_username",
		"password": "your_password",
		"url": "https://api.cryptomus.dimti.ru"
	},
	"username": "{{ _.local.username }}",
	"password": "{{ _.local.password }}",
	"baseUrl": "{{ _.local.url }}"
}
```

## Tests

Run test: `./artisan test`

# Front

NodeJS: `lts/hydrogen`

Install packages: `pnpm install`

Use `pnpm run postinstall` for generate base types

And use `pnpm run dev` and default address <http://front.local.dimti.ru:30412>
(DNS ready to localhost)

Demo available here: <https://cryptomus.dimti.ru>
