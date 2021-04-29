import React from 'react'
import BreedModel from '../Dogs/BreedModel'

const cache = []
const LoadBreeds = React.memo(props =>
{
    const { onBreedsLoaded } = props
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const loadBreedsHandle = React.useCallback(async (cache, onBreedsLoaded) =>
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

                    if (onBreedsLoaded)
                        onBreedsLoaded(cache)
                }
                else
                    setError('wrong http response')
            }
            catch (error)
            {
                setError(error)
            }
            finally
            {
                setLoading(false)
            }
    }, [])

    React.useEffect(() => 
    {
        loadBreedsHandle(cache, onBreedsLoaded)
    }, [loadBreedsHandle])

    let content = ''

    if (error)
        content = <h3>{error}</h3>

    if (loading)
        content = <h3>Loading breeds...</h3>

    return <div>{content}</div>
})

export default LoadBreeds