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
| Logo | `public/images/logo.png` | Navbar, footer en deelafbeelding (bron: `LogoYor.png`) |
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

## Formulier per e-mail (Resend)

Het aanmeld- en contactformulier stuurt een opgemaakte e-mail via [Resend](https://resend.com) (route `src/app/api/aanmelden/route.ts`, opmaak in `src/lib/lead-email.ts`). Zet in Vercel:

| Variabele | Voorbeeld | Wat |
| --- | --- | --- |
| `RESEND_API_KEY` | `re_...` | API-sleutel uit het Resend-dashboard |
| `CONTACT_TO_EMAIL` | `info@jouwdomein.nl` | Waar aanmeldingen binnenkomen (meerdere: komma-gescheiden) |
| `CONTACT_FROM_EMAIL` | `Website Yorulmaz <website@jouwdomein.nl>` | Afzender op een bij Resend geverifieerd domein |

Zonder eigen domein kan tijdelijk `Website Yorulmaz <onboarding@resend.dev>` als afzender; Resend bezorgt dan alleen op het e-mailadres van je Resend-account. Beantwoorden van de e-mail gaat direct naar de leerling (reply-to). Vult de leerling een e-mailadres in, dan krijgt die automatisch een bevestigingsmail (zonder eigen tekst van de bezoeker, zodat het formulier niet voor spam te misbruiken is); uitzetten met `CONTACT_CONFIRMATION=off`. Zolang de variabelen ontbreken, valt het formulier terug op WhatsApp. Spam wordt beperkt met een verborgen veld, een minimale invultijd en een limiet per IP-adres.

## Cookies, Google Analytics en Meta-pixel

Tracking staat standaard uit. Zet in Vercel (Settings → Environment Variables) één of beide variabelen en deploy opnieuw:

| Variabele | Voorbeeld | Wat |
| --- | --- | --- |
| `NEXT_PUBLIC_GA_ID` | `G-ABC123XYZ` | Google Analytics 4 (categorie *Statistieken*) |
| `NEXT_PUBLIC_META_PIXEL_ID` | `1234567890` | Meta-pixel voor Facebook/Instagram (categorie *Marketing*) |

Zodra er minstens één is ingesteld, verschijnt de cookiebanner (Accepteren / Weigeren / Zelf kiezen). Scripts laden pas na toestemming; bij intrekken worden de cookies verwijderd. Klikken op WhatsApp of het telefoonnummer worden gemeten als `contact`, een verstuurd aanmeldformulier als `generate_lead` / `Lead`. Het cookiebeleid past zich automatisch aan.
