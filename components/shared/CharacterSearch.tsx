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
import { useState, useEffect, useRef } from "react"

interface CharacterSearchProps {
    charactersPlayed: Character[]
    onSelect: (character: Character) => void
    allowedCharacterIds?: number[]
}

export default function CharacterSearch({ charactersPlayed, onSelect, allowedCharacterIds }: CharacterSearchProps) {
    const [inputValue, setInputValue] = useState("")
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const availableCharacters = characters.filter(c =>
        !charactersPlayed.some(played => played.id === c.id) &&
        (!allowedCharacterIds || allowedCharacterIds.includes(c.id))
    )

    const handleInputValueChange = (value: string) => {
        setInputValue(value)
        setOpen(value.trim().length >= 1)
    }

    useEffect(() => {
        if (open && containerRef.current) {
            const timeoutId = setTimeout(() => {
                if (containerRef.current) {
                    const rect = containerRef.current.getBoundingClientRect()
                    const dropdownBottom = rect.bottom + 320
                    if (dropdownBottom > window.innerHeight) {
                        window.scrollBy({
                            top: dropdownBottom - window.innerHeight + 24,
                            behavior: "smooth"
                        })
                    }
                }
            }, 50)
            return () => clearTimeout(timeoutId)
        }
    }, [open])

    return (
        <div ref={containerRef} className="relative max-w-[400px] mx-auto mt-6">
            <Combobox<Character>
                items={availableCharacters}
                itemToStringLabel={(character) => character.name}
                value={null}
                inputValue={inputValue}
                onInputValueChange={handleInputValueChange}
                open={open}
                onOpenChange={(nextOpen) => {
                    if (!nextOpen) {
                        setOpen(false)
                    }
                }}
                onValueChange={(selectedCharacter) => {
                    if (selectedCharacter) {
                        onSelect(selectedCharacter)
                        setInputValue("")
                        setOpen(false)
                    }
                }}
            >
                <ComboboxInput placeholder="Tape le nom du personnage..." className="h-12 rounded-xl border-2 shadow-sm" />
                <ComboboxContent side="bottom" sideOffset={6} collisionAvoidance={{ side: "none" }}>
                    <ComboboxEmpty className="py-6 text-center text-sm text-muted-foreground">
                        Aucun personnage ne correspond à « <span className="font-semibold text-foreground">{inputValue}</span> »
                    </ComboboxEmpty>
                    <ComboboxList className="max-h-[300px]">
                        {(character) => (
                            <ComboboxItem
                                key={character.id}
                                value={character}
                                className="flex items-center gap-4 py-2.5 px-3 cursor-pointer"
                            >
                                <Image
                                    src={character.image_url}
                                    alt={`${character.name} icon`}
                                    width={56}
                                    height={56}
                                    className="w-14 h-14 rounded-lg object-cover shadow-sm shrink-0"
                                    style={{ width: "auto", height: "auto" }}
                                />
                                <span className="text-base font-medium text-foreground">{character.name}</span>
                            </ComboboxItem>
                        )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
        </div>
    )
}