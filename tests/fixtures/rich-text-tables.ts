/** 相同列定义同时覆盖原生表格和交互网格；长连续字符串必须留在单元格内。 */
export const columnTableContent = `<table style="width:400px;table-layout:fixed">
<colgroup><col style="width:25%"><col style="width:75%"></colgroup>
<tbody><tr><th colspan="2">周末计划</th></tr>
<tr><td rowspan="2">09:00</td><td><a href="/journal/gear">阅读清单</a></td></tr>
<tr><td>${'WeekendJournal'.repeat(8)}</td></tr></tbody></table>`

export const staticColumnTableContent = columnTableContent.replace('<a href="/journal/gear">阅读清单</a>', '阅读清单')
