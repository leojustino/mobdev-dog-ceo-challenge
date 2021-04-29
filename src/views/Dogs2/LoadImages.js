import React from 'react'

const LoadImages = React.memo(props =>
{
    const { breeds, onImagesLoaded } = props
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const loadImagesHandle = React.useCallback(async (breeds, onImagesLoaded) =>
    {
        try
        {
            setLoading(true)
            setError(null)

            let notifyLoaded = false

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
                        {
                            notifyLoaded = true
                            breed.images = (await response.json()).message
                        }
                    }
                }
                catch
                {
                    console.log('deu ruim carregando as imagens')
                }

            if (notifyLoaded && onImagesLoaded)
                onImagesLoaded()
        }
        catch (error)
        {
            setError(error)
        }
        finally
        {
            setLoading(false)
        }
    }, [props])

    React.useEffect(() => 
    {
        loadImagesHandle(breeds, onImagesLoaded)
    }, [loadImagesHandle])

    let content = ''

    if (error)
        content = <h3>{error}</h3>

    if (loading)
        content = <h3>Loading images...</h3>

    return <div>{content}</div>
})

export default LoadImages