"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const SECTION_MAP: Record<string, string> = {
  servicios: "servicos",
  portafolio: "portfolio",
  contacto: "contato",
};

export function SiteBehaviors() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) =>
      r.querySelector<T>(s);
    const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) =>
      Array.from(r.querySelectorAll<T>(s));

    const store = {
      get<T>(k: string, d: T): T {
        try {
          const raw = localStorage.getItem(k);
          return raw ? (JSON.parse(raw) as T) : d;
        } catch {
          return d;
        }
      },
      set(k: string, v: unknown) {
        try {
          localStorage.setItem(k, JSON.stringify(v));
        } catch {
          /* modo privado */
        }
      },
    };

    const dl = (window.dataLayer = window.dataLayer || []);
    const track = (event: string, params: Record<string, unknown> = {}) =>
      dl.push({ event, ...params });
    const clean = (s?: string | null) =>
      (s || "").replace(/\s+/g, " ").replace(/[→↗←]/g, "").trim();

    const formId = (form?: Element | null) =>
      form?.closest("dialog")
        ? "modal_contato"
        : location.pathname === "/"
          ? "home_contato"
          : "pagina_contato";

    const where = (el: Element): string => {
      if (el.closest(".site-header")) return "header";
      if (el.closest(".hero")) return "hero";
      if (el.closest(".cta-band")) return "faixa_cta";
      if (el.closest(".site-footer, .footer-simple")) return "rodape";
      if (el.closest(".form-card")) return "formulario";
      if (el.closest(".channels")) return "canais_contato";
      const secId = el.closest("section[id]")?.id;
      if (secId) return SECTION_MAP[secId] ?? secId;
      return el.closest("main") ? "conteudo" : "pagina";
    };

    const cleanups: (() => void)[] = [];
    const on = <K extends keyof DocumentEventMap>(
      target: EventTarget | null | undefined,
      type: K | string,
      handler: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions,
    ) => {
      if (!target) return;
      target.addEventListener(type, handler, options);
      cleanups.push(() => target.removeEventListener(type, handler, options));
    };

    /* ---------------------------------------------------------- Header fixo */
    const syncScroll = () => {
      const y =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      const scrolled = y > 20;
      document.documentElement.classList.toggle("is-scrolled", scrolled);
      $(".site-header")?.classList.toggle("is-scrolled", scrolled);
    };
    syncScroll();
    on(window, "scroll", syncScroll, { passive: true });
    on(document, "scroll", syncScroll, { passive: true, capture: true });

    /* -------------------------------------------- Texto rotativo do Hero */
    const rotator = $("[data-word-rotator]");
    if (rotator) {
      const rawWords = rotator.getAttribute("data-words");
      if (rawWords && rotator.children.length === 1) {
        rawWords
          .split("|")
          .slice(1)
          .forEach((w) => {
            const span = document.createElement("span");
            span.className = "hero-rotator__word grad-brand";
            span.setAttribute("aria-hidden", "true");
            span.textContent = w;
            rotator.appendChild(span);
          });
      }
      const words = $$<HTMLElement>(".hero-rotator__word", rotator);
      if (words.length > 1) {
        let activeIdx = 0;
        const timer = window.setInterval(() => {
          const prevIdx = activeIdx;
          activeIdx = (activeIdx + 1) % words.length;
          words.forEach((w, i) => {
            w.classList.remove("is-active", "is-exiting");
            if (i === activeIdx) {
              w.classList.add("is-active");
              w.setAttribute("aria-hidden", "false");
            } else if (i === prevIdx) {
              w.classList.add("is-exiting");
              w.setAttribute("aria-hidden", "true");
            } else {
              w.setAttribute("aria-hidden", "true");
            }
          });
        }, 2500);
        cleanups.push(() => window.clearInterval(timer));
      }
    }

    /* ---------------------------------------------------------- Menú móvil */
    let closeNav = () => {};
    const toggle = $(".nav-toggle");
    const nav = $("#site-nav");
    if (toggle && nav) {
      const set = (open: boolean) => {
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
        nav.classList.toggle("is-open", open);
        document.documentElement.classList.toggle("nav-open", open);
      };
      closeNav = () => set(false);
      set(false);
      on($("[data-nav-scrim]"), "click", () => set(false));
      on(toggle, "click", () => set(toggle.getAttribute("aria-expanded") !== "true"));
      on(nav, "click", (e) => {
        if ((e.target as Element | null)?.closest("a")) set(false);
      });
      on(document, "keydown", (e) => {
        if ((e as KeyboardEvent).key === "Escape") set(false);
      });
      const mq = matchMedia("(min-width: 769px)");
      on(mq, "change", () => set(false));
    }

    /* --------------------------------------- Formato y validación WhatsApp */
    const maskPhone = (value: string): string => {
      const d = value.replace(/\D/g, "").slice(0, 15);
      if (!d) return "";
      if (d.length <= 2) return d;
      if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
      if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
      if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
      return `${d.slice(0, 2)} (${d.slice(2, 4)}) ${d.slice(4, d.length - 4)}-${d.slice(-4)}`;
    };

    const phoneOk = (value: string): boolean => {
      const d = (value || "").replace(/\D/g, "");
      return d.length >= 8 && d.length <= 15 && !/^(\d)\1+$/.test(d);
    };

    $$<HTMLInputElement>('input[data-mask="phone"]').forEach((input) => {
      on(input, "input", () => {
        input.value = maskPhone(input.value);
        input.removeAttribute("aria-invalid");
      });
    });

    $$(".field--chips").forEach((g) =>
      on(g, "change", () => g.removeAttribute("aria-invalid")),
    );

    /* --------------------------------------------------------- Formularios */
    $$<HTMLFormElement>('form[data-form="contact"]').forEach((form) => {
      const wrap = form.closest("[data-form-wrap]") ?? form.parentElement!;
      const ok = $(".form-success", wrap);
      const err = $(".form-error", form);
      const submit = $<HTMLButtonElement>('button[type="submit"]', form);

      const showErr = (msg: string) => {
        if (!err) return;
        err.textContent = msg;
        err.hidden = !msg;
      };

      on(
        form,
        "focusin",
        () => track("form_start", { form_id: formId(form) }),
        { once: true },
      );

      on(form, "submit", async (e) => {
        e.preventDefault();
        showErr("");
        const fd = new FormData(form);
        const data: Record<string, unknown> = {
          nome: (fd.get("nome") || "").toString().trim(),
          empresa: (fd.get("empresa") || "").toString().trim(),
          email: (fd.get("email") || "").toString().trim(),
          whatsapp: (fd.get("whatsapp") || "").toString().trim(),
          servicos: fd.getAll("servicos").map(String),
          mensagem: (fd.get("mensagem") || "").toString().trim(),
          website: (fd.get("website") || "").toString(),
          elapsed: Math.round(performance.now() / 1000),
          page_url: location.origin + location.pathname,
        };
        new URLSearchParams(location.search).forEach((v, k) => {
          if (/^utm_(source|medium|campaign|term|content)$/.test(k)) data[k] = v;
        });

        $$("[aria-invalid]", form).forEach((i) => i.removeAttribute("aria-invalid"));
        const servicosList = data.servicos as string[];
        const bad: string[] = [];
        if (!data.nome || String(data.nome).length < 2) bad.push("nome");
        if (!/^\S+@\S+\.\S+$/.test(String(data.email))) bad.push("email");
        if (!phoneOk(String(data.whatsapp))) bad.push("whatsapp");
        if (!servicosList.length) bad.push("servicos");

        if (bad.length) {
          const target = (n: string) =>
            n === "servicos"
              ? form.querySelector(".field--chips")
              : (form.elements.namedItem(n) as HTMLElement | null);
          bad.forEach((n) => target(n)?.setAttribute("aria-invalid", "true"));
          const firstFocus =
            bad[0] === "servicos"
              ? form.querySelector<HTMLElement>('input[name="servicos"]')
              : (form.elements.namedItem(bad[0]) as HTMLElement | null);
          firstFocus?.focus();
          const msgs: Record<string, string> = {
            nome: "Ingresa tu nombre.",
            email: "Verifica el e-mail ingresado.",
            whatsapp: "Ingresa un número de WhatsApp válido.",
            servicos: "Selecciona al menos un servicio.",
          };
          showErr(msgs[bad[0]] ?? "Revisa los datos ingresados.");
          track("form_error", { form_id: formId(form), error_field: bad[0] });
          return;
        }

        const endpoint = form.dataset.endpoint;
        if (submit) submit.disabled = true;

        try {
          if (!endpoint) {
            throw new Error("missing_endpoint");
          }
          const r = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(data),
          });
          if (!r.ok) {
            let serverMsg = "";
            try {
              const body = (await r.json()) as { message?: string };
              if (typeof body?.message === "string") serverMsg = body.message;
            } catch {
              /* ignore non-JSON error body */
            }
            throw new Error(serverMsg || String(r.status));
          }
        } catch (err) {
          const msg =
            err instanceof Error &&
            err.message &&
            !/^\d+$/.test(err.message) &&
            err.message !== "missing_endpoint" &&
            err.message !== "Failed to fetch"
              ? err.message
              : "No fue posible enviar ahora. Intenta de nuevo o escríbenos por WhatsApp.";
          showErr(msg);
          track("form_error", { form_id: formId(form), error_field: "envio" });
          if (submit) submit.disabled = false;
          return;
        }

        if (submit) submit.disabled = false;
        track("generate_lead", {
          form_id: formId(form),
          lead_method: "formulario",
          service_interest: servicosList.join(", "),
        });
        form.reset();
        const parentModal = form.closest("dialog") as HTMLDialogElement | null;
        if (parentModal?.open) {
          parentModal.close();
          document.documentElement.classList.remove("modal-open");
        }
        router.push("/gracias");
      });

      if (ok) {
        on($("[data-reset]", ok), "click", () => {
          form.reset();
          ok.hidden = true;
          form.hidden = false;
          $("input", form)?.focus();
        });
      }
    });

    $$<HTMLFormElement>('form[data-form="newsletter"]').forEach((form) => {
      const note = $(".form-note", form);
      on(form, "submit", async (e) => {
        e.preventDefault();
        const emailInput = form.elements.namedItem("email") as HTMLInputElement | null;
        const email = emailInput?.value.trim() ?? "";
        if (!/^\S+@\S+\.\S+$/.test(email)) {
          if (note) {
            note.textContent = "Verifica el e-mail ingresado.";
            note.hidden = false;
          }
          return;
        }
        try {
          const r = await fetch(form.dataset.endpoint || "", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ email }),
          });
          if (!r.ok) throw new Error();
          form.reset();
          track("newsletter_signup", { form_id: "blog_newsletter" });
          if (note) note.textContent = "¡Listo! Recibirás los próximos análisis.";
        } catch {
          if (note)
            note.textContent =
              "No fue posible suscribirte ahora. Inténtalo nuevamente en unos instantes.";
        }
        if (note) note.hidden = false;
      });
    });

    /* --------------------------------------------- Blog: filtro + paginación */
    const grid = $("[data-post-grid]");
    if (grid) {
      const size = Number(grid.dataset.pageSize) || 6;
      const cards = $$(".post-card", grid);
      const chips = $$("[data-filter]");
      const more = $("[data-more]");
      const empty = $("[data-empty]");
      let filter = "all";
      let shown = size;

      const render = () => {
        const match = cards.filter(
          (c) => filter === "all" || c.dataset.category === filter,
        );
        cards.forEach((c) => (c.hidden = true));
        match.slice(0, shown).forEach((c) => (c.hidden = false));
        if (more) more.hidden = match.length <= shown;
        if (empty) empty.hidden = match.length > 0;
      };

      chips.forEach((chip) =>
        on(chip, "click", () => {
          filter = chip.dataset.filter || "all";
          shown = size;
          chips.forEach((c) => {
            const onChip = c === chip;
            c.classList.toggle("is-active", onChip);
            c.setAttribute("aria-pressed", String(onChip));
          });
          const url = new URL(location.href);
          if (filter === "all") url.searchParams.delete("categoria");
          else url.searchParams.set("categoria", filter);
          history.replaceState(null, "", url);
          render();
        }),
      );
      on(more, "click", () => {
        shown += size;
        render();
      });
      const initial = new URL(location.href).searchParams.get("categoria");
      const target = chips.find((c) => c.dataset.filter === initial);
      if (target) target.click();
      else render();
    }

    /* ------------------------------------------------ Sumario: ítem activo */
    const tocLinks = $$<HTMLAnchorElement>(".toc a");
    if (tocLinks.length && "IntersectionObserver" in window) {
      const map = new Map(
        tocLinks.map((a) => [(a.getAttribute("href") || "").slice(1), a]),
      );
      const heads = [...map.keys()]
        .map((id) => document.getElementById(id))
        .filter((h): h is HTMLElement => Boolean(h));
      const visible = new Set<string>();
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) =>
            en.isIntersecting
              ? visible.add(en.target.id)
              : visible.delete(en.target.id),
          );
          const current = heads.find((h) => visible.has(h.id)) ?? null;
          if (current) {
            tocLinks.forEach((a) =>
              a.classList.toggle("is-active", a === map.get(current.id)),
            );
          }
        },
        { rootMargin: "-96px 0px -60% 0px" },
      );
      heads.forEach((h) => io.observe(h));
      tocLinks[0]?.classList.add("is-active");
      cleanups.push(() => io.disconnect());
    }

    /* -------------------------------------------------- Copiar enlace (share) */
    $$("[data-copy]").forEach((b) =>
      on(b, "click", async () => {
        const label = b.textContent;
        try {
          await navigator.clipboard.writeText(b.dataset.copy || "");
          b.textContent = "¡Copiado!";
        } catch {
          b.textContent = "Copia de la barra";
        }
        setTimeout(() => {
          b.textContent = label;
        }, 1800);
      }),
    );

    /* ------------------------------------------- Academy: progreso de la ruta */
    const KEY = "mintcode-academy-done";
    const box = $(".side-trilha");
    const doneBtn = $("[data-done]");
    if (box) {
      const render = () => {
        const done = new Set(store.get<string[]>(KEY, []));
        const items = $$("li[data-key]", box);
        let n = 0;
        items.forEach((li) => {
          const d = done.has(li.dataset.key || "");
          li.classList.toggle("is-done", d);
          if (d) n++;
        });
        const pct = items.length ? Math.round((n / items.length) * 100) : 0;
        const bar = $(".progress-bar", box);
        if (bar) bar.style.width = pct + "%";
        $(".progress", box)?.setAttribute("aria-valuenow", String(n));
        const lbl = $("[data-progress-label]", box);
        if (lbl) lbl.textContent = `${n} de ${items.length} completados`;
        if (doneBtn) {
          const onDone = done.has(doneBtn.dataset.done || "");
          doneBtn.setAttribute("aria-pressed", String(onDone));
          doneBtn.textContent = onDone ? "Completado" : "Marcar como completado";
        }
      };
      on(doneBtn, "click", () => {
        const done = new Set(store.get<string[]>(KEY, []));
        const k = doneBtn?.dataset.done || "";
        if (done.has(k)) done.delete(k);
        else done.add(k);
        store.set(KEY, [...done]);
        render();
      });
      render();
    }

    /* ---------------------------------------------------- Academy: búsqueda */
    const search = $("[data-search]");
    if (search) {
      const input = $<HTMLInputElement>("input", search);
      const list = $(".search-results", search);
      const form = $<HTMLFormElement>("form", search);
      let data: { t: string; k: string; u: string; d: string }[] = [];
      try {
        data = JSON.parse($("#academy-index")?.textContent || "[]");
      } catch {
        /* sin índice */
      }
      const norm = (s: string) =>
        s
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
      const escHtml = (s: string) =>
        s.replace(
          /[&<>"]/g,
          (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] || c,
        );
      let results: typeof data = [];
      let active = -1;

      const find = (q: string) => {
        const n = norm(q.trim());
        if (!n) return [];
        return data
          .map((d) => {
            const t = norm(d.t);
            const score =
              t === n
                ? 4
                : t.startsWith(n)
                  ? 3
                  : t.includes(n)
                    ? 2
                    : norm(d.d).includes(n)
                      ? 1
                      : 0;
            return { d, score };
          })
          .filter((x) => x.score)
          .sort((a, b) => b.score - a.score)
          .map((x) => x.d)
          .filter((d, i, all) => all.findIndex((o) => o.u === d.u) === i)
          .slice(0, 6);
      };

      const paint = () => {
        if (!input || !list) return;
        const q = input.value;
        results = find(q);
        active = -1;
        if (!q.trim()) {
          list.hidden = true;
          input.setAttribute("aria-expanded", "false");
          return;
        }
        list.innerHTML = results.length
          ? results
              .map(
                (r, i) =>
                  `<li role="option"><a href="${r.u}" data-i="${i}"><small>${r.k}</small><b>${escHtml(r.t)}</b><span>${escHtml(r.d)}</span></a></li>`,
              )
              .join("")
          : '<li class="none">Sin resultados. Prueba con otro término, como “CPC” o “SEO”.</li>';
        list.hidden = false;
        input.setAttribute("aria-expanded", "true");
      };

      const mark = () => {
        if (!list) return;
        $$("a", list).forEach((a, i) =>
          a.setAttribute("aria-selected", String(i === active)),
        );
      };

      on(input, "input", paint);
      on(input, "keydown", (e) => {
        const ke = e as KeyboardEvent;
        if (ke.key === "ArrowDown" && results.length) {
          ke.preventDefault();
          active = (active + 1) % results.length;
          mark();
        } else if (ke.key === "ArrowUp" && results.length) {
          ke.preventDefault();
          active = (active - 1 + results.length) % results.length;
          mark();
        } else if (ke.key === "Escape" && list && input) {
          list.hidden = true;
          input.setAttribute("aria-expanded", "false");
        }
      });
      on(form, "submit", (e) => {
        e.preventDefault();
        if (!results.length) paint();
        const pick = results[active >= 0 ? active : 0];
        track("search", {
          search_term: (input?.value || "").trim(),
          result_count: results.length,
        });
        if (pick) location.href = pick.u;
      });
      on(document, "click", (e) => {
        if (!search.contains(e.target as Node) && list && input) {
          list.hidden = true;
          input.setAttribute("aria-expanded", "false");
        }
      });
      $$("[data-term]").forEach((b) =>
        on(b, "click", () => {
          if (!input) return;
          input.value = b.dataset.term || "";
          input.focus();
          paint();
        }),
      );
    }

    /* --------------------------------------------- Modal de contacto (móvil) */
    const modal = $<HTMLDialogElement>("#contact-modal");
    if (modal && typeof modal.showModal === "function") {
      const mobile = matchMedia("(max-width: 768px)");
      const root = document.documentElement;
      const open = () => {
        closeNav();
        modal.classList.remove("is-closing");
        if (!modal.open) modal.showModal();
        root.classList.add("modal-open");
        modal.scrollTop = 0;
      };
      const close = () => {
        if (!modal.open || modal.classList.contains("is-closing")) return;
        modal.classList.add("is-closing");
        let done = false;
        const finish = () => {
          if (done) return;
          done = true;
          modal.classList.remove("is-closing");
          modal.close();
          root.classList.remove("modal-open");
        };
        modal.addEventListener("animationend", finish, { once: true });
        setTimeout(finish, 400);
      };
      on(document, "click", (e) => {
        const a = (e.target as Element | null)?.closest("a");
        if (!a || !mobile.matches || location.pathname.startsWith("/contacto")) return;
        if (
          !a.matches(".btn, .nav-glass") ||
          !/^(\/contacto\/?|#contacto)$/.test(a.getAttribute("href") || "")
        )
          return;
        e.preventDefault();
        open();
      });
      on($("[data-modal-close]", modal), "click", close);
      on(modal, "click", (e) => {
        if (e.target === modal) close();
      });
      on(modal, "cancel", (e) => {
        e.preventDefault();
        close();
      });
      on(mobile, "change", () => {
        if (!mobile.matches && modal.open) {
          modal.close();
          root.classList.remove("modal-open");
        }
      });
    }

    /* ------------------------------------------- Seguimiento de clics (GTM) */
    on(document, "click", (e) => {
      const me = e as MouseEvent;
      if (!me.isTrusted) return;
      const el = (me.target as Element | null)?.closest("a, button");
      if (!el) return;
      const text = clean(el.textContent);
      const href = el.getAttribute("href") || "";
      const place = where(el);

      if (el.matches("a")) {
        const anchor = el as HTMLAnchorElement;
        if (el.closest(".share")) {
          return track("share", {
            method: text,
            content_type: location.pathname.startsWith("/academy") ? "academy" : "blog",
            item_id: location.pathname,
          });
        }
        if (/^https:\/\/wa\.me\//.test(href))
          return track("whatsapp_click", { link_location: place, link_text: text });
        if (href.startsWith("mailto:"))
          return track("email_click", { link_location: place });
        if (/instagram\.com/.test(href))
          return track("instagram_click", { link_location: place });
        if (el.matches(".project-info a, .mockups a")) {
          const card = el.closest(".project-info, .mockups li");
          return track("portfolio_visit", {
            project_name: clean($("h3", card ?? undefined)?.textContent),
            project_url: anchor.hostname,
            link_location: place,
          });
        }
        if (el.matches(".card-g--service .card-link, .service-go")) {
          const card = el.closest(".card-g--service, .service-row");
          return track("service_click", {
            service_name: clean($("h3, h2", card ?? undefined)?.textContent),
            link_location: place,
          });
        }
        if (el.closest(".pager")) {
          return track("academy_nav", {
            direction: el.matches(".pager-prev") ? "anterior" : "proximo",
            destination: href,
          });
        }
        if (el.matches(".card-g--trilha .card-link, .trilha-dark .card-link")) {
          const card = el.closest(".card-g--trilha, .trilha-dark");
          return track("trilha_click", {
            trilha_name: clean($("h3", card ?? undefined)?.textContent),
          });
        }
        if (el.matches(".search-results a")) {
          return track("search_result_click", {
            search_term: ($<HTMLInputElement>("#academy-q")?.value || "").trim(),
            result_title: clean($("b", el)?.textContent),
          });
        }
        if (el.matches(".btn, .btn-ghost, .nav-glass")) {
          return track("cta_click", {
            cta_text: text,
            cta_location: place,
            cta_style: el.matches(".btn") ? "primario" : "secundario",
            cta_destination: href,
          });
        }
        return track("link_click", {
          link_text: text,
          link_url: href,
          link_location: place,
        });
      }

      if (el.matches("[data-filter]"))
        return track("blog_filter", {
          filter_category: (el as HTMLElement).dataset.filter,
        });
      if (el.matches("[data-more]")) return track("blog_load_more");
      if (el.matches("[data-copy]"))
        return track("share", {
          method: "link",
          content_type: location.pathname.startsWith("/academy") ? "academy" : "blog",
          item_id: location.pathname,
        });
      if (el.matches("[data-done]") && el.getAttribute("aria-pressed") === "true") {
        const doneVal = (el as HTMLElement).dataset.done || "";
        const [trilha] = doneVal.split("/");
        return track("academy_complete", { item_id: doneVal, trilha });
      }
      if (el.matches(".nav-toggle"))
        return track("menu_toggle", {
          menu_state: el.getAttribute("aria-expanded") === "true" ? "aberto" : "fechado",
        });
    });

    // Preguntas frecuentes: registra aperturas hechas por el usuario.
    let interacted = false;
    (["pointerdown", "keydown"] as const).forEach((t) =>
      on(window, t, () => (interacted = true), { once: true, capture: true }),
    );
    on(
      document,
      "toggle",
      (e) => {
        const d = e.target as HTMLDetailsElement | null;
        if (interacted && d?.matches?.(".faq-item") && d.open) {
          track("faq_open", {
            faq_question: clean($("summary span", d)?.textContent),
          });
        }
      },
      true,
    );

    /* ------------------------------------------- Seguimiento de scroll (GTM) */
    const scrollMilestones = [25, 50, 75, 90];
    const firedScroll = new Set<number>();
    const checkScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = Math.min(100, Math.round((window.scrollY / max) * 100));
      for (const m of scrollMilestones) {
        if (pct >= m && !firedScroll.has(m)) {
          firedScroll.add(m);
          track("scroll_depth", {
            percent_scrolled: m,
            page_path: location.pathname,
          });
        }
      }
    };
    on(window, "scroll", checkScroll, { passive: true });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [pathname, router]);

  return null;
}
