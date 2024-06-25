export const calculateTaxMultiplier = (arr: any) => {
    const sellingPrice = (arr.sellingPrice * arr.quantity) / 100
    const taxObjects = arr.priceTags.filter((item: { name: string | string[]; }) => item.name.includes("tax"));
    const product = taxObjects.reduce((accumulator: any, currentObject: { isPercentual: boolean; rawValue: number; }) => {
      return accumulator + (currentObject.isPercentual === true ? (sellingPrice * currentObject.rawValue) : currentObject.rawValue);
    }, 0);
    return product;
  }