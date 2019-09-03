export default function cellRenderer(instance, dom, row, col, prop, value) {
    const { checkbox, header } = this.options || {};
    if (
        !checkbox || !value
        || header.row.indexOf(row) !== -1
        || header.col.indexOf(col) !== -1
    ) {
        dom.innerHTML = value;
        return dom;
    }
    const checked = (
        checkbox.checked
        && checkbox.checked.length
        && checkbox.checked.some(it => it.row === row && it.col === col)
    );
    dom.classList.add('cell-radio');
    const dataset = `class="cell-radio-input" data-row="${row}" data-col="${col}"`;
    const checkedInput = [
        `<input type="radio" name="radio-${row}" ${dataset} checked="checked">`,
        `<span> ${value || ''}</span>`,
    ].join('');
    const uncheckedInput = [
        `<input type="radio" name="radio-${row}" ${dataset}>`,
        `<span> ${value || ''}</span>`,
    ].join('');
    dom.innerHTML = checked ? checkedInput : uncheckedInput;
    return dom;
}
