# UPI QR Code Generator

A free, open-source, and privacy-first tool to generate UPI QR codes instantly from any UPI ID. Add an amount and note, then download or share the QR code. Works seamlessly with GPay, PhonePe, Paytm, BHIM, and all UPI apps.

- **100% Client-Side** — No data is stored or sent to any server
- **Instant Generation** — QR codes generate in milliseconds
- **High-Resolution Downloads** — Export as PNG (1024×1024) or SVG
- **SEO-Optimized** — Built with Next.js 15+ App Router and comprehensive metadata

## Tech Stack

- [Next.js](https://nextjs.org) 16
- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com) v4
- [qrcode.react](https://www.npmjs.com/package/qrcode.react)
- [lucide-react](https://lucide.dev)

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Build & Deploy

The project is configured for static export:

```bash
npm run build
```

Static files will be generated in the `out/` directory.

## SEO & Metadata

- Full Open Graph, Twitter Cards, and JSON-LD structured data
- Canonical URLs, robots directives, and sitemap-ready trailing slashes
- Responsive viewport and Apple Web App metadata

Replace the placeholder `BASE_URL` in `src/lib/constants.ts` with your actual domain before deploying.

## License

MIT
