export function ifToday(timestamp: number): boolean {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const dateToCheck = new Date(timestamp)
    return (
        dateToCheck.getTime() >= today.getTime() &&
        dateToCheck.getTime() < today.getTime() + 24 * 60 * 60 * 1000
    )
}

export function timeWithMinute(timestamp: number): string {
    const date = new Date(timestamp)
    const formattedHour =
        date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    const formattedMinute =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    return `${formattedHour}:${formattedMinute}`
}

// Send token to bakend. Whenever we need to send a request to the backend, we need to use this function to send the token.
export function fetchWithToken(
    url: string,
    { headers, ...options }: { headers?: HeadersInit; [key: string]: any } = {}
): Promise<any> {
    const token = localStorage.getItem('token')
    return fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            ...headers,
        },
        ...options,
    })
}
