import cloneDeep from 'lodash/cloneDeep';
import onecolor from 'onecolor';

window.onecolor = onecolor;
/**
 * @description 10 -> '10px' or '10%' -> '10%'
 * @param {string | number} value
 */
export function unit(value) {
    return typeof value === 'number' ? `${value}px` : value;
}

/**
 * @description 根据 conf 配置生成 style
 * { border: { color: '#fff' } } => { 'border-color': '#ff' }
 * @param {object} conf 配置文件
 * @param {string} prefix 后缀
 */
export function createStyle(conf, colors = [], prefix = '') {
    const style = {};
    const matchColorKey = /([c|C]olor|background)$/;
    const excludeKey = { weight: true };
    Object.keys(conf).forEach((key) => {
        const value = conf[key];
        // padding: [1, 2, 3, 4] => padding: '1px 2px 3px 4px'
        if (Array.isArray(value)) {
            style[key] = value.map(p => `${p}px`).join(' ');
            return;
        }
        if (typeof value === 'object') {
            Object.assign(style, createStyle(value, colors, `${prefix}${key}-`));
            return;
        }
        if (matchColorKey.test(key) && typeof value === 'number') {
            style[`${prefix}${key}`] = colors[value] || value;
        } else {
            style[`${prefix}${key}`] = excludeKey[key] ? value : unit(value);
        }
    });
    return style;
}

const PRIORITY_MAP = {
    common: 0,
    repeat: 1,
    single: 2,
    cell: 3,
};

const gridCheckers = {
    common() {
        return true;
    },

    repeat(conf, options) {
        const {
            match: {
                row,
                col,
            },
        } = conf;
        let matched = true;
        /**
         * 斑马纹设置，规则与 css 的 nth-child(an+b) 类似
         * nth-child(coefficient * n + remainder)
         */
        if (row) {
            matched = (options.row + 1) % row.coefficient === row.remainder;
        }
        if (col) {
            matched = (
                matched
                && (options.col + 1) % col.coefficient === col.remainder
            );
        }
        return matched;
    },

    single(conf, { row, col }) {
        const { match } = conf;
        return match.row === row || match.col === col;
    },

    cell(conf, { row, col }) {
        const { match } = conf;
        return match.row === row && match.col === col;
    },
};

/**
 * @description 匹配 confs 中的规则过滤出对应的样式文件配置，按权重优先级生成样式
 * @param {array} confs 配置列表
 * @param {object} options { row: 0, col: 2 }
 */
export function createGridStyle(confs, colors = [], options) {
    const uiList = [];
    confs.forEach((conf) => {
        const { type, match = {} } = conf;
        let priority = PRIORITY_MAP[type];
        // 行样式优先级高于列
        if (match.row != null) {
            priority += 1;
        }
        const checker = gridCheckers[type];
        if (checker && checker(conf, options)) {
            uiList.push({ ...conf, priority });
        }
    });
    const gridStyle = {};
    uiList.sort((a, b) => a.priority - b.priority).forEach((conf) => {
        Object.assign(gridStyle, createStyle(conf.ui, colors));
    });
    return gridStyle;
}

const lineCheckers = {
    single(conf, options) {
        const { match } = conf;
        if (match.row != null) {
            return match.row === options.row;
        }
        if (match.col != null) {
            return match.col === options.col;
        }
        return false;
    },

    repeat(conf, options) {
        const {
            match: {
                row,
                col,
                single = false,
            },
        } = conf;
        const matchSingle = single || (
            !single
            && options.exclude.col.indexOf(options.col) === -1
            && options.exclude.row.indexOf(options.row) === -1
        );
        if (row) {
            return (
                matchSingle
                && (options.row + 1) % row.coefficient === row.remainder
            );
        }
        if (col) {
            return (
                matchSingle
                && (options.col + 1) % col.coefficient === col.remainder
            );
        }
        return false;
    },
};

/**
 * @description 根据 lineConfs 生成网格
 * single 与 repeat 类型的网格线相互独立的，不会同时存在，single 类型优先级更高
 * repeat 类型的网格线不需要对 single 类型的单元格进行设置
 * @param {array} lineConfs 网格线配置列表
 * @param {array} gridConfs 网格单元配置列表
 * @param {object} options 单元格属性
 */
export function createLineStyle(lineConfs, gridConfs, colors = [], options) {
    if (!lineConfs || !lineConfs.length) {
        return {};
    }
    const singleLine = [];
    const repeatLine = [];
    const repeatExclude = {
        row: [],
        col: [],
    };
    gridConfs.forEach((grid) => {
        if (grid.type !== 'single') return;
        if (grid.match.row != null) {
            repeatExclude.row.push(grid.match.row);
        } else {
            repeatExclude.col.push(grid.match.col);
        }
    });
    lineConfs.forEach((conf) => {
        const checker = lineCheckers[conf.type];
        if (!checker) return;
        if (conf.type === 'single') {
            if (checker(conf, options)) {
                singleLine.push(conf);
                return;
            }
        }
        if (conf.type === 'repeat') {
            if (checker(conf, { ...options, exclude: repeatExclude })) {
                repeatLine.push(conf);
            }
        }
    });
    const lineStyle = {};
    // 优先使用 single 类型的网格线
    const currConfs = singleLine.length ? singleLine : repeatLine;
    if (currConfs.length) {
        currConfs.forEach((conf) => {
            const ui = cloneDeep(conf.ui);
            // 匹配行
            if (conf.match.row != null) {
                // 单独一行最后一列（格）右边边框
                if (conf.type === 'single' && options.col === options.colLength - 1) {
                    delete ui.border.right;
                }
                // 剔除重复行最后一行的下边框
                if (conf.type === 'repeat' && options.row === options.rowLength - 1) {
                    delete ui.border.bottom;
                }
            }
            // 匹配列
            if (conf.match.col != null) {
                // 单独一列，最后一行（格）下边框
                if (conf.type === 'single' && options.row === options.rowLength - 1) {
                    delete ui.border.bottom;
                }
                // 剔除重复列最后一列的右边边框
                if (conf.type === 'repeat' && options.col === options.colLength - 1) {
                    delete ui.border.right;
                }
            }
            Object.assign(lineStyle, createStyle(ui, colors));
        });
    }
    return lineStyle;
}

/**
 * @description 将颜色统一成 rgba
 * @param {strinf} color
 */
export function toRGBA(color) {
    color = color.replace(/^(#\w{6})(\w{2})$/, '$1');
    const [, r, g, b, a] = onecolor(color).toJSON();
    return [
        Math.floor(r * 255),
        Math.floor(g * 255),
        Math.floor(b * 255),
        a,
    ];
}

/**
 *
 * @description 判断当前的颜色是否是白色
 * @param {string} color
 */
export function isWhiteColor(color) {
    color = color.replace(/^(#\w{6})(\w{2})$/, '$1');
    return onecolor(color).hex() === '#ffffff';
}

/**
 * @description 根据起始与结束颜色按梯度划分生成过度颜色
 * @param {string} startColor 起始颜色
 * @param {string} endColor 结束颜色
 * @param {number} step 渐变梯度
 */
export function createGradientColors(startColor, endColor, step) {
    const [sr, sg, sb, sa] = toRGBA(startColor);
    const [er, eg, eb, ea] = toRGBA(endColor);
    const dr = (er - sr) / step;
    const dg = (eg - sg) / step;
    const db = (eb - sb) / step;
    const da = (ea - sa) / step;
    const colorList = [];
    for (let i = 0; i < step; i += 1) {
        const rgba = [
            Math.floor(sr + dr * i),
            Math.floor(sg + dg * i),
            Math.floor(sb + db * i),
            Math.floor(sa + da * i),
        ];
        colorList.push(`rgba(${rgba.join(',')})`);
    }
    return colorList;
}
