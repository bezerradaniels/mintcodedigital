// Artículos del Blog Mintcode (novedades, noticias y análisis) en español latino, sin mención de localidades.

export interface BlogCategory {
  key: string;
  label: string;
  singular: string;
}

export interface BlogPost {
  slug: string;
  category: string;
  featured?: boolean;
  date: string;
  minutes: number;
  cover: "a" | "b" | "c" | "d" | "e";
  title: string;
  excerpt: string;
  tags: string[];
  body: string;
}

export const blogCategories: BlogCategory[] = [
  { key: "novedades", label: "Novedades", singular: "Novedad" },
  { key: "noticias", label: "Noticias", singular: "Noticia" },
  { key: "analisis", label: "Análisis", singular: "Análisis" },
];

export const posts: BlogPost[] = [
  {
    slug: "performance-max-para-empresas-que-funcionan",
    category: "analisis",
    featured: true,
    date: "2026-11-12",
    minutes: 8,
    cover: "a",
    title: "Performance Max para negocios: qué funciona y qué evitar",
    excerpt:
      "Analizamos campañas de empresas de servicios y comercio para entender dónde rinde más el presupuesto y dónde se pierde.",
    tags: ["Performance Max", "Google Ads", "Rendimiento"],
    body: `
<p>Performance Max reúne Búsqueda, YouTube, Display, Gmail y Maps en una sola campaña. Para muchas empresas esto suena práctico, pero sin las señales adecuadas el presupuesto se dispersa en canales que no traen clientes reales.</p>
<h2 id="el-escenario">El escenario</h2>
<p>En los últimos meses analizamos campañas de gimnasios, clínicas y comercios. El patrón fue claro: las cuentas con metas de conversión bien configuradas obtuvieron resultados mucho más estables que aquellas que dejaron que la campaña "aprendiera sola".</p>
<p>Performance Max decide dónde anunciar en función de las metas que defines. Si la meta es ambigua, el sistema optimiza para lo que es fácil de medir, y eso no siempre es lo que genera ventas.</p>
<h2 id="donde-rinde-el-presupuesto">Dónde rinde el presupuesto</h2>
<ul>
<li>Segmentación ajustada al público y alcance real de tu operación.</li>
<li>Conversiones de WhatsApp, formularios y llamadas marcadas como principales.</li>
<li>Recursos creativos actualizados cada 30 días.</li>
</ul>
<blockquote>Una buena campaña es la que mide ventas, no solo clics.</blockquote>
<h2 id="errores-mas-comunes">Errores más comunes</h2>
<p>Usar una misma campaña para todos los servicios, dejar la audiencia demasiado abierta y no excluir términos de la propia marca son los errores más frecuentes. El primero diluye el presupuesto, el segundo atrae curiosos sin intención de compra y el tercero hace que la campaña "compre" clientes que ya te estaban buscando.</p>
<h2 id="como-empezar">Cómo empezar</h2>
<p>Comienza con una campaña por objetivo, metas de conversión claras y un presupuesto de prueba de cuatro semanas. Al finalizar, compara el costo por contacto con lo que puedes invertir por cliente y decide si escalas, ajustas o pausas.</p>`,
  },
  {
    slug: "cambios-en-anuncios-de-google-para-pymes",
    category: "noticias",
    date: "2026-11-10",
    minutes: 5,
    cover: "b",
    title: "Qué cambia en los anuncios de Google para pequeñas y medianas empresas",
    excerpt:
      "Qué revisar en tu cuenta y en tu Perfil de Negocio para no perder espacio en las búsquedas con intención de compra.",
    tags: ["Google Ads", "PyMEs"],
    body: `
<p>Google ajusta formatos y recursos de anuncios con frecuencia. En lugar de perseguir cada novedad, conviene mantener una rutina simple de revisión para que tu empresa siga apareciendo bien ante quienes buscan tus servicios.</p>
<h2 id="perfil-de-negocio">Comienza por el Perfil de Negocio</h2>
<p>De ahí salen datos clave como horarios, teléfono, sitio web y reseñas. Los perfiles completos y actualizados ayudan tanto en los resultados orgánicos como en los anuncios que utilizan esa información.</p>
<h2 id="que-revisar">Qué revisar en la cuenta de anuncios</h2>
<ul>
<li>Segmentación y alcance configurados en cada campaña.</li>
<li>Extensiones de llamada, enlaces de sitio y recursos activos.</li>
<li>Conversiones de llamadas, formularios y WhatsApp correctamente medidas.</li>
</ul>
<h2 id="proximos-pasos">Próximos pasos</h2>
<p>Reserva un momento cada mes para verificar estos puntos. Si lo prefieres, nuestro equipo realiza esa auditoría y te muestra qué se puede mejorar.</p>`,
  },
  {
    slug: "instagram-o-google-primer-presupuesto",
    category: "analisis",
    date: "2026-11-06",
    minutes: 7,
    cover: "c",
    title: "Instagram o Google: dónde invertir tu primer presupuesto de anuncios",
    excerpt:
      "Una forma simple de decidir entre anunciar para quien ya te busca o para quien todavía no conoce tu marca.",
    tags: ["Meta Ads", "Google Ads", "Presupuesto"],
    body: `
<p>Quien empieza a invertir en publicidad digital suele preguntarse qué canal elegir. La respuesta depende de una pregunta previa: ¿las personas ya buscan en Google lo que vendes?</p>
<h2 id="demanda-existente">Cuándo tiene más sentido Google</h2>
<p>Google captura demanda que ya existe. Si alguien escribe en el buscador el servicio exacto que ofreces, esa persona está lista para comparar y elegir. Los servicios de urgencia o de decisión directa suelen funcionar muy bien aquí.</p>
<h2 id="crear-demanda">Cuándo tiene más sentido Instagram</h2>
<p>Instagram y Facebook ayudan a generar interés y recordación. Funcionan muy bien para productos visuales, lanzamientos y negocios donde la decisión pasa por la imagen y la confianza en la marca.</p>
<h2 id="como-decidir">Cómo decidir</h2>
<ul>
<li>¿Ya existe búsqueda activa por lo que vendes? Empieza por Google.</li>
<li>¿Tu producto depende de imagen, descubrimiento y deseo? Empieza por Instagram.</li>
<li>¿Tienes dudas? Divide el presupuesto de prueba y compara el costo por contacto calificado.</li>
</ul>
<p>Lo importante es medir desde el primer día, para decidir con números y no con suposiciones.</p>`,
  },
  {
    slug: "busqueda-con-ia-y-el-trafico-de-los-sitios",
    category: "novedades",
    date: "2026-11-03",
    minutes: 6,
    cover: "d",
    title: "Búsqueda con IA: cómo las respuestas de Google están cambiando el tráfico web",
    excerpt:
      "Las respuestas generadas por IA cambian dónde hacen clic las personas. Mira cómo adaptar tu contenido.",
    tags: ["SEO", "Inteligencia artificial"],
    body: `
<p>Los buscadores ahora muestran respuestas generadas por inteligencia artificial en la parte superior de la página. Para quien tiene un sitio web, esto cambia la forma de pensar el contenido: ya no basta con aparecer, es necesario ser la fuente que la respuesta cita.</p>
<h2 id="que-cambia">Qué cambia para tu sitio</h2>
<p>Parte de las preguntas básicas se responden directamente en la página de resultados. Por eso, el contenido genérico pierde espacio, mientras que el contenido claro, específico y confiable tiene mucha más probabilidad de ser citado y visitado.</p>
<h2 id="como-adaptarse">Cómo adaptarse</h2>
<ul>
<li>Responde las dudas reales de tus clientes de forma directa al inicio de cada página.</li>
<li>Mantén la información de tu empresa actualizada: servicios, diferenciales y canales de contacto.</li>
<li>Utiliza títulos claros y datos estructurados (Schema) para facilitar la lectura por parte de buscadores y modelos de IA.</li>
</ul>
<h2 id="que-medir">Qué medir</h2>
<p>Sigue en Search Console las impresiones y los clics por página, y en tu sitio los contactos generados. Las visitas aisladas dicen mucho menos que antes.</p>`,
  },
  {
    slug: "reporte-de-ventas-por-canal",
    category: "novedades",
    date: "2026-10-28",
    minutes: 3,
    cover: "e",
    title: "Mintcode lanza reporte de ventas por canal para clientes",
    excerpt:
      "Un resumen único muestra de dónde viene cada contacto: anuncios, búsquedas orgánicas o WhatsApp directo.",
    tags: ["Mintcode", "Reportes"],
    body: `
<p>Saber cuánto se invirtió es fácil. Lo difícil suele ser saber de dónde vino cada cliente. Por eso nuestros clientes reciben un reporte claro que organiza los resultados por canal.</p>
<h2 id="que-muestra">Qué muestra el reporte</h2>
<ul>
<li>Contactos y ventas generados desde Google Ads y Meta Ads.</li>
<li>Visitas y contactos provenientes de búsquedas orgánicas.</li>
<li>Conversaciones iniciadas directamente desde el botón de WhatsApp del sitio.</li>
</ul>
<h2 id="para-que-sirve">Para qué sirve</h2>
<p>Con todos los canales lado a lado, queda claro dónde conviene invertir más y qué necesita ajustes. ¿Quieres ver un ejemplo? Contáctanos.</p>`,
  },
  {
    slug: "7-senales-de-que-tu-sitio-esta-perdiendo-clientes",
    category: "analisis",
    date: "2026-10-22",
    minutes: 6,
    cover: "a",
    title: "7 señales de que tu sitio web está perdiendo clientes",
    excerpt:
      "Problemas comunes que alejan a los visitantes y cómo identificar cada uno en pocos minutos.",
    tags: ["Sitios web", "Conversión"],
    body: `
<p>No siempre el problema es la falta de visitas. Muchas veces el visitante llega y se va porque el sitio no le ayuda a dar el siguiente paso. Revisa estas siete señales.</p>
<h2 id="senales-tecnicas">Señales técnicas</h2>
<ol>
<li><strong>Tarda en cargar.</strong> En el celular, unos pocos segundos extra hacen que la persona abandone la página.</li>
<li><strong>No se adapta bien al celular.</strong> Textos pequeños, botones apretados o menús difíciles de usar.</li>
<li><strong>No aparece en Google.</strong> Busca el nombre de tu empresa y el servicio principal que vendes.</li>
</ol>
<h2 id="senales-de-contenido">Señales de contenido</h2>
<ol start="4">
<li><strong>Sin botón de WhatsApp o contacto visible.</strong> Quien tiene que buscar cómo contactarte suele desistir.</li>
<li><strong>Sin información clara.</strong> Qué haces, cómo trabajas y cómo contratarte debe entenderse en segundos.</li>
<li><strong>Sin pruebas de confianza.</strong> Testimonios, casos reales y clientes atendidos ayudan a tomar la decisión.</li>
<li><strong>Sin medición.</strong> Si no sabes cuántos contactos genera tu sitio, no sabes si está funcionando.</li>
</ol>
<h2 id="que-hacer">Qué hacer ahora</h2>
<p>Abre tu sitio en el celular, haz una búsqueda de tu servicio e intenta ponerte en contacto como si fueras un cliente nuevo. Lo que frene ese recorrido es lo primero que debes corregir.</p>`,
  },
  {
    slug: "meta-y-la-medicion-de-conversiones-en-whatsapp",
    category: "noticias",
    date: "2026-10-15",
    minutes: 4,
    cover: "b",
    title: "Meta actualiza la medición de conversiones en campañas hacia WhatsApp",
    excerpt:
      "¿Haces anuncios dirigidos a WhatsApp? Mira qué revisar en tu cuenta para seguir midiendo contactos correctamente.",
    tags: ["Meta Ads", "WhatsApp"],
    body: `
<p>Las campañas con destino a WhatsApp son de las más efectivas para generar conversaciones comerciales, y su rendimiento depende de cómo esté configurada la medición. Cuando la plataforma actualiza sus reglas, vale revisar lo esencial.</p>
<h2 id="que-revisar">Qué revisar</h2>
<ul>
<li>Qué evento se está contando como resultado principal de la campaña.</li>
<li>Si el número de conversaciones iniciadas coincide con los mensajes que llegan realmente al WhatsApp.</li>
<li>Si la cuenta está conectada al sitio web y al píxel de forma correcta.</li>
</ul>
<h2 id="por-que-importa">Por qué importa</h2>
<p>Si la medición es imprecisa, el algoritmo optimiza para el resultado equivocado, elevando el costo por contacto sin que lo notes.</p>`,
  },
];
