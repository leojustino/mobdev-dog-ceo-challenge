import React from 'react'
import GridItemBreed from './GridItemBreed'
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import CustomInput from "components/CustomInput/CustomInput"


const BreedsList = React.memo(props =>
{
    const { breeds, onSelectedBreedChanged, useStyles } = props
    const [filter, setFilter] = React.useState('')
    const classes = useStyles()
    const filtered = filter === '' ? breeds : breeds.filter(a => null != a.name.match(filter))

    let content = <h3>No breeds found :(</h3>

    if (filtered.length > 0)
    {
        const lines = Math.ceil(filtered.length / 3)
        const col1 = filtered.slice(0, lines)
        const col2 = filtered.slice(lines, 2 * lines)
        const col3 = filtered.slice(lines * 2)

        content = (
            <div style={{ maxHeight: "150px", overflowY: "scroll", overflowX: "hidden" }}>
                <GridContainer>
                    <GridItemBreed
                        breeds={col1}
                        onSelectedBreedChanged={onSelectedBreedChanged} />
                    <GridItemBreed
                        breeds={col2}
                        onSelectedBreedChanged={onSelectedBreedChanged} />
                    <GridItemBreed
                        breeds={col3}
                        onSelectedBreedChanged={onSelectedBreedChanged} />
                </GridContainer>
            </div>
        )
    }

    return (
        <Card>
            <CardHeader color="primary">
                <h4 className={classes.cardTitle}>Breeds</h4>
            </CardHeader>

            <CardBody>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            id="filter"
                            labelText="Filter"
                            formControlProps={{ fullWidth: true }}
                            inputProps={{
                                value: filter,
                                onChange: event => setFilter(event.target.value || ''),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Search />
                                    </InputAdornment>)
                            }} />

                    </GridItem>
                </GridContainer>

                {content}

            </CardBody>
        </Card>
    )
})

export default BreedsList