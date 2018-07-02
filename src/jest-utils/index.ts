import { equals } from "./jasmineUtils";
import { iterableEquality, subsetEquality } from "./utils";

export const toMatchObjectComparison = (obj1: any, obj2: any): boolean => {
  return equals(obj1, obj2, [iterableEquality, subsetEquality]);
};
