export type Technique = {
    id: number,
    gif_url: string,
    character_id: number
}

export const techniques : Technique[] = [
    {
        id: 1,
        gif_url: '/rukia-bankai.gif',
        character_id: 2 // Rukia Kuchiki
    },
    {
        id: 2,
        gif_url: '/getsuga-tensho.gif',
        character_id: 1 // Ichigo Kurosaki
    },
    {
        id: 3,
        gif_url: '/hado99.gif',
        character_id: 21 // Sōsuke Aizen
    },
    {
        id: 4,
        gif_url: '/ulquiorra-arrow.gif',
        character_id: 49 // Ulquiorra Cifer
    }
]