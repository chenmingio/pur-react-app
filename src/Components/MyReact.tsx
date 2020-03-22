export const MyReact = (function () {
    let _val: any
    return {
        render(Component: () => any) {
            const Comp = Component()
            Comp.render()
            return Comp
        },
        useState(initialValue: any) {
            _val = _val || initialValue

            function setState(newVal: any) {
                _val = newVal
            }

            return [_val, setState]
        }
    }
})()

// Example 2 continued
function Counter() {
    const [count, setCount] = MyReact.useState(0)
    return {
        click: () => setCount(count + 1),
        render: () => console.log('render:', { count })
    }
}
let App
App = MyReact.render(Counter) // render: { count: 0 }
App.click()
App = MyReact.render(Counter) // render: { count: 1 }