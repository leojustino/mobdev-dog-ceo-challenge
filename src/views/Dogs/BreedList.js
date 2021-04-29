import React from "react";
import BreedItem from "./BreedItem";
import BreedModel from "./BreedModel"
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import CustomInput from "components/CustomInput/CustomInput"

const cache = []

export default function BreedList(props)
{
    const classes = props.useStyles()
    const [filter, setFilter] = React.useState('')
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const getBreedsHandle = React.useCallback(async () =>
    {
        if (cache.length === 0)
            try
            {
                setLoading(true)
                setError(null)

                const response = await fetch('https://dog.ceo/api/breeds/list/all');

                if (response.ok)
                {
                    const json = await response.json()

                    for (let breed in json.message)
                    {
                        let subBreeds = json.message[breed]

                        if (subBreeds.length === 0)
                            cache.push(BreedModel(breed))
                        else
                            subBreeds.forEach(subBreed => cache.push(BreedModel(`${breed} ${subBreed}`)))
                    }
                    setFilter('')

                    if (props.onBreedsLoad)
                        props.onBreedsLoad(cache)
                }
                else
                    setError('wrong http response')
            }
            catch (error)
            {
                setError(error)
            }

        setLoading(false)
    }, [props])
    const breedToComponent = breed => <BreedItem
        onSelectedBreedChanged={props.onSelectedBreedChanged}
        breed={breed}
        key={breed.name} />


    React.useEffect(() => { getBreedsHandle() }, [getBreedsHandle])

    const filtered = filter === '' ? cache : cache.filter(a => null != a.name.match(filter))

    let content = <h3>No breeds found :(</h3>

    if (filtered.length > 0)
    {
        const lines = Math.ceil(filtered.length / 3)
        const col1 = filtered.slice(0, lines)
        const col2 = filtered.slice(lines, 2 * lines)
        const col3 = filtered.slice(lines * 2)

        content = (
            <div style={{ maxHeight: 150, overflowY: "scroll", overflowX: "hidden" }}>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>{col1.map(breedToComponent)}</GridItem>
                    <GridItem xs={12} sm={12} md={4}>{col2.map(breedToComponent)}</GridItem>
                    <GridItem xs={12} sm={12} md={4}>{col3.map(breedToComponent)}</GridItem>
                </GridContainer>
            </div>)
    }
    if (error)
        content = <h3>{error}</h3>

    if (loading)
        content = <h3>Loading...</h3>

    return (
        <Card>
            <CardHeader color="primary">
                <h4 className={classes.cardTitle}>Breeds</h4>
            </CardHeader>

            <CardBody>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            labelText="Filter"
                            id="filter"
                            formControlProps={{ fullWidth: true }}
                            inputProps={{
                                onChange: event => setFilter(event.target.value || ''),
                                endAdornment: (<InputAdornment position="end"><Search /></InputAdornment>)
                            }}
                        />
                    </GridItem>
                </GridContainer>
                {content}
            </CardBody>
        </Card>
    )
}
