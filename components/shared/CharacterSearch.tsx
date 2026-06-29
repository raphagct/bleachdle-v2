

import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"

import { characters, type Character } from "@/lib/characters.data"

import AizenPic from "@/public/aizen.jpg"
import Image from 'next/image';
export default function () {
    return <div className="relative max-w-lg mx-auto mt-4">
        <Combobox<Character>
            items={characters}
            itemToStringValue={(character) => character.name}>

            <ComboboxInput placeholder="Tape le nom du personnage" />
            <ComboboxContent collisionAvoidance={{ side: 'none' }}>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                    {(character) => (
                        <ComboboxItem key={character.id} value={character}>
                            <Image src={character.image_url}
                             alt={character.image_url + "icon"}
                             width={60}
                             height={60} />
                            <span>{character.name}</span>
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    </div>
}