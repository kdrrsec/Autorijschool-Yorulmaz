# Autorijschool Yorulmaz

Website voor Autorijschool Yorulmaz in Doesburg. Gebouwd met Next.js (App Router), TypeScript en Tailwind CSS 4.

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # productiebuild
npm run lint
```

## Content aanvullen

Alle bedrijfsgegevens staan in **`src/content/site.ts`**. Wat daar op `null` of leeg staat, toont de site als nette placeholder of verbergt het. Vul alleen gegevens in die kloppen.

| Wat | Veld | Effect |
| --- | --- | --- |
| Telefoon | `contact.phone` | Contactblok, structured data |
| WhatsApp | `contact.whatsapp` (bijv. `31612345678`) | Alle WhatsApp-knoppen + het formulier opent WhatsApp |
| E-mail | `contact.email` | Contactblok; formulier valt terug op e-mail als er geen WhatsApp is |
| Instagram | `contact.instagram` (volledige URL) | Footer, fotosectie, structured data |
| Tarieven | `prices` | Losse rijlessen in de tarievensectie |
| Pakketten | `packages` | Pakketkaarten; het voordeel wordt automatisch berekend |
| Reviews | `reviews` | Eerste review groot, overige eronder |
| Instructeur | `instructor` | Naam, ervaring, bio en foto in "Over ons" |
| Foto's | `photos.hero`, `photos.gallery` | Vervangt de grafische placeholders |

Foto's plaats je in `public/images/` en verwijs je aan met bijv. `{ src: '/images/lesauto.jpg', alt: 'Lesauto van Autorijschool Yorulmaz in Doesburg', position: 'center 40%' }`.

## Deployment

Zet `NEXT_PUBLIC_SITE_URL` (bijv. `https://www.jouwdomein.nl`) in de hostingomgeving, zodat canonical-URL's, sitemap, Open Graph en structured data naar het juiste domein wijzen. Op Vercel wordt anders het productiedomein van het project gebruikt.

## Structuur

```
src/
  app/            layout, homepage, privacy, cookies, sitemap, robots, OG-afbeelding
  components/     Header, Footer, knoppen, formulier, PhotoFrame, ...
    sections/     Hero, Intro, Usps, Lessons, Prices, TrialCta, About, Reviews, Gallery, Contact
  content/site.ts alle bedrijfsgegevens
```
