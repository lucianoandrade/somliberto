
export function getSocialUserPicture(response){
  if (response.picture){
      try{
        let picture = JSON.parse(response.picture)
        return picture.data.url
      }catch{
        console.log("error");
      }
      return response.picture
  }
  return null
}
