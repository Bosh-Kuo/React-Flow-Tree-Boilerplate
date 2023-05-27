import { v4 as uuidv4 } from "uuid";

/**
 * 建立新節點
 * @param {string} type - 節點的類型
 * @param {Object} position - 節點的位置
 * @param {Object} data - 節點的數據
 * @returns {Object} - 新建的節點物件
 */
const createNewNode = (type, position, data) => {
  return {
    id: uuidv4(),
    type,
    position,
    data: data,
  };
};

/**
 *更新陣列中的單一元素
 *@param {object} newElement - 要更新的新元素
 *@param {object[]} elementsArray - 原始元素陣列
 *@returns {object[]} - 更新後的元素陣列
 */
const updateOneElementInArray = (newElement, elementsArray) => {
  const updatedElements = elementsArray.map((element) => {
    if (element.id === newElement.id) {
      return newElement;
    }
    return element;
  });

  return updatedElements;
};

/**
 * 更新陣列中的多個元素
 * @param {object[]} newElements - 要更新的新元素陣列
 * @param {object[]} elementsArray - 原始元素陣列
 * @returns {object[]} - 更新後的元素陣列
 */
const updateElementsInArray = (newElements, elementsArray) => {
  const updatedElements = elementsArray.map((element) => {
    const matchingNewElement = newElements.find(
      (newElements) => newElements.id === element.id,
    );
    return matchingNewElement || element;
  });

  return updatedElements;
};

export { createNewNode, updateOneElementInArray, updateElementsInArray };
