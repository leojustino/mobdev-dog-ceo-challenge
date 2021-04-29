import GridItem from 'components/Grid/GridItem'
import React from 'react'
import BreedItem from './BreedItem'

const GridItemBreed = React.memo(props =>
{
    const { breeds, onSelectedBreedChanged } = props

    return (
        <GridItem xs={12} sm={12} md={4}>
            {breeds.map(breed =>
                <BreedItem
                    onSelectedBreedChanged={onSelectedBreedChanged}
                    breed={breed}
                    key={breed.name} />)}
        </GridItem>
    )
})

export default GridItemBreed
