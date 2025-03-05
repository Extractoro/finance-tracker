const hasChanges = <T>(
  updateFields: Record<keyof T, T[keyof T]> | Partial<T>,
  existedItem: T,
): boolean => {
  return Object.entries(updateFields).some(
    ([key, value]) => value !== existedItem[key as keyof T],
  );
};

export default hasChanges;
