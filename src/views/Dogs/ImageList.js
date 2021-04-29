import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { GridList, GridListTile, GridListTileBar, ListSubheader } from "@material-ui/core";
import React from "react";

export default function ImageList(props)
{
    const classes = props.useStyles()
    const [images, setImages] = React.useState([])
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const getImagesAsync = React.useCallback(async breeds =>
    {
        try
        {
            setLoading(true)
            setError(null)

            const images = [];

            for (let i = 0; i < breeds.length; i++)
                try
                {
                    const breed = breeds[i]

                    if (breed.images.length === 0)
                    {
                        const [breedName, subBreedName] = breed.name.split(' ')
                        const breedUrl = `https://dog.ceo/api/breed/${breedName}/images`
                        const subBreedUrl = `https://dog.ceo/api/breed/${breedName}/${subBreedName}/images`
                        const response = await fetch(subBreedName ? subBreedUrl : breedUrl);

                        if (response.ok)
                            breed.images = (await response.json()).message
                    }

                    images.push((
                        <GridListTile key={`title_id${breed.id}`} cols={2} style={{ height: 'auto' }}>
                            <ListSubheader component="div">{breed.name}</ListSubheader>
                        </GridListTile>))

                    images.push(breed.images.map((url, index) => (
                        <GridListTile key={`img_id_$${breed.id}_${index}`}>
                            <img src={url} alt={breed.name} />
                            <GridListTileBar title={`breed: ${breed.name}`} />
                        </GridListTile>
                    )))
                }
                catch
                {
                    console.log('deu ruim carregando as imagens')
                }

            setImages(images)
        }
        catch (error)
        {
            setError(error)
        }

        setLoading(false)
    }, [])

    React.useEffect(() => { getImagesAsync(props.breeds) }, [getImagesAsync, props])

    let content = <h3>Select breeds to see images</h3>

    if (images.length > 0)
        content = (
            <GridList cellHeight={450} cols={2} className={classes.gridList}>
                {images}
            </GridList>)

    if (error)
        content = <h3>{error}</h3>

    if (loading)
        content = <h3>Loading...</h3>

    return (
        <Card>
            <CardHeader color="info">
                <h4 className={classes.cardTitle}>Images</h4>
            </CardHeader>
            <CardBody>
                {content}
            </CardBody>
        </Card>)
}
