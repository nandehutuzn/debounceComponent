const debounce = (func, time, ctx) => {
    let timer
    return (...params) => {
        if(timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            func.apply(ctx, params)
        }, time)
    }
}

// 根据事件名，递归查找事件绑定方法和对应vnode
const getEventHandle = (vnode, event) => {
    let tmpVnode = vnode && vnode.componentOptions
    if(tmpVnode) {
        if(tmpVnode.listeners && tmpVnode.listeners[event]) {
            return {vnode: vnode, handle: tmpVnode.listeners[event]}
        } else if(tmpVnode.children && tmpVnode.children.length > 0) {
            return getEventHandle(tmpVnode.children[0], event)
        }
    } else if(vnode.children && vnode.children.length > 0) {
        return getEventHandle(vnode.children[0], event)
    }

    return null
}

export default {
    abstract: true,
    props: {
        time: {
            type: String,
            default: 500
        },
        events: String
    },

    created() {
        this.eventKeys = this.events.split(',')
        this.originMap = {}
        this.debounceMap = {}
    },

    render() {
        const vnode = this.$slots.default[0]
        this.eventKeys.forEach(event => {
            //根据事件名称，取出绑定这个事件的vnode和该事件的执行方法
            const target = getEventHandle(vnode, event) // 防止还有其他嵌套节点
            if(target) { // render方法界面有更新就会执行，所以将设置好的方法放在缓存中，减少debounce方法执行次数
                if(target.handle === this.originMap[event] && this.debounceMap[event]){
                    target.vnode.componentOptions.listeners[event] = this.debounceMap[event]
                } else if(target.vnode) {
                    this.originMap[event] = target.handle
                    //取出原事件绑定的方法，对它防抖处理后替换掉它
                    this.debounceMap[event] = debounce(target.handle, this.time, target.vnode)
                    target.vnode.componentOptions.listeners[event] = this.debounceMap[event]
                }
            }
        });

        return vnode
    }
}