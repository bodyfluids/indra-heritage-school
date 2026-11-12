import { site } from '../../site.config';

type Row = { label: string; value: string; href?: string | null };

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const cell = (r: Row) =>
  r.href ? `<a href="${esc(r.href)}" target="_blank" rel="noopener">${esc(r.value)}</a>` : esc(r.value).replace(/\n/g, '<br>');

const table = (head: string, rows: readonly Row[], opts: { labelClass?: boolean; colspan?: boolean; headCenter?: boolean }) => {
  const thead = opts.colspan
    ? `<tr><th colspan="2">${esc(head.split('|')[0])}</th></tr>`
    : `<tr><th>${esc(head.split('|')[0])}</th><th${opts.headCenter ? ' class="center"' : ''}>${esc(head.split('|')[1])}</th></tr>`;
  const body = rows
    .map((r) => {
      const first = opts.labelClass ? `<td class="label">${esc(r.label)}</td>` : `<td>${esc(r.label)}</td>`;
      const second = opts.labelClass || r.value.includes('\n') ? `<td>${cell(r)}</td>` : `<td class="center">${cell(r)}</td>`;
      return `<tr>${first}${second}</tr>`;
    })
    .join('');
  return `<div class="ihs-table-responsive"><table class="ihs-table"><thead>${thead}</thead><tbody>${body}</tbody></table></div>`;
};

const css = `html{overflow:hidden}*{margin:0;padding:0;box-sizing:border-box}iframe{max-width:100%}
.ihs-table-responsive{overflow-x:auto;margin-bottom:2em;background:transparent}
.ihs-table{width:100%;border-collapse:collapse;font-family:'Segoe UI',Arial,sans-serif;background:#fff;font-size:1.04rem;letter-spacing:0;margin:0 auto 22px auto;border:1.5px solid #E9B824;box-shadow:none}
.ihs-table th,.ihs-table td{padding:14px 10px;border-bottom:1px solid #F5E8B1;border-right:1px solid #F5E8B1}
.ihs-table th:last-child,.ihs-table td:last-child{border-right:none}
.ihs-table th{background:#FFCB05;color:#262F36;text-transform:uppercase;font-weight:600;letter-spacing:.9px;text-align:left;border-bottom:3.5px solid #c3a234}
.ihs-table td.label{font-weight:500;color:#CC9700}
.ihs-table td.center{text-align:center;color:#262f36}
.ihs-table tr:nth-child(even) td{background:#F5EFDB}
.ihs-table tr:last-child td{border-bottom:none}
@media (max-width:700px){.ihs-table th,.ihs-table td{padding:7.5px;font-size:.96rem}}`;

/** The disclosure tables as a standalone document, rendered in an iframe exactly like the live page. */
export const disclosuresDoc = () => {
  const d = site.disclosures;
  return `<!DOCTYPE html><html lang="en"><head><style>${css}</style></head><body>${[
    table('General Information', d.general, { labelClass: true, colspan: true }),
    table('Documents & Information|Upload / Reference', d.documents, { headCenter: true }),
    table('Infrastructure Information|Details', d.infrastructure, {}),
    table('Staff Information|Details', d.staff, {}),
  ].join(' ')}</body></html>`;
};
