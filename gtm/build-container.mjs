// Gera o container do Google Tag Manager e a documentação de eventos a partir de UMA especificação.
//   node gtm/build-container.mjs
// Saídas: gtm/mintcode-gtm-container.json (importar no GTM) e gtm/EVENTOS.md.
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));

const GA4_ID = 'G-97RQ2P9J91';
const GTM_ID = 'GTM-TDFVMKJH';
const PLACEHOLDER = {
  adsId: 'AW-XXXXXXXXXX',
  adsLabelLead: 'LABEL_LEAD',
  adsLabelWhats: 'LABEL_WHATSAPP',
  pixel: '000000000000000',
};

/* ------------------------------------------------------------------ Eventos
   name    evento enviado ao dataLayer pelo site (src/app.js)
   gatilho o que o visitante faz
   onde    onde acontece no site
   params  parâmetros enviados junto
   key     marcar como "evento principal" (key event) no GA4
   ads     conversão do Google Ads: 'lead' | 'whats'
   meta    evento do Pixel da Meta: [nome padrão, { parâmetro_meta: 'dlv_param' }] */
const EVENTS = [
  { name: 'cta_click', gatilho: 'Clique nos botões de chamada para ação ("Agendar uma reunião", "Fale conosco", "Ver portfólio", "Voltar ao início")', onde: 'Header, hero, faixas de CTA, páginas de serviço, 404', params: ['cta_text', 'cta_location', 'cta_style', 'cta_destination'] },
  { name: 'service_click', gatilho: 'Clique em "Quero um site / anunciar / aparecer" e "Ver serviço"', onde: 'Home (cards de serviço) e /servicos/', params: ['service_name', 'link_location'], meta: ['ViewContent', { content_name: 'service_name' }] },
  { name: 'portfolio_visit', gatilho: 'Clique em "Visitar site" ou no mockup de um projeto', onde: 'Home (portfólio) e página de Criação de sites', params: ['project_name', 'project_url', 'link_location'], meta: ['ViewContent', { content_name: 'project_name' }] },
  { name: 'whatsapp_click', gatilho: 'Clique em qualquer link do WhatsApp', onde: 'Página de contato (canais), rodapé', params: ['link_location', 'link_text'], key: true, ads: 'whats', meta: ['Contact', { content_name: 'link_location' }] },
  { name: 'email_click', gatilho: 'Clique em link de e-mail (mailto:)', onde: 'Página de contato, rodapé', params: ['link_location'], key: true, meta: ['Contact', { content_name: 'link_location' }] },
  { name: 'instagram_click', gatilho: 'Clique no link do Instagram', onde: 'Página de contato, rodapé', params: ['link_location'] },
  { name: 'form_start', gatilho: 'Primeiro foco em um campo do formulário de contato', onde: 'Home (#contato) e /contato/', params: ['form_id'] },
  { name: 'generate_lead', gatilho: 'Envio válido do formulário "Agendar uma reunião" (endpoint ou abertura do WhatsApp com a mensagem pronta)', onde: 'Home (#contato) e /contato/', params: ['form_id', 'lead_method', 'service_interest'], key: true, ads: 'lead', meta: ['Lead', { content_name: 'form_id', content_category: 'service_interest' }] },
  { name: 'form_error', gatilho: 'Falha de validação ou de envio do formulário', onde: 'Home (#contato) e /contato/', params: ['form_id', 'error_field'] },
  { name: 'newsletter_signup', gatilho: 'Inscrição na newsletter concluída', onde: '/blog/ (só aparece com newsletterEndpoint configurado)', params: ['form_id'], key: true, meta: ['Subscribe', {}] },
  { name: 'blog_filter', gatilho: 'Clique nos filtros Todos / Novidades / Notícias / Análises', onde: '/blog/', params: ['filter_category'] },
  { name: 'blog_load_more', gatilho: 'Clique em "Carregar mais artigos"', onde: '/blog/', params: [] },
  { name: 'share', gatilho: 'Clique em Compartilhar (WhatsApp, LinkedIn, copiar link)', onde: 'Artigos do blog e da Academy', params: ['method', 'content_type', 'item_id'] },
  { name: 'search', gatilho: 'Envio da busca da Academy', onde: '/academy/', params: ['search_term', 'result_count'], meta: ['Search', { search_string: 'search_term' }] },
  { name: 'search_result_click', gatilho: 'Clique em um resultado da busca da Academy', onde: '/academy/', params: ['search_term', 'result_title'] },
  { name: 'trilha_click', gatilho: 'Clique em "Ver trilha" ou "Começar agora"', onde: '/academy/', params: ['trilha_name'] },
  { name: 'academy_nav', gatilho: 'Clique em Anterior / Próximo no fim do artigo', onde: 'Artigos da Academy', params: ['direction', 'destination'] },
  { name: 'academy_complete', gatilho: 'Clique em "Marcar como concluído"', onde: 'Artigos da Academy', params: ['item_id', 'trilha'] },
  { name: 'faq_open', gatilho: 'Abertura de uma pergunta frequente (ação do usuário)', onde: 'Páginas de serviço', params: ['faq_question'] },
  { name: 'menu_toggle', gatilho: 'Abrir/fechar o menu no celular', onde: 'Header (mobile)', params: ['menu_state'] },
  { name: 'link_click', gatilho: 'Clique nos demais links de navegação, rodapé, blog e cards', onde: 'Todo o site', params: ['link_text', 'link_url', 'link_location'] },
  { name: 'scroll_depth', gatilho: 'Rolagem da página atingindo 25%, 50%, 75% e 90%', onde: 'Todo o site (por página)', params: ['percent_scrolled', 'page_path'] },
];

const ADS = {
  lead: { label: 'adsLabelLead', name: 'Ads - Conversão - Lead (formulário)' },
  whats: { label: 'adsLabelWhats', name: 'Ads - Conversão - WhatsApp' },
};

/* ------------------------------------------------------------ Montagem */
const base = { accountId: '0', containerId: '0' };
const fp = { fingerprint: '0' };
let seq = 0;
const nid = () => String(++seq);
const tpl = (key, value) => ({ type: 'TEMPLATE', key, value });
const bool = (key, value) => ({ type: 'BOOLEAN', key, value: String(value) });
const ALL_PAGES = '2147479553'; // gatilho nativo "All Pages"

const folders = ['GA4', 'Google Ads', 'Meta Ads'].map((name) => ({ ...base, folderId: nid(), name, ...fp }));
const folderId = Object.fromEntries(folders.map((f) => [f.name, f.folderId]));

// Variáveis constantes (edite estas 4 no GTM depois de importar)
const constant = (name, value) => ({ ...base, variableId: nid(), name, type: 'c', parameter: [tpl('value', value)], ...fp });
const vGa4 = constant('CONST - GA4 Measurement ID', GA4_ID);
const vAdsId = constant('CONST - Google Ads Conversion ID', PLACEHOLDER.adsId);
const vLabelLead = constant('CONST - Google Ads Label - Lead', PLACEHOLDER.adsLabelLead);
const vLabelWhats = constant('CONST - Google Ads Label - WhatsApp', PLACEHOLDER.adsLabelWhats);
const vPixel = constant('CONST - Meta Pixel ID', PLACEHOLDER.pixel);

// Variáveis da camada de dados (uma por parâmetro)
const paramNames = [...new Set(EVENTS.flatMap((e) => e.params))];
const dlv = (p) => `{{DLV - ${p}}}`;
const dlvVars = paramNames.map((p) => ({
  ...base, variableId: nid(), name: `DLV - ${p}`, type: 'v',
  parameter: [{ type: 'INTEGER', key: 'dataLayerVersion', value: '2' }, bool('setDefaultValue', false), tpl('name', p)], ...fp,
}));

// Gatilhos: um evento personalizado por evento do site
const trig = {};
const triggers = EVENTS.map((e) => {
  const t = {
    ...base, triggerId: nid(), name: `CE - ${e.name}`, type: 'CUSTOM_EVENT',
    customEventFilter: [{ type: 'EQUALS', parameter: [tpl('arg0', '{{_event}}'), tpl('arg1', e.name)] }], ...fp,
  };
  trig[e.name] = t.triggerId;
  return t;
});

const tagBase = (name, type, parameter, firing, folder, extra = {}) => ({
  ...base, tagId: nid(), name, type, parameter, ...fp, parentFolderId: folderId[folder],
  firingTriggerId: firing, tagFiringOption: 'ONCE_PER_EVENT',
  monitoringMetadata: { type: 'MAP' }, consentSettings: { consentStatus: 'NOT_SET' }, ...extra,
});

const tags = [];

// --- GA4
tags.push(tagBase('GA4 - Google tag (config)', 'googtag', [tpl('tagId', '{{CONST - GA4 Measurement ID}}')], [ALL_PAGES], 'GA4'));
for (const e of EVENTS) {
  tags.push(tagBase(`GA4 - Evento - ${e.name}`, 'gaawe', [
    bool('sendEcommerceData', false),
    tpl('eventName', e.name),
    ...(e.params.length ? [{ type: 'LIST', key: 'eventSettingsTable', list: e.params.map((p) => ({ type: 'MAP', map: [tpl('parameter', p), tpl('parameterValue', dlv(p))] })) }] : []),
    tpl('measurementIdOverride', '{{CONST - GA4 Measurement ID}}'),
  ], [trig[e.name]], 'GA4'));
}

// --- Google Ads
tags.push(tagBase('Ads - Conversion Linker', 'gclidw', [bool('enableCrossDomain', false), bool('enableUrlPassthrough', false)], [ALL_PAGES], 'Google Ads'));
for (const e of EVENTS.filter((x) => x.ads)) {
  const a = ADS[e.ads];
  tags.push(tagBase(a.name, 'awct', [
    bool('enableConversionLinker', true),
    tpl('conversionId', '{{CONST - Google Ads Conversion ID}}'),
    tpl('conversionLabel', `{{${a.label === 'adsLabelLead' ? 'CONST - Google Ads Label - Lead' : 'CONST - Google Ads Label - WhatsApp'}}}`),
    tpl('currencyCode', 'BRL'),
    bool('rdp', false),
  ], [trig[e.name]], 'Google Ads'));
}

// --- Meta Pixel (HTML personalizado)
const PIXEL_BASE = `<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','{{CONST - Meta Pixel ID}}');
fbq('track','PageView');
</script>`;
tags.push(tagBase('Meta - Pixel base + PageView', 'html', [tpl('html', PIXEL_BASE), bool('supportDocumentWrite', false)], [ALL_PAGES], 'Meta Ads'));
for (const e of EVENTS.filter((x) => x.meta)) {
  const [fbEvent, map] = e.meta;
  const obj = Object.entries(map).map(([k, p]) => `${k}:'${dlv(p)}'`).join(',');
  const html = `<script>if(window.fbq){fbq('track','${fbEvent}'${obj ? `,{${obj}}` : ''});}</script>`;
  tags.push(tagBase(`Meta - ${fbEvent} (${e.name})`, 'html', [tpl('html', html), bool('supportDocumentWrite', false)], [trig[e.name]], 'Meta Ads'));
}

const now = new Date().toISOString().replace('T', ' ').slice(0, 19);
const container = {
  exportFormatVersion: 2,
  exportTime: now,
  containerVersion: {
    path: 'accounts/0/containers/0/versions/0', accountId: '0', containerId: '0', containerVersionId: '0',
    container: {
      path: 'accounts/0/containers/0', accountId: '0', containerId: '0', name: 'Mintcode - site',
      publicId: GTM_ID, usageContext: ['WEB'], fingerprint: '0',
      tagManagerUrl: 'https://tagmanager.google.com/#/container/accounts/0/containers/0/workspaces?apiLink=container',
    },
    tag: tags,
    trigger: triggers,
    variable: [vGa4, vAdsId, vLabelLead, vLabelWhats, vPixel, ...dlvVars],
    folder: folders,
    builtInVariable: [
      { ...base, type: 'EVENT', name: 'Event' },
      { ...base, type: 'PAGE_URL', name: 'Page URL' },
      { ...base, type: 'PAGE_PATH', name: 'Page Path' },
      { ...base, type: 'PAGE_HOSTNAME', name: 'Page Hostname' },
      { ...base, type: 'REFERRER', name: 'Referrer' },
    ],
    fingerprint: '0',
    tagManagerUrl: 'https://tagmanager.google.com/#/versions/accounts/0/containers/0/versions/0?apiLink=version',
  },
};
await writeFile(path.join(dir, 'mintcode-gtm-container.json'), JSON.stringify(container, null, 2) + '\n');

/* ------------------------------------------------------------ Documentação */
const row = (...c) => `| ${c.join(' | ')} |`;
const md = `# Mapeamento de eventos · GA4, Google Ads e Meta Ads

Gerado por \`gtm/build-container.mjs\` (a mesma especificação gera o JSON do GTM). Não edite à mão: altere a lista \`EVENTS\` e rode \`node gtm/build-container.mjs\`.

## Como funciona

1. O site (\`src/app.js\`) faz \`dataLayer.push({ event: 'nome_do_evento', ...parâmetros })\` em cada botão ou ação.
2. O container do GTM tem um gatilho de **Evento personalizado** por evento (\`CE - nome\`).
3. Cada gatilho dispara as tags de GA4, Google Ads e Meta correspondentes (tabela abaixo).

## Instalação

1. Abra o container **Web** \`${GTM_ID}\` em tagmanager.google.com (o site já carrega esse ID).
2. **Admin → Importar contêiner** → escolha \`gtm/mintcode-gtm-container.json\` → espaço de trabalho existente → **Mesclar** (use *Substituir* só em container vazio).
3. Em **Variáveis**, edite os 4 placeholders:
   - \`CONST - Google Ads Conversion ID\` → \`AW-XXXXXXXXXX\` (a ID da conta, em Google Ads → Metas → Conversões → Detalhes da tag)
   - \`CONST - Google Ads Label - Lead\` e \`CONST - Google Ads Label - WhatsApp\` → rótulos das duas ações de conversão (crie-as no Google Ads como *Site → Enviar formulário de lead* e *Site → Contato*)
   - \`CONST - Meta Pixel ID\` → ID do pixel no Gerenciador de Eventos da Meta
   - \`CONST - GA4 Measurement ID\` já vem como \`${GA4_ID}\`.
4. O ID já está em \`src/content/site.mjs\` (\`analytics.gtmId\`); para trocá-lo, rode \`npm run build\` e publique o \`dist/\`.
5. No GTM, use **Visualizar** (modo Preview) para confirmar os disparos e então **Enviar** a versão.
6. No GA4: **Admin → Eventos** → marque como *evento principal* os da coluna "Principal"; em **Definições personalizadas** registre como dimensões os parâmetros que quiser usar em relatórios (ex.: \`cta_location\`, \`service_name\`, \`project_name\`, \`form_id\`, \`lead_method\`).

## Eventos do site → plataformas

${row('Evento (dataLayer)', 'Quando dispara', 'Onde', 'GA4', 'Principal (GA4)', 'Google Ads', 'Meta Pixel')}
${row('---', '---', '---', '---', '---', '---', '---')}
${EVENTS.map((e) => row(`\`${e.name}\``, e.gatilho, e.onde, '✓', e.key ? '✓' : '', e.ads ? `Conversão: ${ADS[e.ads].name.replace('Ads - Conversão - ', '')}` : '', e.meta ? `\`${e.meta[0]}\`` : '')).join('\n')}

Além dos eventos: **GA4** envia \`page_view\` pela Google tag; **Meta** envia \`PageView\` no pixel base; **Google Ads** carrega o Conversion Linker em todas as páginas.

## Parâmetros

${row('Evento', 'Parâmetros')}
${row('---', '---')}
${EVENTS.map((e) => row(`\`${e.name}\``, e.params.length ? e.params.map((p) => `\`${p}\``).join(', ') : '—')).join('\n')}

Valores de \`cta_location\` / \`link_location\`: \`header\`, \`hero\`, \`faixa_cta\`, \`rodape\`, \`formulario\`, \`canais_contato\`, o id da seção (\`servicos\`, \`portfolio\`, \`contato\`…) ou \`conteudo\`.
Valores de \`lead_method\`: \`formulario\` (enviado ao endpoint) ou \`whatsapp\` (formulário que abriu o WhatsApp com a mensagem pronta; nesse caso o envio da mensagem no WhatsApp não é visível ao site).
Valores de \`form_id\`: \`home_contato\`, \`pagina_contato\`, \`blog_newsletter\`.

## Observações

- **Consentimento (LGPD):** o site ainda não tem banner de cookies. As tags do container estão com consentimento "não definido"; se for usar o Consent Mode, configure-o no GTM antes de enviar a versão.
- **Conversões duplicadas:** \`generate_lead\` e \`whatsapp_click\` são conversões distintas. Se uma pessoa envia o formulário *e* clica no WhatsApp, o Google Ads contará as duas; na ação de conversão, ajuste *Contagem* para "Uma".
- **Meta:** o pixel roda no navegador. Para mais precisão (iOS, bloqueadores), considere a API de Conversões depois.
`;
await writeFile(path.join(dir, 'EVENTOS.md'), md);
console.log(`✓ ${tags.length} tags, ${triggers.length} gatilhos, ${dlvVars.length + 5} variáveis → gtm/mintcode-gtm-container.json`);
