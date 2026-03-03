let cachedDarkLogo: string | null = null
let cachedWhiteLogo: string | null = null

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const value = reader.result
      if (typeof value === 'string') {
        resolve(value)
      } else {
        reject(new Error('Unable to convert logo to data URL'))
      }
    }
    reader.onerror = () => reject(new Error('Unable to read logo blob'))
    reader.readAsDataURL(blob)
  })
}

export async function getBrandLogoDataUrl(variant: 'dark' | 'white'): Promise<string | null> {
  if (variant === 'dark' && cachedDarkLogo) return cachedDarkLogo
  if (variant === 'white' && cachedWhiteLogo) return cachedWhiteLogo

  try {
    const path = variant === 'dark' ? '/brand/logo-horizontal-dark.png' : '/brand/logo-horizontal-white.png'
    const response = await fetch(path)
    if (!response.ok) return null
    const blob = await response.blob()
    const dataUrl = await blobToDataUrl(blob)
    if (variant === 'dark') cachedDarkLogo = dataUrl
    if (variant === 'white') cachedWhiteLogo = dataUrl
    return dataUrl
  } catch {
    return null
  }
}

