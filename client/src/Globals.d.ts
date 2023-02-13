declare module '*.css'
// declare module '*.svg'
declare module '*.svg' {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
    export default content
}
declare module '*.png' {
    const value: string
    export default value
}
declare module '*.jpg' {
    const value: string
    export default value
}
declare module '*.jpeg' {
    const value: string
    export default value
}
declare module '*.txt' {
    const content: string
    export default content
}
