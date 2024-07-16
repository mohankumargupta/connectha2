export type Entity = {
    "entity_id": string,
    "friendly_name": string,
}

export type EntityFromHA = {
    "entity_id": string,
    "attributes": {
        "friendly_name": string
    }
}