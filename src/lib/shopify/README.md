# Shopify Storefront API Setup

This guide explains how to connect the Hellig Ord store to Shopify's Storefront API.

## Store Information

- **Internal myshopify domain**: `g7bmfm-ep.myshopify.com`
- **Public-facing domain**: `helligeord.no`

## Step 1 — Create a Storefront API App in Shopify Admin

1. Log in to [Shopify Admin](https://g7bmfm-ep.myshopify.com/admin)
2. Go to **Settings** (bottom-left gear icon)
3. Click **Apps and sales channels**
4. Click **Develop apps** (top-right)
5. If prompted, click **Allow custom app development**
6. Click **Create an app**
7. Give it a name, e.g. `Hellig Ord Frontend`
8. Click **Create app**

## Step 2 — Configure Storefront API Scopes

1. Inside the app you just created, click **Configure Storefront API scopes**
2. Enable the following scopes:

| Scope | Purpose |
|-------|---------|
| `unauthenticated_read_product_listings` | Read products and collections |
| `unauthenticated_read_product_inventory` | Read inventory/availability |
| `unauthenticated_write_checkouts` | Create and update checkouts/carts |
| `unauthenticated_read_checkouts` | Read checkout state |

3. Click **Save**

## Step 3 — Install the App and Get the Token

1. Click **Install app** (top-right)
2. Confirm the installation
3. Go to the **API credentials** tab
4. Under **Storefront API access token**, click **Copy**

## Step 4 — Add the Token to Your Environment

Open `apps/hellig-ord/.env.local` and fill in the token:

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=g7bmfm-ep.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your_token_here
```

Restart the dev server after saving.

## How the Client Works

The Storefront API client is in `client.ts`. It initialises only when both env vars are present. If either is missing (e.g. during local development before the token is added), the client returns `null` and all data-fetching functions in `actions.ts` fall back to mock data automatically.

This means the site will render correctly with placeholder products even without a live Shopify connection.

## Security Note

`NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` is a **public** Storefront API token. It is safe to expose in the browser — it can only read public product data and write checkouts. Never use the Admin API key here.
