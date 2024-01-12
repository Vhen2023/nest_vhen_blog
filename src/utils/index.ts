/*
 * @Author: vhen
 * @Date: 2024-01-11 00:32:46
 * @LastEditTime: 2024-01-12 18:34:00
 * @Description: 现在的努力是为了小时候吹过的牛逼！
 * @FilePath: \nest-vhen-blog\src\utils\index.ts
 * 
 */

/**
 * 集合数据转换为树形结构。option.parentKey支持函数，示例：(n) => n.meta.parentName
 * @param {Array} list 集合数据
 * @param {Object} option 对象键配置，默认值{ key: 'id', parent: 'pid', children: 'children' }
 * @returns 树形结构数据tree
 */
export function list2Tree(list, option = { key: 'id', parentKey: 'parentId', children: 'children' }) {
    let tree = []
    // 获取父编码统一为函数
    let pvalue = typeof (option.parentKey) === 'function' ? option.parentKey : (n) => n[option.parentKey]
    // map存放所有对象
    let map = {}
    list.forEach(item => {
        map[item[option.key]] = item
    })
    //遍历设置根节点、父级节点，父节点可能不存在
    list.forEach(item => {
        if (!pvalue(item))  //pid无效（0），视为根节点
            tree.push(item)
        else {
            const pnode = map[pvalue(item)]
            if (pnode) {
                map[pvalue(item)][option.children] ??= []
                map[pvalue(item)][option.children].push(item)
                item.parent = map[pvalue(item)]  // 设置一个父节点parent
            }
            // 如果其父节点不存在，则视为根节点
            else tree.push(item)
        }
    })
    return tree
}

/**
 * 树形转平铺list（广度优先，先横向再纵向）
 * @param {*} tree 一颗大树
 * @param {*} option 对象键配置，默认值{ children: 'children' }
 * @returns 平铺的列表
 */
export function tree2List(tree, option = { children: 'children' }) {
    const list = []
    const queue = [...tree]
    while (queue.length) {
        const item = queue.shift()
        if (item[option.children]?.length > 0)
            queue.push(...item[option.children])
        list.push(item)
    }
    return list
}


export const listConvertTree = (list) => {
    let root = null;
    if (list && list.length) {
        root = { id: 0, parentId: -1, children: [] };
        const group = {};
        for (let index = 0; index < list.length; index += 1) {
            if (list[index].parentId !== null && list[index].parentId !== undefined) {
                if (!group[list[index].parentId]) {
                    group[list[index].parentId] = [];
                }
                group[list[index].parentId].push(list[index]);
            }
        }
        const queue = [];
        queue.push(root);
        while (queue.length) {
            const node = queue.shift();
            node.children = group[node.id] && group[node.id].length ? group[node.id] : null;
            if (node.children) {
                queue.push(...node.children);
            }
        }
    }
    return root;
};

/**
 * 线性化数据树形话
 * @param source
 * @param id
 * @param parentId
 * @param children
 */
export const listToTree = (source: any, id?: any, parentId?: any, children?: any) => {
    const sortArr: any = source.sort((a: any, b: any) => {
        return a[parentId] - b[parentId];
    });
    const minParentId = Array.isArray(sortArr) && sortArr.length > 0 ? sortArr[0].parentId : -1;
    const cloneData = JSON.parse(JSON.stringify(source));
    return cloneData.filter((father: any) => {
        const branchArr = cloneData.filter((child: any) => father[id] === child[parentId]);
        branchArr.length > 0 ? father[children] = branchArr : '';
        return father[parentId] === minParentId;
    });
};

/**
 * 树形数据线性化
 * @param list
 */
export const treeConvertList = (root) => {
    const list = [];
    if (root) {
        const Root = JSON.parse(JSON.stringify(root));
        const queue = [];
        queue.push(Root);
        while (queue.length) {
            const node = queue.shift();
            if (node.children && node.children.length) {
                queue.push(...node.children);
            }
            delete node.children;
            if (node.parentId !== null && node.parentId !== undefined) {
                list.push(node);
            }
        }
    }
    return list;
};
