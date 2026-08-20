# SA Mesh Wiki

Docusaurus wiki for `wiki.samesh.au`.

## Local development

```bash
npm install
npm test
npm run build
npm start
```

## Deployment and contribution flow

GitHub keeps the editable Docusaurus source in this repository. The generated `build/` directory is intentionally ignored and should not be committed.

Community contributors should open pull requests into `preview`:

1. Fork the repository or create a branch.
2. Run `npm ci`, `npm test`, and `npm run build` locally.
3. Open a PR with base branch `preview`.
4. A maintainer reviews the PR. GitHub Actions do **not** run or deploy automatically on PR creation.
5. When a maintainer approves and merges into `preview`, GitHub Actions builds Docusaurus and deploys the Cloudflare Pages preview branch.
6. Production is promoted later by an approved merge from `preview` into `main`, which builds and deploys `wiki.samesh.au`.

Repo settings should keep `main` maintainer-only and require community work to land through `preview` first.

## Deployment

GitHub Actions deploys the Docusaurus `build/` artifact to Cloudflare Pages project `wiki-samesh` using repo secrets:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`

Production deploys from `main`; the `preview` branch creates a Cloudflare Pages branch preview. Pull requests do not trigger Actions or deployment automatically.
