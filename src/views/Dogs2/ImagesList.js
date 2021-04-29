import { GridList, GridListTile, GridListTileBar, ListSubheader } from '@material-ui/core'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import CardHeader from 'components/Card/CardHeader'
import React from 'react'


const ImagesList = React.memo(props =>
{
    const { breeds, useStyles } = props
    const classes = useStyles()

    let content = <h3>Select breeds to see images</h3>

    if (breeds.length > 0)
    {
        content = []

        breeds.forEach(breed =>
        {
            content.push((
                <GridListTile key={`title_id${breed.id}`} cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">{breed.name}</ListSubheader>
                </GridListTile>))

            content.push(breed.images.map((url, index) => (
                <GridListTile key={`img_id_$${breed.id}_${index}`}>
                    <img src={url} alt={breed.name} />
                    <GridListTileBar title={`breed: ${breed.name}`} />
                </GridListTile>
            )))
        })

        content = (
            <GridList cellHeight={450} cols={2} className={classes.gridList}>
                {content}
            </GridList>
        )
    }

    return (
        <Card>
            <CardHeader color="info">
                <h4 className={classes.cardTitle}>Images</h4>
            </CardHeader>
            <CardBody>
                {content}
            </CardBody>
        </Card>
    )
})

export default ImagesList