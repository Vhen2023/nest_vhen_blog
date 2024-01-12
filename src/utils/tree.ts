/*
 * @Author: vhen
 * @Date: 2024-01-12 20:14:33
 * @LastEditTime: 2024-01-12 21:41:59
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\utils\tree.ts
 * 
 */
/**
 * 
 * @param list 
 * @param id 
 * @param parentId 
 * @param children 
 * @returns 
 */
export const listToTree = (list: any, id: string = 'id', parentId: string = 'parentId', children: string = 'children') => {
    const sortArr: any = list.sort((a: any, b: any) => {
        return a[parentId] - b[parentId];
    });
    const minParentId = Array.isArray(sortArr) && sortArr.length > 0 ? sortArr[0].parentId : -1;
    const cloneData = JSON.parse(JSON.stringify(list));
    return cloneData.filter((father: any) => {
        const branchArr = cloneData.filter((child: any) => father[id] === child[parentId]);
        branchArr.length > 0 ? father[children] = branchArr : '';
        return father[parentId] === minParentId;
    });
};