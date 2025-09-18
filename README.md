# K-9 Forms

### Web application that interfaces with Rescue Groups to provide advanced forms

## Getting Started

### Configuration
First, copy `.env.example` to `.env.local`
```bash
cp .env.example .env.local
```

Then set the environemnt variable values:

- `RG_TOKEN` and `RG_HASH` can be found from Rescue Groups
- `SURGEON_NAME` if you want to override the default `David Smith, D.V.M. #6901005915`

### Running the app
Run the development server:

```bash
npm run dev
# or
yarn dev
```

### Hosting

The application is currently hosted on [Vercel](https://vercel.com/).

### Surgeon

The surgeon was originally configurable through Redis, but due to the low usage, the free tiers kept expiring. We'll hardcode the surgeon for now. 

