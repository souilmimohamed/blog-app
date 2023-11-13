export function verfifyUrl(url: string) {
  if (
    url.toLocaleLowerCase().includes('registeruser') ||
    url.toLocaleLowerCase().includes('login')
  )
    return false;
  return true;
}
