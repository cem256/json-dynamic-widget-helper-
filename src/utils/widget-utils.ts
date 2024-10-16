export function createWrappedObject(wrapperType: string, childObject: any) {
  const lowercaseType = wrapperType.toLowerCase();
  if (lowercaseType === 'row' || lowercaseType === 'column') {
    return {
      type: lowercaseType,
      args: {
        children: [childObject]
      }
    };
  } else {
    return {
      type: lowercaseType,
      args: {
        child: childObject
      }
    };
  }
}

export function hasOneChild(jsonObject: any): boolean {
  return jsonObject.args && 
    ((jsonObject.args.child && Object.keys(jsonObject.args).length === 1) ||
     (Array.isArray(jsonObject.args.children) && jsonObject.args.children.length === 1));
}

export function getChildContent(jsonObject: any): string {
  const childObject = jsonObject.args.child || jsonObject.args.children[0];
  return JSON.stringify(childObject, null, 2);
}

export function hasOneOrNoChild(jsonObject: any): boolean {
  if (!jsonObject.args) {
    return true; // No child
  }
  if (jsonObject.args.child) {
    return Object.keys(jsonObject.args).length === 1; // Exactly one child
  }
  if (Array.isArray(jsonObject.args.children)) {
    return jsonObject.args.children.length <= 1; // No child or one child
  }
  return true; // No child
}
