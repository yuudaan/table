export default function createDbclickEvent(type) {
    return {
        /**
         * @description 目前核心编辑器的自定元素的各种点击事件，暂时无法支持，这里监听全局的 click 事件模拟用户双击
         */
        'base.click': function click(event) {
            const { editor } = this;
            // mirror 模式下禁用 click 事件
            if (!editor || !editor.pointFromEvent || !editor.getElementByPoint) {
                return;
            }
            if (this.elementClickQueue == null) {
                this.elementClickQueue = [];
            }
            const point = editor.pointFromEvent(event);
            const element = editor.getElementByPoint(point.x, point.y);
            // 非表格元素清空点击队列
            if (!element || element.type !== type) {
                this.elementClickQueue = [];
                return;
            }
            if (this.elementClickTimer) {
                clearTimeout(this.elementClickTimer);
                this.elementClickQueue.push(element);
                if (this.elementClickQueue.length > 1) {
                    this.editor.$emit(`editor.${type}.dblclick`, element);
                    this.elementClickQueue = [];
                }
            } else {
                this.elementClickQueue.push(element);
            }
            // 双击延迟为 300 ms
            this.elementClickTimer = setTimeout(() => {
                this.elementClickQueue = [];
            }, 300);
        },
    };
}
