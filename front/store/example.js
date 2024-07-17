// Checking network status
NetInfo.addEventListener((state) => {
    if (state.isConnected) {
    // Online: Sync data with the server
    syncDataWithServer();
    } else {
    // Offline: Store data locally
    storeDataLocally();
    }
    });
    
    // Storing data locally
    const storeDataLocally = async () => {
    try {
    await AsyncStorage.setItem(key, value);
    } catch (error) {
    console.log(error);
    }
    };
    
    // Retrieving data from local storage
    const retrieveDataFromLocal = async () => {
    try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
    console.log(value);
    }
    } catch (error) {
    console.log(error);
    }
    };