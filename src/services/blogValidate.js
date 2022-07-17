   
export default function BlogValid(
  idName,
  idDiscription,
  file
  )
   {
  let error = "";
  let data = {
    name: document.getElementById(idName).value,
    content: document.getElementById(idDiscription).value,
    
  };
  if (!data.name || data.name.length < 2) {
    error += `השם חייב להכיל שני תווים לפחות`;
  }

  if (!data.content || data.content.length < 2) {
    error += `הבלוג חייב לכלול 100 תווים לפחות!`;
  }
  

  if(!file){
    error += 'אתה חייב לצרף תמונה!'
  }

  return error || data;
}

