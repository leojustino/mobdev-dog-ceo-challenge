import React from 'react'
import BreedsList from './BreedsList'
import ImagesList from './ImagesList'
import LoadBreeds from './LoadBreeds'
import LoadImages from './LoadImages'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    cardTitle: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    gridList: {
        height: 450,
    },
});

const Dogs2 = () =>
{
    const [breeds, setBreeds] = React.useState([])
    const loadBreedsHandle = React.useCallback(breeds => setBreeds(breeds))
    const loadImagesHandle = React.useCallback(() => setBreeds([...breeds]))
    const breedSelectedChangedHandle = React.useCallback(breed => setBreeds([...breeds]))
    const selectedBreeds = breeds.filter(breed => breed.selected)

    return (
        <div>
            <LoadBreeds onBreedsLoaded={loadBreedsHandle} />

            <LoadImages
                breeds={selectedBreeds}
                onImagesLoaded={loadImagesHandle} />

            <BreedsList
                useStyles={useStyles}
                breeds={breeds}
                onSelectedBreedChanged={breedSelectedChangedHandle} />

            <ImagesList
                useStyles={useStyles}
                breeds={selectedBreeds} />
        </div>
    )
}

export default Dogs2