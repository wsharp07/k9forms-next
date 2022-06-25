# K-9 Forms

### Web application that interfaces with Rescue Groups to provide forms

## Getting Started

### Configuration
First, copy `.env.example` to `.env.local`
```bash
cp .env.example .env.local
```

Then set the environemnt variable values:

- `RG_TOKEN` and `RG_HASH` can be found from Rescue Groups
- `REDIS_URL` points to the Redis server that is used to store application configuration
  - Note that right now Upstash is used

### Running the app
Run the development server:

```bash
npm run dev
# or
yarn dev
```

### Hosting

The application is currently hosted on [Vercel](https://vercel.com/) with an integration with [Upstash](https://upstash.com/) for configuration storage.
