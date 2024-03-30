import React, { useEffect, useState } from 'react'

const useGetConversations = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState()

    useEffect(() => {
        const getConversations = async () => {

            try {
                setLoading(true)
                const data = await fetch("http://localhost:3002/api/users", {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const conv = await data.json()
                console.log(conv)
                setConversations(conv)
            } catch (error) {
                throw new Error(error)

            } finally {
                setLoading(false)
            }

        }

        getConversations()


    }, [])

    return { loading, conversations }

}

export default useGetConversations