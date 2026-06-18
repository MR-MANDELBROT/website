# Maximilian Marquart – Website

Persönliche Visitenkarten-Startseite + minimalistisches Foto-Portfolio.
Gebaut mit [Astro](https://astro.build) (statisch), Bilder werden beim Build
automatisch zu WebP optimiert.

## Struktur

| Seite | URL | Inhalt |
|-------|-----|--------|
| Start | `/` | Zentrierte Visitenkarte (Name, E-Mail, Portfolio-Link) |
| Portfolio | `/fotografie/` | Übersicht der vier Kategorien |
| Kategorie | `/fotografie/<slug>/` | Galerie mit Lightbox |
| Impressum | `/impressum/` | Pflichtangaben (Adresse, Telefon) |

Fotos liegen in `src/photos/<kategorie>/`. Neue Bilder einfach dort ablegen –
sie tauchen automatisch in der Galerie auf (sortiert nach Dateiname).
Kategorien/Titel werden in `src/lib/gallery.ts` gepflegt.

## Lokal entwickeln

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # erzeugt dist/
npm run preview  # baut + zeigt die fertige Seite lokal
```

## Deployment (GitHub Pages, eigene Domain)

1. Repo zu GitHub pushen (Branch `main`).
2. GitHub → **Settings → Pages → Source: GitHub Actions**.
3. Der Workflow `.github/workflows/deploy.yml` baut und deployt automatisch.
4. **Custom Domain:** Domain steht in `public/CNAME` (aktuell `marquart.dev`).
   Beim Domain-Anbieter setzen:
   - `A`-Records für die Apex-Domain auf GitHubs IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` für `www` → `<dein-github-user>.github.io`
5. In GitHub → Settings → Pages „Enforce HTTPS" aktivieren.

> Domain ändern? `public/CNAME` **und** `site` in `astro.config.mjs` anpassen.
