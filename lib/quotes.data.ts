export type Quote = {
    id: number,
    quote: string,
    character_id: number,
    destinataire: string,
    arc: string
}

export const quotes: Quote[] = [
    {
        id: 1,
        quote: "C'est quoi un cœur ? Si je t'ouvre la poitrine, est-ce que je le verrai à l'intérieur ? Si je te fracasse le crâne, est-ce qu'il sera là ?",
        character_id: 49, // Ulquiorra Cifer
        destinataire: "Orihime Inoue",
        arc: "Arc de Hueco Mundo"
    },
    {
        id: 2,
        quote: "L'admiration est le sentiment qui est le plus éloigné de la compréhension.",
        character_id: 21, // Sōsuke Aizen
        destinataire: "Tōshirō Hitsugaya",
        arc: "Arc de la Soul Society"
    },
    {
        id: 3,
        quote: "Depuis le début, personne n'est au sommet du ciel. Ni toi, ni moi, ni même les Dieux. Mais le vacance insupportable du trône céleste est finie. Dès à présent, c'est moi qui m'y assieds.",
        character_id: 21, // Sōsuke Aizen
        destinataire: "Jūshirō Ukitake",
        arc: "Arc de la Soul Society"
    },
    {
        id: 4,
        quote: "Je ne me bats pas parce que j'ai l'espoir de gagner. Je me bats parce que je dois gagner !",
        character_id: 1, // Ichigo Kurosaki
        destinataire: "Ulquiorra Cifer",
        arc: "Arc de Hueco Mundo"
    },
    {
        id: 5,
        quote: "La différence entre nos forces n'est pas une question de niveau. Elle est aussi profonde que le fossé qui sépare la terre du ciel.",
        character_id: 23, // Byakuya Kuchiki
        destinataire: "Ichigo Kurosaki",
        arc: "Arc de la Soul Society"
    },
    {
        id: 6,
        quote: "Quand je combats quelqu'un de fort, je suis tellement excité que je ne peux pas m'empêcher de sourire.",
        character_id: 31, // Kenpachi Zaraki
        destinataire: "Ichigo Kurosaki",
        arc: "Arc de la Soul Society"
    },
    {
        id: 7,
        quote: "Un guerrier qui ne craint pas sa propre épée n'est pas digne de la tenir dans ses mains.",
        character_id: 6, // Kisuke Urahara
        destinataire: "Ichigo Kurosaki",
        arc: "Arc de la Bataille de Karakura"
    },
    {
        id: 8,
        quote: "Dès l'instant où la guerre éclate, les deux camps ont tort. Il n'y a pas de justice dans la guerre.",
        character_id: 26, // Shunsui Kyōraku
        destinataire: "Love Aikawa",
        arc: "Arc de la Bataille de Karakura"
    },
    {
        id: 9,
        quote: "Ne m'oublie jamais, Shinigami ! Je suis celui qui t'a amené au seuil de la mort !",
        character_id: 51, // Grimmjow Jaegerjaquez
        destinataire: "Ichigo Kurosaki",
        arc: "Arc de Hueco Mundo"
    },
    {
        id: 10,
        quote: "Même si personne ne croit en toi, tu dois être le seul à croire en toi-même.",
        character_id: 2, // Rukia Kuchiki
        destinataire: "Ichigo Kurosaki",
        arc: "Arc du Shinigami Remplaçant"
    },
    {
        id: 11,
        quote: "Si tu devais te transformer en serpent demain et commencer à dévorer des humains, et que de cette même bouche tu me disais que tu m'aimes... serais-je encore capable de te dire que je t'aime aujourd'hui ?",
        character_id: 18, // Gin Ichimaru
        destinataire: "Rangiku Matsumoto",
        arc: "Arc de la Bataille de Karakura"
    },
    {
        id: 12,
        quote: "La perfection est une absurdité. S'il existe quelque chose de parfait, alors il n'y a plus de place pour l'amélioration, plus de place pour l'imagination !",
        character_id: 35, // Mayuri Kurotsuchi
        destinataire: "Szayelaporro Granz",
        arc: "Arc de Hueco Mundo"
    },
    {
        id: 13,
        quote: "Le conflit n'est pas un péché. C'est le moteur de toute évolution dans ce monde.",
        character_id: 63, // Yhwach
        destinataire: "Ichigo Kurosaki",
        arc: "Arc de la Guerre Sanglante de Mille Ans (Thousand-Year Blood War)"
    },
    {
        id: 14,
        quote: "Un homme qui ne peut pas défendre l'honneur d'une femme n'est rien de plus qu'un chien !",
        character_id: 24, // Renji Abarai
        destinataire: "Uryū Ishida",
        arc: "Arc de la Soul Society"
    },
    {
        id: 15,
        quote: "Si tu oses faire couler le sang d'Hinamori une seule fois de plus... je te tuerai de mes propres mains !",
        character_id: 29, // Tōshirō Hitsugaya
        destinataire: "Gin Ichimaru",
        arc: "Arc de la Soul Society"
    },
    {
        id: 16,
        quote: "Je ne me bats pas pour les Shinigamis. Je me bats sur mon honneur en tant que Quincy !",
        character_id: 4, // Uryū Ishida
        destinataire: "Mayuri Kurotsuchi",
        arc: "Arc de la Soul Society"
    },
    {
        id: 17,
        quote: "J'aurais aimé avoir cinq vies ! Je pourrais naître dans cinq villes différentes, manger cinq fois plus de bonnes choses... et je tomberais amoureuse de la même personne cinq fois.",
        character_id: 3, // Orihime Inoue
        destinataire: "Ichigo Kurosaki",
        arc: "Arc de Hueco Mundo"
    },
    {
        id: 18,
        quote: "La justice sans force est impuissante, mais la force sans justice n'est que de la tyrannie. Je suis la voie de la moindre effusion de sang.",
        character_id: 27, // Kaname Tōsen
        destinataire: "Kenpachi Zaraki",
        arc: "Arc de la Soul Society"
    },
    {
        id: 19,
        quote: "Dans ce monde, il y a des choses qu'on ne peut pas comprendre simplement parce qu'on ouvre les yeux.",
        character_id: 39, // Shinji Hirako
        destinataire: "Ichigo Kurosaki",
        arc: "Arc de Hueco Mundo"
    },
    {
        id: 20,
        quote: "Ce ne sont pas les armes qui font la force d'un guerrier, c'est la détermination qui anime son âme.",
        character_id: 7, // Yoruichi Shihōin
        destinataire: "Soi Fon",
        arc: "Arc de la Soul Society"
    }
];