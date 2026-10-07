import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Privacyverklaring',
  description: 'Hoe Autorijschool Yorulmaz omgaat met je persoonsgegevens.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  const { email, phone } = site.contact
  return (
    <LegalPage label="Privacy" title="Privacyverklaring" updated="september 2026">
      <p>
        {site.name} gaat zorgvuldig om met je persoonsgegevens. In deze verklaring lees je welke
        gegevens we verwerken, waarom we dat doen en welke rechten je hebt.
      </p>

      <h2>Welke gegevens we verwerken</h2>
      <p>Als je contact met ons opneemt, via het formulier, WhatsApp, telefoon of e-mail, ontvangen we:</p>
      <ul>
        <li>je naam;</li>
        <li>je telefoonnummer en/of e-mailadres;</li>
        <li>de inhoud van je bericht.</li>
      </ul>

      <h2>Waarom we deze gegevens gebruiken</h2>
      <p>
        We gebruiken je gegevens alleen om je vraag te beantwoorden, je rijlessen in te
        plannen en contact met je te houden over je lessen. We verkopen je gegevens niet en delen ze
        niet met anderen, tenzij dat nodig is voor je opleiding (bijvoorbeeld bij het aanvragen van
        een examen) of wettelijk verplicht is.
      </p>

      <h2>Het contactformulier</h2>
      <p>
        Het formulier op deze website slaat zelf geen gegevens op. Wat je invult, sturen we als e-mail
        naar onze eigen mailbox. Daarvoor gebruiken we de e-maildienst Resend, die je bericht alleen
        doorstuurt en het niet voor eigen doeleinden gebruikt. Lukt dat versturen een keer niet, dan
        wordt je bericht klaargezet in WhatsApp; pas als je het daar verstuurt, ontvangen wij het. Voor
        WhatsApp geldt daarnaast het privacybeleid van WhatsApp.
      </p>

      <h2>Cookies en statistieken</h2>
      <p>
        Cookies voor statistieken en advertenties plaatsen we alleen met je toestemming. Welke dat
        zijn en hoe je je keuze aanpast, lees je in ons <a href="/cookies">cookiebeleid</a>.
      </p>

      <h2>Hoe lang we gegevens bewaren</h2>
      <p>
        We bewaren je gegevens niet langer dan nodig is voor het doel waarvoor ze zijn verzameld, of
        zolang de wet dat voorschrijft.
      </p>

      <h2>Je rechten</h2>
      <p>
        Je hebt het recht om je gegevens in te zien, te laten aanpassen of te laten verwijderen.
        Neem daarvoor contact met ons op
        {email ? ` via ${email}` : phone ? ` via ${phone}` : ''}. Heb je een klacht over hoe we met
        je gegevens omgaan, dan kun je die ook indienen bij de Autoriteit Persoonsgegevens.
      </p>
    </LegalPage>
  )
}
