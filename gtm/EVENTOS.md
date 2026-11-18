# Mapeamento de eventos · GA4, Google Ads e Meta Ads

Gerado por `gtm/build-container.mjs` (a mesma especificação gera o JSON do GTM). Não edite à mão: altere a lista `EVENTS` e rode `node gtm/build-container.mjs`.

## Como funciona

1. O site (`src/app.js`) faz `dataLayer.push({ event: 'nome_do_evento', ...parâmetros })` em cada botão ou ação.
2. O container do GTM tem um gatilho de **Evento personalizado** por evento (`CE - nome`).
3. Cada gatilho dispara as tags de GA4, Google Ads e Meta correspondentes (tabela abaixo).

## Instalação

1. Abra o container **Web** `GTM-TDFVMKJH` em tagmanager.google.com (o site já carrega esse ID).
2. **Admin → Importar contêiner** → escolha `gtm/mintcode-gtm-container.json` → espaço de trabalho existente → **Mesclar** (use *Substituir* só em container vazio).
3. Em **Variáveis**, edite os 4 placeholders:
   - `CONST - Google Ads Conversion ID` → `AW-XXXXXXXXXX` (a ID da conta, em Google Ads → Metas → Conversões → Detalhes da tag)
   - `CONST - Google Ads Label - Lead` e `CONST - Google Ads Label - WhatsApp` → rótulos das duas ações de conversão (crie-as no Google Ads como *Site → Enviar formulário de lead* e *Site → Contato*)
   - `CONST - Meta Pixel ID` → ID do pixel no Gerenciador de Eventos da Meta
   - `CONST - GA4 Measurement ID` já vem como `G-97RQ2P9J91`.
4. O ID já está em `src/content/site.mjs` (`analytics.gtmId`); para trocá-lo, rode `npm run build` e publique o `dist/`.
5. No GTM, use **Visualizar** (modo Preview) para confirmar os disparos e então **Enviar** a versão.
6. No GA4: **Admin → Eventos** → marque como *evento principal* os da coluna "Principal"; em **Definições personalizadas** registre como dimensões os parâmetros que quiser usar em relatórios (ex.: `cta_location`, `service_name`, `project_name`, `form_id`, `lead_method`).

## Eventos do site → plataformas

| Evento (dataLayer) | Quando dispara | Onde | GA4 | Principal (GA4) | Google Ads | Meta Pixel |
| --- | --- | --- | --- | --- | --- | --- |
| `cta_click` | Clique nos botões de chamada para ação ("Agendar uma reunião", "Fale conosco", "Ver portfólio", "Voltar ao início") | Header, hero, faixas de CTA, páginas de serviço, 404 | ✓ |  |  |  |
| `service_click` | Clique em "Quero um site / anunciar / aparecer" e "Ver serviço" | Home (cards de serviço) e /servicos/ | ✓ |  |  | `ViewContent` |
| `portfolio_visit` | Clique em "Visitar site" ou no mockup de um projeto | Home (portfólio) e página de Criação de sites | ✓ |  |  | `ViewContent` |
| `whatsapp_click` | Clique em qualquer link do WhatsApp | Página de contato (canais), rodapé | ✓ | ✓ | Conversão: WhatsApp | `Contact` |
| `email_click` | Clique em link de e-mail (mailto:) | Página de contato, rodapé | ✓ | ✓ |  | `Contact` |
| `instagram_click` | Clique no link do Instagram | Página de contato, rodapé | ✓ |  |  |  |
| `form_start` | Primeiro foco em um campo do formulário de contato | Home (#contato) e /contato/ | ✓ |  |  |  |
| `generate_lead` | Envio válido do formulário "Agendar uma reunião" (endpoint ou abertura do WhatsApp com a mensagem pronta) | Home (#contato) e /contato/ | ✓ | ✓ | Conversão: Lead (formulário) | `Lead` |
| `form_error` | Falha de validação ou de envio do formulário | Home (#contato) e /contato/ | ✓ |  |  |  |
| `newsletter_signup` | Inscrição na newsletter concluída | /blog/ (só aparece com newsletterEndpoint configurado) | ✓ | ✓ |  | `Subscribe` |
| `blog_filter` | Clique nos filtros Todos / Novidades / Notícias / Análises | /blog/ | ✓ |  |  |  |
| `blog_load_more` | Clique em "Carregar mais artigos" | /blog/ | ✓ |  |  |  |
| `share` | Clique em Compartilhar (WhatsApp, LinkedIn, copiar link) | Artigos do blog e da Academy | ✓ |  |  |  |
| `search` | Envio da busca da Academy | /academy/ | ✓ |  |  | `Search` |
| `search_result_click` | Clique em um resultado da busca da Academy | /academy/ | ✓ |  |  |  |
| `trilha_click` | Clique em "Ver trilha" ou "Começar agora" | /academy/ | ✓ |  |  |  |
| `academy_nav` | Clique em Anterior / Próximo no fim do artigo | Artigos da Academy | ✓ |  |  |  |
| `academy_complete` | Clique em "Marcar como concluído" | Artigos da Academy | ✓ |  |  |  |
| `faq_open` | Abertura de uma pergunta frequente (ação do usuário) | Páginas de serviço | ✓ |  |  |  |
| `menu_toggle` | Abrir/fechar o menu no celular | Header (mobile) | ✓ |  |  |  |
| `link_click` | Clique nos demais links de navegação, rodapé, blog e cards | Todo o site | ✓ |  |  |  |
| `scroll_depth` | Rolagem da página atingindo 25%, 50%, 75% e 90% | Todo o site (por página) | ✓ |  |  |  |

Além dos eventos: **GA4** envia `page_view` pela Google tag; **Meta** envia `PageView` no pixel base; **Google Ads** carrega o Conversion Linker em todas as páginas.

## Parâmetros

| Evento | Parâmetros |
| --- | --- |
| `cta_click` | `cta_text`, `cta_location`, `cta_style`, `cta_destination` |
| `service_click` | `service_name`, `link_location` |
| `portfolio_visit` | `project_name`, `project_url`, `link_location` |
| `whatsapp_click` | `link_location`, `link_text` |
| `email_click` | `link_location` |
| `instagram_click` | `link_location` |
| `form_start` | `form_id` |
| `generate_lead` | `form_id`, `lead_method`, `service_interest` |
| `form_error` | `form_id`, `error_field` |
| `newsletter_signup` | `form_id` |
| `blog_filter` | `filter_category` |
| `blog_load_more` | — |
| `share` | `method`, `content_type`, `item_id` |
| `search` | `search_term`, `result_count` |
| `search_result_click` | `search_term`, `result_title` |
| `trilha_click` | `trilha_name` |
| `academy_nav` | `direction`, `destination` |
| `academy_complete` | `item_id`, `trilha` |
| `faq_open` | `faq_question` |
| `menu_toggle` | `menu_state` |
| `link_click` | `link_text`, `link_url`, `link_location` |
| `scroll_depth` | `percent_scrolled`, `page_path` |

Valores de `cta_location` / `link_location`: `header`, `hero`, `faixa_cta`, `rodape`, `formulario`, `canais_contato`, o id da seção (`servicos`, `portfolio`, `contato`…) ou `conteudo`.
Valores de `lead_method`: `formulario` (enviado ao endpoint) ou `whatsapp` (formulário que abriu o WhatsApp com a mensagem pronta; nesse caso o envio da mensagem no WhatsApp não é visível ao site).
Valores de `form_id`: `home_contato`, `pagina_contato`, `blog_newsletter`.

## Observações

- **Consentimento (LGPD):** o site ainda não tem banner de cookies. As tags do container estão com consentimento "não definido"; se for usar o Consent Mode, configure-o no GTM antes de enviar a versão.
- **Conversões duplicadas:** `generate_lead` e `whatsapp_click` são conversões distintas. Se uma pessoa envia o formulário *e* clica no WhatsApp, o Google Ads contará as duas; na ação de conversão, ajuste *Contagem* para "Uma".
- **Meta:** o pixel roda no navegador. Para mais precisão (iOS, bloqueadores), considere a API de Conversões depois.
