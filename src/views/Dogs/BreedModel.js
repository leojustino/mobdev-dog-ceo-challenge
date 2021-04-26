
let id = 0

export default function BreedModel(name)
{
    return {
        id: ++id,
        name: name,
        selected: false,
        images: []
    }
}