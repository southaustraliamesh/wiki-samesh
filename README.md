# SA Mesh Wiki

Docusaurus wiki for `wiki.samesh.au`.

## Local development

```bash
npm install
npm test
npm run build
npm start
```

## Deployment

GitHub Actions deploys the Docusaurus `build/` artifact to Cloudflare Pages project `wiki-samesh` using repo secrets:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`

Production is expected from `main`; the `preview` branch creates a Cloudflare Pages branch preview.
