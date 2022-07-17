   
export default function ProductValid(
    idName,
    idDiscription,
    idCategory,
    file
  ) {
    let error = "";
    let data = {
      name: document.getElementById(idName).value,
      description: document.getElementById(idDiscription).value,
      category: document.getElementById(idCategory).value,
    };
    if (!data.name || data.name.length < 2) {
      error += `השם חייב להכיל שני תווים לפחות`;
    }
  
    if (!data.description || data.description.length < 2) {
      error += `תיאור הטיול חייב לכלול שני תווים לפחות!`;
    }
    
  
    if (!data.category || data.category === 'בחר קטגוריה') {
      error += "אתה חייב לבחור קטגוריה!";
    }
    if(!file){
        error+= 'לא הוספת תמונה'
    }
  
    return error || data;
  }
  
  