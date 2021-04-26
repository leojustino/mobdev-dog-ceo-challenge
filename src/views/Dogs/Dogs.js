
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BreedList from "./BreedList";
import ImageList from "./ImageList";

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

export default function DogsPage()
{
    const [breeds, setBreeds] = React.useState([])
    const breedsLoadHandle = breeds => setBreeds(breeds)
    const breedChangedHandle = breed => setBreeds([...breeds])
    const selectedBreeds = breeds.filter(a => a.selected)

    return (
        <div>
            <BreedList
                useStyles={useStyles}
                onBreedsLoad={breedsLoadHandle}
                onSelectedBreedChanged={breedChangedHandle} />

            <ImageList
                useStyles={useStyles}
                breeds={selectedBreeds} />
        </div>
    )
}
