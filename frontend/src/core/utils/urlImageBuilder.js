import { BASE_URL } from '@constants/configs'

export const absoluteImageUrl = (image, mode) => {
    if (mode === 'file') {
        return `${BASE_URL}${image}`
    }
    return image
}
