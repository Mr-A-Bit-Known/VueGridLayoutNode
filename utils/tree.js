// 多级树形结构方法
function listToTree(data, id, list) {
    for (const item of data) {
        if (item.pid == id) {
            list.push(item);
        }
    }
    for (const item of list) {
        item.children = [];
        listToTree(data, item.id, item.children);
        // 如果没有子菜单，删除children
        if (item.children.length == 0) {
            delete item.children;
        }
    }
    return list;
}

module.exports = listToTree;