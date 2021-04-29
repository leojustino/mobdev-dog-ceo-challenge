import React from "react"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from '@material-ui/core/FormControlLabel'


const BreedItem = React.memo(props =>
{
    const { breed, onSelectedBreedChanged } = props
    const [checked, setChecked] = React.useState(breed.selected || false)
    const onChangeHandle = React.useCallback(event => 
    {
        setChecked(breed.selected = event.target.checked)

        if (onSelectedBreedChanged)
            onSelectedBreedChanged(breed)
    })

    return (
        <div>
            <FormControlLabel
                label={breed.name}
                control={
                    <Checkbox
                        size="small"
                        checked={checked}
                        onChange={onChangeHandle} />} />
        </div>
    )
})

export default BreedItem