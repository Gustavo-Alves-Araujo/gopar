'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { redirect } from 'next/navigation'
import { useParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { useLang } from '@/contexts/LanguageContext'

type ProductLocale = {
  name: string
  nameEn: string
  image: string
  heroLabel: string
  description: string
  specs: { label: string; value: string }[]
  applications: string[]
  origins: string[]
  packaging: string[]
}

type ProductEntry = {
  pt: ProductLocale
  en: ProductLocale
}

const productData: Record<string, ProductEntry> = {
  enxofre: {
    pt: {
      name: 'Enxofre', nameEn: 'Sulphur', image: '/images/enxofre.jpg',
      heroLabel: 'Nosso Produto', description: 'Comercializamos enxofre granulado e pastilhado para uso agrícola e industrial. Conectamos fornecedores internacionais qualificados a compradores no Brasil e em outros mercados estratégicos.',
      specs: [{ label: 'Tipo', value: 'Granulado' }, { label: 'Pureza mínima', value: '99.95% S' }, { label: 'Cinzas (máx.)', value: '≤ 0.05%' }, { label: 'Umidade (máx.)', value: '≤ 0.5%' }, { label: 'Cor', value: 'Amarelo vivo' }, { label: 'Acidez H₂SO₄ (máx.)', value: '≤ 0.02%' }, { label: 'Carbono (máx.)', value: '≤ 0.03%' }, { label: 'Arsênio, selênio, telúrio e chumbo', value: 'Ausente' }, { label: 'Impurezas mecânicas (papel, madeira, areia)', value: 'Não permitido' }],
      applications: ['Fertilização de solos agrícolas (acidificação)', 'Matéria-prima para produção de H₂SO₄', 'Fungicida e defensivo agrícola', 'Indústria química e petroquímica'],
      origins: ['Oriente Médio', 'Refinarias Internacionais', 'Mercado Spot Global'],
      packaging: ['Sacos 50kg', 'BigBag 1 tonelada', 'Granel'],
    },
    en: {
      name: 'Sulphur', nameEn: 'Sulphur', image: '/images/enxofre.jpg',
      heroLabel: 'Our Product', description: 'We source and trade granular and pastille sulphur for agricultural and industrial use. We connect qualified international suppliers with buyers in Brazil and other strategic markets.',
      specs: [{ label: 'Type', value: 'Granular' }, { label: 'Minimum purity', value: '99.95% S' }, { label: 'Ash content (max.)', value: '≤ 0.05%' }, { label: 'Moisture (max.)', value: '≤ 0.5%' }, { label: 'Color', value: 'Bright yellow' }, { label: 'Acidity H₂SO₄ (max.)', value: '≤ 0.02%' }, { label: 'Carbon content (max.)', value: '≤ 0.03%' }, { label: 'Arsenic, selenium, tellurium and lead', value: 'None' }, { label: 'Mechanical impurities (paper, wood, sand)', value: 'Not allowed' }],
      applications: ['Agricultural soil fertilization (acidification)', 'Raw material for H₂SO₄ production', 'Fungicide and agricultural defense', 'Chemical and petrochemical industry'],
      origins: ['Middle East', 'International Refineries', 'Global Spot Market'],
      packaging: ['50kg bags', 'BigBag 1 ton', 'Bulk'],
    },
  },
  fertilizantes: {
    pt: {
      name: 'Fertilizantes', nameEn: 'Fertilizers', image: '/images/fertilizante.jpg',
      heroLabel: 'Nosso Produto', description: 'Atuamos no desenvolvimento de mercado e representação comercial de fertilizantes minerais e organominerais. Conectamos fornecedores a produtores, cooperativas e distribuidores em todo o Brasil e mercados internacionais.',
      specs: [{ label: 'Produtos', value: 'MAP, DAP, Ureia, KCL, NPK' }, { label: 'Origem', value: 'China, Rússia, Marrocos, Belarus' }, { label: 'Padrão', value: 'ABNT / Internacional' }, { label: 'Volume', value: 'Negociável por demanda' }],
      applications: ['Agricultura de larga escala', 'Pecuária e pastagens', 'Horticultura e fruticultura', 'Cooperativas e distribuidores'],
      origins: ['China', 'Rússia', 'Marrocos', 'Belarus', 'Brasil'],
      packaging: ['Sacos 50kg', 'BigBag 600kg / 1MT', 'Granel'],
    },
    en: {
      name: 'Fertilizers', nameEn: 'Fertilizers', image: '/images/fertilizante.jpg',
      heroLabel: 'Our Product', description: 'We develop markets and provide commercial representation for mineral and organomineral fertilizers. We connect suppliers to producers, cooperatives and distributors in Brazil and international markets.',
      specs: [{ label: 'Products', value: 'MAP, DAP, Urea, KCL, NPK' }, { label: 'Origin', value: 'China, Russia, Morocco, Belarus' }, { label: 'Standard', value: 'Brazilian / International' }, { label: 'Volume', value: 'Negotiable by demand' }],
      applications: ['Large-scale agriculture', 'Livestock and pastures', 'Horticulture and fruit growing', 'Cooperatives and distributors'],
      origins: ['China', 'Russia', 'Morocco', 'Belarus', 'Brazil'],
      packaging: ['50kg bags', 'BigBag 600kg / 1MT', 'Bulk'],
    },
  },
  soja: {
    pt: {
      name: 'Soja', nameEn: 'Soybeans', image: '/images/soja.jpg',
      heroLabel: 'Nosso Produto', description: 'Desenvolvemos negócios e representamos comercialmente a soja brasileira para o mercado nacional e internacional. Conectamos produtores, cooperativas e tradings a compradores qualificados com segurança e eficiência.',
      specs: [{ label: 'Proteína', value: '46-48% (base seca)' }, { label: 'Umidade', value: 'Máx. 14%' }, { label: 'Impurezas', value: 'Máx. 1%' }, { label: 'Padrão', value: 'Conab / USDA' }],
      applications: ['Esmagamento industrial', 'Produção de óleo vegetal', 'Ração animal (farelo)', 'Exportação internacional'],
      origins: ['Mato Grosso', 'Paraná', 'Goiás', 'Mato Grosso do Sul'],
      packaging: ['Granel', 'Contêiner 20/40ft', 'Navio (shipment)'],
    },
    en: {
      name: 'Soybeans', nameEn: 'Soybeans', image: '/images/soja.jpg',
      heroLabel: 'Our Product', description: 'We develop business and commercially represent Brazilian soybeans for domestic and international markets. We connect producers, cooperatives and trading companies to qualified buyers with security and efficiency.',
      specs: [{ label: 'Protein', value: '46-48% (dry basis)' }, { label: 'Moisture', value: 'Max. 14%' }, { label: 'Impurities', value: 'Max. 1%' }, { label: 'Standard', value: 'Conab / USDA' }],
      applications: ['Industrial crushing', 'Vegetable oil production', 'Animal feed (meal)', 'International export'],
      origins: ['Mato Grosso', 'Paraná', 'Goiás', 'Mato Grosso do Sul'],
      packaging: ['Bulk', '20/40ft Container', 'Vessel (shipment)'],
    },
  },
  milho: {
    pt: {
      name: 'Milho', nameEn: 'Corn', image: '/images/milho.jpg',
      heroLabel: 'Nosso Produto', description: 'Atuamos no desenvolvimento de negócios e representação comercial de milho grão para o mercado nacional e internacional. Conectamos a cadeia produtiva desde a origem nos principais polos até o destino final.',
      specs: [{ label: 'Umidade', value: 'Máx. 14%' }, { label: 'Ardidos', value: 'Máx. 6%' }, { label: 'Impurezas', value: 'Máx. 1.5%' }, { label: 'Padrão', value: 'Conab / USDA' }],
      applications: ['Ração animal e suinocultura', 'Produção de amido e etanol', 'Alimentos processados', 'Exportação internacional'],
      origins: ['Mato Grosso', 'Goiás', 'Mato Grosso do Sul', 'Paraná'],
      packaging: ['Granel', 'Contêiner 20/40ft', 'Navio (shipment)'],
    },
    en: {
      name: 'Corn', nameEn: 'Corn', image: '/images/milho.jpg',
      heroLabel: 'Our Product', description: 'We develop business and commercially represent grain corn for domestic and international markets. We connect the production chain from the main hubs to the final destination.',
      specs: [{ label: 'Moisture', value: 'Max. 14%' }, { label: 'Damaged', value: 'Max. 6%' }, { label: 'Impurities', value: 'Max. 1.5%' }, { label: 'Standard', value: 'Conab / USDA' }],
      applications: ['Animal feed and hog farming', 'Starch and ethanol production', 'Processed foods', 'International export'],
      origins: ['Mato Grosso', 'Goiás', 'Mato Grosso do Sul', 'Paraná'],
      packaging: ['Bulk', '20/40ft Container', 'Vessel (shipment)'],
    },
  },
  acucar: {
    pt: {
      name: 'Açúcar IC45', nameEn: 'Sugar IC45', image: '/images/acucar.jpg',
      heroLabel: 'Nosso Produto', description: 'Desenvolvemos negócios e representamos comercialmente o açúcar cristal IC45 para mercado interno e exportação. Operamos com rastreabilidade completa, documentação e suporte logístico para operações de grande escala.',
      specs: [{ label: 'Padrão ICUMSA', value: '45 RBU' }, { label: 'Polarização', value: 'Mín. 99.8°' }, { label: 'Umidade', value: 'Máx. 0.04%' }, { label: 'Cor', value: 'Branco cristal' }],
      applications: ['Alimentação humana direta', 'Indústria de bebidas e sucos', 'Confeitaria e panificação', 'Exportação para Ásia, Oriente Médio e África'],
      origins: ['São Paulo', 'Minas Gerais', 'Mato Grosso'],
      packaging: ['Sacos 50kg', 'BigBag 1MT', 'Granel (VHP)'],
    },
    en: {
      name: 'Sugar IC45', nameEn: 'Sugar IC45', image: '/images/acucar.jpg',
      heroLabel: 'Our Product', description: 'We develop business and commercially represent IC45 crystal sugar for domestic and export markets. We operate with complete traceability, documentation and logistics support for large-scale operations.',
      specs: [{ label: 'ICUMSA Standard', value: '45 RBU' }, { label: 'Polarization', value: 'Min. 99.8°' }, { label: 'Moisture', value: 'Max. 0.04%' }, { label: 'Color', value: 'Crystal white' }],
      applications: ['Direct human consumption', 'Beverage and juice industry', 'Confectionery and baking', 'Export to Asia, Middle East and Africa'],
      origins: ['São Paulo', 'Minas Gerais', 'Mato Grosso'],
      packaging: ['50kg bags', 'BigBag 1MT', 'Bulk (VHP)'],
    },
  },
  sorgo: {
    pt: {
      name: 'Sorgo', nameEn: 'Sorghum', image: '/images/sorgo.jpg',
      heroLabel: 'Nosso Produto', description: 'Atuamos no desenvolvimento de negócios e representação comercial de sorgo granífero. Uma alternativa competitiva ao milho em diversas aplicações industriais e de nutrição animal.',
      specs: [{ label: 'Proteína', value: '8-11%' }, { label: 'Umidade', value: 'Máx. 13%' }, { label: 'Impurezas', value: 'Máx. 1%' }, { label: 'Tipo', value: 'Granífero' }],
      applications: ['Ração animal (bovinos, suínos, aves)', 'Silagem', 'Alimentos e amido', 'Bioenergia'],
      origins: ['Goiás', 'Minas Gerais', 'Mato Grosso'],
      packaging: ['Granel', 'Contêiner 20/40ft'],
    },
    en: {
      name: 'Sorghum', nameEn: 'Sorghum', image: '/images/sorgo.jpg',
      heroLabel: 'Our Product', description: 'We develop business and commercially represent grain sorghum. A competitive alternative to corn in various industrial and animal nutrition applications.',
      specs: [{ label: 'Protein', value: '8-11%' }, { label: 'Moisture', value: 'Max. 13%' }, { label: 'Impurities', value: 'Max. 1%' }, { label: 'Type', value: 'Grain' }],
      applications: ['Animal feed (cattle, hogs, poultry)', 'Silage', 'Food and starch', 'Bioenergy'],
      origins: ['Goiás', 'Minas Gerais', 'Mato Grosso'],
      packaging: ['Bulk', '20/40ft Container'],
    },
  },
}

export default function ProductPage() {
  const params = useParams()
  const slug = typeof params.slug === 'string' ? params.slug : Array.isArray(params.slug) ? params.slug[0] : ''
  const { lang } = useLang()

  const entry = productData[slug]
  if (!entry) {
    redirect('/servicos')
  }

  const p = entry[lang]

  const bodyRef = useRef(null)
  const ctaRef = useRef(null)
  const bodyInView = useInView(bodyRef, { once: true, margin: '-60px' })
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' })

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="product-page-hero">
        <img
          className="product-page-hero__img"
          src={p.image}
          alt={p.name}
        />
        <div className="product-page-hero__overlay" />
        <motion.div
          className="product-page-hero__content container-page"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="product-page-hero__badge">{p.heroLabel}</span>
          <h1 className="product-page-hero__name">{p.name}</h1>
          {p.name !== p.nameEn && (
            <p className="product-page-hero__name-en">{p.nameEn}</p>
          )}
          <p className="product-page-hero__desc">{p.description}</p>
        </motion.div>
      </section>

      {/* BODY */}
      <section className="product-page-body" ref={bodyRef}>
        <div className="container-page">
          <div className="product-page-grid">
            {/* Specifications */}
            <motion.div
              className="product-info-card"
              initial={{ opacity: 0, y: 30 }}
              animate={bodyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0 }}
            >
              <h2 className="product-info-card__title">
                {lang === 'pt' ? 'Especificações Técnicas' : 'Technical Specifications'}
              </h2>
              <div className="product-specs-table">
                {p.specs.map((spec, i) => (
                  <div className="product-specs-table__row" key={i}>
                    <span className="product-specs-table__label">{spec.label}</span>
                    <span className="product-specs-table__value">{spec.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Applications */}
            <motion.div
              className="product-info-card"
              initial={{ opacity: 0, y: 30 }}
              animate={bodyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="product-info-card__title">
                {lang === 'pt' ? 'Aplicações' : 'Applications'}
              </h2>
              <div className="product-list">
                {p.applications.map((app, i) => (
                  <div className="product-list__item" key={i}>{app}</div>
                ))}
              </div>
            </motion.div>

            {/* Packaging */}
            <motion.div
              className="product-info-card"
              initial={{ opacity: 0, y: 30 }}
              animate={bodyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="product-info-card__title">
                {lang === 'pt' ? 'Embalagem & Logística' : 'Packaging & Logistics'}
              </h2>
              <div className="product-list">
                {p.packaging.map((pkg, i) => (
                  <div className="product-list__item" key={i}>{pkg}</div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="product-page-cta" ref={ctaRef}>
        <motion.div
          className="container-page"
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2>
            {lang === 'pt' ? 'Interessado neste produto?' : 'Interested in this product?'}
          </h2>
          <p>
            {lang === 'pt'
              ? 'Solicite uma cotação personalizada e nossa equipe entrará em contato com as melhores condições.'
              : 'Request a personalized quote and our team will get back to you with the best conditions.'}
          </p>
          <a href="/cotacao" className="product-page-cta__btn">
            {lang === 'pt' ? 'Solicitar Cotação' : 'Request a Quote'}
          </a>
          <br />
          <a href="/servicos" className="product-page-back">
            ← {lang === 'pt' ? 'Voltar para Produtos' : 'Back to Products'}
          </a>
        </motion.div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  )
}
