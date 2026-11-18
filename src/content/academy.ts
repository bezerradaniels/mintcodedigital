// Mintcode Academy en español latino, sin mención de localidades: rutas de aprendizaje, artículos y glosario.

export interface Trilha {
  slug: string;
  n: string;
  name: string;
  desc: string;
}

export interface AcademyArticle {
  trilha: string;
  slug: string;
  title: string;
  h1: [string, string];
  level: string;
  minutes: number;
  lead: string;
  summary: string[];
  formula?: [string, string];
  related: string[];
  body: string;
}

export interface GlossaryItem {
  term: string;
  def: string;
  article?: string;
}

export const trilhas: Trilha[] = [
  {
    slug: "fundamentos",
    n: "01",
    name: "Fundamentos",
    desc: "Lo esencial del marketing digital, sin tecnicismos.",
  },
  {
    slug: "trafico-pago",
    n: "02",
    name: "Tráfico pago",
    desc: "Google Ads, Meta Ads y cómo medir tus campañas.",
  },
  {
    slug: "seo",
    n: "03",
    name: "SEO",
    desc: "Cómo aparecer en Google y en las respuestas de IA.",
  },
  {
    slug: "sitios-y-landing-pages",
    n: "04",
    name: "Sitios y landing pages",
    desc: "Qué hace que una página convierta visitas en clientes.",
  },
  {
    slug: "metricas",
    n: "05",
    name: "Métricas",
    desc: "Los números que importan y cómo interpretar cada uno.",
  },
];

export const startHere: string[] = [
  "fundamentos/que-es-el-marketing-digital",
  "fundamentos/trafico-organico-y-trafico-pago",
  "fundamentos/que-es-una-landing-page",
  "fundamentos/que-es-seo",
  "fundamentos/como-medir-los-resultados",
];

export const articles: AcademyArticle[] = [
  // ------------------------------------------------------------ Fundamentos
  {
    trilha: "fundamentos",
    slug: "que-es-el-marketing-digital",
    title: "Qué es el marketing digital",
    h1: ["Qué es el marketing digital ", "y cómo funciona."],
    level: "Principiante",
    minutes: 4,
    lead: "Entiende qué es el marketing digital, cuáles son los canales principales y por dónde puede empezar tu empresa.",
    summary: [
      "Marketing digital es dar a conocer tu empresa y vender usando internet: sitio web, buscadores, redes sociales y anuncios.",
      "Su gran ventaja es poder medir qué resultado trae cada acción.",
      "Para cualquier negocio, lo esencial es ser encontrado y facilitar el contacto.",
    ],
    related: ["tráfico orgánico", "tráfico pago", "landing page"],
    body: `
<h2 id="que-es">Qué es el marketing digital</h2>
<p>El marketing digital es el conjunto de acciones que una empresa realiza en internet para ser encontrada, atraer personas interesadas y transformarlas en clientes. Incluye el sitio web, las búsquedas en Google, las redes sociales, los anuncios pagos y la atención por WhatsApp o correo electrónico.</p>
<h2 id="principales-canales">Principales canales</h2>
<ul>
<li><strong>Sitio web:</strong> tu espacio propio en internet, donde el cliente conoce tu propuesta y toma decisiones.</li>
<li><strong>SEO:</strong> el trabajo continuo para aparecer de forma orgánica en los buscadores.</li>
<li><strong>Tráfico pago:</strong> anuncios en Google, Instagram y Facebook para atraer clientes de inmediato.</li>
<li><strong>Redes sociales:</strong> presencia, contenido y relación diaria con tu audiencia.</li>
</ul>
<h2 id="por-donde-empezar">Por dónde empezar</h2>
<p>La base es contar con un sitio web rápido, una presencia bien cuidada en Google y una vía directa para que el cliente te escriba por WhatsApp o formulario. A partir de ahí, los anuncios y el contenido aceleran el crecimiento.</p>`,
  },
  {
    trilha: "fundamentos",
    slug: "trafico-organico-y-trafico-pago",
    title: "Tráfico orgánico y tráfico pago",
    h1: ["Tráfico orgánico y tráfico pago: ", "cuál es la diferencia."],
    level: "Principiante",
    minutes: 5,
    lead: "Dos formas de llevar visitantes a tu sitio web. Mira cómo funciona cada una y cuándo utilizarlas.",
    summary: [
      "Tráfico es el nombre que reciben las visitas que llegan a tu sitio o perfil.",
      "El tráfico orgánico llega desde buscadores y redes, sin pagar por cada clic.",
      "El tráfico pago proviene de anuncios: inviertes y recibes visitas mientras la campaña está activa.",
    ],
    related: ["tráfico orgánico", "tráfico pago", "SEO"],
    body: `
<h2 id="trafico-organico">Tráfico orgánico</h2>
<p>Es el visitante que llega por cuenta propia, normalmente después de realizar una búsqueda en Google. No hay un pago por clic, pero sí requiere trabajo: el sitio debe estar bien estructurado y ofrecer contenido útil. Toma más tiempo construirlo, pero sigue atrayendo visitas de forma continua.</p>
<h2 id="trafico-pago">Tráfico pago</h2>
<p>Es el visitante que llega a través de un anuncio. Defines el presupuesto y el público, y pagas a Google o Meta por el alcance o los clics. El resultado es rápido y se mantiene activo mientras inviertes en la campaña.</p>
<h2 id="cual-elegir">Cuál elegir</h2>
<p>En la práctica, ambos se complementan. El tráfico pago trae resultados rápidos y permite validar ofertas; el orgánico construye una base sólida que reduce el costo de adquisición a mediano plazo.</p>`,
  },
  {
    trilha: "fundamentos",
    slug: "que-es-una-landing-page",
    title: "Qué es una landing page",
    h1: ["Qué es una landing page ", "y para qué sirve."],
    level: "Principiante",
    minutes: 4,
    lead: "La página creada para una única oferta o acción, indispensable en campañas de publicidad digital.",
    summary: [
      "Una landing page es una página enfocada en un solo objetivo, como solicitar una cotización o agendar una cita.",
      "Elimina distracciones: sin menús extensos ni múltiples caminos de fuga.",
      "Es la página de destino ideal para rentabilizar tus anuncios.",
    ],
    related: ["landing page", "conversión", "tasa de conversión"],
    body: `
<h2 id="definicion">Definición</h2>
<p>Una landing page, o página de aterrizaje, es una página diseñada para recibir al visitante y guiarlo hacia una acción concreta: pedir un presupuesto, agendar una reunión, escribir por WhatsApp o comprar.</p>
<h2 id="diferencia-con-el-sitio">Diferencia frente a un sitio tradicional</h2>
<p>Un sitio institucional presenta toda la empresa, con varias secciones y enlaces. La landing page presenta una oferta puntual con un llamado a la acción principal. Menos distracciones significan mayor tasa de conversión.</p>
<h2 id="cuando-usarla">Cuándo usarla</h2>
<p>Siempre que lances una campaña con un objetivo específico. El anuncio despierta el interés y la landing page entrega exactamente lo prometido.</p>`,
  },
  {
    trilha: "fundamentos",
    slug: "que-es-seo",
    title: "Qué es SEO",
    h1: ["Qué es SEO y ", "cómo funciona."],
    level: "Principiante",
    minutes: 6,
    lead: "SEO es el conjunto de prácticas para que tu sitio aparezca mejor posicionado en los buscadores, sin pagar por clic.",
    summary: [
      "SEO significa Search Engine Optimization (optimización para motores de búsqueda).",
      "Combina tres pilares: base técnica, contenido relevante y autoridad.",
      "Es un activo acumulativo y medible para tu empresa.",
    ],
    related: ["SEO", "palabra clave", "SEO local"],
    body: `
<h2 id="que-es-seo">Qué es SEO</h2>
<p>El SEO es el trabajo de hacer que tu sitio web sea fácil de encontrar, entender y navegar tanto para Google como para las personas. El objetivo es aparecer cuando alguien busca las soluciones que ofreces.</p>
<h2 id="tres-pilares">Los tres pilares del SEO</h2>
<ul>
<li><strong>Técnico:</strong> velocidad de carga, adaptación móvil y código limpio que los buscadores puedan indexar.</li>
<li><strong>Contenido:</strong> páginas y artículos que responden con claridad a las dudas reales de tus clientes.</li>
<li><strong>Autoridad:</strong> reseñas, menciones y enlaces desde otros sitios relevantes.</li>
</ul>
<h2 id="cuanto-tiempo-toma">Cuánto tiempo toma</h2>
<p>Las mejoras técnicas pueden impactar en pocas semanas, mientras que el posicionamiento competitivo se consolida mes a mes. Por eso el SEO es una de las inversiones más rentables a mediano y largo plazo.</p>`,
  },
  {
    trilha: "fundamentos",
    slug: "como-medir-los-resultados",
    title: "Cómo medir los resultados",
    h1: ["Cómo medir los resultados ", "del marketing digital."],
    level: "Principiante",
    minutes: 5,
    lead: "Qué indicadores seguir para saber si tu inversión en marketing está generando retorno real.",
    summary: [
      "Mide lo que está cerca de la venta: contactos calificados, presupuestos y cierres.",
      "Las visitas y los 'me gusta' ayudan, pero no pagan las cuentas.",
      "Un reporte simple cada mes transforma la toma de decisiones.",
    ],
    related: ["conversión", "CPA", "ROAS"],
    body: `
<h2 id="empieza-por-el-objetivo">Empieza por el objetivo</h2>
<p>Antes de mirar gráficos, define qué significa éxito para tu negocio: ¿más mensajes de WhatsApp, más citas agendadas, más ventas en línea? Ese resultado debe guiar todo el análisis.</p>
<h2 id="numeros-que-importan">Los números que importan</h2>
<ul>
<li><strong>Conversiones:</strong> cuántas personas realizaron la acción clave.</li>
<li><strong>CPA:</strong> cuánto cuesta generar cada contacto o cada venta.</li>
<li><strong>ROAS:</strong> cuánto facturaste por cada unidad monetaria invertida en anuncios.</li>
</ul>
<h2 id="rutina-simple">Una rutina simple</h2>
<p>Elige pocos indicadores, revísalos de forma periódica y compáralos con el mes anterior. La consistencia al medir es lo que permite escalar con seguridad.</p>`,
  },

  // --------------------------------------------------------------- Métricas
  {
    trilha: "metricas",
    slug: "que-es-cpc",
    title: "Qué es CPC",
    h1: ["Qué es CPC y ", "cómo calcularlo."],
    level: "Principiante",
    minutes: 4,
    lead: "Entiende el costo por clic y por qué por sí solo no dice si una campaña es rentable.",
    summary: [
      "CPC significa Costo por Clic.",
      "Muestra cuánto pagas, en promedio, por cada clic en tu anuncio.",
      "Un CPC bajo no garantiza ventas: mira siempre las conversiones.",
    ],
    formula: ["Fórmula", "CPC = Inversión ÷ Clics"],
    related: ["CTR", "CPA", "conversión"],
    body: `
<h2 id="que-es-cpc">Qué es CPC</h2>
<p>El CPC es el valor promedio que pagas cada vez que alguien hace clic en tu anuncio. Es una de las métricas más frecuentes en Google Ads y Meta Ads.</p>
<h2 id="como-calcular">Cómo calcularlo</h2>
{{formula}}
<p>Ejemplo: si invertiste $500 y recibiste 250 clics, tu CPC promedio fue de $2.</p>
<h2 id="cpc-bajo-es-bueno">¿Un CPC bajo es siempre bueno?</h2>
<p>No necesariamente. Un clic barato que nunca se convierte en contacto termina saliendo caro. Por eso, analiza siempre el CPC junto con la tasa de conversión y el CPA.</p>`,
  },
  {
    trilha: "metricas",
    slug: "que-es-ctr",
    title: "Qué es CTR",
    h1: ["Qué es CTR y ", "cómo calcularlo."],
    level: "Principiante",
    minutes: 4,
    lead: "La tasa de clics muestra qué tanto llaman la atención tus anuncios y resultados de búsqueda.",
    summary: [
      "CTR significa Click-Through Rate, o tasa de clics.",
      "Es el porcentaje de personas que vieron el anuncio y hicieron clic.",
      "Un CTR bajo indica que el mensaje, el diseño o el público necesitan ajustes.",
    ],
    formula: ["Fórmula", "CTR = (Clics ÷ Impresiones) × 100"],
    related: ["CPC", "ROAS", "conversión"],
    body: `
<h2 id="que-es-ctr">Qué es CTR</h2>
<p>El CTR es el porcentaje de personas que hicieron clic en un anuncio o enlace en relación con el total de veces que fue mostrado (impresiones). Cuanto más alto, mayor interés despertó tu propuesta.</p>
<h2 id="como-calcular">Cómo calcularlo</h2>
{{formula}}
<p>Ejemplo: si tu anuncio se mostró 10.000 veces y recibió 300 clics, el CTR fue del 3%.</p>
<h2 id="como-mejorar">Cómo mejorarlo</h2>
<p>Prueba diferentes títulos e imágenes, afina la segmentación y deja muy claro en el anuncio qué encontrará la persona al hacer clic.</p>`,
  },
  {
    trilha: "metricas",
    slug: "que-es-roas",
    title: "Qué es ROAS",
    h1: ["Qué es ROAS y ", "cómo calcularlo."],
    level: "Principiante",
    minutes: 5,
    lead: "Conoce la métrica que muestra cuánto volvió en ventas por cada dólar invertido en publicidad.",
    summary: [
      "ROAS significa Return on Ad Spend (retorno sobre la inversión publicitaria).",
      "Muestra cuánto facturaste por cada $1 invertido en anuncios.",
      "Un ROAS mayor a 1 indica que los ingresos superaron el gasto publicitario.",
    ],
    formula: ["Fórmula", "ROAS = Ingresos ÷ Inversión"],
    related: ["CPA", "CPC", "conversión", "ticket promedio"],
    body: `
<h2 id="que-es-roas">Qué es ROAS</h2>
<p>El ROAS es una métrica de tráfico pago que compara los ingresos generados por los anuncios con el monto invertido en ellos. Es una de las formas más directas de evaluar el rendimiento comercial de una campaña.</p>
<h2 id="como-calcular">Cómo calcularlo</h2>
{{formula}}
<p><strong>Ejemplo:</strong> una empresa invirtió $1.000 en anuncios y generó $4.000 en ventas directas desde esas campañas. El ROAS es 4 (o 4×): cada $1 invertido produjo $4 en ventas.</p>
<h2 id="roas-no-es-ganancia">ROAS no es ganancia neta</h2>
<p>El ROAS mide facturación bruta. Para conocer la utilidad real, recuerda descontar el costo del producto o servicio, impuestos y gastos operativos.</p>`,
  },
  {
    trilha: "metricas",
    slug: "que-es-cpa",
    title: "Qué es CPA",
    h1: ["Qué es CPA y ", "cómo calcularlo."],
    level: "Principiante",
    minutes: 5,
    lead: "El costo por adquisición muestra cuánto cuesta realmente conseguir cada contacto o cada venta.",
    summary: [
      "CPA significa Costo por Adquisición.",
      "Muestra cuánto inviertes, en promedio, por cada lead o venta lograda.",
      "Evalúa siempre el CPA frente al valor que cada cliente aporta a tu empresa.",
    ],
    formula: ["Fórmula", "CPA = Inversión ÷ Conversiones"],
    related: ["CPC", "ROAS", "conversión"],
    body: `
<h2 id="que-es-cpa">Qué es CPA</h2>
<p>El CPA es el costo promedio para lograr una adquisición, que puede ser una venta en línea, un contacto por WhatsApp o un formulario enviado, según lo que hayas definido como objetivo.</p>
<h2 id="como-calcular">Cómo calcularlo</h2>
{{formula}}
<p>Ejemplo: si invertiste $800 y obtuviste 40 contactos calificados, tu CPA fue de $20 por contacto.</p>
<h2 id="como-interpretarlo">Cómo interpretarlo</h2>
<p>Un CPA es bueno o malo en función de tu margen y tasa de cierre. Si cada contacto cuesta $20 y uno de cada cinco se convierte en una venta de $500, la campaña es altamente rentable.</p>`,
  },
  {
    trilha: "metricas",
    slug: "como-calcular-la-ganancia-de-una-campana",
    title: "Cómo calcular la ganancia de una campaña",
    h1: ["Cómo calcular la ", "ganancia de una campaña."],
    level: "Intermedio",
    minutes: 6,
    lead: "Facturar no es lo mismo que ganar. Mira cómo calcular el retorno neto real de tus campañas.",
    summary: [
      "La ganancia es lo que queda después de descontar todos los costos asociados.",
      "Incluye la inversión publicitaria, el costo del producto o servicio y los impuestos.",
      "Conocer tu punto de equilibrio te permite escalar campañas con seguridad.",
    ],
    formula: ["Fórmula", "Ganancia = Ingresos − Inversión − Costos"],
    related: ["ROAS", "CPA", "ticket promedio"],
    body: `
<h2 id="que-entra-en-la-cuenta">Qué entra en la cuenta</h2>
<p>Para calcular la ganancia real de una campaña, suma todos los costos necesarios para entregar esas ventas: la inversión en anuncios, el costo directo del producto o servicio, comisiones de pasarela de pago, impuestos y logística.</p>
<h2 id="como-calcular">Cómo calcularla</h2>
{{formula}}
<p>Ejemplo: si la campaña generó $4.000 en ventas, con $1.000 de inversión en anuncios y $2.000 en costos operativos y de producto, la ganancia neta fue de $1.000.</p>
<h2 id="punto-de-equilibrio">Punto de equilibrio</h2>
<p>Calcula el ROAS mínimo en el que tu empresa no pierde ni gana dinero. Por encima de ese número comienzas a generar utilidad real en cada venta.</p>`,
  },

  // ----------------------------------------------------------- Tráfico pago
  {
    trilha: "trafico-pago",
    slug: "que-es-remarketing",
    title: "Qué es remarketing",
    h1: ["Qué es remarketing y ", "cuándo usarlo."],
    level: "Principiante",
    minutes: 4,
    lead: "Anuncios dirigidos a quienes ya visitaron tu sitio web, recordándoles volver y dar el siguiente paso.",
    summary: [
      "El remarketing muestra anuncios a personas que ya interactuaron con tu marca.",
      "Funciona mediante un píxel o etiqueta instalada en tu sitio web.",
      "Suele tener una tasa de conversión mucho más alta porque el público ya te conoce.",
    ],
    related: ["píxel", "conversión"],
    body: `
<h2 id="como-funciona">Cómo funciona</h2>
<p>Cuando alguien visita tu sitio web, el píxel registra esa acción. A partir de ahí, puedes mostrarle anuncios específicos en Instagram, Facebook, YouTube o la red de Google para mantener tu propuesta presente.</p>
<h2 id="cuando-usarlo">Cuándo usarlo</h2>
<p>Es ideal cuando el cliente compara opciones antes de decidir: vio tu servicio, pero aún no pidió presupuesto. El anuncio refuerza la confianza y facilita el regreso.</p>
<h2 id="buenas-practicas">Buenas prácticas</h2>
<p>Cuida la frecuencia para no saturar al usuario, define una ventana de tiempo adecuada y ofrece un mensaje claro que invite a conversar.</p>`,
  },
  {
    trilha: "trafico-pago",
    slug: "que-es-el-pixel",
    title: "Qué es el Píxel",
    h1: ["Qué es el Píxel y ", "por qué instalarlo."],
    level: "Principiante",
    minutes: 4,
    lead: "El código que registra las acciones de los visitantes en tu sitio web y alimenta la inteligencia de tus campañas.",
    summary: [
      "El píxel es un fragmento de código que mide qué hacen los usuarios en tu sitio.",
      "Permite registrar conversiones reales y crear públicos de remarketing.",
      "Sin él, las plataformas de anuncios optimizan a ciegas.",
    ],
    related: ["remarketing", "conversión", "CPA"],
    body: `
<h2 id="que-es">Qué es el Píxel</h2>
<p>El píxel es un pequeño código que plataformas como Meta y Google proporcionan para instalar en tu sitio web. Registra eventos clave como ver una página, hacer clic en WhatsApp o completar un formulario.</p>
<h2 id="para-que-sirve">Para qué sirve</h2>
<ul>
<li>Medir con exactitud cuántas conversiones produjo cada anuncio.</li>
<li>Crear audiencias personalizadas de remarketing.</li>
<li>Entrenar al algoritmo para encontrar personas con mayor probabilidad de compra.</li>
</ul>
<h2 id="como-instalarlo">Cómo instalarlo</h2>
<p>Se recomienda instalarlo a través de Google Tag Manager y verificar que cada evento dispare correctamente antes de activar el presupuesto de campaña.</p>`,
  },
  {
    trilha: "trafico-pago",
    slug: "que-es-performance-max",
    title: "Qué es Performance Max",
    h1: ["Qué es Performance Max ", "en Google Ads."],
    level: "Intermedio",
    minutes: 6,
    lead: "La campaña de Google que integra múltiples canales en un solo lugar y optimiza según tus metas de negocio.",
    summary: [
      "Performance Max combina Búsqueda, YouTube, Display, Discover, Gmail y Maps.",
      "Depende de metas de conversión precisas y buenos recursos creativos.",
      "Rinde mejor cuando se alimenta con datos reales de contacto y venta.",
    ],
    related: ["conversión", "CPA", "ROAS"],
    body: `
<h2 id="que-es">Qué es</h2>
<p>Performance Max permite anunciar en todo el inventario de Google desde una única campaña. Tú defines las metas de conversión, el presupuesto y las piezas creativas, y el sistema automatiza la entrega.</p>
<h2 id="que-controlas">Qué controlas tú</h2>
<ul>
<li>Qué acciones se contabilizan como conversión principal.</li>
<li>La segmentación geográfica y el presupuesto diario.</li>
<li>Los textos, imágenes, videos y señales de audiencia.</li>
</ul>
<h2 id="puntos-de-atencion">Puntos de atención</h2>
<p>Dado que la distribución es automática, configurar bien las conversiones en Google Tag Manager y auditar los términos de búsqueda es fundamental para cuidar la rentabilidad.</p>`,
  },

  // -------------------------------------------------------------------- SEO
  {
    trilha: "seo",
    slug: "que-es-una-palabra-clave",
    title: "Qué es una palabra clave",
    h1: ["Qué es una palabra clave ", "y cómo elegirla."],
    level: "Principiante",
    minutes: 5,
    lead: "El término que la persona escribe en Google y que orienta la estructura de tu sitio web y tus campañas.",
    summary: [
      "Una palabra clave es la frase que el usuario busca en Google.",
      "Revela qué problema quiere resolver y qué tan cerca está de comprar.",
      "Elegir los términos correctos atrae visitas con verdadera intención comercial.",
    ],
    related: ["SEO", "SEO local"],
    body: `
<h2 id="que-es">Qué es una palabra clave</h2>
<p>Es la palabra o frase exacta que alguien escribe en un buscador cuando necesita información, un producto o un servicio.</p>
<h2 id="como-elegirla">Cómo elegirla</h2>
<ul>
<li>Piensa en cómo habla tu cliente, no solo en los términos técnicos de tu sector.</li>
<li>Prioriza frases que demuestren intención de contratación, como "presupuesto", "precio", "agencia" o "especialista".</li>
<li>Analiza qué páginas aparecen hoy para esos términos y ofrece una respuesta más clara y completa.</li>
</ul>
<h2 id="donde-usarla">Dónde usarla</h2>
<p>En el título principal (H1), subtítulos (H2), metadatos y texto de la página, siempre escribiendo con naturalidad para las personas.</p>`,
  },
  {
    trilha: "seo",
    slug: "que-es-seo-local",
    title: "Qué es SEO local",
    h1: ["Qué es SEO local ", "y cómo destacar en Google Maps."],
    level: "Principiante",
    minutes: 5,
    lead: "Cómo lograr que tu empresa aparezca cuando alguien busca un servicio con intención inmediata de contacto.",
    summary: [
      "El SEO local posiciona tu empresa en las búsquedas de proximidad y en Google Maps.",
      "El Perfil de Negocio en Google es la pieza central de esta estrategia.",
      "Las reseñas reales y la información consistente impulsan tu visibilidad.",
    ],
    related: ["SEO", "palabra clave"],
    body: `
<h2 id="que-es">Qué es SEO local</h2>
<p>Es la rama del SEO enfocada en posicionar negocios ante usuarios que buscan soluciones listas para contratar, mostrando resultados destacados en el mapa de Google y en la parte superior del buscador.</p>
<h2 id="perfil-de-negocio">Perfil de Negocio en Google</h2>
<p>Completa todos los campos: categoría principal, horarios, teléfono, sitio web, fotografías reales y lista de servicios. Mantén todo actualizado y responde siempre a las reseñas.</p>
<h2 id="otras-senales">Otras señales que ayudan</h2>
<ul>
<li>Datos de contacto consistentes en tu sitio web y perfiles digitales.</li>
<li>Páginas rápidas con información clara sobre cada servicio.</li>
<li>Valoraciones auténticas de clientes satisfechos.</li>
</ul>`,
  },

  // ---------------------------------------------------- Sitios y landing pages
  {
    trilha: "sitios-y-landing-pages",
    slug: "que-hace-que-una-pagina-convierta",
    title: "Qué hace que una página convierta",
    h1: ["Qué hace que una página ", "convierta visitas en clientes."],
    level: "Principiante",
    minutes: 5,
    lead: "Los tres elementos que ayudan al visitante a tomar acción: claridad, confianza y facilidad.",
    summary: [
      "Una página que convierte deja claro qué ofrece y cuál es el siguiente paso.",
      "Las pruebas de confianza reducen la duda: casos reales, clientes y resultados.",
      "Mientras más simple sea el camino hacia el contacto, mayor será la conversión.",
    ],
    related: ["landing page", "conversión", "tasa de conversión"],
    body: `
<h2 id="claridad">Claridad</h2>
<p>En pocos segundos el visitante debe entender qué haces, para quién y cómo dar el siguiente paso. Un titular directo y un botón de acción visible resuelven la mayor parte del recorrido.</p>
<h2 id="confianza">Confianza</h2>
<p>Proyectos reales en el portafolio, logotipos de clientes, testimonios y canales de contacto claros demuestran solidez profesional detrás de la pantalla.</p>
<h2 id="facilidad">Facilidad</h2>
<p>Formularios directos y acceso rápido a WhatsApp evitan fricciones. Cada campo innecesario reduce el porcentaje de personas que completan el pedido.</p>`,
  },
  {
    trilha: "sitios-y-landing-pages",
    slug: "por-que-importa-la-velocidad-del-sitio",
    title: "Por qué importa la velocidad del sitio",
    h1: ["Por qué importa la ", "velocidad de tu sitio web."],
    level: "Principiante",
    minutes: 4,
    lead: "Un sitio lento pierde clientes antes siquiera de mostrar tu oferta. Conoce su impacto y cómo optimizarlo.",
    summary: [
      "Los sitios lentos multiplican el abandono, especialmente en teléfonos móviles.",
      "Google utiliza la velocidad y la experiencia de página como factor de posicionamiento.",
      "Imágenes en WebP, código limpio y buen servidor marcan la diferencia.",
    ],
    related: ["SEO", "conversión"],
    body: `
<h2 id="el-impacto">El impacto</h2>
<p>La mayoría de las visitas provienen del celular. Si la página tarda varios segundos en responder, el usuario vuelve atrás y elige a otro proveedor.</p>
<h2 id="que-hace-lento-un-sitio">Qué vuelve lento a un sitio</h2>
<ul>
<li>Imágenes pesadas sin compresión moderna (como WebP o AVIF).</li>
<li>Exceso de plugins, scripts de terceros y fuentes innecesarias.</li>
<li>Servidores lentos o sin caché adecuada.</li>
</ul>
<h2 id="como-mejorar">Cómo mejorarlo</h2>
<p>Optimiza cada imagen, carga con prioridad el elemento principal de la pantalla (LCP) y mide periódicamente tu rendimiento con PageSpeed Insights.</p>`,
  },
];

export const glossary: GlossaryItem[] = [
  {
    term: "Conversión",
    def: "Acción valiosa realizada por el visitante, como enviar un formulario, escribir por WhatsApp o comprar.",
  },
  {
    term: "CPA",
    def: "Costo por adquisición: cuánto cuesta lograr cada contacto calificado o cada venta.",
    article: "metricas/que-es-cpa",
  },
  {
    term: "CPC",
    def: "Costo por clic: cuánto pagas cada vez que alguien hace clic en un anuncio.",
    article: "metricas/que-es-cpc",
  },
  {
    term: "CTR",
    def: "Tasa de clics: el porcentaje de personas que vieron un anuncio o enlace y hicieron clic.",
    article: "metricas/que-es-ctr",
  },
  {
    term: "Landing page",
    def: "Página de aterrizaje creada para una única oferta o acción de conversión.",
    article: "fundamentos/que-es-una-landing-page",
  },
  {
    term: "Lead",
    def: "Persona o empresa que demostró interés y dejó sus datos de contacto.",
  },
  {
    term: "Palabra clave",
    def: "El término o frase que una persona escribe en Google al buscar una solución.",
    article: "seo/que-es-una-palabra-clave",
  },
  {
    term: "Performance Max",
    def: "Campaña de Google Ads que anuncia en múltiples canales optimizando según tus metas de conversión.",
    article: "trafico-pago/que-es-performance-max",
  },
  {
    term: "Píxel",
    def: "Código instalado en el sitio que registra las acciones de los visitantes para medir y optimizar anuncios.",
    article: "trafico-pago/que-es-el-pixel",
  },
  {
    term: "Remarketing",
    def: "Estrategia para mostrar anuncios a personas que ya visitaron tu sitio o interactuaron con tu marca.",
    article: "trafico-pago/que-es-remarketing",
  },
  {
    term: "ROAS",
    def: "Retorno sobre la inversión publicitaria: ingresos generados por cada unidad invertida en anuncios.",
    article: "metricas/que-es-roas",
  },
  {
    term: "SEO",
    def: "Optimización para motores de búsqueda con el fin de aparecer mejor posicionado de forma orgánica.",
    article: "fundamentos/que-es-seo",
  },
  {
    term: "SEO local",
    def: "Optimización enfocada en destacar en búsquedas con intención comercial directa y en Google Maps.",
    article: "seo/que-es-seo-local",
  },
  {
    term: "Tasa de conversión",
    def: "Porcentaje de visitantes del sitio que completan la acción deseada.",
  },
  {
    term: "Ticket promedio",
    def: "Valor promedio de venta por cada cliente o pedido.",
  },
  {
    term: "Tráfico orgánico",
    def: "Visitas que llegan de forma natural desde buscadores y contenidos, sin pagar por clic.",
    article: "fundamentos/trafico-organico-y-trafico-pago",
  },
  {
    term: "Tráfico pago",
    def: "Visitas que llegan al sitio a través de campañas de anuncios pagos.",
    article: "fundamentos/trafico-organico-y-trafico-pago",
  },
];

export const popularSearches: string[] = ["CPC", "SEO local", "Píxel", "Performance Max"];
export const popularGlossary: string[] = [
  "CPC",
  "CTR",
  "ROAS",
  "CPA",
  "Píxel",
  "Palabra clave",
  "Landing page",
  "Remarketing",
];
