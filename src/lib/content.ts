export type ServiceSlug = 'objectbeveiliging' | 'evenementenbeveiliging' | 'mobiele-surveillance' | 'toegangscontrole';

export interface Service {
  slug: ServiceSlug;
  number: string;
  title: string;
  short: string;
  description: string;
  bullets: string[];
  image: string;
}

export const services: Service[] = [
  {
    slug: 'objectbeveiliging',
    number: '01',
    title: 'Objectbeveiliging',
    short: 'Permanente bewaking van uw panden, locaties en objecten.',
    description:
      'Toezichthouders en beveiligers die uw objecten bewaken met een vaste aanwezigheid, gericht op preventie, controle en snelle actie bij incidenten.',
    bullets: [
      'Permanente aanwezigheid op locatie',
      'Controle en registratie van bezoekers',
      'Directe afhandeling van incidenten',
      'Afgestemd op uw object en bedrijfsvoering',
    ],
    image: 'https://images.pexels.com/photos/36578708/pexels-photo-36578708.jpeg?auto=compress&cs=tinysrgb&w=1400',
  },
  {
    slug: 'evenementenbeveiliging',
    number: '02',
    title: 'Evenementenbeveiliging',
    short: 'Veilige beleving voor bezoekers, artiesten en organisatie.',
    description:
      'Beveiliging van evenementen met oog voor publieksveiligheid, toegangscontrole en de rust die nodig is voor een geslaagd evenement.',
    bullets: [
      'Publiekstoezicht en menigtebeheer',
      'Toegangscontrole en screening',
      'Afstemming met organisatie en hulpverlening',
      'Flexibel inzetbaar per locatie en formaat',
    ],
    image: 'https://images.pexels.com/photos/27831371/pexels-photo-27831371.jpeg?auto=compress&cs=tinysrgb&w=1400',
  },
  {
    slug: 'mobiele-surveillance',
    number: '03',
    title: 'Mobiele surveillance',
    short: 'Rondes en snelle inzet waar en wanneer u het nodig heeft.',
    description:
      'Mobiele surveillance voor objecten die geen permanente bewaking nodig hebben. Rondes, alarmopvolging en zichtbare aanwezigheid op de momenten die ertoe doen.',
    bullets: [
      'Periodieke rondes op vaste tijden',
      'Alarmopvolging en snel ter plaatse',
      'Zichtbare aanwezigheid als preventie',
      'Rapportage van bevindingen',
    ],
    image: 'https://images.pexels.com/photos/17507234/pexels-photo-17507234.jpeg?auto=compress&cs=tinysrgb&w=1400',
  },
  {
    slug: 'toegangscontrole',
    number: '04',
    title: 'Toegangscontrole',
    short: 'Bepaal wie toegang heeft tot welke ruimtes en wanneer.',
    description:
      'Toegangscontrole op maat, van eenvoudige registratie tot uitgebreide systemen die koppelen met uw bedrijfsvoering en beveiligingsbeleid.',
    bullets: [
      'Registratie van bezoekers en personeel',
      'Koppeling met beveiligingsbeleid',
      'Beheer van toegangsrechten',
      'Inzicht en rapportage',
    ],
    image: 'https://images.pexels.com/photos/19922732/pexels-photo-19922732.jpeg?auto=compress&cs=tinysrgb&w=1400',
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'CML denkt mee over de inzetbaarheid en komt met oplossingen. De communicatie is direct, helder en professioneel.',
    name: 'Operationeel manager',
    role: 'Retailorganisatie',
  },
  {
    quote:
      'Tijdens een meerdaags evenement hadden we constante rust op de vloer. Het team van CML pakte het volledig op.',
    name: 'Evenementenorganisator',
    role: 'Festival',
  },
  {
    quote:
      'Snelle reactie bij alarmopvolging en duidelijke rapportage. Precies wat we nodig hebben voor onze objecten.',
    name: 'Facilitair manager',
    role: 'Bedrijventerrein',
  },
];

export interface Capability {
  label: string;
}

export const capabilities: Capability[] = [
  { label: '24/7 BESCHIKBAAR' },
  { label: 'OBJECTBEVEILIGING' },
  { label: 'EVENEMENTENBEVEILIGING' },
  { label: 'MOBIELE SURVEILLANCE' },
  { label: 'TOEGANGSCONTROLE' },
  { label: 'MAATWERK' },
];

export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: '24/7', label: 'BESCHIKBAAR' },
  { value: 'MAATWERK', label: 'BEVEILIGING' },
  { value: 'DIRECT', label: 'CONTACT' },
  { value: 'PROFESSIONEEL', label: 'OPGELEID' },
];

export const storySteps = [
  { k: '24/7', t: 'Altijd beschikbaar' },
  { k: '01', t: 'Professioneel getrainde beveiligers' },
  { k: '02', t: 'Snel reageren op onverwachte situaties' },
  { k: '03', t: 'Maatwerk voor iedere locatie' },
];

export const quoteTypes = ['Bedrijf', 'Object', 'Evenement', 'Anders'] as const;
export type QuoteType = (typeof quoteTypes)[number];
