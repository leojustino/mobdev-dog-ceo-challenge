import React from "react"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from '@material-ui/core/FormControlLabel'


export default function BreedItem(props)
{
    const [checked, setChecked] = React.useState(props.breed.selected || false)
    const onChangeHandle = event => 
    {
        setChecked(props.breed.selected = event.target.checked)

        if (props.onSelectedBreedChanged)
            props.onSelectedBreedChanged(props.breed)
    }

    return <div>
        <FormControlLabel
            label={props.breed.name}
            control={
                <Checkbox
                    size="small"
                    checked={checked}
                    onChange={onChangeHandle} />} />
    </div>
}