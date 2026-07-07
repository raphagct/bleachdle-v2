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
import { useState } from "react"

interface CharacterSearchProps {
    charactersPlayed: Character[]
    onSelect: (character: Character) => void
    allowedCharacterIds?: number[]
}

export default function CharacterSearch({ charactersPlayed, onSelect, allowedCharacterIds }: CharacterSearchProps) {
    const [inputValue, setInputValue] = useState("")

    const availableCharacters = characters.filter(c =>
        !charactersPlayed.some(played => played.id === c.id) &&
        (!allowedCharacterIds || allowedCharacterIds.includes(c.id))
    )

    return (
        <div className="relative max-w-lg mx-auto mt-4">
            <Combobox<Character>
                items={availableCharacters}
                itemToStringLabel={(character) => character.name}
                value={null}
                inputValue={inputValue}
                onInputValueChange={setInputValue}
                onValueChange={(selectedCharacter) => {
                    if (selectedCharacter) {
                        onSelect(selectedCharacter)
                        setInputValue("")
                    }
                }}
            >
                <ComboboxInput placeholder="Tape le nom du personnage" />
                <ComboboxContent>
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