export const Console = {
    component: (text: string) => {
        console.log("%c" + text, "color: yellow; font-weight: bold;")
    },
    api: {
        success: (text: string) => {
            console.log("%c" + text, "background: green; color: white;")
        },
        cache: (text: string) => {
            console.log("%c" + text, "background: orange; color: black;")
        },
        error: (text: string) => {
            console.log("%c" + text, "background: red; color: white;")
        }
    }
}

export default Console