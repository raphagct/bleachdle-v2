"use client"

import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"
import { characters, type Character } from "@/lib/characters.data"
import Image from 'next/image'
import { useMemo, useState } from "react"

interface CharacterSearchProps {
    charactersPlayed: Character[]
    onSelect: (character: Character) => void
}

export default function CharacterSearch({ charactersPlayed, onSelect }: CharacterSearchProps) {
    const [value, setValue] = useState<Character | null>(null)

    const availableCharacters = characters.filter(c =>
        !charactersPlayed.some(played => played.id === c.id)
    )

    return (
        <div className="relative max-w-lg mx-auto mt-4">
            <Combobox<Character>
                items={availableCharacters}
                itemToStringValue={(character) => character.name}
                value={value}
                onValueChange={(selectedCharacter) => {
                    if (selectedCharacter) {
                        onSelect(selectedCharacter)
                        setValue(null)
                    }
                }}
            >
                <ComboboxInput placeholder="Tape le nom du personnage" />
                <ComboboxContent collisionAvoidance={{ side: 'none' }}>
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList>
                        {(character) => (
                            <ComboboxItem key={character.id} value={character}>
                                <Image
                                    src={character.image_url}
                                    alt={`${character.name} icon`}
                                    width={60}
                                    height={60}
                                />
                                <span>{character.name}</span>
                            </ComboboxItem>
                        )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
        </div>
    )
}