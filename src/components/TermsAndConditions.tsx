import { ArrowLeft } from 'lucide-react';
import { Logo } from './Logo';

export function TermsAndConditions() {
  return (
    <div className="grain min-h-screen bg-ink-950 text-steel-200">
      <header className="border-b border-white/8">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="/" aria-label="Terug naar CML Security">
            <Logo className="h-12 w-12" />
          </a>
          <a href="/" className="inline-flex items-center gap-2 text-sm font-medium text-steel-300 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Terug naar home
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-xs font-medium uppercase tracking-label text-accent-300">CML Security B.V.</p>
        <h1 className="mt-5 font-display text-4xl font-semibold text-white sm:text-5xl">Algemene Voorwaarden</h1>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-steel-300/85 sm:text-base">
          <Section title="1. Inleiding">
            <p>Deze voorwaarden en condities zijn van toepassing op deze site en op de transacties die betrekking hebben op onze producten en diensten. Je kunt gebonden zijn aan bijkomende contracten in verband met je relatie met ons of met producten of diensten die je van ons ontvangt. Indien bepalingen van aanvullende overeenkomsten in strijd zijn met bepalingen van deze voorwaarden, hebben de bepalingen van die aanvullende overeenkomsten voorrang.</p>
          </Section>
          <Section title="2. Bindend">
            <p>Door je te registreren bij, toegang te verkrijgen tot of op een andere manier gebruik te maken van deze site, stem je ermee in gebonden te zijn aan deze voorwaarden en condities. Het gebruik van deze site impliceert dat je kennis hebt genomen van deze voorwaarden en condities en deze aanvaardt. In sommige specifieke gevallen kunnen wij je ook vragen uitdrukkelijk in te stemmen.</p>
          </Section>
          <Section title="3. Elektronische communicatie">
            <p>Door deze site te gebruiken of digitaal met ons te communiceren, stem je ermee in dat wij digitaal met je kunnen communiceren via onze site of per e-mail. Alle overeenkomsten, kennisgevingen, bekendmakingen en andere mededelingen die wij digitaal verstrekken, voldoen aan de wettelijke vereisten dat dergelijke mededelingen schriftelijk dienen te zijn.</p>
          </Section>
          <Section title="4. Intellectueel eigendom">
            <p>Wij of onze licentiegevers bezitten en beheren alle auteursrechten en andere intellectuele-eigendomsrechten op de site en de gegevens, informatie en andere bronnen die daarop worden weergegeven of toegankelijk zijn.</p>
            <h3>4.1 Alle rechten zijn voorbehouden</h3>
            <p>Tenzij bij specifieke inhoud anders is aangegeven, word je geen licentie of ander recht verleend op grond van auteursrechten, handelsmerken, octrooien of andere intellectuele-eigendomsrechten. Zonder voorafgaande schriftelijke toestemming mag je geen inhoud van deze site gebruiken, kopiëren, reproduceren, uitvoeren, weergeven, verspreiden, opnemen in een elektronisch medium, wijzigen, reverse-engineeren, decompileren, overdragen, downloaden, verzenden, te gelde maken, verkopen, op de markt brengen of commercialiseren, behalve voor zover dwingend recht dit toestaat.</p>
          </Section>
          <Section title="5. Eigendom van derden">
            <p>Onze site kan hyperlinks of andere verwijzingen naar sites van andere partijen bevatten. Wij controleren of beoordelen de inhoud van deze sites niet. Producten of diensten die door andere sites worden aangeboden, zijn onderworpen aan de voorwaarden van die derden. Meningen of materiaal op die sites worden niet noodzakelijkerwijs door ons gedeeld of onderschreven.</p>
            <p>Wij zijn niet verantwoordelijk voor de privacypraktijken of inhoud van sites van derden. Je draagt alle risico's verbonden aan het gebruik van deze sites en diensten van derden. Wij aanvaarden geen verantwoordelijkheid voor verlies of schade als gevolg van door jou aan derden verstrekte persoonsgegevens.</p>
          </Section>
          <Section title="6. Verantwoordelijk gebruik">
            <p>Door onze site te bezoeken, stem je ermee in deze alleen te gebruiken voor de doeleinden waarvoor deze bestemd is en zoals toegestaan door deze voorwaarden, aanvullende contracten, toepasselijke wetgeving en algemeen aanvaarde online praktijken. Je mag onze site of diensten niet gebruiken voor schadelijke software, direct-marketingactiviteiten of systematische of geautomatiseerde gegevensverzameling.</p>
            <p>Het is ten strengste verboden activiteiten te ontplooien die schade toebrengen of kunnen toebrengen aan de site of die de werking, beschikbaarheid of toegankelijkheid ervan belemmeren.</p>
          </Section>
          <Section title="7. Indienen van ideeën">
            <p>Verstuur aan ons geen ideeën, uitvindingen, auteursrechtelijk beschermde werken of andere informatie die als jouw intellectuele eigendom kan worden beschouwd, tenzij wij eerst een overeenkomst over intellectueel eigendom of geheimhouding hebben ondertekend. Als je inhoud bekendmaakt zonder een dergelijke overeenkomst, verleen je ons een wereldwijde, onherroepelijke, niet-exclusieve en royaltyvrije licentie om die inhoud te gebruiken, te reproduceren, op te slaan, aan te passen, te publiceren, te vertalen en te distribueren in alle bestaande of toekomstige mediavormen.</p>
          </Section>
          <Section title="8. Beëindiging van gebruik">
            <p>Wij kunnen naar eigen inzicht te allen tijde de toegang tot de site of een dienst tijdelijk of permanent wijzigen of stopzetten. Je stemt ermee in dat wij niet aansprakelijk zijn voor een dergelijke wijziging, opschorting of stopzetting. Je hebt geen recht op compensatie, ook niet als functies, instellingen of inhoud waarop je vertrouwde permanent verloren gaan. Je mag toegangsbeperkende maatregelen op onze site niet omzeilen of proberen te omzeilen.</p>
          </Section>
          <Section title="9. Garanties en aansprakelijkheid">
            <p>Niets in dit artikel beperkt of sluit een wettelijk voorgeschreven garantie uit wanneer dat onrechtmatig zou zijn. Deze site en alle inhoud worden aangeboden op een "zoals het is" en "zoals beschikbaar" basis en kunnen onnauwkeurigheden of typografische fouten bevatten. Wij verwerpen alle garanties met betrekking tot beschikbaarheid, nauwkeurigheid of volledigheid van de inhoud.</p>
            <p>Wij garanderen niet dat deze site of onze inhoud aan je eisen voldoet of ononderbroken, tijdig, veilig of foutloos beschikbaar zal zijn. Niets op deze site is juridisch, financieel of medisch advies. Raadpleeg een deskundige wanneer je advies nodig hebt.</p>
            <p>Voor zover wettelijk toegestaan zijn wij niet aansprakelijk voor directe of indirecte schade, waaronder winstderving, verlies of beschadiging van gegevens, software, databanken of eigendommen, die voortvloeit uit toegang tot of gebruik van onze site. Onze maximale aansprakelijkheid is beperkt tot de totale prijs die je aan ons hebt betaald voor producten, diensten of gebruik van de site.</p>
          </Section>
          <Section title="10. Privacy">
            <p>Om toegang te krijgen tot onze site en/of diensten kun je gevraagd worden informatie over jezelf te verstrekken. Je stemt ermee in dat de informatie die je verstrekt accuraat, correct en actueel is.</p>
          </Section>
          <Section title="11. Exportbeperkingen en naleving van wetgeving">
            <p>Toegang tot de site is verboden voor bezoekers vanuit gebieden of landen waar de inhoud of aankoop van producten of diensten illegaal is. Je mag deze site niet gebruiken in strijd met Nederlandse exportwetten en -voorschriften.</p>
          </Section>
          <Section title="12. Opdracht">
            <p>Je kunt geen van je rechten en/of verplichtingen geheel of gedeeltelijk toewijzen, overdragen of uitbesteden aan een derde zonder onze voorafgaande schriftelijke toestemming. Elke vermeende overdracht in strijd met dit artikel is nietig en ongeldig.</p>
          </Section>
          <Section title="13. Inbreuken op deze voorwaarden">
            <p>Onverminderd onze andere rechten kunnen wij, wanneer je deze voorwaarden schendt, maatregelen nemen die wij passend achten, waaronder het tijdelijk of permanent opschorten van je toegang, contact opnemen met je internetprovider en/of juridische stappen ondernemen.</p>
          </Section>
          <Section title="14. Vrijwaring">
            <p>Je gaat ermee akkoord ons te vrijwaren, te verdedigen en schadeloos te stellen van en tegen alle claims, aansprakelijkheden, schade, verliezen en onkosten die verband houden met jouw schending van deze voorwaarden, toepasselijke wetten, intellectuele-eigendomsrechten of privacyrechten.</p>
          </Section>
          <Section title="15. Ontheffing">
            <p>Het niet afdwingen van een bepaling in deze voorwaarden of een ander document, of het niet uitoefenen van een mogelijkheid tot beëindiging, geldt niet als verklaring van afstand en heeft geen invloed op de geldigheid van deze voorwaarden of het recht om daarna alle bepalingen af te dwingen.</p>
          </Section>
          <Section title="16. Taal">
            <p>Deze voorwaarden en condities worden uitsluitend geïnterpreteerd en uitgelegd in het Nederlands. Alle mededelingen en correspondentie worden uitsluitend in die taal gevoerd.</p>
          </Section>
          <Section title="17. Gehele overeenkomst">
            <p>Deze voorwaarden en condities vormen de volledige overeenkomst tussen jou en CML Security met betrekking tot je gebruik van deze site.</p>
          </Section>
          <Section title="18. Updaten van deze voorwaarden en condities">
            <p>Wij kunnen deze voorwaarden en condities van tijd tot tijd updaten. Je bent verplicht deze regelmatig te controleren op veranderingen of updates. Wijzigingen worden van kracht zodra ze op deze site zijn geplaatst. Voortgezet gebruik van de site na wijzigingen geldt als aanvaarding daarvan.</p>
          </Section>
          <Section title="19. Rechtskeuze en rechterlijke bevoegdheid">
            <p>Op deze voorwaarden is Nederlands recht van toepassing. Alle geschillen met betrekking tot deze algemene voorwaarden zijn onderworpen aan de bevoegdheid van de rechtbank in Nederland. Indien een bepaling ongeldig of niet-afdwingbaar wordt bevonden, wordt deze gewijzigd, verwijderd en/of afgedwongen voor zover maximaal is toegestaan. De overige bepalingen blijven onverlet.</p>
          </Section>
          <Section title="20. Contactinformatie">
            <p>Deze site is eigendom van en wordt beheerd door CML Security. Je kunt telefonisch contact met ons opnemen over deze voorwaarden via het contactnummer dat op onze site is gepubliceerd.</p>
          </Section>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 border-t border-white/8 pt-8 first:border-t-0 first:pt-0">
      <h2 className="font-display text-2xl font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}