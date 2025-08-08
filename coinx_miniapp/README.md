
# Coinxwallet Mini App (Telegram Web App) - Dark Mode (Deployable)

This is a simple deployable Telegram Mini App (dark mode) for Coinxwallet.
It includes a Dashboard and Deposit page (with your TRC20 address and QR code).

## Files
- index.html — main Mini App page
- styles.css — dark mode styles
- app.js — client interactions (Telegram WebApp integration)
- logo.svg — simple logo
- qr.png — your QR image (embedded)

## Quick Deploy (Vercel)
1. Create a GitHub repo and push this folder OR upload via Vercel import.
2. Go to https://vercel.com/new and connect your repo (or drag & drop).
3. Deploy — you will get a HTTPS URL like `https://your-app.vercel.app`.

## Link to Bot
1. Open @BotFather in Telegram
2. `/setdomain` -> paste your Vercel HTTPS URL
3. `/setmenubutton` -> set Web App button with the same URL

## Notes & Next Steps
- This is front-end only. Deposit confirmations and withdrawals are manual for now.
- For production with real funds, you'll need a secure backend to track deposits, confirmations, and process withdrawals.
- I can provide backend starter code (Node.js + MongoDB + Tron monitoring) next.

