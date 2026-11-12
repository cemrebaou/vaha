/**
 * Sonuç sayfası betiği: filtre panelindeki seçimlere göre satırları süzer, sıralar,
 * sonuç sayısını günceller ve seçimleri adres çubuğuna yazar (paylaşılabilir arama).
 * Sunucu bağlandığında aynı form, sorguyu sunucuya gönderecek şekilde değiştirilebilir.
 */

type Kind = 'text' | 'multi' | 'range' | 'bool' | 'days' | 'flag';

interface Rule {
  field: string;
  kind: Kind;
  values: string[];
  min?: number;
  max?: number;
}

const form = document.querySelector<HTMLFormElement>('[data-filter-form]');
const list = document.querySelector<HTMLElement>('[data-rows]');

if (form && list) setup(form, list);

function setup(form: HTMLFormElement, list: HTMLElement): void {
  const rows = Array.from(list.children) as HTMLElement[];
  const original = rows.slice();
  const lang = document.documentElement.lang;
  const numbers = new Intl.NumberFormat(lang === 'ar' ? 'ar-AE-u-nu-latn' : lang);
  const found = document.querySelector<HTMLElement>('[data-found]');
  const empty = document.querySelector<HTMLElement>('[data-empty]');
  const sort = document.querySelector<HTMLSelectElement>('[data-sort]');
  const groups = Array.from(form.querySelectorAll<HTMLElement>('[data-field]'));

  // Adres çubuğundaki seçimleri forma geri yükle (ör. üst aramadan gelen ?q=).
  const params = new URLSearchParams(location.search);
  params.forEach((value, name) => {
    form.querySelectorAll<HTMLInputElement>(`[name="${CSS.escape(name)}"]`).forEach((input) => {
      if (input.type === 'checkbox' || input.type === 'radio') {
        if (input.value === value) input.checked = true;
      } else {
        input.value = value;
      }
    });
  });
  const startSort = params.get('sort');
  if (sort && startSort) sort.value = startSort;
  // Seçili kriter içeren kapalı grupları aç.
  groups.forEach((group) => {
    if (group instanceof HTMLDetailsElement && readRule(group).values.length) group.open = true;
  });

  function readRule(group: HTMLElement): Rule {
    const field = group.dataset.field!;
    const kind = group.dataset.kind as Kind;
    const inputs = Array.from(group.querySelectorAll<HTMLInputElement>('input'));
    if (kind === 'range') {
      const min = inputs.find((input) => input.name.endsWith('_min'))?.value ?? '';
      const max = inputs.find((input) => input.name.endsWith('_max'))?.value ?? '';
      return {
        field,
        kind,
        values: [min, max].filter(Boolean),
        min: min ? Number(min) : undefined,
        max: max ? Number(max) : undefined,
      };
    }
    const values = inputs
      .filter((input) => (input.type === 'checkbox' || input.type === 'radio' ? input.checked : true))
      .map((input) => input.value.trim())
      .filter(Boolean);
    return { field, kind, values };
  }

  function matches(row: HTMLElement, rule: Rule): boolean {
    if (!rule.values.length) return true;
    switch (rule.kind) {
      case 'text': {
        const haystack = row.dataset.q ?? '';
        return rule.values[0]!
          .toLocaleLowerCase(lang)
          .split(/\s+/)
          .every((word) => haystack.includes(word));
      }
      case 'days':
        return Number(row.dataset.days) < Number(rule.values[0]);
      case 'flag':
        return row.dataset[rule.field === 'u' ? 'urgent' : rule.field] === '1';
      case 'range': {
        const raw = row.getAttribute(`data-f-${rule.field}`);
        if (raw === null) return false;
        const value = Number(raw);
        return (rule.min === undefined || value >= rule.min) && (rule.max === undefined || value <= rule.max);
      }
      default:
        return rule.values.includes(row.getAttribute(`data-f-${rule.field}`) ?? '');
    }
  }

  function apply(): void {
    const rules = groups.map(readRule).filter((rule) => rule.values.length);

    let shown = 0;
    for (const row of rows) {
      const ok = rules.every((rule) => matches(row, rule));
      row.hidden = !ok;
      if (ok) shown += 1;
    }

    const order = sort?.value ?? 'smart';
    const key = (row: HTMLElement) =>
      order.startsWith('price') ? Number(row.getAttribute('data-f-price')) : Number(row.dataset.days);
    const sorted =
      order === 'smart'
        ? original
        : rows.slice().sort((a, b) => {
            const diff = key(a) - key(b);
            return order === 'price-desc' || order === 'date-old' ? -diff : diff;
          });
    list.append(...sorted);

    if (found) {
      const query = rules.find((rule) => rule.kind === 'text')?.values[0];
      const template = (query ? found.dataset.tplQuery : found.dataset.tpl) ?? '';
      found.textContent = template.replace('{n}', numbers.format(shown)).replace('{q}', query ?? '');
    }
    if (empty) empty.hidden = shown > 0;

    const query = new URLSearchParams();
    new FormData(form).forEach((value, name) => {
      if (typeof value === 'string' && value.trim()) query.append(name, value.trim());
    });
    if (order !== 'smart') query.set('sort', order);
    const search = query.toString();
    history.replaceState(null, '', search ? `?${search}${location.hash}` : location.pathname + location.hash);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    apply();
    // Telefonda filtre ekranını kapatıp sonuçlara dön.
    if (location.hash === '#filters') location.hash = 'results';
  });
  form.addEventListener('change', apply);
  form.addEventListener('input', (event) => {
    if ((event.target as HTMLInputElement).type === 'search') apply();
  });
  form.addEventListener('reset', () => setTimeout(apply));
  sort?.addEventListener('change', apply);

  apply();
}
