export const calculateTaxMultiplier = (arr: any[]) => {

    const taxObjects = arr.filter(item => item.name.includes("tax"));
  
    const product = taxObjects.reduce((accumulator, currentObject) => {
      return accumulator + currentObject.rawValue;
    }, 1);
    return product;
  }