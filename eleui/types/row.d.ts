import { ElementUIComponent } from './component'

/** Horizontal alignment of flex layout */
export type HorizontalAlignment = 'start' | 'end' | 'center' | 'space-around' | 'space-between'

/** vertical alignment of flex layout */
export type VertialAlignment = 'top' | 'middle' | 'bottom'

/** Row Component */
export declare class ElRow extends ElementUIComponent {
    gutter:number
    type:string
    justify:HorizontalAlignment
    align:VertialAlignment
    tag:string
}
