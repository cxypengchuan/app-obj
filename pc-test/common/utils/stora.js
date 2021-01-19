
//设置缓存数据
export const put = (key, value) => {
    // key = md5(key);
    if (typeof value == 'object') {
        value = JSON.stringify(value);
    }
    uni.setStorageSync(key, value);
};

//得到缓存数据
export const get = (key) => {
    // key = md5(key);
    return uni.getStorageSync(key) || '';
};
export const remove = (key) => {
    // key = md5(key);
    return uni.removeStorageSync(key);
};

//得到缓存的json对象
export const getJson = (key) => {
    let value = get(key);
    return value ? JSON.parse(value) : undefined;
};

//设置用户
export const setUser = (data) => {
    if (data && data.token) {
        put('user', data);
        put('token', data.token);
    }
};

//得到用户
export const getUser = () => {
    return getJson('user');
};

//得到token
export const getToken = () => {
    return get('token');
};

//设置菜单
export const setMenus = (data) =>
    put('menus', data);

//获取菜单
export const getMenus = () =>
    getJson('menus');



//清理缓存
export const clear = () => {
    let firstOpen = isFirstOpen();
    uni.clearStorageSync();
    setIsFirstOpen(firstOpen);

};

export const isFirstOpen = () => {
    let firstOpen = get("isFirstOpen");
    return isEmpty(firstOpen);
};
//设置不是首次打开
export const setIsFirstOpen = (isFirst = false) => {
    if (isFirst) remove("isFirstOpen");
    else put("isFirstOpen", "isFirstOpen");
};
