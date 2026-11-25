# أسعار الذهب والدولار اليوم | Gold & USD/EGP Live Dashboard

Interactive dashboard for gold and the US dollar in Egyptian pounds. A single `index.html`, vanilla JavaScript, no build step, no API keys.

## Features
- Live gold ounce price in USD (refreshes every 30 seconds)
- USD/EGP rate (refreshes every 5 minutes; the source updates daily)
- Gram price for 24k, 22k, 21k, 18k in EGP, plus the 21k gold pound (8 g)
- Adjustable local-market premium slider
- 30-day USD/EGP history chart, live session chart for gold (kept in localStorage)
- Gold and dollar converters

## Data sources (free, CORS-enabled)
- Gold: https://api.gold-api.com/price/XAU
- USD/EGP latest: https://open.er-api.com/v6/latest/USD
- USD/EGP history: https://api.frankfurter.dev/v2/rates

Gram price = ounce price / 31.1035 x USD/EGP x (karat / 24).
Prices are international reference values converted to EGP. Local jewelers and banks differ, and workmanship and stamp fees are excluded. Not investment advice.

## Run
Open `index.html` in a browser, or host it free with GitHub Pages (Settings > Pages > deploy from `main` branch, root).

## Ideas for next steps
- Add EGP gold history from a stored daily snapshot (GitHub Actions cron writing a JSON file)
- Add silver, EUR/EGP, SAR/EGP
- Pull local bank rates through a small backend
